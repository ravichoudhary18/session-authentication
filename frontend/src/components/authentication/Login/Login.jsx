import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [inputs, setInputes] = useState({
        username: '',
        password: '',
    })
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()

    const loginHandler = (event) => {
        setInputes({...inputs, [event.target.name]: event.target.value})
    }
    const submitHandler = (event) => {
        event.preventDefault()
        const data = {
            username: inputs.username,
            password: inputs.password
        }
        axiosPrivate.post('/authentication/login', data)
        .then((res) => {
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            localStorage.setItem('token', JSON.stringify(res.data.token))
            navigate('/')
        })
        .catch((error) => {
            console.log(error);
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
            value={inputs.username}
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
            value={inputs.password}
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
