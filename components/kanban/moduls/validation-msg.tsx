"use client";
function ValidationMsg({ variant }: Readonly<{ variant: string }>) {
  return (
    <div className="text-[#6866e2] border border-[#4172cd65] border-1 px-2 py-1 inline-block text-[8px] rounded w-[70%] mt-4">
      *Please enter a {variant} title to enable save
    </div>
  );
}

export default ValidationMsg;
