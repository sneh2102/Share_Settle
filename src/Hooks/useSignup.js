import { useState } from 'react'
import { useUserAuth } from '../Context/AuthContext' 
import { toast } from 'react-toastify'


export const useSignup = () => {
  const [serror, setError] = useState(null)
  const [issLoading, setIsLoading] = useState(null)
  const { dispatch } = useUserAuth()

  const signup = async (name, email, password) => {
    setIsLoading(true)
    setError(null)
    
    const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/api/user/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      window.localStorage.setItem('user', JSON.stringify(json))
      console.log(json);
      window.localStorage.setItem('isLoggedIn',true)
      dispatch({type: 'LOGIN', payload: json})

      setIsLoading(false)
    }
  }

  return { signup, issLoading, serror }
}