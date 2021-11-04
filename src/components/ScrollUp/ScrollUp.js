import React, { useState } from 'react';
import classes from './ScrollUp.module.css';
import { AiOutlineArrowUp } from 'react-icons/ai';

const ScrollUp = () => {

    const [btnvisible, setBtnvisible] = useState(false);

    const toggleVisible = () => {
        const scrolledFromTop = document.documentElement.scrollTop;

        if(scrolledFromTop > 400){
            setBtnvisible(true)
        }else{
            setBtnvisible(false)
        }
    }

    const scrollUpHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    window.addEventListener('scroll' , toggleVisible)

    return (
        <button onClick={scrollUpHandler} className={`${classes.scroll_button} ${btnvisible ? classes.scroll_button_visible : classes.scroll_button_hidden}`}>
            <AiOutlineArrowUp />
        </button>
    )
}

export default ScrollUp;
