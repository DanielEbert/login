import React, { Component } from 'react';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: "",
      pw: ""
    };
  }

  idInputChange = (e) => {
    this.setState({'id': e.target.value})
  }

  pwInputChange = (e) => {
    this.setState({'pw': e.target.value})
  }

  //TODO: check if there is the possibility that state id or pw aren't updated yet
  submit = (e) => {
    this.props.getSessionToken(this.state.id, this.state.pw)
  }

  render() {
    return (
      <div className="Login container">
        <div className="row" style={{marginTop:'20px'}}>
          <h1 className="center">Login</h1>
          <div className="divider"></div>
          <div className="col s6 offset-s3" style={{marginTop:'50px'}}>
            <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input id="id_input" type="text" className="validate" 
                value={this.state.id} onChange={this.idInputChange}></input>
                <label htmlFor="id_input">Username</label>
              </div>
              </div>
              <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">lock</i>
                <input id="pw_input" type="password" className="validate" 
                  value={this.state.pw} onChange={this.pwInputChange}></input>
                <label htmlFor="pw_input">Password</label>
              </div>
              </div>
              <div className="row center">
              <button className="btn waves-effect waves-light blue lighten-1" 
                  type="submit" name="action" onClick={this.submit}>Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </div>
  )}
}

export default Login;