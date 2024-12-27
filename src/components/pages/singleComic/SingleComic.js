import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import useService from "../../../services/Service"

import './singleComic.scss'
import ErrorMessage from "../../errorMessage/ErrorMessage"
import Spinner from "../../spinner/Spinner"
import ComicsBanner from "../../ComicsBanner/ComicsBanner"

const SingleComic = () => {
    const {comicId, name, input} = useParams()
    console.log(input, name, comicId)
    const [comic, setComic] = useState(null)
    const [allChar, setAllChar] = useState(null)
    const [singleChar, setSingleChar] = useState('')


    const {loading, error, getComicById, clearError, getCharByName, getSingleCharByName} = useService()

    useEffect(() => {
        if (comicId) updateComic()
        if (input) updateChar()
        if (name) updateSingleChar()
            
    }, [comicId, name, input])

    const updateComic = () => {
        clearError()
        getComicById(comicId)
            .then(setComic)
    }

    const updateChar = () => {
        clearError()
        getCharByName(input)
            .then(res => setAllChar(res.data))
    }

    const updateSingleChar = () => {
        clearError()
        getSingleCharByName(name)
            .then(setSingleChar)
    }

    const content = () => {
        if (comicId) {return contentComic}
        if (name) {return contentSingleChar}
        if (input) {return contentAllChar}
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const contentComic = !(loading || error || !comic) ? <ViewComic comic={comic} /> : null
    const contentSingleChar = !(loading || error || !singleChar) ? <ViewChar char={singleChar} /> : null
    const contentAllChar = !(loading || error|| !allChar) ? <ViewCharList allChar={allChar} nameInput={input} /> : null

    return (
        <>
            <ComicsBanner />
            {errorMessage}
            {spinner}
            {content()}
        </>
    )
}

const ViewComic = ({comic}) => {
    const {title, description, pageCount, img, price } = comic

    return (
        <section className="comic">
            <img src={img} alt="comic book cover" />
            <div className="comic__info">
                <h3 className="comic__info__title">{title}</h3>
                <p>{description.length > 0 ? description : 'There is no description for this comic'}</p>
                <p>{pageCount} pages</p>
                <p>Language: en-us</p>
                <p className="comic__info__price">{price}$</p>
            </div>
            <NavLink to="/comics" className="comic__link">Back to all</NavLink>
        </section>
    )
}

const ViewChar = ({char}) => {
    const {thumbnail, name, description} = char
    return (
        <section className="char">
            <img className="char__img" src={thumbnail} alt='photo char'/>
            <div className="char__info">
                <p className="char__info__name">{name}</p>
                <p className="char__info__descr">{description}</p>
            </div>
        </section>
    )
}

const ViewCharList = ({allChar, nameInput}) => {
    
    return (
        <section className="characters">
            <ul className="characters__list">
                {allChar.map(({id, name}) => {
                    return <li key={id} className="characters__list__item"><NavLink to={`/${nameInput}/${name}`}>{name}</NavLink></li>
                })}
            </ul>
        </section>
    )
}

export default SingleComic
