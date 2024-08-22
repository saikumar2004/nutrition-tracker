import React from 'react';
import Header from './Header';
import msg_icon from '../assets/msg-icon.png'
import mail_icon from '../assets/mail-icon.png'
import phone_icon from '../assets/phone-icon.png'
import location_icon from '../assets/location-icon.png'
import white_arrow from '../assets/white-arrow.png'
function  Contact(){
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "45658374-0ee5-45d2-8484-501e66700d4c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <><Header/>
    <div className='contact'>
        <div className='contact-col'>
            <h3>Send us a message<img src={msg_icon} alt=""  /></h3>
            <p>Feel free to reach out through contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service to our university community.</p>
            <ul>
                <li><img src={mail_icon} alt="" /> Contact@SparkStack.dev</li>
                <li><img src={phone_icon} alt="" />+91 7386859225</li>
                <li><img src={location_icon} alt="" />Vishakapatnam, Andhara pradesh<br/>  91  India</li>
            </ul>
        </div>
        <div className='contact-col'>
               <form onSubmit={onSubmit}>
                  <label>Your name</label>
                  <input className="con-in" type="text" name='name' placeholder='Enter your name'  required />
                  <label>Phone Number</label>
                  <input className="con-in" type="tel" name='phone' placeholder='Enter your Phone number'  required />
                  <label>Write your messages here</label>
                  <textarea name="message"  rows="6"  placeholder='Enter your message' required />
                  <button type='submit' className='btn dark-btn'>Submit now< img src={white_arrow} alt=""/></button>
               </form>
               <span>{result}</span>
        </div>
      
    </div>
    </>
  );
}

export default Contact;
