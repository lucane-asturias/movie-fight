import axios from 'axios'

let leftMovie 
let rightMovie

export const fetchData = async (endpoint, searchTerm = null) => {
  const response = await axios.get(endpoint, {
    params: {
      apikey: '3486c1a5',
      s: searchTerm
    }
  })

  if (response.data.Error) return []

  console.log('response.data', response.data)
  return response.data.Search
}

export const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '3486c1a5',
      i: movie.imdbID
    }
  })

  console.log('response.data', response.data)
  summaryElement.innerHTML = movieDetailTemplate(response.data)

  if (side === 'left') leftMovie = response.data
  else rightMovie = response.data

  if (leftMovie && rightMovie) {
    runComparison()
  }
}

const runComparison = () => {
  console.log('hora de comparar')
}

const movieDetailTemplate = (movieDetail) => {
  const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
  const metascore = parseInt(movieDetail.Metascore)
  const imdbRating = parseFloat(movieDetail.imdbRating)
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''))

  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    console.log('prev', prev)
    console.log('word', word)
    const value = parseInt(word)
    if (isNaN(value)) return prev
    else return prev + value
  }, 0)

  return `
    <artice class="media">
      <figure class="media-left">
        <div class="image">
          <img src="${movieDetail.Poster}" />
        </div>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </artice>

    <article data-value=${awards} class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">BoxOffice</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
  `
}