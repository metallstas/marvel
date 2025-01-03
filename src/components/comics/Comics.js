import { useEffect, useState } from 'react'
import useService from '../../services/Service'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import { NavLink } from 'react-router-dom'
import ComicsBanner from '../ComicsBanner/ComicsBanner'

import './comics.scss'
import '../../style/buttons.scss'

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading': 
            return newItemLoading ? <Component/> : <Spinner />
        case 'confirmed': 
            return <Component />
        case 'error': 
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state');
    }
}

const Comics = () => {
    const [comics, setComics] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [ended, setEnded] = useState(false)
    
    const {getAllComics, clearError, error, loading, process, setProcess} = useService()

    useEffect(() => {
        onRequest(true)
    }, [])

    const onRequest = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(newComics => onComicsesLoaded(newComics))
            .then(() => setProcess('confirmed'))

        setOffset(prev => prev + 8)
    }

    const onComicsesLoaded = (newComics) => {
        let ended = false
        if (newComics.length < 8) {
            ended = true
        }
        setComics(prev => [...prev, ...newComics])
        setNewItemLoading(false)
        setEnded(ended)
    }

    const updateComics = () => {
        clearError()
        setOffset(prev => prev + 8)
        onRequest(false)  
    }

    const comicsList = (comics) => {
        const newComicsList = comics.map(({id, img, title, price}, index) => {
            return (
                <li className='list__item'
                    key={index}>
                    <NavLink to={`/comics/${id}`}>
                        <img src={img} alt="comics" />
                        <p className='list__comic-name'>{title.length > 60 ? title.slice(0, 60) + '...' : title}</p>
                        <p className='list__comic-price'>{price}$</p>
                    </NavLink>
                </li>
            )
        })

        return (
            <ul className='list'>
                {newComicsList}
            </ul>
        )
    }

    const errorMsg = error ? <ErrorMessage /> : null
    const spiner = loading && newItemLoading ? <Spinner /> : null

    return (
        <section className='comics'>
            <ComicsBanner />
            {setContent(process, () => comicsList(comics), newItemLoading)}
            <button 
                disabled={newItemLoading}
                style={{'display': ended ? 'none' : 'block'}}
                onClick={updateComics}
                className='btn btn-long'>
                Load More</button>
        </section>

    )
}

export default Comics
