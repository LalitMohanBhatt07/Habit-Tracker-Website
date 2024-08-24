import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
      <li><Link to="https://github.com/LalitMohanBhatt07/Certificates/blob/main/Lalit_New_Software%20(2).pdf">Resume</Link></li>
      <li><Link to="https://lalit-portfolio-website8.netlify.app/">Portfolio Website</Link></li>
      
        <li><Link to="/">Add Habbit</Link></li>
        <li><Link to="/habits">View Habbits</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
