import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ResultViewer from './ResultViewer'

export const AppContext = React.createContext()

class App extends Component {


  constructor() {
    super()
    this.state = {
      url: '',
      proxy: 'https://cors-anywhere.herokuapp.com/',
      verification_text: '',
      status: false,
      fetching: false
    }
  }

  updateVerificationText(e) {
    this.setState({verification_text: e.currentTarget.value})
  }

  checkVerificationText(body) {
    if (body.includes(this.verification_text)) {
      alert('No such text found')
    } else {
      alert('Wooooooo')
    }
  }

  verifyStatus(status) {
    if (status) {
      alert('site is up')
    } else {
      alert('site is fucked up')
    }
  }

  checkSite() {
    this.setState({fetching: true})
    fetch(this.state.proxy + this.state.url)
    .then(response => {
      this.setState({fetching: false})
      this.setState({status: response.status})
      return response
    })
    .then(response_object => {
      console.log(response_object)
      this.verifyStatus(response_object.status)
      this.checkVerificationText(response_object.body)
    })
  }

  updateURLToCheck(e) {
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
          <input type='text' placeholder='(Optional)Text to test for' 
            onChange={this.updateVerificationText.bind(this)}/>
          <ResultViewer status={this.state.status} fetching={this.state.fetching}/>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
