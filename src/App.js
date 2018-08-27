import React from 'react'
import Status from './components/Status'
import Courses from './components/Courses'
import { getErrors } from './services'
import { Route, NavLink } from 'react-router-dom'
import { Container } from 'reactstrap'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      status: { errors: [], warnings: [] }
    }
  }
  componentWillMount() {
    getErrors()
    .then( response => {
      this.setState({ status: response.data })
    })
  }
  render() {
    return (
      <Container>
        <header className='header'>
          <span className='padding'>
            <a href="https://opetushallinto.cs.helsinki.fi">juuri</a>
          </span>
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
          <Route path="/courses/:id" render={(props) => 
            <Courses id={props.match.params.id}/>           
          } />                 
        </div>    
             
      </Container>
    )
  }
}

export default App