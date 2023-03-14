import React from 'react'
import { Button, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function User({user, logOut}) {
   
    return (
        <Nav className="ms-auto gap-2 gap-md-3 mt-4 mt-sm-0 d-flex align-items-center">
            <Link to="/profile" className="text text2">{user.name}</Link>
            <Button className="button button-login" onClick={logOut}>Logout</Button>
        </Nav>
    )
}

export default User