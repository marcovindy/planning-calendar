// components/Modals/EditTermModal.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { termSchema, type TermFormData } from "@/schemas/term";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { FormModal } from "../common/FormModal";
import { CustomFormField } from "../common/FormField";
import { FormActions } from "../common/FormActions";
import type { Term } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { useEffect } from "react";

interface EditTermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (termId: string, data: Partial<Term>) => void;
  term: Term | null;
}

export const EditTermModal: React.FC<EditTermModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  term
}) => {
  const form = useForm<TermFormData>({
    resolver: zodResolver(termSchema),
    defaultValues: {
      code: term?.code || "",
      startDate: term?.startDate || "",
      endDate: term?.endDate || "",
      status: term?.status || "new"
    }
  });

  useEffect(() => {
    if (term) {
      form.reset({
        code: term.code,
        startDate: term.startDate,
        endDate: term.endDate,
        status: term.status
      });
    }
  }, [term, form]);

  const onSubmitHandler = (data: TermFormData) => {
    if (term) {
      onSubmit(term.id, data);
      form.reset();
      onClose();
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={() => {
        form.reset();
        onClose();
      }}
      onSubmit={onSubmitHandler}
      title="Edit Term"
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
            placeholder="T1"
          />

          <CustomFormField
            control={form.control}
            name="startDate"
            label="Start Date"
            type="date"
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
            submitLabel="Save"
          />
        </form>
      </Form>
    </FormModal>
  );
};
