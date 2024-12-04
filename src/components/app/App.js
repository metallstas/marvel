import { useState } from 'react'
import Header from '../header/Header'
import RandomChar from '../randomChar/RandomChar'
import Characters from '../characters/Characters'
import CharacterInfo from '../characterInfo/CharacterInfo'
import Comicses from '../comics/Comicses'

import './app.scss'
import '../../style/buttons.scss'
import bg from '../../resourses/img/bg1.png'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

const App = () => {

    const [selectedChar, setSelectedChar] = useState(null)

    const onCharSelected = (id) => {
         setSelectedChar(id)
    }

    return (
        <div className="app">
            <Header/>
            <Comicses />
            {/* <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <main className='app__main'>
                <ErrorBoundary>
                    <Characters onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharacterInfo charId={selectedChar} />
                </ErrorBoundary>
            </main>
            <img className='app__bg' src={bg} alt='superman'/> */}
        </div>
    )
}

export default App
