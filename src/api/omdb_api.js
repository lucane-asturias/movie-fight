import axios from 'axios'

export const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '3486c1a5',
      s: searchTerm
    }
  })

  if (response.data.Error) return []

  console.log('response.data', response.data)
  return response.data.Search
}

export const debounce = (func, delay = 1000) => {
  let timeoutId
  return (...args) => {
    // console.log('args', args) e.target.value
    if (timeoutId) clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      func.apply(null, args) 
    }, delay)
  }
}

export const onMovieSelect = async (movie) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '3486c1a5',
      i: movie.imdbID
    }
  })

  console.log('response.data', response.data)
  document.querySelector('#summary').innerHTML = movieTemplate(response.data)
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
  `
}