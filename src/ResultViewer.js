import React, { Component } from 'react';
import './App.css';


class ResultViewer extends Component {
    render() {
        console.log(this.props.text_found)
        if (!this.props.fetching) {
            return (
            <div class='results'>
                Is online: {this.props.status}
                <br/>
                Text found: {this.props.text_found}
            </div>)
        } else {
            return (
            <div className='results'>
                Waiting to fetch
            </div>)
        }
    }

}

export default ResultViewer