import React from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import classes from './Learn.module.css'


function WatchLearn({item}) {
    return (
        <section className={classes[item.name]}>
        <Container>
            <div className={`d-flex justify-content-between align-items-center  gap-5 flex-column ${item.reverse ? 'flex-lg-row-reverse' : 'flex-lg-row'}`}>
                <div className={`${classes.content}`}>
                    <h2 className={`mb-4 ${classes.title}`}>{item.title}</h2>
                    <p className={`text text1 ${classes['title-text']}`}>{item.text}</p>
                    <div className={`${classes.actions} mt-5 d-flex gap-4`}>
                        <Button className='button button-light-blue button-content' variant="link"><Link to={`/${item.button.toLowerCase()}`}>{item.button} →</Link></Button>
                    </div>
                </div>
                <div className="bg">
                    <Image fluid src={`assets/images/home/${item.img}`} className="d-block" alt="increase vocabluary" />
                </div>
            </div>
        </Container>
    </section>
    )
}

export default WatchLearn