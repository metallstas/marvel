import './skeleton.scss'


const Skeleton = () => {
    return (
        <>
            <p className="select-char">Please select a character to see information</p>
            <div className="skeleton-wrap">
                <div></div>
                <div></div>
            </div>
            <div className='skeleton-item'></div>
            <div className='skeleton-item'></div>
            <div className='skeleton-item'></div>
        </>
    )
}

export default Skeleton
