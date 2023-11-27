/**
 * ResetPassword Component:
 * This component allows users to reset their password by providing a new password and confirming it.
 * Utilizes the useResetPassword custom hook for handling the password reset logic.
 */
import React, {useState} from 'react'
import { useResetPassword } from '../../Hooks/useResetPassword'
import { useNavigate, useParams } from 'react-router-dom';
// import { useResetPassword } from '../../Hooks/useResetPassword';

const ResetPassword = () => {
// const {resetPass} = useResetPass();
const{id, token}=useParams();
const [pass,setpass]=useState();
const [cpass,setcpass]=useState();
const [error,setError]=useState();
const navigate = useNavigate();
const {resetPass}=useResetPassword();

/**
   * handleResetPassword Method:
   * Handles the submission of the reset password form.
   * Validates that the entered passwords match before initiating the password reset process.
   * If passwords match, triggers the reset password functionality and navigates the user to the home page ("/").
   * If passwords don't match, sets an error message.
   * @param {Event} e - The form submission event.
   */
const handleResetPassword = async (e) => {
    e.preventDefault()
    if(pass==cpass)
    {
        try{
            // console.log(id,token,pass);
          await resetPass(id,token,pass);
          navigate("/")
            
        } catch(err){
         
        }

    }
    else{
        // Setting an error message if the entered passwords don't match.
        setError("Password does't Match")
    }
}
  // Rendering the UI for the "Reset Password" feature.
  return (
    <div>
      <div className='lcontainer'>
    <div className='fcontainer'>
    <div className="f-form-container forgot-pass-container">
      <form onSubmit={handleResetPassword}>
            <h1>Reset Password</h1>
            {error}
            <input type="password" placeholder="Password" onChange={(e)=>setpass(e.target.value)}/>
            <input type="password" placeholder="Confirm Password" onChange={(e)=>setcpass(e.target.value)}/>
            <input type="submit" className="button" value="Change Password"/>
            {/* <input type="password" placeholder="New Password"/>
            <input type="password" placeholder="Confirm Password"/>
            <input type="submit" className="button" value="Change Password"/> */}
          </form>
    </div>
    </div>
    </div>
    </div>
  )
}

// Exporting the ResetPassword component as the default export.
export default ResetPassword