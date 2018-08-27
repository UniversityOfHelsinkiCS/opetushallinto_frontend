import axios from 'axios'

export const getErrors = () => 
  axios(`https://opetushallinto.cs.helsinki.fi/update_status.json?authorization=${TOKEN}`)  

export const _updateMetadata = () =>     
  fetch(
    `https://opetushallinto.cs.helsinki.fi/courses/create_metadata?authorization=${TOKEN}`,
    { 
      method: 'POST',
      headers: new Headers().append('Authorization', TOKEN)
    }
  )

export const updateMetadata = () =>     
  axios.post(
    `https://opetushallinto.cs.helsinki.fi/courses/create_metadata?authorization=${TOKEN}`,
    { headers: { Authorization: TOKEN } }
  )


export const coursesFor = (organization) => {
  const url = `https://opetushallinto.cs.helsinki.fi/organizations/${organization}/cached_courses.json?authorization=${TOKEN}`
  return axios.get(url)
} 

export const updateRegistrations = (id) =>  {
  const url = `https://opetushallinto.cs.helsinki.fi/courses/${id}?authorization=${TOKEN}`
  return axios.post(url)
}  


export const updateMetadataOf = (id) => {
  const url = `https://opetushallinto.cs.helsinki.fi/courses/${id}/metadata?authorization=${TOKEN}`
  return axios.post(url)
}  