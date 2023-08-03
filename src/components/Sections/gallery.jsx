import { useState } from "react";
import { Image } from "./image";
import React from "react";
import styled from "styled-components";
import data from '../../assets/data/data.json';

export const Gallery = (props) => {
  const { Gallery: galleryData } = data;
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [currentLargeImage, setCurrentLargeImage] = useState(null);

  // Function to handle opening the large image
  const handleOpenLargeImage = (largeImage) => {
    setCurrentLargeImage(largeImage);
    setShowLargeImage(true);
  };

  // Function to handle closing the large image and going back to the previous page
  const handleCloseLargeImage = () => {
    setShowLargeImage(false);
    setCurrentLargeImage(null);
    // Go back to the previous page using the history object
    // Note: Make sure this component is rendered as a child of a <Router> component to access the history object.
    props.history.goBack();
  };

  return (
    <Wrapper id="portfolio">
      <div className="text-center">
        <div className="container">
          <div className="section-title">
            <h1 className="font40 extraBold">Gallery</h1>
            <p>
              Take a look at some of the projects completed by our skilled contractors.
              From home renovations to landscaping, we pride ourselves on delivering high-quality workmanship and exceptional results.
            </p>
          </div>
          <GalleryContainer>
            {galleryData.map((d, i) => (
              <GalleryItem key={`${d.title}-${i}`} onClick={() => handleOpenLargeImage(d.largeImage)}>
                <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
              </GalleryItem>
            ))}
          </GalleryContainer>
          {/* {showLargeImage && (
            <LargeImageOverlay>
              <LargeImage>
                <CloseIcon onClick={handleCloseLargeImage}>X</CloseIcon>
                <img src={currentLargeImage} alt="Large Image" />
              </LargeImage>
            </LargeImageOverlay>
          )} */}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
`;

// Define the styled-components here
const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GalleryItem = styled.div`
  flex: 0 0 calc(33.33% - 20px);
  margin-bottom: 20px;
`;

// Styled component for the large image overlay
const LargeImageOverlay = styled.div`
  /* Add your styles for the overlay here */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled component for the large image container
const LargeImage = styled.div`
  /* Add your styles for the large image here */
  position: relative;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
`;

// Styled component for the close icon
const CloseIcon = styled.div`
  /* Add your styles for the close icon here */
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #fff;
  font-size: 24px;
`;
