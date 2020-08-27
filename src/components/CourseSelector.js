import React from 'react'
import { RadioGroup, Radio } from 'react-radio-group'

class CourseSelector extends React.Component {
  constructor(props) {
    super(props)

    const yearNow = () => `${new Date().getYear()+1900}`

    this.state = {
      filter: 'course',
      yearFilter: yearNow()
    }

    this.setCourseFilter = this.setCourseFilter.bind(this)
    this.setYearFilter = this.setYearFilter.bind(this)    
  }  

  setCourseFilter(filter) {
    this.props.setFilters({filter, yearFilter: this.state.yearFilter})
    this.setState({filter})
  }

  setYearFilter(yearFilter) {
    this.props.setFilters({filter: this.state.filter, yearFilter})    
    this.setState({yearFilter})
  }

  render() {
    return(
      <div>
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
              2020 <Radio value="2020" />
            </span>
            <span className='padding'>
              2021 <Radio value="2021" />
            </span>
            <span className='padding'>
              all <Radio value="all" />
            </span>                                
          </RadioGroup> 
        </div>
      </div>
    )
  }
}

export default CourseSelector