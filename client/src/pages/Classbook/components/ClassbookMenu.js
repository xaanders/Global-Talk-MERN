import React from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import classes from './ClassbookMenu.module.css'

function ClassbookMenu() {
    const linkClasses = `${classes.links} d-flex gap-1`;
    const linkClassesActive = `${classes.links} ${classes.active} d-flex gap-1 `
    return (
        <section className={classes.actions}>
            <Container>
                <div className={`${classes['actions-box']} d-flex align-items-center justify-content-between flex-column-reverse gap-4 flex-lg-row p-4`}>
                    <div className="d-flex flex-column flex-sm-row gap-3">
                        <NavLink to="/textbook" className={({ isActive }) =>
                            isActive ? linkClassesActive : linkClasses}>
                            <h4 className={classes['textbook-title']}> <span className="icons _icon-hat"></span>Textbook</h4>
                        </NavLink>

                        <NavLink to="/dictionary" className={({ isActive }) =>
                            isActive ? linkClassesActive : linkClasses}>
                            <h4 className={classes['textbook-title']}> <span className="_icon-book icons"></span>Dictionary</h4>
                        </NavLink>
                    </div>
                    <div className="d-flex gap-3 flex-column flex-sm-row">
                        <Button className={`${classes['btn-image']} button button-rose`} variant="link">
                            <Link to="/sprint">
                                <Image className={classes.image} src="/assets/images/home/icons/sprint.png" alt="sprint" fluid />
                                Sprint →
                            </Link>
                        </Button>
                        <Button className={`${classes['btn-image']} button button-light-blue`} variant="link">
                            <Link to="/audiocall">
                                <Image className={classes.image} src="/assets/images/home/icons/audio.png" alt="sprint"  fluid/>
                                Audio-call →
                            </Link>
                        </Button>
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default ClassbookMenu