import React from 'react';
import classes from './NotFoundPage.module.css';
import { useHistory } from 'react-router';

const NotFoundPage = () => {

    const history = useHistory();

    const redirectToHomeHandler = () => {
        history.push('/Home')
    }

    return (
        <section className={classes.container}>
            <div>
                <h2 className='text-white text-center display-1'>404</h2>
                <div className='horizontal-line w-100'></div>
                <h2 className='text-white'>page not found</h2>
                <button className={classes.btn} onClick={redirectToHomeHandler} >Go to home page</button>
            </div>
        </section>
    )
}

export default NotFoundPage
