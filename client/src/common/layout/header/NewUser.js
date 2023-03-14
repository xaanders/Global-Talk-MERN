import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NewUser() {
    return (
        <Nav className="ms-auto gap-2 gap-md-3 mt-4 mt-sm-0 d-flex align-items-center">
            <Link to="/login" className="button button-login">Login</Link>
            <Link to="/signup" className="button button-blue button-signup ">Sign Up</Link>
        </Nav>
    )
}

export default NewUser