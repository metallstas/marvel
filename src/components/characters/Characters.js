import './characters.scss'

import images from '../../resourses/img/535feab462a64 1.jpg'

const Characters = () => {
    return (
        <div className='characters'>
            <div className="characters__card">
                <img src={images} alt="character" />
                <p>
                    Name
                </p>
            </div>

            <div className="characters__card characters__card-active">
                <img src={images} alt="character" />
                <p>
                    Name
                </p>
            </div>

            <div className="characters__card">
                <img src={images} alt="character" />
                <p>
                    Name
                </p>
            </div>

            <div className="characters__card">
                <img src={images} alt="character" />
                <p>
                    Name
                </p>
            </div>

            <div className="characters__card">
                <img src={images} alt="character" />
                <p>
                    Name
                </p>
            </div>

            <div className="characters__card">
                <img src={images} alt="character" />
                <p>
                    Name
                </p>
            </div>

            <div className="characters__card">
                <img src={images} alt="character" />
                <p>
                    Name
                </p>
            </div>

            <div className="characters__card">
                <img src={images} alt="character" />
                <p>
                    Name
                </p>
            </div>

            <div className="characters__card">
                <img src={images} alt="character" />
                <p>
                    Name
                </p>
            </div>
        </div>
    )
}

export default Characters
