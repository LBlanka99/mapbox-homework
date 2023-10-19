import "./ErrorModal.css";
import Modal from "react-modal";

const ErrorModal = ({ isOpen, closeModal }) => {
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
                    <h2>Route Not Found</h2>
                    <p>We couldn't find a route for your request.</p>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </Modal>
    );
};

export default ErrorModal;
