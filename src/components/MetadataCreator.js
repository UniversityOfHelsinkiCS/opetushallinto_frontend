import React from 'react'
const base64 = require('base-64')

class MetadataCreator extends React.Component {
  constructor(){
    super()
    this.state = {
      response: null,
      disabled: false
    }
    this.fetchMetadata = this.fetchMetadata.bind(this)
  }

  fetchMetadata() {
    this.setState({
      disabled: true
    })

    fetch(
      'https://opetushallinto.cs.helsinki.fi/courses/create_metadata',
      { method: 'POST',
        headers: new Headers().append('Authorization', TOKEN)
      }
    ).then( response => response.json()
    ).then( data => {
      console.log(data)
      this.setState({
        response: JSON.stringify(data) 
      })   

      const callback =  () => { 
        this.setState({
          response: null,
          disabled: false 
        }) 
      }

      setTimeout(callback, 5000)   
    })

  }

  render() {
    const message = (response) => {
      if ( this.state.response===null ) {
        return null
      }

      return (
        <div className='message'>
          {this.state.response}
        </div>
      )
    }


    return(
      <div>
        <h3>Course metadata creation</h3>
        <p>If there are errors, a possible cause is missing metadata creation.</p>
        <button 
          onClick={this.fetchMetadata}
          disabled={this.state.disabled}>
          ensure that all course metadata is in kurki
        </button>
        {message(this.state.response)}
      </div>
    )
    
  }
}

export default MetadataCreator