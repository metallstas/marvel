import { Component } from 'react'
import Service from '../../services/Service'
import Spinner from '../spinner/Spinner'

import './characters.scss'
import '../../style/buttons.scss'

class Characters extends Component {

    state = {
        characters: [],
        loading: true,
    }

    service = new Service()


    onCharAllLoaded = (characters) => {
        this.setState({
            characters,
            loading: false,
        })
    }

    componentDidMount() {
        this.service
            .getAllChracters()
            .then(this.onCharAllLoaded)
    }

    findString = (string, substring) => {
        const index = string.indexOf(substring)
        if (index !== -1) {
            return 'characters__card__img characters__card__img-not'
        }
        return 'characters__card__img'
    }

    showCharacters = () => {
        const elements = this.state.characters.map(({name, thumbnail, id}) => {
            const imgClass = this.findString(thumbnail, 'image_not_available.jpg')
            return (
                <li 
                    className="characters__card" 
                    key={id}
                    onClick={() => this.props.onCharSelected(id)}>
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
        const spinner = this.state.loading ? <Spinner /> : null
        const charElements = this.state.loading ? null : this.showCharacters()

        return (
            <div className='wrapper'>
                {spinner}
                <ul className='characters'>
                    {charElements}
                </ul>
                <button className='btn btn-long'>Load More</button>
            </div>
        )
    }
    
}

export default Characters
