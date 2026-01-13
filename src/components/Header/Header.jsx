import './Header.css';
import { Link } from 'react-router-dom';
import useScrollHide from '../../hooks/useScrollHide';
import React from 'react';


function Header () {
    const showHeader = useScrollHide();
    return (
        <header>
            <div className={`header-container ${showHeader ? '' : 'header-hidden'}`}>
                <div className='header-left'>
                    <h1 className="logo">Mi Sitio Web</h1>
                <nav className="navigation">
                    <ul className="nav-links">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/about">Acerca de</Link></li>
                        <li><Link to="/services">Servicios</Link></li>
                        <li><Link to="/contact">Contacto</Link></li>
                    </ul>
                </nav>
                </div>
                <div className="header-right">
                    <button className='button-login'>Iniciar Sesión</button>
                </div>
            </div>
        </header>
    );
}
export default Header;