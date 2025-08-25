import React from 'react';

interface SocialShareProps {
  url: string;
  title?: string;
  text?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, text }) => {
  const shareData = {
    title: title || 'Check this out on MSH Connect!',
    text: text || 'Discover amazing entrepreneurs at Mary Stuart Hall!',
    url,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium"
      title="Share this profile"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 11-6 0 3 3 0 016 0zm6 8a3 3 0 11-6 0 3 3 0 016 0zm-6 4a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      Share
    </button>
  );
};

export default SocialShare;
