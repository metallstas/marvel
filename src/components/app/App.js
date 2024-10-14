import Header from '../header/Header'
import RandomChar from '../randomChar/RandomChar'
import Characters from '../characters/Characters'
import CharacterInfo from '../characterInfo/CharacterInfo'

import './app.scss'
import '../../style/buttons.scss'
import bg from '../../resourses/img/bg asset.png'

const App = () => {
    return (
        <div className="app">
            <Header/>
            <RandomChar/>
            <section className='app__main'>
                <Characters/>
                <CharacterInfo/>
            </section>
            <img className='app__bg' src={bg} alt='superman'/>
        </div>
    )
}

export default App
