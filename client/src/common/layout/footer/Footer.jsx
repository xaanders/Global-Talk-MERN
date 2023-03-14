import React from 'react'
import { Container, Image, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import classes from './Footer.module.css'
function Footer() {
  const classItems = 'text text2';
  const activeClass = 'text text2 active_link';

  return (
    <footer className={classes.footer}>
      <Container>
        <div className={`d-flex ${classes['top-content']} pb-3  justify-content-center `}>
          <Nav className="align-items-center align-items-sm-start gap-3">
            <NavLink className={({ isActive }) =>
              isActive ? activeClass : classItems} to="/home">Home</NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? activeClass : classItems} to="/statistics">Statistics</NavLink>

            <NavLink className={({ isActive }) =>
              isActive ? activeClass : classItems} to="/sprint">Sprint</NavLink>
            <NavLink className={({ isActive }) =>
              isActive ? activeClass : classItems} to="/audiocall">AudioCall</NavLink>
          </Nav>


        </div>
        <div className={`d-flex flex-column align-items-center flex-sm-row pt-3 ${classes['bottom-content']}`}>
          <div className={`${classes.links} d-flex gap-3`}>
            <Link className={`${classItems} icon _icon-linkedin`} target="_blank"  rel="noopener noreferrer" to="https://www.linkedin.com/in/oleksandr-riazantsev-6662b9240"></Link>
            <Link className={`${classItems} icon _icon-github`} target="_blank"  rel="noopener noreferrer" to="https://github.com/xaanders"></Link>
          </div>
          <div className="d-flex ms-0 ms-sm-auto">
           <p className="text text2 align-self-center m-0">©2023 GlobalTalk. Project for GlobalTalk.</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer