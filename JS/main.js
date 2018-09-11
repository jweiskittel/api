const baseURL = 'https://api.openaq.org/v1/locations'
let url;
const clear = document.querySelector('.clear')
const submit = document.querySelector('.submit')
const search = document.querySelector('.search')
const section = document.querySelector('section')

clear.style.display = 'none'

submit.addEventListener('click', fetchResults)
submit.addEventListener('submit', fetchResults)
clear.addEventListener('click', refresh)

function fetchResults(e) {
    e.preventDefault()
    url = `${baseURL}?coordinates=${search.value}&nearest=5`
    console.log(url)
    fetch(url)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        displayResults(json)
    })
    .catch(function(err) {
        console.log(err)
    })
}

function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild)
    }
    for(i = 0; i < json.results.length; i++) {
        let clearfix = document.createElement('div')
        let heading2 = document.createElement('h2')
        let para = document.createElement('p')
        console.log(json)

        heading2.textContent = `${json.results[i].location}, ${json.results[i].country}`
        para.textContent = `latitude: ${json.results[i].coordinates.latitude}, longitude: ${json.results[i].coordinates.longitude}`

        para.setAttribute('class', 'coordinates')
        clearfix.setAttribute('class', 'clearfix')
        section.appendChild(clearfix)
        clearfix.appendChild(heading2)
        clearfix.appendChild(para)
    }
    if(json.results.length !== 0) {
        clear.style.display = 'block'
    } else {
        clear.style.display = 'none'
    }
}

function refresh() {
    document.location.reload(true)
}
