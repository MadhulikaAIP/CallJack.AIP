import React, { useState } from 'react';
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

const UpdateFormModal = ({ job, onClose, onUpdate }) => {
  const [updatedJob, setUpdatedJob] = useState({ ...job });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(updatedJob);
    onClose();
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <h2>Update Job</h2>
        <form>
          <div>
            <label>Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              value={updatedJob.jobTitle}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Job Description:</label>
            <textarea
              name="jobDescription"
              value={updatedJob.jobDescription}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label>Capacity:</label>
            <input
              type="number"
              name="capacity"
              value={updatedJob.capacity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Time Period:</label>
            <input
              type="text"
              name="timePeriod"
              value={updatedJob.timePeriod}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Cost:</label>
            <input
              type="number"
              name="cost"
              value={updatedJob.cost}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={updatedJob.location}
              onChange={handleChange}
            />
          </div>
          <button type="button" onClick={handleUpdate}>
            Update Job
          </button>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
};

export default UpdateFormModal;
