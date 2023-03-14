import React, { useRef } from 'react'
import classes from './Finished.module.css'


function AudioItem({ audio }) {
    const audioRef = useRef(null);

    const audioPlay = (audio) => {
        audioRef.current.play(audio);
    }


    return (
        <div>
            <button className={`${classes.audio} _icon-audio`} onClick={audioPlay}>
            </button>
            <audio src={audio} ref={audioRef} />
        </div>
    )
}

export default AudioItem