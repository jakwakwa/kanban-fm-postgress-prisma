"use client";
import * as Form from "@radix-ui/react-form";
interface FormLabelProps {
  isLabel?: boolean;
  children: React.ReactNode;
}
function FormLabel({ isLabel = true, children }: FormLabelProps) {
  if (isLabel) {
    return (
      <Form.Label className="text-medium-gray text-[12px] font-bold mb-1.5 ">
        {children}
      </Form.Label>
    );
  } else {
    return (
      <div className="text-medium-gray text-[12px] font-bold  mb-1.5">
        {children}
      </div>
    );
  }
}

export default FormLabel;
