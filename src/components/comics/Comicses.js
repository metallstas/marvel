import { useEffect, useState } from 'react'
import useService from '../../services/Service'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './comicses.scss'
import '../../style/buttons.scss'

import heroes from '../../resourses/img/Avengers.png'
import avengers from '../../resourses/img/Avengers logo.png'

const Comicses = () => {
    const [comicses, setComicses] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [ended, setEnded] = useState(false)
    
    const {getAllComicses, clearError, error, loading} = useService()

    useEffect(() => {
        onRequest(true)
    }, [])

    const onRequest = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComicses(offset)
            .then(newComicses => onComicsesLoaded(newComicses))

        setOffset(prev => prev + 8)
    }

    const onComicsesLoaded = (newComicses) => {
        let ended = false
        if (newComicses.length < 8) {
            ended = true
        }
        setComicses(prev => [...prev, ...newComicses])
        setNewItemLoading(false)
        setEnded(ended)
    }

    const updateComicses = () => {
        clearError()
        setOffset(prev => prev + 8)
        onRequest(false)  
    }

    const comicsList = (comicses) => {
        return comicses.map(({id, img, title, price}, index) => {
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
            <ul className='list'>
                {comicsList(comicses)}
            </ul>
            {spiner}
            
            <button 
                disabled={newItemLoading}
                style={{'display': ended ? 'none' : 'block'}}
                onClick={updateComicses}
                className='btn btn-long'>
                Load More</button>
        </section>

    )
}

export default Comicses
