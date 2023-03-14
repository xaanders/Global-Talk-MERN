import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import classes from './Auth.module.css'

function Input({ name, type, placeholder, label, message, validation, changeHandler}) {
    const enteredValue = useRef();
    const [isInvalid, setIsInvalid] = useState(false);

    const blurHandler = () => {
        setIsInvalid(false);
        const value = enteredValue.current.value;
        const valid = validation(value);
        
        changeHandler({[name]: valid ? value : ''});
        
        if(!valid) {
            setIsInvalid(true);
            return;
        }

    }
    return (
        <Form.Group className={`mb-3 ${isInvalid ? classes.error : ''}`}>
            <Form.Label className="text text2">{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} name={name} ref={enteredValue} required onBlur={blurHandler} />
            <Form.Text className="text-muted">
                {isInvalid ? <p className='text text3'>Please type correct {message}.</p> : ''}
            </Form.Text>
        </Form.Group>
    )
}

export default Input