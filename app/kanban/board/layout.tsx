// * Kanban Boards Page Layout

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex   flex-col md:flex-row md:overflow-hidden bg-[#F4F7FD] h-fit overflow-scroll">
      <div className="w-[20000px] flex-grow p-6 md:overflow-y-auto md:p-0">
        {children}
      </div>
    </div>
  );
}
