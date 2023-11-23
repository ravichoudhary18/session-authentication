import './App.css'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/authentication/Login/Login'
import { useEffect } from 'react'

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    const tooken = JSON.parse(sessionStorage.getItem('userInfo'))
    if( tooken !== null ){
      navigate('/')
    }else{
      navigate('/login')
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
