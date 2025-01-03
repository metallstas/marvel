import { useHttp } from "../hooks/http.hooks"

const useService = () => {
    const {request, clearError, process, setProcess } = useHttp()
    
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=3797e9674253bb091b4eb9be248331d7'

    const _baseOffset = 210

    // https://gateway.marvel.com:443/v1/public/characters?name=Thor&apikey=3797e9674253bb091b4eb9be248331d7

    const getCharByName = async (name) => {
        const result = await request(`${_apiBase}characters?nameStartsWith=${name}&${_apiKey}`)
        return {status: result.code, data: result.data.results}
    }

    const getSingleCharByName = async (name) => {
        const result = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return _transformCharacter(result.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const result = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return result.data.results.map(_transformComics)
    }

    const getAllChracters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getChracterById = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getComicById = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            pageCount: comics.pageCount,
            description: comics.description,
            title: comics.title,
            price: comics.prices[0].price,
            img: comics.thumbnail.path + '.' + comics.thumbnail.extension
        }
    }

    return {process,
            setProcess, 
            getAllChracters,
            getChracterById, 
            clearError, 
            getAllComics,
            getComicById, 
            getCharByName, 
            getSingleCharByName}
}

export default useService
