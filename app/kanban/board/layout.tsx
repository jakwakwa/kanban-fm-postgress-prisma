export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col md:flex-row h-fit overflow-scroll">
      <div className="w-full flex-grow p-6 md:overflow-y-auto md:p-0">
        {children}
      </div>
    </div>
  );
}
