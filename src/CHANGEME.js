import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import API from './API.js'
import axios from 'axios';

class Test extends Component {
  constructor (props) {
  super (props)
  this.state = {
    properties: [],
    filter: [],
    type: 'All'
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

// handling multiple user inputs
_onFilterChange(event) {
  event.preventDefault()
  const name = event.target.name

    this.setState({
      [name]: event.target.value
    });
        console.log(event.target.name)
}

// filter data
    handleSubmit(e){
      e.preventDefault()
      // shows all building types with the specified no: of beds and baths
      if(this.state.type === 'All'){
            this.setState({
              filteredDataList: this.state.properties.filter(
                property => property.beds === parseInt(this.state.beds) &&
                property.baths === parseInt(this.state.baths)
              )
            });
          }
          // shows the building types with the user specified no: of beds and baths
            else {
                  this.setState({
                    filteredDataList: this.state.properties.filter(
                      property => property.buildingType.name === this.state.type &&
                      property.beds === parseInt(this.state.beds) &&
                      property.baths === parseInt(this.state.baths)
                    )
                  });
            }
    }
  // clear filter
    handleClear(e){
      e.preventDefault()
      this.setState({
        filteredDataList: this.state.properties
      })
    }


    render() {
      console.log(this.state.properties)
        return (
            <div className="testContainer">
                <div className="filterContainer">
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    Beds: <input id="txtBed" name="beds" type="text" placeholder="beds" onChange={this._onFilterChange.bind(this)}/>
                    Baths: <input id="txtBath" name="baths" type="text" placeholder="baths" onChange={this._onFilterChange.bind(this)}/>

                    <select name="type" onChange={this._onFilterChange.bind(this)}>
                      <option name="multiFamily">All</option>
                      <option name="multiFamily">multiFamily</option>
                      <option name="condo">condo</option>
                      <option name="business">business</option>
                      <option name="office">office</option>
                      <option name="singleFamily">singleFamily</option>
                    </select>
                    <button type="submit" value="Submit" >Submit</button>
                    <button type="submit" value="Clear" onClick={this.handleClear.bind(this)}>Clear</button>
                  </form>
                </div>
                <RemineTable properties={this.state.filteredDataList} />
            </div>
        );
    }
}

export default Test;
