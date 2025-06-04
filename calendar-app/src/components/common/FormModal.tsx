import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface FormModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  title: string;
  children: React.ReactNode;
}

export const FormModal = <T,>({
  isOpen,
  onClose,
  onSubmit,
  title,
  children
}: FormModalProps<T>) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
