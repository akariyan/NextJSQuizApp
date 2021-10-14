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
    display: "grid",
    gridTemplateRows: "1fr 3fr",
    background: "$black",
    color: "$white",
    width: "20vw",
    height: "20vh",
    borderRadius: "15px",
    padding: "15px",
    ".modal-title": {
      fontSize: "1.7em",
      fontWeight: "bold",
    },
    ".modal-body": {
      display: "grid",
      gridTemplateRows: "4fr 1fr",
      ".modal-close-message": {
        color: "#abaaaa", // custom gray
      },
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
    <ModalOverlay onClick={onClose}>
      <div className="modal">
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-body">
          <div className="modal-message">{message}</div>
          <div className="modal-close-message">
            Click anywhere to close the window
          </div>
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
