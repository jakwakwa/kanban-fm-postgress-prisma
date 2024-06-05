function StatusDropdown({ task }: { task: any[] }) {
  return (
    <div className="w-96 h-10 left-0 top-[28px] absolute">
      <div className="w-96 h-10 left-0 top-0 absolute rounded border border-indigo-500" />
      <div className="left-[16px] top-[8px] absolute text-gray-950 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug">
        Doing
      </div>
    </div>
  );
}

export default StatusDropdown;
