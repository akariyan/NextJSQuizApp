import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { styled } from "../../stitches.config";

const ModalOverlay = styled("div", {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  ".modal": {
    background: "white",
    width: "500px",
    height: "600px",
    borderRadius: "15px",
    padding: "15px",
    ".modal-header": {
      display: "flex",
      justifyContent: "flex-end",
      fontSize: "25px",
      ".modal-close": {
        cursor: "pointer",
      },
    },
    ".modal-body": {
      paddingTop: "10px",
    },
  },
});

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

function Modal({ show, onClose, title, message }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState<boolean>(false); //  SSR이 아닌 브라우저 환경에서 실행되도록 감지

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <ModalOverlay>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            x
          </span>
        </div>
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-body">
          <div className="modal-message">{message}</div>
        </div>
      </div>
    </ModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

export default Modal;
