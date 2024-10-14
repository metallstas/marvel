import './characters.scss'
import '../../style/buttons.scss'

import images from '../../resourses/img/535feab462a64 1.jpg'

const Characters = () => {
    return (
        <div className='wrapper'>
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
        <button className='btn btn-long'>Load More</button>
        {/* <button className='btn btn-long'>Load More</button> */}
        </div>
    )
}

export default Characters
