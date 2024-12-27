import { useState, useEffect } from 'react'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'
import useService from '../../services/Service'
import SearchChar from '../searchChar/SearchChar'

import './characterInfo.scss'
import '../../style/buttons.scss'
import { NavLink } from 'react-router-dom'

const CharacterInfo = ({charId}) => {

    const [char, setChar] = useState(null)

    const {loading, error, getChracterById, clearError} = useService()

    useEffect(() => {
        updateChar()
    }, [charId])

    const updateChar = () => {
        if (!charId) {
            return
        }
        clearError()
        getChracterById(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null 

    return (
        <section className='char-info'>
            <div className="char">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
            <SearchChar />
        </section>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char

    const [comicsListShow, setComicsListShow] = useState([])

    useEffect(() => {
        setComicsListShow(comicsListShort())
    }, [])

    const btn = <button onClick={() => {setComicsListShow(allComicsList)}} className="char__btn">More</button> 
    
    const allComicsList = () => {
        return comics.map((el, i) => {
            const id = el.resourceURI.match(/\/\d{4,5}/g)[0].slice(1)
            return <li className="char__comics__list__item" key={i}><NavLink to={`/comics/${id}`}>{el.name}</NavLink></li>
        })
    }

    const comicsListShort = () => {

        if (comics.length === 0) {
            return <span>There is no comics for this hero</span>
        }

        const allComics = comics.map((el, i) => {
            const id = el.resourceURI.match(/\/\d{4,5}/g)[0].slice(1)

            return <li 
                        className="char__comics__list__item" 
                        key={i}>
                        <NavLink to={`/comics/${id}`}>{el.name}</NavLink>
                        </li>
        })

        return allComics.splice(0, 10)

    }

    return (
        <>
            <div className="char__control">
                <img className="char__photo" src={thumbnail} alt="character" />
                <div className="char__btns">
                    <p>{name}</p>
                    <a className="btn btn-main" href={homepage}>Homepage</a>
                    <a className="btn btn-second" href={wiki}>Wiki</a>
                </div>
            </div>
            <div className="char__descr">
                {!description ? 'There is no description for this hero' : description}
            </div>
            <div className="char__comics">
                <p>Comics: </p>
                <ul className='char__comics__list'>
                    {comicsListShow}
                </ul>
                {comicsListShow.length < 11 ? btn : null}
            </div>
        </>
    )
}

export default CharacterInfo
