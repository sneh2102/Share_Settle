const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

const createToken = (_id) =>{
   return jwt.sign({_id}, process.env.JWTTOKEN, {expiresIn: '3d'})
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const token= createToken(user._id)
        res.status(200).json({email,token,user})
    } catch(error)
    {
        res.status(400).json({error: error.message})
    }
}

// signup User
const signupUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.signup(email, password)
        const token= createToken(user._id)
        res.status(200).json({email,token})
    } catch(error)
    {
        res.status(400).json({error: error.message})
    }
}

const resetPassUser = async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;
  try {
       console.log(id);
       console.log(token);
       console.log(password);
  const user = await User.resetpass(id, password);
    console.log(user);
    const newToken = createToken(user._id);

    res.status(200).json({ email: user.email, token: newToken });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res.status(400).json({ error: 'Invalid token' });
    } else if (err.name === 'TokenExpiredError') {
      res.status(400).json({ error: 'Token expired' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};


const forgotPassUser = async (req, res) => {
    const {email} = req.body
    try{
        const user = await User.forgotpass(email)
        // console.log(user._id);
        const token= createToken(user._id)
        var transporter = nodemailer.createTransport({
          host: "smtp-mail.outlook.com",
          secureConnection: false,
          port: 587,
          tls: {
            ciphers:'SSLv3'
          },
          auth: {
            user: 'sharesettle@outlook.com',
            pass: 'Group1asdc'
          }
          });
          
          var mailOptions = {
            from: 'sharesettle@outlook.com',
            to: email,
            subject: 'Reset Your Password',
            text: `http://localhost:3000/reset-password/${user._id}/${token}`
          };
          
          const response = transporter.sendMail(mailOptions);
          if(response)
          {
            res.status(200).json({response})
          }
          else{
            res.status(400).json({error: "Something Went Wrong"})
          }
    } catch(error)
    {
        res.status(400).json({error: error.message})
    }


    
}

module.exports = { signupUser, loginUser ,forgotPassUser, resetPassUser}; 

// module.exports = { signupUser, loginUser}; 