import { Button } from '@mui/material';
import React from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const Home = () => {

    const axiosPrivate = useAxiosPrivate()

    const logout = () => {
        axiosPrivate.post('/authentication/logout')
        .then((res) => {
            if(res.status === 204){
                localStorage.clear()
                sessionStorage.clear()
                console.log('logout call');
                // navigator('/login')
            }
        })
    }

    return (
        <div>
            <p>Home</p>
            <Button onClick={logout}>logout</Button>
        </div>
    );
}

export default Home;
