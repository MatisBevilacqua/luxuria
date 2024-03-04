import React from 'react'
import LogoLuxuria from '../assets/logo.jpeg';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <>
        <img src={LogoLuxuria} alt='logo de luxria' className={className} />
    </>
  );
}

export default Logo;
