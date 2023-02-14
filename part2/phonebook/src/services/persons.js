import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getPhonebook = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createEntry = newObj => {
  const request = axios.post(baseUrl, newObj)
  return request.then(response => response.data)
}

const deleteEntry = (id) => {
  return  (axios.delete(`${baseUrl}/${id}`)
  )
}
const updateEntry= (id, newObj)=>{
  const request= axios.put(`${baseUrl}/${id}`, newObj)
  return request.then(response=> response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getPhonebook,
  createEntry,
  deleteEntry,
  updateEntry
}