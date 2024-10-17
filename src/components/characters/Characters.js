import { Component } from 'react'

import Service from '../../services/Service'

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
        console.log(this.state)
        const elements = this.state.characters.map(({name, thumbnail}) => {
            const idKey = Math.floor(Math.random() * 10000000)
            const imgClass = this.findString(thumbnail, 'image_not_available.jpg')
            return (
                <div className="characters__card" key={idKey}>
                    <img 
                        className={imgClass} 
                        src={thumbnail} 
                        alt="character"/>
                    <p>{name}</p>
                </div>
            )
        })

        return elements
    }

    render () {
        const charElements = this.showCharacters()
        // image_not_available.jpg

        return (
            <div className='wrapper'>
                <div className='characters'>
                    {charElements}
                </div>
                <button className='btn btn-long'>Load More</button>
            </div>
        )
    }
    
}

export default Characters
