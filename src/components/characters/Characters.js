import { Component } from 'react'
import React from 'react'
import Service from '../../services/Service'
import Spinner from '../spinner/Spinner'

import './characters.scss'
import '../../style/buttons.scss'

class Characters extends Component {

    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
        refChar: [],
    }

    service = new Service()

    itemRefs = []

    setRefs = ref => {
        this.itemRefs.push(ref)
    }

    focusOnItem = (index) => {
        this.itemRefs.forEach(el => el.classList.remove('characters__card-active'))
        this.itemRefs[index].classList.add('characters__card-active')
        this.itemRefs[index].focus()
    }

    onError = () => {
        this.setState({
            error: true
        })
    }

    onCharAllLoaded = (characters) => {
        let ended = false
        if (characters.length < 9) {
            ended = true
        }

        this.setState((prevState) => ({
                characters: [...prevState.characters, ...characters],
                loading: false,
                newItemLoading: false,
                offset: prevState.offset + 9,
                charEnded: ended
            })
        )
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.service.getAllChracters(offset)
            .then(this.onCharAllLoaded)
            .catch(this.onError)
    }

    // loadCharByScroll = () => {
    //     this.onRequest(this.state.offset)
    // }

    createArrRef = elem => {
        this.myRefChar = elem
    }

    componentDidMount() {
        this.onRequest()
       //window.addEventListener('scrollend', this.loadCharByScroll)
    }

    findString = (string, substring) => {
        const index = string.indexOf(substring)
        if (index !== -1) {
            return 'characters__card__img characters__card__img-not'
        }
        return 'characters__card__img'
    }

    showCharByEnter = (e, id) => {
        if (e.code === "Enter") {
            this.props.onCharSelected(id)
        }
    }

    showCharacters = () => {
        const elements = this.state.characters.map(({name, thumbnail, id}, index) => {
            const imgClass = this.findString(thumbnail, 'image_not_available.jpg')
            return (
                <li ref={this.setRefs}
                    tabIndex={1 + index}
                    className="characters__card" 
                    key={id}
                    onClick={(e) => {
                        this.props.onCharSelected(id)
                        this.focusOnItem(index)
                        }}
                    onKeyDown={e => this.showCharByEnter(e, id)}>
                        
                    <img 
                        className={imgClass} 
                        src={thumbnail} 
                        alt="character"/>
                    <p>{name}</p>
                </li>
            )
        })
        return elements
    }

    render () {
        const {loading, offset, newItemLoading, charEnded} = this.state
        const spinner = loading ? <Spinner /> : null
        const charElements = loading ? null : this.showCharacters()

        return (
            <div className='wrapper'>
                {spinner}
                <ul className='characters'>
                    {charElements}
                </ul>
                <button 
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    className='btn btn-long'
                    >
                    Load More
                </button>
            </div>
        )
    }
    
}

export default Characters
