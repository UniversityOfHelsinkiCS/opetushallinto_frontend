import React from 'react'
import { Alert } from 'reactstrap'
import MetadataCreator from './MetadataCreator'
import { getErrors } from '../services'

const Errors = ({errors}) => {
  if ( errors.length === 0 ) {
    return null 
  }
  return (
    <Alert color="danger">
      <h4>errors in update</h4>
      <ul>
        {errors.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    </Alert>
  )
}

const Warnings = ({ warnings }) => {
  if ( warnings===undefined || warnings.length === 0 ) {
    return null 
  }
  return (
    <Alert color="warning">
      <h4>Teaching type in oodi set wrong for</h4>
      <ul>
        {warnings.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    </Alert>
  )
}

class Status extends React.Component {
  render() {
    return (
      <div>
        <h2>Transfer status</h2>
        <p>registrations updated {this.props.status.time}</p>
        <Errors errors={this.props.status.errors} />
        <MetadataCreator />
        <Warnings warnings={this.props.status.group_type_errors} />
      </div>
    )
  }
}

export default Status