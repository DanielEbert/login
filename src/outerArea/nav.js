import React, { Component } from 'react';

class Nav extends Component {

  //TODO: preventDefaultBehavior on onClicks

  loginOrLogout = () => {
    if (this.props.authorized) {
      return <li><a className="black-text" href="/" onClick={this.props.logout}>Logout</a></li>
    } else {
      return <React.Fragment>
        <li><a className="black-text" href="login">Login</a></li>
        <li><a className="black-text" href="register">Register</a></li>
      </React.Fragment> 
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper light-green lighten-2">
          <div className="container">
            <span className="brand-logo grey-text text-darken-4">JWT Authentication</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.loginOrLogout()}
            </ul>
          </div>
        </div>
      </nav>
    )}
}

export default Nav;