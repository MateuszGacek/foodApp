import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  className?: string;
};

const Modal = ({ children, open, className = "" }: ModalProps) => {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) {
      dialog.current!.showModal();
    }
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`${className} modal`}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
