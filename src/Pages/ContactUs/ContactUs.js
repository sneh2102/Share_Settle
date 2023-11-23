import React, { useState } from 'react';
 import './ContactUs.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useContact } from '../../Hooks/useContact';
import '../../PagesCommonCSS/PagesCommonCSS.css';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const {contactUs,contactMessage} = useContact()

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      
      contactUs(name,email,subject,message)
      toast.success("Email Sent")
    }catch(err)
    {
      toast.error(err.message)
    }
    console.log(contactMessage)
  };

  return (
    <>
    <Navbar/>
    <div className='page-layout-container'>
      <div className="page-layout-card">
        <div className="page-layout-header" id="orange-header">
          <h2>Contact Us</h2>
          <div className='subheader'>
            <span><i className="fa fa-phone"></i> Call us : 782-882-123</span>
            <span><i className="fa fa-envelope"></i> Email us : sharesettle@gmail.com</span>
          </div>
        </div>

        <form>
          <div className="page-layout-fields">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className='field-input'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className='field-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              className='field-input'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea         
              id="message"
              className='field-input'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            <button className="submit-create-button" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default ContactUs;
