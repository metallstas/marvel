import heroes from '../../resourses/img/Avengers.png'
import avengers from '../../resourses/img/Avengers logo.png'

import './comicsBanner.scss'

const ComicsBanner = () => {
    return (
        <div className='banner'>
            <img src={heroes} alt='heroes' />
            <p>New comics every week!<br/>
            Stay tuned!</p>
            <img src={avengers} alt='avengers' />
        </div>
    )
}

export default ComicsBanner