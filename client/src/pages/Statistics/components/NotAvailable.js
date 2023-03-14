import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import classes from './NotAvailable.module.css'
function NotAvailable() {
    return (
        <div className={`${classes['no-statistics']} d-flex align-items-center justify-content-center`}>
            <div className={`${classes.message} d-flex flex-column flex-md-row justify-content-between gap-4`}>
                <Image fluid className={`${classes.image} mx-auto`} src="/assets/images/statistics/statistics.png" />
                <div className={`${classes.info}`}>
                    <div className="mb-3 mb-sm-5 d-flex d-md-block flex-column align-items-center justify-content-center">
                        <h3 className={`${classes['no-statistics-title']} mb-3 `}>Sorry, statistics are not available 🥺 </h3>
                        <p className='text text2 '>To get statistics and keep tracking your results, register or log in to your account</p>
                    </div>
                    <div className={`${classes.actions} d-flex justify-content-md-start justify-content-center  gap-3 align-items-center`}>
                        <Link to="/login" className={`button button-login ${classes['btn-login']}`} variant="link">Login</Link>
                        <Link to="/signup" className="button button-blue button-content button">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotAvailable