import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow, LargeImg } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ toggleModal, largeImgUrl }) {
  useEffect(() => {
    const closeModalEsc = ({ code }) => {
      if (code === 'Escape') {
        toggleModal();
      }
    };
    document.addEventListener('keydown', closeModalEsc);
    return () => document.removeEventListener('keydown', closeModalEsc);
  }, [toggleModal]);

  const closeModalBackdropClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={closeModalBackdropClick}>
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
