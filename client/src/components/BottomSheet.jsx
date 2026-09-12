// Usage: if there's no attribute of "size = large" on an element, the Offcanvas popup will default to the compact size

import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import { useIsMobile } from "../hooks/useIsMobile";
import "../styles/BottomSheet.css";

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = "compact" // "compact" | "large"
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Offcanvas
        show={isOpen}
        onHide={onClose}
        placement="bottom"
        className={size === "large" ? "bottom-sheet-large" : "bottom-sheet-compact"}
      >
        <Offcanvas.Header closeButton={showCloseButton}>
          {title && <Offcanvas.Title>{title}</Offcanvas.Title>}
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    );
  }

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      size={size === "large" ? "lg" : undefined}
    >
      <Modal.Header closeButton={showCloseButton}>
        {title && <Modal.Title>{title}</Modal.Title>}
      </Modal.Header>
      <Modal.Body className={size === "large" ? "bottom-sheet-modal-large-body" : ""}>
        {children}
      </Modal.Body>
    </Modal>
  );
}