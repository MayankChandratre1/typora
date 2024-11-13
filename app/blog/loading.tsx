"use client"
// app/loading.js or app/blog/loading.js

export default function Loading() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black">
        <div className="loader"></div>
        <style jsx>{`
          .loader {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-top-color: #000;
            border-radius: 50%;
            animation: spin 1s ease infinite;
          }
  
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
  