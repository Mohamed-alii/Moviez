import React from 'react';
import classes from './CarouselContainer.module.css';
import CarouselComponent from './CarouselComponent';
import { Link } from 'react-router-dom';

const CarouselContainer = (props) => {
    return (
        <section>
            <Link to={props.to} className={classes['carousel-header']}>{props.header}</Link>
            <CarouselComponent>
              {props.children}
            </CarouselComponent>
        </section>
    )
}

export default CarouselContainer;
