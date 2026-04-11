import React from 'react';

const Layout = ({ leftPanel, rightPanel }) => {
  return (
    <div className="h-full w-full border-t-4 border-sky-400 bg-gray-200 flex overflow-hidden">
      {/* Sidebar - Left Panel */}
      <aside className="w-[300px] h-full overflow-y-auto border-r-2 border-black bg-gray-200 p-4 scrollbar-thin scrollbar-thumb-gray-400">
        {leftPanel}
      </aside>

      {/* Content - Right Panel */}
      <main className="flex-1 h-full overflow-auto bg-[#2f3136] p-4 flex items-center justify-center">
        {rightPanel}
      </main>
    </div>
  );
};

export default Layout;
