
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, GalleryModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, children}) => {

  useEffect(() => {
   
    const handleKeyDown = (evt) => {
    if (evt.code === 'Escape') {
      onClose();
    }
    }
    window.addEventListener('keydown', handleKeyDown);
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose])
  
  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

    return createPortal(
      <Backdrop onClick={handleBackdropClick}>
        <GalleryModal>{children}</GalleryModal>
      </Backdrop>,
      modalRoot,
    );
}