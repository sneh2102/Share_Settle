import React, { useState } from 'react';
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
    <div className='contact-container'style={{display: 'flex', alignItems: 'center', justifyContent: 'center' , paddingTopTop: '50px'}}>
    <div>{contactMessage}</div>
    <div className="contact-form" >
      <h2>Contact Us</h2>
      <div className="contact-info">
        <p>Call us: 782-882-123</p>
        <p>Email us: sharesettle@gmail.com</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
          </div>
          </>
  );
}

export default ContactUs;
