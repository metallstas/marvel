import Header from '../header/Header'
import RandomChar from '../randomChar/RandomChar'
import Characters from '../characters/Characters'

import './app.scss'

const App = () => {
    return (
        <div className="app">
            <Header/>
            <RandomChar/>
            <section className='main-section'>
                <Characters/>

            </section>
        </div>
    )
}

export default App
