import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API.js'
import axios from 'axios';

class Test extends Component {
  constructor (props) {
  super (props)
  this.state = {
    properties: []
  }
}

componentDidMount () {

  // this._api.get('locations')
  axios.get(`http://localhost:8001/locations`)
        .then(response => {
           console.log(response)
           this.setState({
             properties: response.data
           })
         })
}


    render() {
      console.log(this.state.properties)
        return (
            <div className="testContainer">
                <div className="filterContainer">
                    Your filters go here.
                </div>
                <RemineTable properties={this.state.properties} />
            </div>
        );
    }
}

export default Test;
