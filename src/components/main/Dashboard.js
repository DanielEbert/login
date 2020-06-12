import React, { Component } from 'react';

import {parseJwt, epochToDate} from '../../utils/auth'

class Dashboard extends Component {

  render() {
    return (
      <div className="Login container">
        <div className="row" style={{marginTop:'20px'}}>
          <h1 className="center">Dashboard</h1>
          <div className="divider"></div>
          <div className="col s12" style={{marginTop:'50px'}}>
            <div className="row">
              <table className="centered highlight">
                <tbody>
                  <tr>
                    <td>Username</td>
                    <td>{localStorage.getItem('id')}</td>
                  </tr>
                  <tr>
                    <td>Session Token</td>
                    <td>{localStorage.getItem('sessionToken')}</td>
                  </tr>
                  <tr>
                    <td>Access Token</td>
                    <td>{localStorage.getItem('accessToken')}</td>
                  </tr>
                  <tr>
                    <td>Issued</td>
                    <td>{epochToDate(parseJwt(localStorage.getItem('accessToken'))['iat']).toString()}</td>
                  </tr>
                  <tr>
                    <td>Expires</td>
                    <td>{epochToDate(parseJwt(localStorage.getItem('accessToken'))['exp']).toString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button onClick={this.props.doSomething}></button>
      </div>
  )}
}

export default Dashboard;