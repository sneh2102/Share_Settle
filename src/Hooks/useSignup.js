import { useState } from 'react'
import { useUserAuth } from '../Context/AuthContext' 

export const useSignup = () => {
  const [serror, setError] = useState(null)
  const [issLoading, setIsLoading] = useState(null)
  const { dispatch } = useUserAuth()

  const signup = async (name, email, password) => {
    setIsLoading(true)
    setError(null)
    const serverURL = 'http://localhost:5000';
    const response = await fetch(`${serverURL}/api/user/signup`, {
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
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({type: 'LOGIN', payload: json})

      setIsLoading(false)
    }
  }

  return { signup, issLoading, serror }
}