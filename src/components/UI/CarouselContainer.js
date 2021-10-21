import React from 'react';
import classes from './CarouselContainer.module.css';
import CarouselComponent from './CarouselComponent';

const CarouselContainer = (props) => {
    return (
        <section>
            <h2 className={classes['carousel-header']}>{props.header}</h2>
            <CarouselComponent>
              {props.children}
            </CarouselComponent>
        </section>
    )
}

export default CarouselContainer;
