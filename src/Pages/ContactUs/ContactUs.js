import React, { useState } from 'react';
import '../GroupCreation/GroupCreation.css'; 
import './ContactUs.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useContact } from '../../Hooks/useContact';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const {contactUs,contactMessage} = useContact()

  const handleSubmit = (e) => {
    e.preventDefault();
    contactUs(name,email,subject,message)
    console.log(contactMessage)
  };

  return (
    <>
    <Navbar/>
    <div className='gc-container'>
      <div className="gc-card">
        <div className="cu-header">
        <h2>Contact Us</h2>
        {/* <p>Call us: 782-882-123</p>
        <p>Email us: sharesettle@gmail.com</p> */}
      </div>

      <form>
        <div className="gc-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className='dropdown-options'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className='dropdown-options'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            className='dropdown-options'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea         
            id="message"
            className='dropdown-options'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button onClick={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
    </div>
    </>
  );
}

export default ContactUs;
