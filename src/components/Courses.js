import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { Table } from 'reactstrap'
import { RadioGroup, Radio } from 'react-radio-group'
import { coursesFor} from '../services'
import { asCourseObject, by } from '../lib/CourseObject'
import Course from './Course'

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
        <th>registrations updated</th>
        <th>metadata updated</th>
      </tr>
    </thead>
  )
}

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

    const yearNow = () => `${new Date().getYear()+1900}`

    this.state = {
      courses: [],
      filter: 'course',
      order: 'name',
      yearFilter: yearNow()
    }
    this.setCourseFilter = this.setCourseFilter.bind(this)
    this.setYearFilter = this.setYearFilter.bind(this)    
    this.setOrder = this.setOrder.bind(this)
    this.setTimestamps = this.setTimestamps.bind(this)
  }

  setTimestamps(course, timestamps) {
    const id = course.id
  
    const courses = this.state.courses.filter(c=>c.id!==id)
    const hash = {
      data: course.data,
      updated: timestamps.updated,
      metadata: timestamps.metadata
    }

    this.setState({courses: courses.concat(asCourseObject(hash))})
  }

  setCourseFilter(filter) {
    this.setState({filter})
  }

  setYearFilter(yearFilter) {
    console.log(yearFilter)
    this.setState({yearFilter})
  }

  setOrder(order) {
    console.log('order set', order)
    this.setState({order})
  }

  fetchCoursesFor(org) {
    coursesFor(org)
    .then(response => {
      const courses = response.data.json.map( c => asCourseObject(c) )
      this.setState({ courses  })
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
        <Route path="/courses/:id/" exact render={ ( )=> (
          <div>
            <h2>courses of {this.props.id}</h2>
            <div className='filter'>
              <RadioGroup 
                    name="filter" 
                    selectedValue={this.state.filter} 
                    onChange={this.setCourseFilter}>
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
            </div>
            <div className='year-filter'>
              <RadioGroup 
                  name='yearFilter'
                  selectedValue={this.state.yearFilter} 
                  onChange={this.setYearFilter}>                   
                <span className='padding'>
                  2017 <Radio value="2017" />
                </span>
                <span className='padding'>
                  2018 <Radio value="2018" />
                </span>
                <span className='padding'>
                  all <Radio value="all" />
                </span>                                
              </RadioGroup> 
            </div>
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