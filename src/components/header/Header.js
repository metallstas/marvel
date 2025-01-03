import { Link, NavLink } from 'react-router-dom'
import './header.scss'

const Header = () => {
    return (
        <header className='header'>
            <h1>
                <Link to='/characters'><span className='active'>Marvel</span> information portal</Link> 
                
            </h1>
            <div className='header__link'>
                <NavLink 
                    
                    className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}
                    to='/characters'>
                    Characters
                </NavLink> / <NavLink 
                    
                    className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')}
                    to='/comics'> 
                     Comics
                </NavLink>
            </div>
        </header>
    )
}

export default Header
