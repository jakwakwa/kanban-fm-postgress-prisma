"use client";
import * as Form from "@radix-ui/react-form";
interface FormLabelProps {
  isLabel?: boolean;
  spacing?: boolean;
  alignRight?: boolean;
  children: React.ReactNode;
}
function FormLabel({
  isLabel = true,
  spacing,
  alignRight,
  children,
}: Readonly<FormLabelProps>) {
  const defaultStyle = `text-slate-700/70 text-[10px] font-extrabold pl-0 mb-1.5 mt-4 ml-[-1px]`;

  function styleSelector() {
    if (spacing && !alignRight) {
      return `${defaultStyle} mt-1 mb-1.5 `;
    } else if (alignRight && !spacing) {
      return `${defaultStyle} absolute right-0 text-right bottom-0 mt-4 mb-0`;
    } else return `${defaultStyle} mt-[-8px] `;
  }

  if (isLabel) {
    return <Form.Label className={` ${defaultStyle}`}>{children}</Form.Label>;
  } else {
    return <div className={styleSelector()}>{children}</div>;
  }
}

export default FormLabel;
