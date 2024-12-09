import Header from '../header/Header'
import { MainPage, ComicsPage, Page404 } from '../pages'

import './app.scss'
import '../../style/buttons.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {

    return (
        <Router>
            <div className="app">
                <Header/>
                <Routes>
                    <Route path='/comics' element={<ComicsPage/>}/>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='*' element={<Page404/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App
