// Service worker: avoid caching HTML navigation responses and version the cache.
const CACHE_NAME = 'campus-hustle-v2';

self.addEventListener('install', (event) => {
  // Activate new SW as soon as it's finished installing
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim clients and remove old caches
  event.waitUntil(
    (async () => {
      self.clients.claim();
      const keys = await caches.keys();
      await Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
          return Promise.resolve(true);
        })
      );
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Don't handle non-GET requests
  if (req.method !== 'GET') return;

  // Skip requests that aren't http(s) (e.g. chrome-extension://) to avoid cache.put errors
  try {
    const url = new URL(req.url);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  } catch (e) {
    // If URL parsing fails, skip handling this request
    return;
  }

  // Avoid caching HTML (navigation) so index.html and routes are always fetched fresh
  const accept = req.headers.get('accept') || '';
  const isHtmlRequest = accept.includes('text/html');
  if (isHtmlRequest) {
    // Just go to network for HTML pages
    event.respondWith(fetch(req));
    return;
  }

  // For JavaScript chunks in dev mode, always fetch fresh (don't cache)
  // In production, we'd cache assets
  const url = new URL(req.url);
  const isJavaScript = req.url.includes('/src/') || 
                       req.url.includes('chunk-') || 
                       req.url.endsWith('.js') ||
                       req.url.includes('main.tsx');
  
  if (isJavaScript || url.hostname === 'localhost') {
    // During development, always fetch fresh JavaScript - don't cache
    event.respondWith(fetch(req));
    return;
  }

  // For other GET requests (assets), use cache falling back to network and cache new responses
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const networkResponse = await fetch(req);
        if (networkResponse && networkResponse.ok) {
          cache.put(req, networkResponse.clone());
        }
        return networkResponse;
      } catch (err) {
        // If offline and no cached asset, fail gracefully
        return cached || new Response(null, { status: 503, statusText: 'Service Unavailable' });
      }
    })
  );
});
