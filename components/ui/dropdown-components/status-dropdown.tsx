"use-client";
import { SetStateAction, useEffect, useState } from "react";
// import * as Radix from "@radix-ui/react-select";
import * as Select from "@radix-ui/react-select";
import ColumnText from "@/components/kanban/columns/column-text";
const itemsInitial = ["Todo", "Doing", "Done"];

const StatusDropdown = ({
  status,
  updatedStatus,
  setUpdatedStatus,
  columnStatus,
  setNewStatus,
  newStatus,
  disabled,
  setNewColId,
  inputStyle,
  changed,
  setChanged,
}: {
  status: string;
  updatedStatus: string;
  setUpdatedStatus: any;
  columnStatus: any[];
  setNewStatus: any;
  newStatus: any;
  disabled: boolean;
  setNewColId: any;
  inputStyle: string;
  changed: any;
  setChanged: any;
}) => {
  const [toggled, setToggled] = useState("closed");

  const [selectStatus, setSelectStatus] = useState("ss");

  useEffect(() => {
    const parsed: string = JSON.parse(updatedStatus);
    // @ts-ignore
    setNewStatus(parsed.columnStatus);
    // @ts-ignore
    setNewColId(parsed.columnId);

    if (toggled == "open") {
      setChanged(true);
    }

    // @ts-ignore
    setSelectStatus(parsed.columnStatus);
  }, [
    newStatus,
    setChanged,
    setNewColId,
    setNewStatus,
    toggled,
    updatedStatus,
  ]);

  if (!disabled) {
    return (
      <form style={{ width: "100%", maxWidth: 420 }}>
        <div>
          <Select.Root
            dir="ltr"
            defaultValue={status}
            onOpenChange={(e: boolean) =>
              setToggled(e === true ? "open" : "closed")
            }
            onValueChange={setUpdatedStatus}
          >
            <Select.Trigger asChild data-state={toggled}>
              <button className=" rounded-md w-full h-10 justify-start text-black bg-white outline-none hover:bg-violet3  focus:shadow-[0_0_0_1.5px_#9443f7] text-left px-[16px] border border-slate-500 text-xs capitalize relative">
                <span>
                  <Select.Value>{!changed ? "" : selectStatus}</Select.Value>
                </span>
                <Select.Icon asChild>
                  <div className="absolute rotate-180 right-3 top-2 text-md bold text-slate-500">
                    {"^"}
                  </div>
                </Select.Icon>
              </button>
            </Select.Trigger>
            <Select.Content asChild>
              <div className="rounded-md bg-white p-[16px] text-sm shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade capitalize">
                <Select.Viewport>
                  {columnStatus.map((item, i) => {
                    return (
                      <Select.Item
                        key={i}
                        value={JSON.stringify(item)}
                        className="p-2 hover:bg-violet5 capitalize"
                      >
                        <Select.ItemText> {item.columnStatus} </Select.ItemText>
                      </Select.Item>
                    );
                  })}
                </Select.Viewport>
              </div>
            </Select.Content>
          </Select.Root>
        </div>
      </form>
    );
  } else {
    return (
      <div>
        <div className="mt-4 rounded-md w-[100px] h-10 justify-start text-slate-700   outline-none focus:shadow-[0_0_0_1.5px] focus:shadow-black text-[13px] flex items-center capitalize font-bold text-left">
          <div className="text-left"></div>
          <div className="text-black my-0">
            <ColumnText color={status}>
              {" "}
              {!changed ? status : selectStatus}
            </ColumnText>
          </div>
        </div>
      </div>
    );
  }
};

export default StatusDropdown;
