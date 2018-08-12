import React, { Component } from 'react';
import './App.css';


class ResultViewer extends Component {
    render() {

        if (!this.props.fetching) {

            return (
            <div>
                <div>
                    
                </div>
            </div>)
        } else {
            return <div>Waiting to fetch</div>
        }
    }

}

export default ResultViewer