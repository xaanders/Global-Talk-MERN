import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { Button, Container, Form, Spinner } from 'react-bootstrap';
import classes from './Auth.module.css';
import Input from './Input';

import { registerUser } from '../../store/actions/userActions';
import { errorActions } from '../../store/reducers/error-slice';


function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const errors = [];

    if ((userData.password && userData.password2) && (userData.password !== userData.password2)) {
        errors.push('Passwords do not match');
    }

    const errorState = useSelector(state => state.error);
    const authState = useSelector(state => state.user);
    

    for (let key in errorState) {
        errors.push(errorState[key]);
    }

    const onInputHandler = (data) => {
        setUserData(prev => {
            return { ...prev, ...data }
        });
        dispatch(errorActions.getErrors({}));

    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (userData.name && userData.email && userData.password && userData.password2) {
            if (userData.password === userData.password2) {
                registerUser(userData, navigate, dispatch);
            }
        }
    }

    return (
        <section>
            <Container>
                <div className={`d-flex align-items-center justify-content-center ${classes['form-box']}`}>
                    <Form className={classes.form} onSubmit={submitHandler}>
                        <h3 className="mb-4 text-center">Sign up</h3>
                        <Input type="text"
                            placeholder="Name"
                            name="name"
                            label="Your name"
                            message="name"
                            changeHandler={onInputHandler}
                            validation={(data) => data.trim().length > 6} />

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

                        <Input type="password"
                            placeholder="Confirm password"
                            name="password2"
                            label="Confirm your password"
                            message="password confirmation"
                            changeHandler={onInputHandler}
                            validation={(data) => data.trim().length > 6} />

                        <div className="d-flex justify-content-center">
                            <Button variant="link" className='button button-blue' type="submit" disabled={errors.length > 0}>
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

export default SignUp