import React from 'react'
import { Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import classes from './NoCards.module.css'
function NoCards({ message, btn = true }) {
    return (
        <section>
            <Container>
                <div className={`${classes.nowords} d-flex align-items-center justify-content-center`}>
                    <div className={`${classes.message} d-flex flex-column flex-md-row justify-content-between align-items-center gap-4`}>
                        <Image fluid className={`${classes.image} mx-auto`} src="/assets/images/classbook/no-words.jpg" />
                        <div className={`${classes.info}`}>
                            <div className="mb-3 mb-sm-5 d-flex d-md-block flex-column align-items-center justify-content-center">
                                <h3 className={`${classes['nowords-title']} mb-3 `}>No words in this section yet</h3>
                                <p className={`text text2 ${classes.text}`}>{message}</p>
                            </div>
                            {btn &&
                                <div className={classes.activities}>
                                    <Link to="/textbook" className="button button-blue button-content button">To Textbook</Link>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default NoCards