import React from 'react'
import Status from './components/Status'
import Courses from './components/Courses'
import { getErrors } from './services'
import { Route, NavLink } from 'react-router-dom'

const HomePage = () => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>

const Course = () => { 
  console.log("**")
  return(<p>kurssi</p>) 
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      status: {errors:[]}
    }
  }
  componentWillMount() {
    getErrors()
    .then( response => response.json() )
    .then( data => {
      this.setState({status: data})
    })
  }
  render() {
    return (
      <div>
        <header className='header'>
          <NavLink className='padding' to="/" exact activeClassName="active">status</NavLink>
          <NavLink className='padding' to="/courses/500-K005" exact activeClassName="active">kandi</NavLink>
          <NavLink className='padding' to="/courses/500-M009" exact activeClassName="active">maisteri</NavLink>
          <NavLink className='padding' to="/courses/500-M010" exact activeClassName="active">datatiede</NavLink>
          <NavLink className='padding' to="/courses/H523" exact activeClassName="active">vanha</NavLink>
        </header>

        <h1>Oodi to Kurki transfer</h1>

        <div>
          <Route path="/" exact render={() => 
            <Status status={this.state.status}/>
          } />
          <Route path="/courses/:id" exact render={(props) => 
            <Courses id={props.match.params.id}/>           
          } />
          <Route path="/courses/1/2" exact render={() => 
          <Course />
          } />          
          
        </div>        
      </div>
    )
  }
}

export default App