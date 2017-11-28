import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API.js'
import axios from 'axios';

class Test extends Component {
  constructor (props) {
  super (props)
  this.state = {
    properties: [],
    filter: []
  }
}

componentDidMount () {

  // this._api.get('locations')
  axios.get(`http://localhost:8001/locations`)
        .then(response => {
           console.log(response)
           this.setState({
             properties: response.data,
             filteredDataList: response.data
           })
         })
}


// _onFilterChange(event) {
//   event.preventDefault()
//   const name = event.target.name
//   if (!event.target.name) {
//     this.setState({
//       filteredDataList: this.state.properties
//     });
//   }
// }

_onFilterChange(event) {
  event.preventDefault()
  const name = event.target.name

    this.setState({
      [name]: event.target.value
    });

        console.log(event.target.name)
            console.log(event.target.value)
}

handleSubmit(e){
  e.preventDefault()
        this.setState({
          filteredDataList: this.state.properties.filter(property => property.buildingType.name === this.state.type && property.beds === parseInt(this.state.beds) && property.baths === parseInt(this.state.baths))
        });
}


    render() {
      console.log(this.state.properties)
        return (
            <div className="testContainer">
                <div className="filterContainer">
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <input name="baths" type="text" placeholder="baths" onChange={this._onFilterChange.bind(this)}/>
                    <input name="beds" type="text" placeholder="beds" onChange={this._onFilterChange.bind(this)}/>

                    <select name="type" onChange={this._onFilterChange.bind(this)}>
                      <option name="multiFamily">multiFamily</option>
                      <option name="condo">condo</option>
                      <option name="business">business</option>
                      <option name="office">office</option>
                      <option name="singleFamily">singleFamily</option>
                    </select>
                    <button type="submit" value="Submit" >Submit</button>
                  </form>
                </div>
                <RemineTable properties={this.state.filteredDataList} />
            </div>
        );
    }
}

export default Test;
