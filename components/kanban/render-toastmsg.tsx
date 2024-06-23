"use client";
import * as Toast from "@radix-ui/react-toast";

interface ToastProps {
  message: {
    title: string;
    description: string;
  };
  state: any;
  setState: any;
}

function RenderToastMsg({ message, state, setState }: Readonly<ToastProps>) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="shadow-slate-400 shadow-lg bg-indigo-600 rounded-md p-[15px]  grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={state.open}
        onOpenChange={() =>
          setState((prevState: any) => ({
            ...prevState,
            open: false,
          }))
        }
      >
        <Toast.Title className="[grid-area:_title] mb-[5px] s text-[15px] font-extrabold text-slate-100 animate-pulse tracking-wider">
          {message.title}
        </Toast.Title>
        <Toast.Description asChild>
          <div className="[grid-area:_description] m-0  text-[13px] bold text-indigo-200 leading-[1.3]">
            {message.description}
          </div>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
}

export default RenderToastMsg;
