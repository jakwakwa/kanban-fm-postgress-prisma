"use client";
import * as Form from "@radix-ui/react-form";
interface FormLabelProps {
  isLabel?: boolean;
  spacing?: boolean;
  children: React.ReactNode;
}
function FormLabel({
  isLabel = true,
  spacing,
  children,
}: Readonly<FormLabelProps>) {
  if (isLabel) {
    return (
      <Form.Label className="text-medium-gray mt-4 text-[12px] font-bold mb-1.5 ">
        {children}
      </Form.Label>
    );
  } else {
    return (
      <div
        className={`text-medium-gray text-[12px] font-bold ${
          spacing ? "absolute mb-0 mt-[-12px]" : "mb-2"
        }`}
      >
        {children}
      </div>
    );
  }
}

export default FormLabel;
