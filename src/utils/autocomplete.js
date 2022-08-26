import { fetchData, debounce, onMovieSelect } from '../api/omdb_api'

export const createAutoComplete = ({ autocompleteDiv }) => {
  autocompleteDiv.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `

  const input = autocompleteDiv.querySelector('input')
  const dropdown = autocompleteDiv.querySelector('.dropdown')
  const resultsWraper = autocompleteDiv.querySelector('.results')

  const onInput = async e => { 
    const movies = await fetchData(e.target.value)
    console.log('movies', movies)

    if (!movies.length) {
      dropdown.classList.remove('is-active')
      return
    }

    resultsWraper.innerHTML = ''

    dropdown.classList.add('is-active')
    for (let movie of movies) {
      const option = document.createElement('a')
      const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster

      option.classList.add('dropdown-item')
      option.innerHTML = `
        <img src="${imgSrc}" />
        ${movie.Title}
      `

      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active')
        input.value = movie.Title
        onMovieSelect(movie)
      })

      resultsWraper.appendChild(option)
    }
  }
  input.addEventListener('input', debounce(onInput, 3000))

  document.addEventListener('click', e => {
    if (!autocompleteDiv.contains(event.target)) {
      dropdown.classList.remove('is-active')
    }
  })
}