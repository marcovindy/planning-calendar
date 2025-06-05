import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { termSchema, type TermFormData } from "@/schemas/term";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { format } from "date-fns";
import { FormModal } from "../common/form/FormModal";
import { CustomFormField } from "../common/form/FormField";
import { FormActions } from "../common/form/FormActions";

interface AddTermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TermFormData) => void;
  initialDate?: string;
}

export const AddTermModal: React.FC<AddTermModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialDate
}) => {
  const form = useForm<TermFormData>({
    resolver: zodResolver(termSchema),
    defaultValues: {
      code: "",
      endDate: initialDate || "",
      status: "new"
    }
  });

  const onSubmitHandler = (data: TermFormData) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmitHandler}
      title="Add New Term"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-4"
        >
          <div className="text-sm text-muted-foreground">
            Start Date:{" "}
            {initialDate ? format(new Date(initialDate), "dd.MM.yyyy") : ""}
          </div>

          <CustomFormField
            control={form.control}
            name="code"
            label="Code"
            placeholder="T1"
          />

          <CustomFormField
            control={form.control}
            name="endDate"
            label="End Date"
            type="date"
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
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
