import React from 'react'
import Modal from '../../UI/Modal';
import classes from './TrailerModal.module.css';

const TrailerModal = (props) => {
    if(props.videoKey.error){
        return (
            <Modal >
                <div className={`${classes['modal-content-error']} d-flex align-items-center justify-content-center`}>
                    <h4 className='text-white'>Something went wrong , try again</h4>
                </div>
            </Modal>
        )
    }

    return (
        <Modal onClose={props.onClose}>
            <iframe className={classes['trailer-video']} src={`https://www.youtube.com/embed/${props.videoKey.data}`}>

            </iframe>
        </Modal>
    )
}

export default TrailerModal;
