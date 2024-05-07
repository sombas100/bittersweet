import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Bittersweet. All rights reserved.</p>
        <p>Designed by Corey</p>
      </div>
    </footer>
  );
}

export default Footer;