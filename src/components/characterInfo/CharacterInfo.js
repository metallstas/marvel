import { useState, useEffect } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'
import Service from '../../services/Service'

import './characterInfo.scss'
import '../../style/buttons.scss'

const CharacterInfo = ({charId}) => {

    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const service = new Service()

    useEffect(() => {
        updateChar()
    }, [charId])

    const updateChar = () => {
        if (!charId) {
            return
        }
        onLoadingChar()

        service
            .getChracterById(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoaded = (char) => {
        setChar(char)
        setLoading(false)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const onLoadingChar = () => {
        setLoading(true)
    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null 

    return (
        <section className="char">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </section>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char

    const comicsList = () => {
        if (comics.length === 0) {
            return <span>There is no comics for this hero</span>
        } 

        return comics.map((el, i) => {
            if(i > 10) {
                return
            }
            
            return <li key={i}>{el.name}</li>
        })
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
                <ul>
                    {comicsList()}
                </ul>
            </div>
        </>
    )
}

export default CharacterInfo
