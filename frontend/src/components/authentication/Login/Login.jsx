import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const Login = () => {

    const [inputs, setInputes] = useState({
        username: '',
        password: '',
        result: ''
    })
    const axiosPrivate = useAxiosPrivate()

    const loginHandler = (event) => {
        setInputes({...inputs, [event.target.name]: event.target.value})
    }
    const submitHandler = (event) => {
        console.log("call");
        event.preventDefault()
        const data = {
            username: inputs.username,
            password: inputs.password
        }
        axiosPrivate.post('/authentication/login/', data)
        .then((res) => {
            console.log(res);
            setInputes({...inputs.result})
        })
        .catch((error) => {
            console.log(error.response);
        })
    }
    return (
        <form onSubmit={submitHandler} className='d-flex flex-column align-items-start'>
        <TextField
            required
            id="standard-required"
            variant="standard"
            label="Username"
            name='username'
            onChange={loginHandler}
        />
        <TextField
            id="standard-password-input"
            required
            label="Password"
            type="password"
            name='password'
            autoComplete="current-password"
            variant="standard"
            onChange={loginHandler}
        />
        <Button 
            variant="contained"
            type="submit"
        >Login</Button>
        {inputs.result}
        </form>
    );
}

export default Login;
