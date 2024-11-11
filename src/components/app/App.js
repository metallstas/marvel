import { Component } from 'react'
import Header from '../header/Header'
import RandomChar from '../randomChar/RandomChar'
import Characters from '../characters/Characters'
import CharacterInfo from '../characterInfo/CharacterInfo'

import './app.scss'
import '../../style/buttons.scss'
import bg from '../../resourses/img/bg1.png'

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
                <RandomChar/>
                <main className='app__main'>
                    <Characters onCharSelected={this.onCharSelected} />
                    <CharacterInfo charId={this.state.selectedChar} />
                </main>
                <img className='app__bg' src={bg} alt='superman'/>
            </div>
        )
    }
}

export default App
