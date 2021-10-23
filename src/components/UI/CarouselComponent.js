import React from "react";
import Carousel, { consts } from "react-elastic-carousel";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import classes from './CarouselComponent.module.css';

const CarouselComponent = (props) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 992, itemsToShow: 4 },
  ];

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? <BsArrowLeftCircle /> : <BsArrowRightCircle />;
    const arrowsClasses =
      type === consts.PREV ? classes["arrow-left"] : classes["arrow-right"];
    return (
      <button className={arrowsClasses} onClick={onClick} disabled={isEdge}>
        {pointer}
      </button>
    );
  };

  return (
    <Carousel
      className = {`${props.className ? props.className : ''} position-relative mt-5`}
      itemPadding = {[10, 10]}
      breakPoints = {breakPoints}
      pagination = {false}
      renderArrow = {myArrow}
    >
      {props.children}
    </Carousel>
  );
};

export default CarouselComponent;
