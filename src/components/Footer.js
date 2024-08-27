import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Importing icons
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>&copy; 2024 iNotebook Schedulr. All rights reserved.</p>
          <p>
            <a href="/" className="footer-link">Terms of Service</a> | 
            <a href="/" className="footer-link"> Privacy Policy</a>
          </p>
          <p>
            Follow us on:
            <a href="https://www.linkedin.com/in/rajatjangid15" className="footer-link" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>, 
            <a href="https://github.com/68rajat68" className="footer-link" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
          </p>
        </div>

        <div className="footer-right">
          <h4>Contact Us:</h4>
          <p>
            <FaEnvelope className="footer-icon" /> <span>Email:</span> <a href="mailto:68rajat68@gmail.com" className="footer-link">68rajat68@gmail.com</a>
          </p>
          <p>
            <FaPhone className="footer-icon" /> <span>Phone:</span> <a href="tel:+91 8128484217" className="footer-link">+91 8128484217</a>
          </p>
          <p>
            <FaMapMarkerAlt className="footer-icon" /> <span>Address:</span> B-block C-DAC, Noida, India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
