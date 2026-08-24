import Modal from "./Modal";
import Btn from "../ui/Btn";


const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "primary",
  isLoading = false,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    title={title}
    size="sm"
    closeOnOverlayClick={!isLoading}
    closeOnEscape={!isLoading}
    footer={
      <>
        <Btn variant="secondary" onClick={onClose} disabled={isLoading}>
          {cancelLabel}
        </Btn>
        <Btn
          variant={confirmVariant}
          onClick={onConfirm}
          loading={isLoading}
          disabled={isLoading}
        >
          {confirmLabel}
        </Btn>
      </>
    }
  >
    <p className="text-sm text-text-muted">{description}</p>
  </Modal>
);

export default ConfirmationDialog;
