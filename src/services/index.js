export const getErrors = () => 
  fetch('https://opetushallinto.cs.helsinki.fi/update_status.json')  

export const updateMetadata = () =>     
  fetch(
    'https://opetushallinto.cs.helsinki.fi/courses/create_metadata',
    { 
      method: 'POST',
      headers: new Headers().append('Authorization', TOKEN)
    }
  )