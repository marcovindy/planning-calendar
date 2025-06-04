import { Button } from "../ui/button";

interface FormActionsProps {
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  submitLabel = "Add",
  cancelLabel = "Cancel"
}) => (
  <div className="flex justify-end space-x-2 pt-4">
    <Button type="button" variant="outline" onClick={onCancel}>
      {cancelLabel}
    </Button>
    <Button type="submit">{submitLabel}</Button>
  </div>
);
