import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow, LargeImg } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ toggleModal, largeImgUrl }) {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  }, [toggleModal]);

  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalWindow>
        <LargeImg src={largeImgUrl} alt="" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImgUrl: PropTypes.string.isRequired,
};
