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