import { useState, useEffect } from 'react'
import useService from '../../services/Service'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import setContent from '../utils/setContent'

import './randomChar.scss'
import '../../style/buttons.scss'

import hammer from '../../resourses/img/mjolnir.png'
import shield from '../../resourses/img/shield.png'

const RandomChar = ({onCharSelected}) => {

    const [char, setChar] = useState({})

    const {process, setProcess, getChracterById, clearError} = useService()

    useEffect(() => {
        updateChar()
    }, [])

    const onCharLoaded = (newChar) => {
        setChar(newChar)
    }

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getChracterById(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="random-char">
            <div className="random-char__block">
                {setContent(process, () => View({char, onCharSelected}))}
            </div>
            <div className="random-char__try">
                <img className="random-char__try__hammer" src={hammer} alt="hammer" />
                <img className="random-char__try__shield" src={shield} alt="shield" />
                <div>
                    <p>Random character for today!<br/> Do you want to get to know him better?</p>
                    <span>Or choose another one</span>
                </div>
                <button onClick={updateChar} className="btn btn-second">try it</button>
            </div>
        </div>
    )
}

const View = ({char, onCharSelected}) => {
    const {name, description, thumbnail, homepage, wiki, id} = char

    const showDescr = (descr) => {
        if (!descr) {
            return 'There is no description for this hero'
        }
        if (descr.length >= 215) {
            return descr.slice(0, 215) + '...'
        }
        return descr
    }

    return (
        <>
            <div className="random-char__img-wrapper">
                <img onClick={() => onCharSelected(id)} src={thumbnail} alt="char" />
            </div>
            <div className="random-char__descr">
                <div>
                    <h2 onClick={() => onCharSelected(id)}>{name}</h2>
                    <p>{showDescr(description)} </p>
                </div>
                <div className='random-char__btn-block'>
                    <a href={homepage}>
                        <button className='btn btn-main'>homepage</button>
                    </a>
                    <a href={wiki}>
                        <button className='btn btn-second'>wiki</button>
                    </a>
                </div>
            </div>
        </>
    )
}

export default RandomChar
