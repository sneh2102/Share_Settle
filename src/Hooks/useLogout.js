import { useState } from 'react'
import { useUserAuth } from '../Context/AuthContext' 
import { Navigate } from 'react-router-dom'

const useLogout = () => {
  const [lerror, setlError] = useState(null)
  const [islLoading, setIslLoading] = useState(null)
  const { dispatch } = useUserAuth()

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT'})
    window.localStorage.setItem('isLoggedIn',false);
    window.localStorage.removeItem('isLoggedIn');
    <Navigate to='/login'/>
}

  return { logout, islLoading, lerror }
}

export default useLogout;