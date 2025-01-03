import { useState, useEffect, useRef } from 'react'
import React from 'react'
import useService from '../../services/Service'
import Spinner from '../spinner/Spinner'

import './characters.scss'
import '../../style/buttons.scss'
import ErrorMessage from '../errorMessage/ErrorMessage'

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

const Characters = ({onCharSelected}) => {

    const [characters, setCharacters] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const {getAllChracters, process, setProcess } = useService()

    const itemRefs = useRef([])

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const focusOnItem = (index) => {
        itemRefs.current.forEach(el => el.classList.remove('characters__card-active'))
        itemRefs.current[index].classList.add('characters__card-active')
        itemRefs.current[index].focus()
    }

    const onCharAllLoaded = (newCharacters) => {
        let ended = false
        if (newCharacters.length < 9) {
            ended = true
        }

        setCharacters(characters => [...characters, ...newCharacters])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)

    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)  
        getAllChracters(offset)
            .then(onCharAllLoaded)
            .then(() => setProcess('confirmed'))
    }

    // loadCharByScroll = () => {
    //     this.onRequest(this.state.offset)
    // }

    const findString = (string, substring) => {
        const index = string.indexOf(substring)
        if (index !== -1) {
            return 'characters__card__img characters__card__img-not'
        }
        return 'characters__card__img'
    }

    const showCharByEnter = (e, id, index) => {
        if (e.code === "Enter") {
            onCharSelected(id)
            focusOnItem(index)
        }
    }

    const showCharacters = () => {
        const elements = characters.map(({name, thumbnail, id}, index) => {
            const imgClass = findString(thumbnail, 'image_not_available.jpg')
            return (
                <li ref={el => itemRefs.current[index] = el}
                    tabIndex={1 + index}
                    className="characters__card" 
                    key={id}
                    onClick={(e) => {
                        onCharSelected(id)
                        focusOnItem(index)
                        }}
                    onKeyDown={e => showCharByEnter(e, id, index)}>
                        
                    <img 
                        className={imgClass} 
                        src={thumbnail} 
                        alt="character"/>
                    <p>{name}</p>
                </li>
            )
        })
        return (
            <ul className='characters'>
                {elements}
            </ul>
        )
    }

    // const items = showCharacters()
    // const errorMsg = error ? <ErrorMessage /> : null
    // const spinner = loading && !newItemLoading ? <Spinner /> : null

    return (
        <div className='wrapper'>
            {setContent(process, () => showCharacters(), newItemLoading )}
            <button 
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none' : 'block'}}
                className='btn btn-long'
                >
                Load More
            </button>
        </div>
    )
    
    
}

export default Characters
