import React from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import classes from './Learn.module.css'
function Learn() {
    return (
        <section className={classes.learn}>
            <Container>
                <div className="d-flex justify-content-between align-items-center gap-3 gap-md-5 flex-column-reverse flex-lg-row">
                    <div>
                        <Image fluid src="assets/images/home/home2.jpg" alt="learn with us" />
                    </div>
                    <div className={`${classes.content}`}>
                        <h2 className={`mb-4 ${classes.title}`}>Learn a language in a playful way</h2>
                        <p className={`text text1 ${classes['title-text']}`}>Make learning words more fun with mini-games</p>
                        <div className={`${classes.actions} mt-5 d-flex gap-5 gap-md-4`}>
                            <Button className={`button button-rose ${classes['play-links-sprint']}`} variant="link">
                                <Link to="/sprint">
                                    <Image className={classes.image} src="assets/images/home/icons/sprint.png" alt="sprint" />
                                    <div>Sprint →</div>
                                </Link>
                            </Button>
                            <Button className={`button button-light-blue ${classes['play-links-audio']}`} variant="link">
                                <Link to="/audiocall">
                                    <Image className={classes.image} fluid src="assets/images/home/icons/audio.png" alt="sprint" />
                                    <div>Audio-call →</div>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Learn