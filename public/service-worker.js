// Simple Vite PWA service worker for offline support
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('campus-hustle-v1').then(cache => {
      return cache.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request).then(networkResponse => {
            if (event.request.method === 'GET' && networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
        );
      });
    })
  );
});
