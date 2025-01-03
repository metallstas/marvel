import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import useService from "../../../services/Service"
import setContent from "../../utils/setContent"

import './singleComic.scss'
import ComicsBanner from "../../ComicsBanner/ComicsBanner"

const SingleComic = () => {
    const {comicId, name, input} = useParams()

    const [comic, setComic] = useState(null)
    const [allChar, setAllChar] = useState(null)
    const [singleChar, setSingleChar] = useState(null)


    const {getComicById, clearError, getCharByName, getSingleCharByName, process, setProcess} = useService()

    useEffect(() => {
        if (comicId) updateComic()
        if (input) updateChar()
        if (name) updateSingleChar()
            
    }, [comicId, name, input])

    const updateComic = () => {
        clearError()
        getComicById(comicId)
            .then(setComic)
            .then(() => setProcess('confirmed'))
    }

    const updateChar = () => {
        clearError()
        getCharByName(input)
            .then(res => setAllChar(res.data))
            .then(() => setProcess('confirmed'))
    }

    const updateSingleChar = () => {
        clearError()
        getSingleCharByName(name)
            .then(setSingleChar)
            .then(() => setProcess('confirmed'))
    }

    return (
        <>
            <ComicsBanner />
            { comicId? setContent(process, ViewComic, comic) : null}
            { singleChar? setContent(process, ViewChar, singleChar) : null}
            { input? setContent(process, () => ViewCharList({allChar, input})) : null}
        </>
    )
}

const ViewComic = ({data}) => {
    const {title, description, pageCount, img, price } = data

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

const ViewChar = ({data}) => {
    const {thumbnail, name, description} = data
    return (
        <section className="single-char">
            <img className="single-char__img" src={thumbnail} alt='photo char'/>
            <div className="single-char__info">
                <p className="single-char__info__name">{name}</p>
                <p className="single-char__info__descr">{description ? description : 'There is no description for this character'}</p>
            </div>
        </section>
    )
}

const ViewCharList = ({allChar, nameInput}) => {
    
    return (
        <section className="charactersList">
            <ul className="charactersList__list">
                {allChar.map(({id, name}) => {
                    return <NavLink key={id} to={`/characters/${nameInput}/${name}`}>
                        <li className="charactersList__list__item">{name}</li>
                    </NavLink>
                })}
            </ul>
        </section>
    )
}

export default SingleComic
