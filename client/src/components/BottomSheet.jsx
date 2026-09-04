// reusable component for popup, used for edits, addings, controls, etc

import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import { useIsMobile } from "../hooks/useIsMobile";

export default function BottomSheet({ isOpen, onClose, title, children }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Offcanvas show={isOpen} onHide={onClose} placement="bottom">
        <Offcanvas.Header closeButton>
          {title && <Offcanvas.Title>{title}</Offcanvas.Title>}
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    );
  }

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        {title && <Modal.Title>{title}</Modal.Title>}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}