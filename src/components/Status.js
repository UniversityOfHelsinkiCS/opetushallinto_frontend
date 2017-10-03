import React from 'react'
import Errors from './Errors'
import MetadataCreator from './MetadataCreator'
import { getErrors } from '../services'

class Status extends React.Component {
  render() {
    return (
      <div>
        <h2>Transfer status</h2>
        <p>registrations updated {this.props.status.time}</p>
        <Errors errors={this.props.status.errors} />
        <MetadataCreator />
      </div>
    )
  }
}

export default Status