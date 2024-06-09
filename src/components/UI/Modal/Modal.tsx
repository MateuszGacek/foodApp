import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  className?: string;
  onClose?: () => void;
};

const Modal = ({ children, open, className = "", onClose }: ModalProps) => {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const modal = dialog.current!;
    if (open) {
      modal.showModal();
    }
    return () => modal.close();
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`${className} modal`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
