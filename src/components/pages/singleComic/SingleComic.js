import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import useService from "../../../services/Service"

import './singleComic.scss'
import ErrorMessage from "../../errorMessage/ErrorMessage"
import Spinner from "../../spinner/Spinner"
import ComicsBanner from "../../ComicsBanner/ComicsBanner"

const SingleComic = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)

    const {loading, error, getComicById, clearError} = useService()

    useEffect(() => {
        updateComic()
        console.log(comic)
    }, [comicId])

    const updateComic = () => {
        clearError()
        getComicById(comicId)
            .then(setComic)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, img, price } = comic

    return (
        <>
            <ComicsBanner />
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
        </>
        
    )
}

export default SingleComic
