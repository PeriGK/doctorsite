import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import ResultViewer from './ResultViewer'


class App extends Component {

  constructor() {
    super()
    this.state = {
      url: '',
      proxy: 'https://cors-anywhere.herokuapp.com/',
      verification_text: '',
      status: 'N/A',
      fetching: false,
      text_found: false
    }
  }

  updateVerificationText(e) {
    this.setState({verification_text: e.currentTarget.value})
  }

  checkVerificationText(body) {
    if (body.includes(this.state.verification_text) 
      && this.state.verification_text !== '') {
      this.setState({text_found: true})
    } else {
      this.setState({text_found: false})
    }
  }

  isSuccessfullRequest(status) {
    return status >= 200 && status <=299
  }

  verifyStatus(status) {
    if (this.isSuccessfullRequest(status)) {
      alert('Site is up...beer time')
    } else {
      alert('Looks like I didnt get a happy answer from the site')
    }
  }

  checkSite() {
    this.setState({fetching: true})
    fetch(this.state.proxy + this.state.url)
    .then(response => {
      this.setState({fetching: false})
      this.setState({status: response.status})
      console.log(response)
      this.verifyStatus(response.status)
      return response.text()
    })
    .then(text => {
      return this.checkVerificationText(text)
    })
  }

  updateURLToCheck(e) {
    this.setState({url: e.currentTarget.value})
  }

  render() {
    console.log(this.state.text_found)
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Doctor Site.</h1>
            <h2 className="App-subtitle">Check the health of your page easily</h2>
          </header>
          <p className="App-intro">
            Enter the URL of the site you want to check. If you want to verify a certain piece
            of text is present, enter that as well
          </p>
          <input type='text' placeholder='Enter URL for check here'
            onChange={this.updateURLToCheck.bind(this)}/>
          <br/>
          <input type='text' placeholder='(Optional)Text to test for'
            onChange={this.updateVerificationText.bind(this)}/>
          <br/>
          <button onClick={this.checkSite.bind(this)}>Hit me</button>
          <br/>
          <ResultViewer status={this.state.status} fetching={this.state.fetching}
            text_found={this.state.text_found ? 'Yes' : 'No'}/>
        </div>
    );
  }
}

export default App;
