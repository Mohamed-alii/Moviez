import React from 'react';
import classes from './Movie.module.css';
import {imgPrefix} from '../../../api/moviesAPI';


const Movie = ( { title, img, rate, id } ) => {
    return (
        <div className={classes.container}>
            <figure className={classes['movie-img-container']}>
                <img src={imgPrefix + img} alt={title + 'movie'} />
            </figure>
            <div className={classes.overlay}>
                    
                 <h4 className={`${classes.title} text-white pb-3`} >{title}</h4>
            </div>
        </div>
    )
}

export default Movie;
