
const allChar = 'https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=3797e9674253bb091b4eb9be248331d7'

class Service {
    
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=3797e9674253bb091b4eb9be248331d7'

    getResource = async (url) => {
        let res = await fetch(url)
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
    
        return await res.json()
    }

    getAllChracters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getChracterById = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        
        }
    }
}

export default Service
