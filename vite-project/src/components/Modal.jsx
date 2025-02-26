import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../style/Modal.css";

/**
 * Composant Modal
 *
 * @param {boolean} opened - Indique si le modal est ouvert ou non.
 * @param {Function} onClose - Fonction à appeler lors de la fermeture du modal.
 * @param {string} content - Contenu du modal.
 * @param {string} btnText - Texte du bouton de fermeture.
 * @param {string} title - Titre du modal.
 * @returns {JSX.Element} - Le composant Modal.
 */
const Modal = ({ title, opened, onClose, content, btnText }) => {
  const modal = useRef(null);

  useEffect(() => {
    if (opened) {
      modal.current?.showModal();
    }
  }, [opened]);

  return (
    <dialog
  ref={modal}
  id="confirmation"
  className="modal-container"
>
  <section className="modal-content">
    <h1 className="modal-title">{title}</h1>
    {/* Contenu sous forme de liste */}
    <ul className="modal-list">
      {content.split("\n").map((item, index) => (
        <li key={index} className="modal-list-item">
          {item}
        </li>
      ))}
    </ul>
  </section>
  <form
    method="dialog"
    onSubmit={onClose}
    className="modal-footer"
  >
    <button className="modal-button">
      {btnText}
    </button>
  </form>
</dialog>

  );
};

// Validation des props avec PropTypes
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};

export default Modal;
