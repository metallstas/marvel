import './characterInfo.scss'
import '../../style/buttons.scss'

import char from '../../resourses/img/535feab462a64 1.jpg'


const CharacterInfo = () => {
    return (
        <section className="char">
            <div className="char__control">
                <img className="char__photo" src={char} alt="character" />
                <div className="char__btns">
                    <p>Name</p>
                    <button className="btn btn-main">homepage</button>
                    <button className="btn btn-second">wiki</button>
                </div>
            </div>
            <div className="char__descr">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla tempora aperiam repellat a sint. Rerum minus expedita nam veritatis maiores porro nobis aspernatur, voluptatibus neque dicta sint quas autem molestias.
            </div>
            <div className="char__comics">
                <p>Comics: </p>
                <ul>
                    <li>a</li>
                    <li>s</li>
                    <li>d</li>
                    <li>f</li>
                    <li>g</li>
                </ul>
            </div>
        </section>
    )
}

export default CharacterInfo
