import React, { useState, useEffect } from "react";
import classes from "./MovieImgs.module.css";
import { getMovieImgsRequest, imgPrefix } from "../../../api/moviesAPI";
import Modal from "../../UI/Modal";
import CarouselComponent from "../../UI/CarouselComponent";
import Carousel, { consts } from "react-elastic-carousel";
import { BsArrowLeftCircle , BsArrowRightCircle } from 'react-icons/bs';

const MovieImgs = ({ contentDetails, type }) => {
  const [images, setImages] = useState(null);
  const [imagesError, setImagesError] = useState(null);
  const [imagesModalIsActive, setImagesModalIsActive] = useState(false);
  const [caroselIntialItemIndex, setCaroselIntialItemIndex] = useState(0);

  useEffect(() => { 
    const getMovieImgs = async () => {
      const images = await getMovieImgsRequest(type, contentDetails.id);
      if (images.data) {
        // success
        setImages(images.data.data);
      } else {
        //failed
        setImagesError(images.error.message);
      }
    };

    getMovieImgs();
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 992, itemsToShow: 1 },
  ];

  const outerCaroselBreakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 992, itemsToShow:5 },
  ];

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? <BsArrowLeftCircle /> : <BsArrowRightCircle />;
    const arrowsClasses =
      type === consts.PREV ? classes["arrow-left"] : classes["arrow-right"];
    return (
      <button className={arrowsClasses}  onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    );
  };

  const showImageModalHandler = (event) => {
    const itemClickedIndex = event.target.dataset.number;//we get the exact item the user clicks
      setImagesModalIsActive(true);
      setCaroselIntialItemIndex(+itemClickedIndex);
  };

  const closeModalHandler = (event) => {
    event.stopPropagation();
    setImagesModalIsActive(false);
  };

  const imagesList =
    images &&
    images.backdrops.map((image, index) => (
        <img key={index} data-number={index} className="w-100" src={imgPrefix + image.file_path} onClick={showImageModalHandler} />
    ));

    
    
  return (
    <section className="my-3 col-12">
      {imagesModalIsActive && (
        <Modal onClose={closeModalHandler} >
          <div>
          <Carousel
            className='pt-5'
            itemPadding={[0, 0]}
            pagination={false}
            renderArrow={myArrow}
            initialActiveIndex={caroselIntialItemIndex}
          >
            {imagesList}
          </Carousel>
          </div>

        </Modal>
      )}
      <header>
        <h3 className={`${classes.header} `}>Pictures</h3>
      </header>
      <CarouselComponent breakPoints={outerCaroselBreakPoints}>{imagesList}</CarouselComponent>
    </section>
  );
};

export default MovieImgs;
