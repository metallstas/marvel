import { Component } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'
import Service from '../../services/Service'

import './characterInfo.scss'
import '../../style/buttons.scss'

class CharacterInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    }

    service = new Service()

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
            return
        }
        this.onLoadingChar()

        this.service
            .getChracterById(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
        
        this.foo.bar = 0

    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    onLoadingChar = () => {
        this.setState({loading: true})
    }

    render() {
        const {char, loading, error} = this.state
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
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char

    const comicsList = () => {
        if (comics.length === 0) {
            return <span>There is no comics for this hero</span>
        } 

        return comics.map((el, i) => {
            if(i > 10) {
                if (i === comics.length - 2) {
                    return <p>...</p>
                }
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
