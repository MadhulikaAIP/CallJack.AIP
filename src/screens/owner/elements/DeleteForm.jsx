import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999; /* Ensure the modal is above other elements */
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const DeleteConfirmationModal = ({ job, onClose, onDelete }) => {

  return (
    <ModalWrapper>
      <ModalContent>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this job?</p>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default DeleteConfirmationModal;
