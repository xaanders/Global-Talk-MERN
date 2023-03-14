import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import classes from './Auth.module.css'
import Input from './Input'
import { loginUser } from '../../store/actions/userActions';
import { errorActions } from '../../store/reducers/error-slice';
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const errorState = useSelector(state => state.error);
    const authState = useSelector(state => state.user);

    const errors = [];

    for (let key in errorState) {
        errors.push(errorState[key]);
    }
    const onInputHandler = (data) => {
        setUserData(prev => {
            return { ...prev, ...data }
        });
    }
    const keyDown = (e) => {
        if(e.key === 'Enter') {
            submitHandler(e)
        }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(errorActions.getErrors({}));
        if (userData.email && userData.password) {
            loginUser(userData, navigate, dispatch);
        }
    }

    return (
        <section>
            <Container>
                <div className={`d-flex align-items-center justify-content-center ${classes['form-box']}`}>
                    <Form className={classes.form} onSubmit={submitHandler} onKeyDown={keyDown}>
                        <h3 className="mb-4 text-center">Login</h3>
                        <Input type="email"
                            placeholder="Email"
                            name="email"
                            label="Email address"
                            message="email"
                            changeHandler={onInputHandler}
                            validation={(data) => data.trim().length > 6 && data.includes('@')} />

                        <Input type="password"
                            placeholder="Password"
                            name="password"
                            label="Password"
                            message="password"
                            changeHandler={onInputHandler}
                            validation={(data) => data.trim().length > 6} />

                        <div className="d-flex justify-content-center">
                            <Button variant="link" className='button button-blue' type="submit" >
                                Submit
                            </Button>
                        </div>

                          <Form.Text className="text-muted d-flex align-items-center flex-column mt-4">
                            {errors.length > 0 && errors.map((item, i) => (
                                    <p key={i} className='text text3 text-error'>{item}</p>
                            ))}
                            {authState.loading &&
                                <Spinner animation="border" className="spinner" role="status" />}
                        </Form.Text>

                    </Form>
                </div>
            </Container>
        </section>
    )
}

export default LogIn