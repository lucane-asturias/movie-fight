import axios from 'axios'

// const journalApi = axios.create({
//   baseURL: 'https://vue-journal-188fb-default-rtdb.firebaseio.com'
// })

const fetchData = async () => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '3486c1a5',
      s: 'avengers'
    }
  })

  console.log('response.data', response.data)
}

export default fetchData