import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export const AppContext = React.createContext()

class App extends Component {


  constructor() {
    super()
    this.state = {
      url: '',
      proxy: 'https://cors-anywhere.herokuapp.com/'
    }
  }

  checkSite() {
    let status
    fetch(this.state.proxy + this.state.url)
    .then(response => {
      debugger
      status = response.status
      return status
    })
    .then(status => {
      if (status) {
        alert('site is up')
      } else {
        alert('site is fucked up')
      }
    })
  }

  updateURLToCheck(e) {
    debugger
    this.setState({url: e.currentTarget.value})
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <input type='text' placeholder='Enter URL for check here' onChange={this.updateURLToCheck.bind(this)}/>
          <button onClick={this.checkSite.bind(this)}>Hit me</button>
          <br/>
          <input type='text' placeholder='(Optional)Text to test for' onChange={this.updateURLToCheck.bind(this)}/>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
