import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='left-section'>
        <h2>Sudhas Bakers</h2>
      </div>
      <div className='middle-section'>
        <ul className='list-unstyled'>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className='right-section'>
        <address>
          <h6>Flat No T-3</h6>
          <h6>Sai Manasa Residency</h6>
          <h6>Anand Rao Nagar, Old Alwal</h6>
          <h6>Secunderabad, Telangana 500010</h6>
        </address>
      </div>
      <div>
        Find us at
        @sudhas_bakers
      </div>
    </div>
  );
}

export default Footer;
