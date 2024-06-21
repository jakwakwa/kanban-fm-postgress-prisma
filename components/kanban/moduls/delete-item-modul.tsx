"use client";

function DeleteItemModul() {
  return (
    <div>
      <div className="w-96 h-56 relative">
        <div className="w-96 h-56 left-0 top-0 absolute bg-white rounded-md" />
        <div className="w-40 h-6 left-[32px] top-[32px] absolute">
          <div className="left-0 top-0 absolute text-red-500 text-lg font-bold font-['Plus Jakarta Sans']">
            Delete this board?
          </div>
        </div>
        <div className="w-96 left-[32px] top-[79px] absolute text-slate-400 text-xs font-medium font-['Plus Jakarta Sans'] leading-snug">
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </div>
        <div className="w-96 h-10 left-[32px] top-[149px] absolute">
          <div className="w-48 h-10 left-0 top-0 absolute">
            <div className="w-48 h-10 left-0 top-0 absolute bg-red-500 rounded-2xl" />
            <div className="left-[78.50px] top-[8px] absolute text-center text-white text-xs font-bold font-['Plus Jakarta Sans'] leading-snug">
              Delete
            </div>
          </div>
          <div className="w-48 h-10 left-[216px] top-0 absolute">
            <div className="w-48 h-10 left-0 top-0 absolute bg-indigo-500/opacity-10 rounded-2xl" />
            <div className="left-[77.50px] top-[8px] absolute text-center text-indigo-500 text-xs font-bold font-['Plus Jakarta Sans'] leading-snug">
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemModul;
