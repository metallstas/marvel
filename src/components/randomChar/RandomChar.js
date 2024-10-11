import './randomChar.scss'
import '../../style/buttons.scss'
import char from '../../resourses/img/Thumbnail.jpg'
import hammer from '../../resourses/img/mjolnir.png'
import shield from '../../resourses/img/shield.png'

const RandomChar = () => {
    return (
        <div className="random-char">
            <div className="random-char__block">
                <img src={char} alt="char" />
                <div className="random-char__descr">
                    <h2>THOR</h2>
                    <p>As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</p>
                    <div>
                        <button className='btn btn-main'>homepage</button>
                        <button className=' btn btn-second'>wiki</button>
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

export default RandomChar
