import React, { useState, useEffect } from 'react';
import logo from '../../assets/dtu-logo.png';
import "./navbar.css";


const Menu = () => {
    return (
        <>
            <p><a href='#praktik-pladser'>Praktik Pladser</a></p>
            <p><a href='#info'>Praktik Ansøgning</a></p>
        </>
    );
}


const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <div>
            <img className='dtu-logo' src={logo} alt="dtu48" />
            <h1 className='underline'>Praktik Pladser</h1>
        </div>
    )
}

export default Navbar