import Header from '../header/Header'
import { MainPage, ComicsPage } from '../pages'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'

import './app.scss'
import '../../style/buttons.scss'

const App = () => {

    return (
        <Router>
            <div className="app">
                <Header/>
                <Switch>
                    <Route exect path='/comics'>
                    <ComicsPage />
                    </Route>
                    <Route exect path='/'> 
                        <MainPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
