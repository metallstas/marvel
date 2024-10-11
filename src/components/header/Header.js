import './header.scss'

const Header = () => {
    return (
        <header className='header'>
            <h1><a className='active' href='#'>Marvel</a> information portal</h1>
            <p><a className='active' href='#'>Characters</a> / <a href='#'>Comics</a></p>
        </header>
    )
}

export default Header
