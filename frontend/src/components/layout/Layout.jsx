const Layout = ({ leftPanel, rightPanel }) => {
  return (
    <div className="min-h-screen w-full border-t-4 border-sky-400 bg-gray-200">
      <header className="border-b border-gray-300 bg-gray-100 px-4 py-3 font-semibold text-slate-700">Group Design</header>
      <div className="flex h-[calc(100vh-52px)] w-full">
        <aside className="w-full overflow-y-auto border-r-2 border-black bg-gray-200 p-4 lg:w-[30%]">
          {leftPanel}
        </aside>
        <section className="flex flex-1 items-center justify-center bg-[#2f3136] p-4">
          {rightPanel}
        </section>
      </div>
    </div>
  );
};

export default Layout;
