import React from 'react'
import Errors from './components/Errors'
import MetadataCreator from './components/MetadataCreator'
import { getErrors } from './services'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      errors: []
    }
  }
  componentWillMount() {
    getErrors()
    .then( response => response.json() )
    .then( data => {
      this.setState(data)
    })
  }
  render() {
    return (
      <div>
        <h2>Oodi to Kurki transfer</h2>
        <p>registrations updated {this.state.time}</p>
        <Errors errors={this.state.errors}/>
        <MetadataCreator />
      </div>
    )
  }
}

export default App