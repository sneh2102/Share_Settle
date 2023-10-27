import React, { useState } from 'react'
import './forgotpassword.css'
import { useForgotPass } from '../../Hooks/useFargotPass'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
const {forgotPass} = useForgotPass();
const [email,setemail]=useState();
const navigate = useNavigate();
const handleForgetPassword = (e) => {
    try{
      forgotPass(email);
      navigate("/")
        
    } catch(err){
     
    }
}

  return (
    <div className='lcontainer'>
    <div className='fcontainer'>
    <div className="f-form-container forgot-pass-container">
      <form onSubmit={handleForgetPassword}>
            <h1>Forgot Password</h1>
            <input type="email" placeholder="Email" onChange={(e)=>setemail(e.target.value)}/>
            <input type="submit" className="button" value="Send Email"/>
            {/* <input type="password" placeholder="New Password"/>
            <input type="password" placeholder="Confirm Password"/>
            <input type="submit" className="button" value="Change Password"/> */}
          </form>
    </div>
    </div>
    </div>
  )
}

export default ForgotPassword
