import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillFileAdd, AiOutlineHome } from 'react-icons/ai';

const NavItem = ({ to, value, Icon, closed }) => {
    const commonClasses = "flex items-center space-x-2 w-full p-2 rounded block whitespace-nowrap"
    const activeClass = commonClasses + " bg-blue-500 text-white"
    const inActiveClass = commonClasses + " text-gray-500"
  return (
    <NavLink className={({isActive}) =>( isActive ? activeClass : inActiveClass)}
 to={to}>
      {Icon}
      <span className={closed ? 'w-0 transition-width overflow-hidden': 
      'w-full transition-width overflow-hidden' }>{value}</span>
    </NavLink>
  );
};


export default function Navbar ({closed}) {
    return (
      <nav>
        <div className='flex justify-center p-3'>
            <img className='w-14' src="./logo.png" alt="Logo" />
        </div>
        <ul>
          <li>
            <NavItem closed ={closed} to="/" value="Home" Icon={<AiOutlineHome size={25} />} />
          </li>
          <li>
            <NavItem closed ={closed} to="/create-post" value="Create Post" Icon={<AiFillFileAdd size={25} />} />
          </li>
        </ul>
      </nav>
    );
  };
