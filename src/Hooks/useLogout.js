import { useState } from 'react'
import { useUserAuth } from '../Context/AuthContext' 

const useLogout = () => {
  const [lerror, setlError] = useState(null)
  const [islLoading, setIslLoading] = useState(null)
  const { dispatch } = useUserAuth()

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({type: 'LOGOUT'})
}

  return { logout, islLoading, lerror }
}

export default useLogout;