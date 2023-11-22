import { useState } from 'react'
import { useUserAuth } from '../Context/AuthContext' 
import { toast } from 'react-toastify';

export const useLogin = () => {
  const [lerror, setError] = useState(null)
  const [islLoading, setIsLoading] = useState(null)
  const { dispatch } = useUserAuth()
  const link = process.env.REACT_APP_SERVER_LINK;

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    
    const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()
    console.log(json);

    if (!response.ok) {
      toast.error(json.error)
      setIsLoading(false)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      window.localStorage.setItem('isLoggedIn', true)
      dispatch({type: 'LOGIN', payload: json})
      toast.success("Successfully Logged In")
      setIsLoading(false)
    }
  }
  
  return { login, islLoading, lerror }
}