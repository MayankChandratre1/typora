import { useState } from 'react';
import { Button } from '../ui/button';

const ShareModal = ({ onClose, url }: { onClose: () => void, url: string }) => {
  const [copied, setCopied] = useState(false);
  const blogUrl = process.env.BASE_APP_URL +url;

  // Function to copy the blog URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(blogUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide copied message after 2s
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-500 rounded-lg shadow-lg p-6 w-80">
        <div className='flex justify-between'>
          <h2 className="text-xl font-bold mb-4">Share this Blog</h2>
           <Button variant={"destructive"} onClick={onClose} className="rounded-full w-8 h-8">X</Button>
        </div>

        <div className="space-y-4">
          {/* Copy Link */}
          <button
            className="bg-gray-200 dark:bg-gray-800 py-2 px-4 w-full rounded flex justify-between items-center"
            onClick={copyToClipboard}
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>

          <div className='grid grid-cols-3 gap-2'>
            {/* Share on WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(blogUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 dark:bg-gray-800 dark:text-white py-2 px-4 w-full rounded flex justify-center text-sm"
          >
            WhatsApp
          </a>

          {/* Share on Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 dark:bg-gray-800 dark:text-white py-2 px-4 w-full rounded flex justify-center text-sm"
          >
            Twitter
          </a>

          {/* Share on Instagram (you can't directly share a link to Instagram from a web app) */}
          <a
            href={`https://www.instagram.com/?url=${encodeURIComponent(blogUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 dark:bg-gray-800 dark:text-white py-2 px-4 w-full rounded flex justify-center text-sm"
          >
            Instagram
          </a>
          </div>
        </div>

        {/* Close Modal Button
        <button 
          onClick={onClose} 
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded">
          Close
        </button> */}
      </div>
    </div>
  );
};

export default ShareModal;