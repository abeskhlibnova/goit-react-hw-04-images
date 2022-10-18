import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow, LargeImg } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.closeModal);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModal);
    }

    closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === 'Escape') {
            this.props.toggleModal();
        }
    };

    render() {
        const { closeModal } = this;
        const { largeImgUrl } = this.props;
        return createPortal(
            <Overlay onClick={closeModal}>
                <ModalWindow>
                    <LargeImg src={largeImgUrl} alt="" />
                </ModalWindow>
            </Overlay>,
            modalRoot
        );
    }
}

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImgUrl: PropTypes.string.isRequired,
};
