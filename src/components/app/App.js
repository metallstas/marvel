import Header from '../header/Header'
import { lazy, Suspense } from 'react'
import './app.scss'
import '../../style/buttons.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Spinner from '../spinner/Spinner'

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComic = lazy(() => import('../pages/singleComic/SingleComic'))

const App = () => {

    return (
        <Router>
            <div className="app">
                <Header />
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path='/comics' element={<ComicsPage />} />
                        <Route path='/comics/:comicId' element={<SingleComic />} />
                        <Route path='/characters' element={<MainPage />} />
                        <Route path='*' element={<Page404 />} />
                        <Route path='/characters/:input/:name' element={<SingleComic />}/>
                        <Route path='/characters/:input' element={<SingleComic />}/>
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}

export default App
