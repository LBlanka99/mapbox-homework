import "./ErrorModal.css";
import Modal from "react-modal";

const ErrorModal = ({ isOpen, closeModal, message }) => {
    Modal.setAppElement('#root');

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Error Modal"
            className={"modal-content"}
        >
            <div className="modal-overlay">
                <div className="error-modal">
                    <h2>An error occurred</h2>
                    <p>{message}</p>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </Modal>
    );
};

export default ErrorModal;
