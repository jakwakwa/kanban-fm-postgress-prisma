"use-client";
import { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import ColumnText from "@/components/kanban/columns/column-text";
import { commonClasses } from "@/components/kanban/kanban-grid-styles";
interface ParsedJson {
  name: string;
  id: string;
  columnStatus: string;
}

const StatusDropdown = ({
  status,
  updatedStatus,
  setUpdatedStatus,
  columnStatus,
  setNewStatus,
  newStatus,
  disabled,
  setNewColId,
  changed,
  setChanged,
  darkMode,
}: {
  status: string;
  updatedStatus: string;
  setUpdatedStatus: any;
  columnStatus: any[];
  setNewStatus: any;
  newStatus: any;
  disabled: boolean;
  setNewColId: any;
  changed: any;
  setChanged: any;
  darkMode: boolean;
}) => {
  const [toggled, setToggled] = useState("closed");

  const [selectStatus, setSelectStatus] = useState("ss");

  useEffect(() => {
    const parsed = JSON.parse(updatedStatus) as ParsedJson;
    if (toggled == "open") {
      setChanged(true);
    }
    if (changed) {
      setNewStatus(parsed.name);
      setNewColId(parsed.id);
    }
    setSelectStatus(parsed.columnStatus);
  }, [
    newStatus,
    setChanged,
    setNewColId,
    setNewStatus,
    toggled,
    updatedStatus,
    selectStatus,
    changed,
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
              <button className={`${darkMode ? commonClasses.dropdown.dark   : commonClasses.dropdown.base } hover:bg-[#5c5e771c]  rounded-md w-full h-10 justify-start text-black outline-none focus:shadow-[0_0_0_1px_#252525] text-left px-[16px] border text-xs capitalize relative`}>
                <span>
                  <Select.Value>{selectStatus}</Select.Value>
                </span>
                <Select.Icon asChild>
                  <div className="absolute rotate-180 right-3 top-2 text-md bold text-slate-500">
                    {"^"}
                  </div>
                </Select.Icon>
              </button>
            </Select.Trigger>
            <Select.Content asChild>
              <div className={`${darkMode ? 'bg-[#3d3f4f] text-white' : 'bg-[#f1f5f9] hover:bg-[#f1f5f9] text-black'} rounded-md p-[16px] text-sm will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade capitalize`}>
                <Select.Viewport>
                  {columnStatus.map((item, i) => {
                    return (
                      <Select.Item
                        key={item.id}
                        value={JSON.stringify(item)}
                        className={`${darkMode ? 'text-white hover:bg-[#3b3592]'  : 'text-default hover:bg-[#5d3fc01c]'} text-xs p-2 capitalize`}
                      >
                        <Select.ItemText> {item.name} </Select.ItemText>
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
          <div className={`${darkMode ? 'text-white' : 'text-black'} my-0`}>
            <ColumnText color={status} alignRight={false} darkMode={darkMode}>
              {!changed ? status : selectStatus}
            </ColumnText>
          </div>
        </div>
      </div>
    );
  }
};

export default StatusDropdown;
