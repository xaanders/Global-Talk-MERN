import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Container, Dropdown, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'

import User from './User';
import NewUser from './NewUser';

import { logoutUser } from '../../../store/actions/userActions';


function Header() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const linkClass = 'text text2 py-2 py-md-0';
  const linkClass1 = linkClass + ' me-md-3';
  const activeClass = ' active_link';
  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLogedIn] = useState(false);
  useEffect(() => {
    userState.isAuthenticated ? setIsLogedIn(true) : setIsLogedIn(false)
  }, [userState.isAuthenticated]);

  const handleOffcanvasClose = () => {
    setShowOffcanvas(false);
  };

  const onLogOut = () => {
    logoutUser(dispatch);
    setIsLogedIn(false)
  }

  return (
    <header className={classes.header}>
      <Navbar collapseOnSelect expand="md" variant="light" className="py-md-4">
        <Container>
          <div className="d-flex justify-content-between align-items-center w100">
            <Navbar.Brand className='py-0'>
              <NavLink className='logo' to="/">GlobalTalk</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle className="ms-auto align-items-center d-flex d-md-none" aria-controls='offcanvasNavbar-expand-md' onClick={() => setShowOffcanvas(!showOffcanvas)} />
            <Navbar.Offcanvas
              show={showOffcanvas}
              onHide={handleOffcanvasClose}
              aria-labelledby='offcanvasNavbarLabel-expand-md'
              placement="end"
            >
              <Offcanvas.Header closeButton />
              <Offcanvas.Body >
                <Nav className="align-items-md-center ms-0 ms-md-3">
                  <NavLink onClick={handleOffcanvasClose} className={({ isActive }) =>
                    isActive ? linkClass1 + activeClass : linkClass1} to="/home">Home</NavLink>
                  <NavLink onClick={handleOffcanvasClose} className={({ isActive }) =>
                    isActive ? linkClass1 + activeClass : linkClass1} to="/statistics/day">Statistics</NavLink>
                  <NavLink onClick={handleOffcanvasClose} className={({ isActive }) =>
                    isActive ? linkClass + activeClass : linkClass} to="/textbook">Textbook</NavLink>

                  <NavDropdown id="dropdown-item-button" title="Games" className="text text2 ms-md-1 py-2 py-md-0">
                    <Dropdown.Item as="div"> <NavLink onClick={handleOffcanvasClose} className="text text2" to="/audiocall">AudioCall</NavLink></Dropdown.Item>
                    <Dropdown.Item as="div"> <NavLink onClick={handleOffcanvasClose} className="text text2" to="/sprint">Sprint</NavLink></Dropdown.Item>
                  </NavDropdown>
                </Nav>

                {isLoggedIn ? <User user={userState.userInfo} logOut={onLogOut} /> : <NewUser />}

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Container>
      </Navbar >
    </header >
  )
}

export default Header