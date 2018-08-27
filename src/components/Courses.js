import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { Table } from 'reactstrap'
import { coursesFor } from '../services'
import { asCourseObject, by } from '../lib/CourseObject'
import Course from './Course'
import CourseSelector from './CourseSelector'

const CourseTableHeader = ({setOrder, current}) => {
  const onClick = (criteria) => {
    return () => {
      setOrder(criteria)
    }
  }
  return (
    <thead>
      <tr>
        <th>id</th>
        <th className={current==='code'? 'selectedCriteria' : 'criteria'} onClick={onClick('code')}>code</th>
        <th className={current==='name'? 'selectedCriteria' : 'criteria'}  onClick={onClick('name')}>name</th>
        <th>type</th>
        <th className={current==='startMoment'? 'selectedCriteria' : 'criteria'}  onClick={onClick('startMoment')}>time</th>
        <th className={current==='registrations'? 'selectedCriteria' : 'criteria'}  onClick={onClick('registrations')}>registrations</th>
        <th>room for</th>
        <th>registrations updated</th>
        <th>metadata updated</th>
      </tr>
    </thead>
  )
}

const CourseRow = ({ course, id}) => (
  <tr>
    <td>{course.id}</td>
    <td>{course.code}</td>
    <td><NavLink to={`/courses/${id}/${course.id}`}> {course.name} </NavLink></td>
    <td>{course.type}</td>
    <td>{course.time}</td>
    <td>{course.students.length}</td>
    <td>{course.group_size_sum}</td>
    <td>{course.updated}</td>
    <td>{course.metadata}</td>            
  </tr>
)

class Courses extends React.Component {
  constructor(props) {
    super(props)

    const yearNow = () => `${new Date().getYear()+1900}`

    this.state = {
      courses: [],
      order: 'name',
      filter: 'course',
      yearFilter: yearNow()
    }

    this.setFilters = this.setFilters.bind(this) 
    this.setOrder = this.setOrder.bind(this)
    this.setTimestamps = this.setTimestamps.bind(this)
  }

  setTimestamps(course, timestamps) {
    const id = course.id
  
    const courses = this.state.courses.filter(c => c.id!==id)
    const hash = {
      data: course.data,
      updated: timestamps.updated,
      metadata: timestamps.metadata
    }

    this.setState({ courses: courses.concat(asCourseObject(hash)) })
  }

  setFilters({filter, yearFilter}) {
    this.setState({filter, yearFilter})
  }

  setOrder(order) {
    this.setState({order})
  }

  fetchCoursesFor(org) {
    const withgroupInfo = (c, map) => {
      if (c.child_ids.length===0) {
        return c
      }

      const groups = c.child_ids.filter(id => map[id])
        .map(id => map[id].data.group_max_size)
        .filter(s => s!==99 && s!=999 && s!==null)

      if (groups.length===0) {
        return c
      }

      c.group_size_sum = groups.reduce((s, g) => s+g, 0)
      return c
    }

    coursesFor(org)
    .then(response => {
      const courses = response.data.json.map( c => asCourseObject(c) )
      
      const courseMap = courses.reduce((m, c) => { 
        m[c.data.course_id] = c ; return m}, 
        {}
      )

      const coursesWithGroupsize = courses
        .map(c => withgroupInfo(c, courseMap))

      this.setState({ courses: coursesWithGroupsize })
    })
    .catch(error => console.log(error))
  }

  componentWillMount() {
    this.fetchCoursesFor(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.fetchCoursesFor(nextProps.id)
    }  
  }

  render() {
    const byId = (id) => this.state.courses.find( c => c.id===Number(id))
    
    const courses = (filter, yearFilter) => {
      return this.state.courses.filter(c=>c.matches(filter, yearFilter)).sort(by(this.state.order)) 
    }

    return(
      <div>
        <Route path="/courses/:id/:cid" render={ (props) => (
          <Course 
            id={props.match.params.cid}
            courses={this.state.courses}
            updateTimestamps={this.setTimestamps}
          /> 
        )} />
        <Route path="/courses/:id/" exact render={ () => (
          <div>
            <h2>courses of {this.props.id}</h2>

            <CourseSelector setFilters={this.setFilters} />

            <Table>
              <CourseTableHeader setOrder={this.setOrder} current={this.state.order}/>
              <tbody>
                {courses(this.state.filter, this.state.yearFilter).map((c,i)=><CourseRow key={i} course={c} id={this.props.id}/>)}
              </tbody>
            </Table>
          </div>
        )} />
      </div>
    )
  }
}

export default Courses