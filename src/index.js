import './app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'

console.log('**')

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'))  

if (module.hot) {
  module.hot.accept()
}