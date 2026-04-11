import React from 'react';

const TopHeader = () => {
  return (
    <div className="flex flex-col w-full select-none cursor-default">
      <div className="bg-gray-200 border-b border-gray-500 px-2 py-1 flex items-center justify-between text-sm">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="logo"
            className="h-6 w-auto object-contain"
          />

          <div className="w-px h-6 bg-gray-400 mx-2"></div>

          <span className="text-sm font-semibold text-gray-800">
            Group Design
          </span>
        </div>
      </div>
      <div className="bg-gray-100 border-b border-gray-500 px-3 py-1 flex gap-5 text-sm text-gray-800">
        <span className="hover:bg-blue-600 hover:text-white px-2 cursor-pointer transition-colors">File</span>
        <span className="hover:bg-blue-600 hover:text-white px-2 cursor-pointer transition-colors">Edit</span>
        <span className="hover:bg-blue-600 hover:text-white px-2 cursor-pointer transition-colors">Graphics</span>
        <span className="hover:bg-blue-600 hover:text-white px-2 cursor-pointer transition-colors">Help</span>
      </div>
    </div>
  );
};

export default TopHeader;
