import React from 'react'
import { updateMetadata } from '../services'

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

    updateMetadata()
    .then( response => response.json() )
    .then( data => {
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