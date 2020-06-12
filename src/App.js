import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import M from 'materialize-css'
import axios from 'axios';


import Nav from './outerArea/nav'
import Register from './components/accounts/Register'
import Login from './components/accounts/Login'
import { parseJwt } from './utils/auth'
import Dashboard from './components/main/Dashboard';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      'authorized': false
    };

    if (localStorage.getItem('accessToken') != null) {
      if (parseJwt(localStorage.getItem('accessToken')) > (new Date()).getTime() + 360) {
        this.setState({'authorized': true})
      }
      else if (localStorage.getItem('sessionToken') != null) {
        M.toast({html: 'Logging in', displayLength: 1500, classes: "light-green"})
        this.getAccessToken()
      }
    }
  }

  // make this wrapper function for authorized requests
  doSomething = () =>  {
    axios.post('http://localhost:5000/doSomething', {
        'blablabla': 'aaaa'
      }, {
        headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') }
      })
      .then(res => console.log(res))
      .catch(res => {
        if (res.response.status === 401) {
          this.getAccessToken(this.doSomething)
        }
      })
  }

  getSessionToken = (id, pw) => {
    axios.post('http://localhost:5000/login', {
        'id': id,
        'pw': pw
      })
      .then(res => {
        localStorage.setItem('id', id)
        console.log(res)
        localStorage.setItem('sessionToken', res.data)
        this.getAccessToken()
      })
      .catch(res => {
        M.toast({html: 'Wrong Username or Password', classes: "red"})
        console.log("Err " + res)
      })
  }

  getAccessToken = (invokeAfter = null) => {
    axios.post('http://localhost:5000/getAccessToken', {
      'id':localStorage.getItem('id'),
      'sessionToken': localStorage.getItem('sessionToken')
    })
    .then(res => {
      localStorage.setItem('accessToken', res.data)
      this.setState({'authorized': true})
      if (invokeAfter != null) {
        invokeAfter()
      }
    })
    .catch(res => {
      console.log("shouldn't happen: " + res)
    })
  }

  register = (id, pw) => {
    axios.post('http://localhost:5000/register', {
      'id': id,
      'pw': pw
    })
    .then(res => {
      localStorage.setItem('id', id)
      localStorage.setItem('sessionToken', res.data)
      this.getAccessToken()
    })
    .catch(res => {
      //M.toast({html: 'Sth failed', classes: "red"})
      console.log("Err " + res)
    })
  }

  logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('id')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('sessionToken')
    this.setState({'authorized': false})
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Nav authorized={this.state.authorized} logout={this.logout}/>
          {this.state.authorized ? 
            <Switch>
              <Route path="/dashboard" component={() => <Dashboard doSomething={this.doSomething}/>}/>
              <Route component={({history}) => {history.push('/dashboard'); return "";}}/>
            </Switch> : 
            <Switch>
              <Route path="/register" component={() => <Register register={this.register}/>}/>
              <Route path="/login" component={() => <Login getSessionToken={this.getSessionToken}/>}/>
              <Route component={({history}) => {history.push('/register'); return "";}}/>
            </Switch>
          }
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
