import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, type OrderFormData } from "@/schemas/order";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { FormModal } from "../common/form/FormModal";
import { CustomFormField } from "../common/form/FormField";
import { FormActions } from "../common/form/FormActions";

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OrderFormData) => void;
  existingOrders: { id: string; code: string }[];
}

export const AddOrderModal: React.FC<AddOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  existingOrders
}) => {
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      code: "",
      name: ""
    }
  });

  const onSubmitHandler = (data: OrderFormData) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmitHandler}
      title="Add New Order"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-4"
        >
          <CustomFormField
            control={form.control}
            name="code"
            label="Code"
            placeholder="E123"
          />

          <CustomFormField
            control={form.control}
            name="name"
            label="Name"
            placeholder="Frontend Development"
          />

          <CustomFormField
            control={form.control}
            name="status"
            label="Status"
            render={(field) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <FormActions
            onCancel={() => {
              form.reset();
              onClose();
            }}
          />
        </form>
      </Form>
    </FormModal>
  );
};
