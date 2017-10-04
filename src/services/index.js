export const getErrors = () => 
  fetch(`https://opetushallinto.cs.helsinki.fi/update_status.json?authorization=${TOKEN}`)  

export const updateMetadata = () =>     
  fetch(
    `https://opetushallinto.cs.helsinki.fi/courses/create_metadata?authorization=${TOKEN}`,
    { 
      method: 'POST',
      headers: new Headers().append('Authorization', TOKEN)
    }
  )

export const coursesFor = (organization) => {
  const url = `https://opetushallinto.cs.helsinki.fi/organizations/${organization}/cached_courses.json`
  return fetch(url,
    { 
      headers: new Headers().append('Authorization', TOKEN)
    }
  )
} 

export const updateRegistrations = (id) =>  {
  const url = `https://opetushallinto.cs.helsinki.fi/courses/${id}?authorization=${TOKEN}`
  return fetch(
    url,
    { 
      method: 'POST'
    }
  )
}  

export const updateMetadataOf = (id) => {
  const url = `https://opetushallinto.cs.helsinki.fi/courses/${id}/metadata?authorization=${TOKEN}`
  return fetch(
    url,
    { 
      method: 'POST'
    }
  )
}  