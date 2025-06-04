import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";

interface FormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  render?: (field: any) => React.ReactNode;
}

export const CustomFormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  render
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {render ? (
            render(field)
          ) : (
            <Input type={type} placeholder={placeholder} {...field} />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
