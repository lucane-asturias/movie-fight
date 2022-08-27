import axios from 'axios'

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

export const onMovieSelect = async (movie, summaryElement) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '3486c1a5',
      i: movie.imdbID
    }
  })

  console.log('response.data', response.data)
  summaryElement.innerHTML = movieTemplate(response.data)
}

const movieTemplate = (movieDetail) => {
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

    <article class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">BoxOffice</p>
    </article>
    <article  class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
  `
}