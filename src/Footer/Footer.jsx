import React from 'react';
import './Footer.css';
import logo from '../assets/party mowa logo hd.png';
import { FaInstagram, FaFacebookF, FaYoutube, FaMapMarkerAlt } from "react-icons/fa";
import { IoCallOutline, IoMail } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="footer-header">
          <div className="footer-content">
            <h1>About Company</h1>
            <img src={logo} alt="" />
            <p>Welcome to Party Mowa, your premier <br /> destination for an extraordinary private <br /> theatre and event celebration experience.</p>
            <div className="footer-social-links">
              <div className='social-bg'>
                <FaFacebookF />
              </div>
              <div className='social-bg'>
                <FaYoutube />
              </div>
              <div className='social-bg'>
                <FaInstagram />
              </div>
            </div>
          </div>
          <div className="footer-nav-links">
            <h4>Quick Links</h4>
            <p>About</p>
            <p>Services</p>
            <p>Blogs</p>
            <p>Gallery</p>
            <p>Contact</p>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <div className="footer-contact-info">
              <div className="footer-icon-bg">
                <IoCallOutline />
              </div>
              <div className="footer-contact-details">
                <p>Phone No:</p>
                <Link to='tel:+919063426658'><h5>+919063426658</h5></Link>
              </div>
            </div>
            <div className="footer-contact-info">
              <div className="footer-icon-bg">
                <IoMail /> {/* Corrected mail icon */}
              </div>
              <div className="footer-contact-details">
                <p>Email Id:</p>
                <Link to='mailto:partymowa9@gmail.com'><h5>partymowa9@gmail.com</h5></Link>
              </div>
            </div>
            <div className="footer-contact-info">
              <div className="footer-icon-bg">
                <FaMapMarkerAlt /> {/* Corrected location icon */}
              </div>
              <div className="footer-contact-details">
                <p>Location:</p>
                <Link to='#'>
                  <h5>Plot No 51, First Floor, Vittal Rao Nagar,<br /> Hi-Tech City, near Melange Tower,<br /> Hyderabad, Telangana 500081</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copy-right">
          <p>Copy &copy; 2024 Party Mowa. All Rights Reserved By Web3Tech</p>
          <div className='footer-condition'>
            <p>Terms & Conditions</p>
            <p>Privacy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
