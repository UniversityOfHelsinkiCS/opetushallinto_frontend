import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { coursesFor } from '../services'
import Course from '../lib/Course'

class Courses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: []
    }
  }

  fetchCoursesFor(org) {
    coursesFor(org)
    .then( response => response.json() )
    .then( courses => {
      console.log(courses)
      this.setState({ courses: courses.json.map(c=>new Course(c)) })
    })
  }

  componentWillMount() {
    this.fetchCoursesFor(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCoursesFor(nextProps.id)
  }

  render() {
    const courses = () => this.state.courses.map((c,i)=><tr key={i}><td>{c.name}</td></tr>)

    return(
      <div>
      <h2>courses of {this.props.id}</h2>
      <table>
        <tbody>
          {courses()}
        </tbody>
      </table>

      <NavLink to="/courses/1/2">linkki</NavLink>
    </div>)
  }
}

export default Courses