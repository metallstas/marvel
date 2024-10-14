import Header from '../header/Header'
import RandomChar from '../randomChar/RandomChar'
import Characters from '../characters/Characters'
import CharacterInfo from '../characterInfo/CharacterInfo'

import './app.scss'
import '../../style/buttons.scss'

const App = () => {
    return (
        <div className="app">
            <Header/>
            <RandomChar/>
            <section className='main-section'>
                <Characters/>
                <CharacterInfo/>
            </section>
        </div>
    )
}

export default App
