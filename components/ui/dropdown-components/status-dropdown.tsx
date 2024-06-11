"use-client";
import { SetStateAction, useState } from "react";
import * as Radix from "@radix-ui/react-select";

const itemsInitial = ["Todo", "Doing", "Done"];

const StatusDropdown = ({ status }: { status: string }) => {
  const [toggled, setToggled] = useState("closed");

  return (
    <form style={{ width: "100%", maxWidth: 420 }}>
      <div>
        <Radix.Root
          dir="ltr"
          defaultValue={status}
          onOpenChange={(e: boolean) =>
            setToggled(e === true ? "open" : "closed")
          }
        >
          <Radix.Trigger asChild data-state={toggled}>
            <button className="mt-4 rounded-md w-full h-10 justify-start text-black bg-white outline-none hover:bg-violet3 focus:shadow-[0_0_0_1.5px] focus:shadow-black text-left px-[16px] border border-slate-300 text-xs">
              <span>
                <Radix.Value />
              </span>
              <Radix.Icon asChild>{/* TODO: Chevron */}</Radix.Icon>
            </button>
          </Radix.Trigger>
          <Radix.Content asChild>
            <div className="rounded-md bg-white p-[16px] text-sm shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
              <Radix.Viewport>
                {itemsInitial.map((item, i) => {
                  return (
                    <Radix.Item
                      key={i}
                      value={item}
                      className="p-2 hover:bg-violet5"
                    >
                      <Radix.ItemText> {item} </Radix.ItemText>
                    </Radix.Item>
                  );
                })}
              </Radix.Viewport>
            </div>
          </Radix.Content>
        </Radix.Root>
      </div>
    </form>
  );
};

export default StatusDropdown;
