import React from "react";
export default function Loader():React.ReactElement {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-white border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }
  