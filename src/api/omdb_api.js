import axios from 'axios'

export const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '3486c1a5',
      s: searchTerm
    }
  })

  console.log('response.data', response.data)
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