import { useState } from 'react'
import { useUserAuth } from '../Context/AuthContext' 

export const useLogin = () => {
  const [lerror, setError] = useState(null)
  const [islLoading, setIsLoading] = useState(null)
  const { dispatch } = useUserAuth()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    const serverURL = 'http://localhost:5000';
    const response = await fetch(`${serverURL}/api/user/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()
    console.log(json);

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      window.localStorage.setItem('isLoggedIn', true)

      dispatch({type: 'LOGIN', payload: json})

      setIsLoading(false)
    }
  }

  return { login, islLoading, lerror }
}