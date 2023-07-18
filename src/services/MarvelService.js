
class MarvelService  {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=90c3d833a63df444a51769fa2fbf66eb';
    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacter = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    } 

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    } 

    _transformCharacter = (char) => {
        if(char.description === "") {
            char.description = "This character dont have a description";
        } else if(char.description.length > 200) {
            char.description = char.description.substring(0, char.description.length - 3) + "...";
        } 

        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;