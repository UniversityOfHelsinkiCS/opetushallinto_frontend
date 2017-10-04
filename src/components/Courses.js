import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { Table } from 'reactstrap'
import { RadioGroup, Radio } from 'react-radio-group'
import { coursesFor } from '../services'
import { asCourseObject } from '../lib/CourseObject'
import Course from './Course'

const CourseTableHeader = () => (
  <thead>
    <tr>
      <th>id</th>
      <th>code</th>
      <th>name</th>
      <th>type</th>
      <th>time</th>
      <th>registrations</th>
      <th>registrations updated</th>
      <th>course info updated</th>
    </tr>
  </thead>
)

const CourseRow = ({course, id}) => (
  <tr>
    <td>{course.id}</td>
    <td>{course.code}</td>
    <td><NavLink to={`/courses/${id}/${course.id}`}> {course.name} </NavLink></td>
    <td>{course.type}</td>
    <td>{course.time}</td>
    <td>{course.students.length}</td>
    <td>{course.updated}</td>
    <td>{course.metadata}</td>            
  </tr>
)

class Courses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      filter: 'course'
    }
    this.setFiter = this.setFiter.bind(this)
  }

  setFiter(filter) {
    this.setState({filter})
  }

  fetchCoursesFor(org) {
    coursesFor(org)
    .then( response => response.json() )
    .then( courses => {
      this.setState({ courses: courses.json.map( c => asCourseObject(c) ) })
    })
  }

  componentWillMount() {
    this.fetchCoursesFor(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCoursesFor(nextProps.id)
  }

  render() {
    const byId = (id) => this.state.courses.find( c => c.id===Number(id))
    
    const courses = (filter) => {
      return this.state.courses.filter(c=>c.matches(filter)) 
    }

    return(
      <div>
        <Route path="/courses/:id/:cid" render={ (props) => (
          <Course 
            id={props.match.params.cid}
            courses={this.state.courses}
          /> 
        )} />
        <Route path="/courses/:id/" exact render={ ( )=> (
          <div>
            <h2>courses of {this.props.id}</h2>
            <RadioGroup name="filter" selectedValue={this.state.filter} onChange={this.setFiter}>
              <span className='padding'>
                all <Radio value="all" />
              </span>
              <span className='padding'>
                courses <Radio value="course" />
              </span>
              <span className='padding'>
                exams <Radio value="exam" />
              </span>
              <span className='padding'>
                labs <Radio value="lab" />
              </span>         
              <span className='padding'>
                seminars <Radio value="seminar" />
              </span>                      
            </RadioGroup> 
            <Table>
              <CourseTableHeader/>
              <tbody>
                {courses(this.state.filter).map((c,i)=><CourseRow key={i} course={c} id={this.props.id}/>)}
              </tbody>
            </Table>
          </div>
        )} />
      </div>
    )
  }
}

export default Courses