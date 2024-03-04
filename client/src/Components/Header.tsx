import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className='w-full p-[20px] h-[10vh] bg-[#003566] z-[3] fixed'>
      <nav className='w-full h-full flex items-center justify-center'>
        <ul className='flex gap-[20px]'>
          <Link to="/">
            <li className={`text-[#FFF] text-[18px] ${location.pathname === '/' ? 'font-bold' : ''} relative group`}>
              Home
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white origin-left transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </li>
          </Link>

          <Link to="/cars">
            <li className={`text-[#FFF] text-[18px] ${location.pathname === '/cars' ? 'font-bold' : ''} relative group`}>
              Cars
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white origin-left transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </li>
          </Link>

          <Link to="/tickets">
            <li className={`text-[#FFF] text-[18px] ${location.pathname === '/tickets' ? 'font-bold' : ''} relative group`}>
              Tickets
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white origin-left transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </li>
          </Link>

          <Link to="/yachts">
            <li className={`text-[#FFF] text-[18px] ${location.pathname === '/yachts' ? 'font-bold' : ''} relative group`}>
              Yachts
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white origin-left transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
