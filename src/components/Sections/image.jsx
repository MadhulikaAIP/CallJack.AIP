import React, { useState } from "react";
import styled from "styled-components";

export const Image = ({ title, largeImage, smallImage }) => {
  const [showLargeImage, setShowLargeImage] = useState(false);

  const openLargeImage = () => {
    setShowLargeImage(true);
  };

  const closeLargeImage = () => {
    setShowLargeImage(false);
  };

  return (
    <>
      <ThumbnailImageWrapper>
        <div className="hover-bg">
          <a href={largeImage} title={title} data-lightbox-gallery="gallery1">
            <div className="hover-text">
              <h4>{title}</h4>
            </div>
            <img src={smallImage} className="img-responsive" alt={title} />
          </a>
        </div>
      </ThumbnailImageWrapper>
      {/* {showLargeImage && (
        <LargeImagePopup>
          <div className="close-icon" onClick={closeLargeImage}>
            Close
          </div>
          <img src={largeImage} alt={title} />
        </LargeImagePopup>
      )} */}
    </>
  );
};

const ThumbnailImageWrapper = styled.div`
  cursor: pointer;
  /* Add your thumbnail image styles here */
  .hover-bg {
    /* Add styles for hover effect */
    transition: transform 0.3s ease;
  }

  &:hover .hover-bg {
    transform: scale(1.1); /* Example: increase size on hover */
  }

  /* Additional styles for the thumbnail image */
  img {
    max-width: 100%;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

const LargeImagePopup = styled.div`
  /* Add your styles for the large image popup here */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .close-icon {
    /* Add styles for the close icon */
    position: absolute;
    top: 20px;
    right: 20px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }

  img {
    /* Add styles for the large image */
    max-width: 90%;
    max-height: 90%;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;
