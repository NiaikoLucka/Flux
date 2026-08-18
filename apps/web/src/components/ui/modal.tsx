import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}>
      {/* Overlay */}
      <div
        className="absolute inset-0  backdrop-blur-[1px] opacity-85 bg-accent/50"
        // onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-background shadow-xl border border-border">
        {/* Header */}  
        <div className="flex items-center justify-between border-b  border-border px-6 py-4 ">
          {title && (
            <h2
              id="modal-title"
              className="text-lg font-semibold text-card-foreground ">
              {title}
            </h2>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-foreground transition hover:bg-accent hover:text-accent-foreground cursor-pointer"
            aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
