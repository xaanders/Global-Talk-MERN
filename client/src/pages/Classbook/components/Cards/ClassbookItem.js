import React, { useRef } from 'react'
import { Card, Image } from 'react-bootstrap'

import classes from './ClassbookCards.module.css'

function ClassbookItem({item, wordHandler, textbook}) {
    const currentBadge = classes[`badge-${item.level.levelType}`]
    const audioRef = useRef(null);

    const audioPlay = () => {
        audioRef.current.play();
    }

    return (
        <Card className="d-flex flex-column flex-lg-row">
            <div className={classes['image-box']}>
                <Image src={`${item.image}`} />
            </div>

            <Card.Body>
                <div className="mb-3 d-flex gap-2 align-items-center">
                    <h4 className={`mb-1 ${classes.title}`}>{item.word} /</h4>
                    <h4 className={classes.subtitle}>{item.translation}</h4>
                    <div className="ms-auto">
                        <button className={`${classes.audio} _icon-audio`} onClick={audioPlay}>
                        </button>
                        <audio src={item.audio} ref={audioRef}/>
                    </div>
                </div>
                <div className="d-flex gap-2 align-items-center mb-3">
                    <p className={`${classes.transcript} text text2 m-0`}>{item.transcription}</p>
                    <span className={`${classes.badge} ${currentBadge} text3`}>'Easy'</span>
                </div>

                <div className={`${classes['text-box']} mb-3`}>
                    <div className={classes.scroll}>
                        <p className={`${classes.text} text text3 m-0 pb-3`}>
                            {item.meaning}
                        </p>
                        <p className={`${classes.subtext} text text3 m-0 pt-3`}>
                            {item.example}
                        </p>
                        <p className={`${classes.subtext} text text3 m-0 pt-1`}>
                            {item['example-translation']}
                        </p>
                    </div>
                </div>
                <div className={classes.activities}>
                    {textbook ? <button name="add to dictionary" className={`button button-card button-green`} onClick={() => wordHandler(item)}>Add to dictionary</button> 
                    : <button name="add to dictionary" className={`button button-card button-orange`} onClick={() => wordHandler(item)}>Remove from dictionary</button>}
                </div>
            </Card.Body>
        </Card>
    )
}

export default ClassbookItem