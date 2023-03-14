import React from 'react'
import { Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

import classes from './Intro.module.css'


const inspiration = ["The more words you know, the more ideas you can express.",
    "Learning new words can be challenging, but the reward of being able to communicate more effectively is worth it.",
    "Every new word you learn is a step forward in your journey to becoming fluent in Ukrainian.",
    "Learning a new language is like unlocking a new world, and every new word you learn is like discovering a new treasure.",
    "Don't be discouraged by the difficulty of learning new words. With perseverance and dedication, you can achieve your language learning goals.",
    "Learning a new language is not just about memorizing words, it's about gaining a deeper understanding of another culture and way of life.",
    "Each new word you learn is a building block that can help you to construct more complex sentences and express yourself more fully in Ukrainian.",
    "The process of learning new words can be challenging, but the satisfaction of mastering them and being able to use them in conversation is priceless.",
    "Remember that every mistake you make is an opportunity to learn and grow in your language skills.",
    "Learning a new language is an investment in yourself, and the more words you learn, the greater the return on that investment."
]
function Intro() {
    const user = useSelector(state => state.user && state.user.isAuthenticated);

    return (
        <section>
            <Container>
                <div className="d-flex gap-5 flex-column align-items-center justify-content-between flex-lg-row mt-5">
                    <div className={classes.info} >
                        <div className={classes['e-course']}>E-COURSE PLATFORM</div>
                        <h1 className={classes['main-title']}>Learning ukrainian language online,
                            made easy.</h1>
                        <p className={`${classes['main-text']} text text-2`}>{user ? inspiration[Math.round(Math.random() * inspiration.length)] : "Learning Ukrainian doesn't have to be a chore. With our website, you'll have fun while you learn. Join our community of learners today and start mastering Ukrainian in a playful way!"}</p>

                        <div className={`${classes.actions} d-flex gap-2`}>
                            {user ?
                                <Link className="button button-light-blue" style={{padding: '15px'}} to={Math.round(Math.random() * 2) === 1 ? '/sprint' : '/audiocall'} variant="link">Start learning!</Link>
                                : <>
                                    <Link className="button button-login d-flex align-items-center" to="/signup" variant="link">Sign In →</Link>
                                    <Link className="button button-light-blue button-main" to="/login" variant="link">Login →</Link>
                                </>}
                        </div>
                        <div className={classes.statistics}>
                            <div>
                                <div className={classes['statistics-item']}>700<span>+</span></div>
                                <p className={classes['statistics-name']}>Hours of Content</p>
                            </div>
                            <div>
                                <div className={classes['statistics-item']}>575k<span>+</span></div>
                                <p className={classes['statistics-name']}>Active Users</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image fluid src="assets/images/home/home1.png" alt="home page" />
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default Intro