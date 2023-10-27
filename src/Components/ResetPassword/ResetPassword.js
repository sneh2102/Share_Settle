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
        setError("Password does't Match")
    }
}
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

export default ResetPassword
