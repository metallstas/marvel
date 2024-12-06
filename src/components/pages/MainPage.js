import { useState } from 'react'

import RandomChar from '../randomChar/RandomChar'
import Characters from '../characters/Characters'
import CharacterInfo from '../characterInfo/CharacterInfo'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

import bg from '../../resourses/img/bg1.png'


const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null)

    const onCharSelected = (id) => {
         setSelectedChar(id)
    }

    return (
        <>
            <ErrorBoundary>
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
            <img className='app__bg' src={bg} alt='superman'/>
        </>
    )
}

export default MainPage
