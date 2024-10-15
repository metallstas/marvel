import { Component } from 'react'
import Service from '../../services/Service'

import './randomChar.scss'
import '../../style/buttons.scss'

import hammer from '../../resourses/img/mjolnir.png'
import shield from '../../resourses/img/shield.png'

class RandomChar extends Component {
    constructor(props) {
        super()
        this.updateChar()
    }

    state = {
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null,
    }

    service = new Service()

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.service
            .getAllChracters()
            .then(res => console.log(res))
            // .getChracterById(id)
            // .then(res => {
            //     this.setState(res)
            // })
    }

    render () {
        const {name, description,thumbnail, homepage, wiki} = this.state

        return (
            <div className="random-char">
                <div className="random-char__block">
                    <div className="random-char__img-wrapper">
                        <img src={thumbnail} alt="char" />
                    </div>
                    <div className="random-char__descr">
                        <h2>{name}</h2>
                        <p>{!description ? 'There is no description for this hero' : description}</p>
                        <div>
                            <a href={homepage}>
                                <button className='btn btn-main'>homepage</button>
                            </a>
                            <a href={wiki}>
                                <button className='btn btn-second'>wiki</button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="random-char__try">
                    <img className="random-char__try__hammer" src={hammer} alt="hammer" />
                    <img className="random-char__try__shield" src={shield} alt="shield" />
                    <div>
                        <p>Random character for today!<br/> Do you want to get to know him better?</p>
                        <span>Or choose another one</span>
                    </div>
                    <button className="btn btn-second">try it</button>
                </div>
            </div>
        )
    }
    
}

export default RandomChar
