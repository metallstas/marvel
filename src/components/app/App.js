import { Component } from 'react'
import Header from '../header/Header'
import RandomChar from '../randomChar/RandomChar'
import Characters from '../characters/Characters'
import CharacterInfo from '../characterInfo/CharacterInfo'

import './app.scss'
import '../../style/buttons.scss'
import bg from '../../resourses/img/bg1.png'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
         this.setState({
            selectedChar: id
         })
    }

    render () {
        return (
            <div className="app">
                <Header/>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <main className='app__main'>
                    <ErrorBoundary>
                        <Characters onCharSelected={this.onCharSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharacterInfo charId={this.state.selectedChar} />
                    </ErrorBoundary>
                </main>
                <img className='app__bg' src={bg} alt='superman'/>
            </div>
        )
    }
}

export default App
