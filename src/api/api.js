import axios from 'axios'

import { runComparison } from '../utils/runComparison.js'
import { movieDetailTemplate } from '../utils/movieDetailTemplate.js'

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