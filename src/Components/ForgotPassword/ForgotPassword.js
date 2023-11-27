/**
 * ForgotPassword Component:
 * This component represents the UI for the "Forgot Password" feature.
 * It provides a form to enter the user's email for password recovery.
 * Utilizes the useForgotPass custom hook for handling the password recovery logic.
 */
import React, { useState } from 'react'
import './forgotpassword.css'
import { useForgotPass } from '../../Hooks/useFargotPass'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
const {forgotPass} = useForgotPass();
const [email,setemail]=useState();
const navigate = useNavigate();

/**
 * handleForgetPassword Method:
 * Handles the submission of the forgot password form.
 * Attempts to trigger the forgot password functionality using the entered email.
 * On success, navigates the user to the home page ("/").
 * @param {Event} e - The form submission event.
 */
const handleForgetPassword = (e) => {
    try{
      forgotPass(email);
      navigate("/")
        
    } catch(err){
    }
}
  // Rendering the UI for the "Forgot Password" feature.
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

// Exporting the ForgotPassword component as the default export.
export default ForgotPassword