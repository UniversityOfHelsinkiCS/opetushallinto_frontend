import React from 'react'
import { Button, Alert } from 'reactstrap'
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
    .then( response => {
      this.setState({
        response: JSON.stringify(response.data) 
      })   

      const callback =  () => { 
        this.setState({
          response: null,
          disabled: false 
        }) 
      }

      setTimeout(callback, 5000)   
    })
    .catch(error => console.log(error))
  }

  render() {

    return(
      <div className='metadata'>
        <h3>Course metadata creation</h3>
        <p>If there are errors, a possible cause is missing metadata creation.</p>
        <Button 
          onClick={this.fetchMetadata}
          disabled={this.state.disabled}>
          ensure that all course metadata is in kurki
        </Button>

        {(this.state.response)&&
        <Alert color="success">
          {this.state.response}
        </Alert>}

      </div>
    )
    
  }
}

export default MetadataCreator