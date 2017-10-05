import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { Badge, Table, Button, Alert } from 'reactstrap'
import { updateRegistrations, updateMetadataOf } from '../services'

const GroupRow = ({group}) => {
  return (
    <tr>
      <td>{group.id}</td>
      <td><NavLink 
            to={`/courses/${group.organisation}/${group.id}`}> 
            {group.name} 
          </NavLink></td>
      <td>{group.time}</td>
      <td>{group.type}</td>
      <td>{group.students.length}</td>
    </tr>
  )
}

const Groups = ({groups, course}) => {
  if (course.type==='group') {
    return null
  }     
  
  return (
    <div>
      <h3>Groups</h3>

      <Table>
        <thead>
          <tr>
            <th> <a>id</a> </th>
            <th> <a>name</a> </th>
            <th> <a>time</a> </th>
            <th> <a>type</a> </th>
            <th> <a>registrations</a> </th>
          </tr>
        </thead>
        <tbody>
          {groups.map(g=><GroupRow key={g.id} group={g} />)}
        </tbody>  
      </Table> 
    </div> 
  )
}

class Registrations extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      registrationResponse: null,
      registrateDisabled: false,
      updated_at: this.props.course.updated
    }
    this.updateRegistrations = this.updateRegistrations.bind(this)
  }

  updateRegistrations() {
    this.setState({registrateDisabled: true, registrationResponse: "updating registrations..."})
    updateRegistrations(this.props.course.id)
    .then(response => {
      const data = response.data

      this.setState({
        registrationResponse: `updated registration of ${data.result.length} students`,
        updated_at: data.time
      })
      
      const {course} = this.props
      this.props.updateTimestamps(course, {updated: data.time, metadata:course.metadata } )

      setTimeout(() => {
        this.setState({registrationResponse: null, registrateDisabled: false})
      }, 8000)
    })
    .catch(error => console.log(error))
  }
  
  render() {
    const {course} = this.props

    if (course.students.length===0) {   
      return (
        <div>
          <h3>Registrations</h3>
          <p>no regitrations</p>
        </div>)
    }

    return (
      <div>
        <h3>Registrations (updated {this.state.updated_at})</h3>

        <Button
          disabled={this.state.registrateDisabled} 
          color="warning" 
          onClick={this.updateRegistrations}>
          update registrations
        </Button>

        {(this.state.registrationResponse)&&
        <Alert color="success">
          {this.state.registrationResponse}
        </Alert>}

        <ul>
          {course.students.map( s => (
            <li key={s.student_number}>
              {`${s.student_number} ${s.last_name} ${s.first_names}`}
            </li>))}
        </ul>
      
      </div>
    )
  }
}

class Metadata extends React.Component {
  constructor(props){
    super(props)

    const course = this.props.course
    this.state = {
      metadataResponse: null,
      metadataDisabled: false,
      metadata_updated: course && course.metadata
    }
    this.updateMetadata = this.updateMetadata.bind(this)
  }

  updateMetadata() {
    this.setState({metadataDisabled: true, metadataResponse: "updating metadata..."})
    updateMetadataOf(this.props.course.id)
    .then(response => {
      const data = response.data

      this.setState({
        metadataResponse: JSON.stringify(data.result),
        metadata_updated: data.time
      })

      const {course} = this.props
      this.props.updateTimestamps(course, {updated: course.updated, metadata: data.time}) 

      setTimeout(() => {
        this.setState({metadataResponse: null, metadataDisabled: false})
      }, 8000)
    })
    .catch(error => {
      const metadataError = `updating metadata failed, contanct system admin`
      const metadataErrorLong = [error.request.responseURL, error.response.status, error.message, ]
      
      this.setState({
        metadataError,
        metadataErrorLong,
        metadataResponse: null
      })    
      setTimeout(() => {
        this.setState({metadataError: null, metadataErrorLong: null, metadataDisabled: false})
      }, 120000)
    })
  }

  render() {
    return (
      <div>
        <h3>Metadata (updated {this.state.metadata_updated})</h3>
      
        <Button
          disabled={this.state.metadataDisabled} 
          color="warning" 
          onClick={this.updateMetadata}>
          update metadata
        </Button>

        {(this.state.metadataResponse)&&
        <Alert color="success">
          {this.state.metadataResponse}
        </Alert>}    

        {(this.state.metadataError)&&
        <Alert color="danger">
          <h4>{this.state.metadataError}</h4>
          <br/>
          <ul>
            {this.state.metadataErrorLong.map((e,i)=><li key={i}>{e}</li>)}
          </ul>
        </Alert>}         
      </div>    
    )
  }
}

class Course extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      course: this.byId(this.props.id)
    }
  }

  byId(id) {
    return this.props.courses.find( c => c.id===Number(id))  
  }

  componentWillReceiveProps(nextProps) {
    const course = this.byId(nextProps.id)
    this.setState({course})
  }

  render() {
    const {course} = this.state

    if ( course===undefined) {
      return null
    }

    const groups = course.child_ids.map( id => this.byId(id) )

    return(
      <div>
        <h2>{course.name} <Badge pill>{course.type}</Badge></h2>

        <p>{course.time}</p>
        <p>course code <strong>{course.code}</strong> oodi id <strong>{course.id}</strong></p>
      
        <Groups groups={groups} course={course} />

        <Registrations course={course} updateTimestamps={this.props.updateTimestamps} />

        <Metadata course={course} updateTimestamps={this.props.updateTimestamps} />
      </div>
    ) 
  }
  
}
export default Course