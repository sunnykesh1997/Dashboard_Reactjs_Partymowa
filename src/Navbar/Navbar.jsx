import React from 'react'
import './Navbar.css'
import { FaLocationDot } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import {Link} from 'react-router-dom'
import logo from '../assets/party mowa logo hd.png'
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
const Navbar = () => {
  return (
    <div>
      <div className="header">
          <div className="container">
            <div className="header-content">
              <div className="header-left">
                <FaLocationDot className='header-icon-location'/>
                <p>Plot No 51, First Floor, Vittal Rao Nagar, Hi-Tech City, near Melange Tower, Hyderabad, Telangana 500081</p>
              </div>
              <div className="header-right">
                <div className="header-social-icons">
                <Link to='#' className='header-icon'><AiFillInstagram /></Link>  
                <Link to='#' className='header-icon'><FaFacebookF /></Link>  
                <Link to='#' className='header-icon'><FaYoutube /></Link>  
                </div>
                <div className="register">
                  <Link to='#' className='header-icon'><IoPerson />
                  </Link><span>Register</span>
                </div>
                <div className="register">
                <Link to='#' className='header-icon'> <FaLock />
                  </Link> <span>Login</span>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="navbar">
        <div className="navbar-container">
          <div className="navbar-header">
            <div className="navbar-left">
              <img src={logo} alt="" width= '100px' height='100px'/>
            </div>
            <div className="navbar-right">
              <div className="contact-details">
                <div className="icons-bg">
                  <IoMdMail />
                </div>
                <div className="contact-info">
                  <p>Email Us:</p>
                  <Link to='mailto:partymowa9@gmail.com'>partymowa9@gmail.com</Link>
                </div>
              </div>
              <div className="contact-details">
                <div className="icons-bg">
                  <IoCall />
                </div>
                <div className="contact-info">
                  <p>Call Us:</p>
                  <Link to='tel:+919063426658'>+919063426658</Link>
                </div>
              </div>
            <Link to='/book'><button className='Navbar-btn'>Book Now</button></Link>  
            </div>
          </div>
          <div className="navbar-menu">
            <div className="navbar-menu-container">
              <div className=" navbar-menu-left">
                <div className="navbar-menu-list">
                  <ul>
                    <li><Link to={'/'}>AddThemes</Link></li>
                    <li className='nav-link'><Link to={'/addcake'}>AddCakes</Link></li>
                    <li className='nav-link'><Link to={'/adddecor'}>AddDecoration</Link></li>
                    <li className='nav-link'><Link to={'/addrose'}>AddRoses</Link></li>
                    <li className='nav-link'><Link to={'/dashboard'}>Dashboard</Link></li>
                    
                  </ul>
                </div>
                <div className="navbar-menu-right">
                  <div className="navbar-search">
                    <input type="text" placeholder='Search here...'/>
                    <FaSearch />
                  </div>
                  <div className="collage-icon">
                    <IoGridOutline />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar
