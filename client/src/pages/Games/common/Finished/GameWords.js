import React from 'react'
import AudioItem from './AudioItem';
import classes from './Finished.module.css'
function GameWords({ answers }) {
    const IKwords = answers.filter(item => item.answer).map(item => item.word);
    const IDKwords = answers.filter(item => !item.answer).map(item => item.word);
    
    return (
        <div className={`${classes['words-box']} d-flex flex-column flex-sm-row`}>

            <div className={`${classes.iknow} ${classes.knowledge}`}>
                <h3 className={classes.title}>I know<span className={classes.badge}>{answers.length} words</span></h3>
                <div className={classes['words-list']}>
                    {IKwords.map(item => {
                        return <div className="d-flex gap-2" key={item.word}>
                            <AudioItem audio={item.audio}/>
                            
                            <div>
                                <span className={`${classes['main-word']} text text2`}>{item.word} </span>
                                <span className={`${classes['translation']} text text2`}>- {item.translation}</span>
                            </div>
                        </div>
                    })}
                </div>
            </div>

            <div className={`${classes.idknow} ${classes.knowledge}`}>
                <h3 className={classes.title}>I don't know<span className={classes.badge}>{answers.length} words</span></h3>
                <div className={classes['words-list']}>
                    {IDKwords.map(item => {
                        return <div className="d-flex gap-2" key={item.word}>
                            <AudioItem audio={item.audio}/>
                            <div>
                                <span className={`${classes['main-word']} text text2`}>{item.word} </span>
                                <span className={`${classes['translation']} text text2`}>- {item.translation}</span>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default GameWords