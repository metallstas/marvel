import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import './header.scss'

const Header = () => {
    return (
        <header className='header'>
            <h1>
                <Link to='/'><span className='active'>Marvel</span> information portal</Link> 
                
            </h1>
            <div className='header__link'>
                <NavLink exact activeClassName='active' to='/'>Characters</NavLink> /  
                <NavLink exact activeClassName='active' to='/comics'> Comics</NavLink>
            </div>
        </header>
    )
}

export default Header
