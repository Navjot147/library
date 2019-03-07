import config from "../config";
export function searchBooks(query, typeId) {
    let url = typeId === 1 ? config.apiPath + '/search.json?q=' + query + '&limit=10' : config.apiPath + '/api/books?bibkeys=ISBN:' + query + '&format=json'
    return fetch(url);
}
