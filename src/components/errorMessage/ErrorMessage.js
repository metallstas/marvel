import error from './error.gif'

const ErrorMessage = () => {
    return <img 
        style={{
            display: 'block',
            width: '150px', 
            height: '150px', 
            objectFit: 'contain',
            margin: '20px auto',
        }} 
        src={error}
        alt='error'
        />
}

export default ErrorMessage
