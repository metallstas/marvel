import { useEffect, useState } from 'react'
import useService from '../../services/Service'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './comics.scss'
import '../../style/buttons.scss'

import heroes from '../../resourses/img/Avengers.png'
import avengers from '../../resourses/img/Avengers logo.png'

const Comics = () => {
    const [comics, setComics] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [ended, setEnded] = useState(false)
    
    const {getAllComics, clearError, error, loading} = useService()

    useEffect(() => {
        onRequest(true)
    }, [])

    const onRequest = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(newComics => onComicsesLoaded(newComics))

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
        return comics.map(({id, img, title, price}, index) => {
            return (
                <li className='list__item'
                    key={index}>
                    <img src={img} alt="comics" />
                    <p className='list__comic-name'>{title.length > 60 ? title.slice(0, 60) + '...' : title}</p>
                    <p className='list__comic-price'>{price}$</p>
                </li>
            )
        })
    }

    const errorMsg = error ? <ErrorMessage /> : null
    const spiner = loading && newItemLoading ? <Spinner /> : null

    return (
        <section className='comics'>
            <div className='comics__banner'>
                <img src={heroes} alt='heroes' />
                <p>New comics every week!<br/>
                Stay tuned!</p>
                <img src={avengers} alt='avengers' />
            </div>
            {errorMsg}

            {loading && !newItemLoading ?
             <Spinner /> : 
            <ul className='list'>
                {comicsList(comics)}
            </ul> }
            {spiner}

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
