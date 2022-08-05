import React from "react";
import ReactModal from "react-modal";
import { Column, Float, Row } from "../layout";
import { H3, H4 } from "../typography";
import { ModalProps } from "./types";
import { IoMdClose } from "react-icons/io";
ReactModal.setAppElement("body");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minWidth: 200,
    maxWidth: "90vw",
    width: "100%",
    transform: "translate(-50%, -50%)",
    //backgroundColor: "rgba(0,0,0,0.5)",
    backgroundColor: "#121213",
    color: "white",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

const Modal = ({ onClose, isOpen, children, title }: ModalProps) => {
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    onClose();
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Float top={"5px"} right={"5px"}>
        <IoMdClose size={24} onClick={closeModal} />
      </Float>

      {children}
    </ReactModal>
  );
};

export default Modal;
