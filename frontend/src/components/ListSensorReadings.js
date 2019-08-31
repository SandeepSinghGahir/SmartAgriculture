import React, {Component} from 'react';
//nimport '../App.css';
//import $ from 'jquery';
import axios from 'axios';
//npmimport '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class ListSensorReadings extends Component {
    constructor(props){
        super(props);
        this.state = {
        sensor: this.props.location.state.sensor,
        data: [],
        fromDate:"",
        toDate:"",

        }
        this.filterByDate=this.filterByDate.bind(this);
        this.fromDateHandler=this.fromDateHandler.bind(this);
        this.toDateHandler=this.toDateHandler.bind(this);
    }
    // componentDidMount()
    // {
    //   console.log("in will mount...")
    //   this.drawChart();
    // }
   
    fromDateHandler(e)
    {
    console.log(e.target.value)
    this.setState({fromDate:e.target.value})
    }
    toDateHandler(e)
    {
        console.log(e.target.value)
        this.setState({toDate:e.target.value})
    }
    filterByDate()
    {
        var self = this;
        const data = {
            start: this.state.fromDate,
            end: this.state.toDate,
            sensor_name: this.state.sensor.sensor_name

        };
      axios.post("http://localhost:3001/filterSensorByDates",data)
        .then(function (response) {
            console.log("response in list cluster", response);

            if (response.data.data != null) {
                self.setState({
                    data: response.data.data
                })
            }

        })
    }

//     somefunction(){
//       var rows = $('table.someclass tr');
//       var black = rows.filter('.black');
//       var white = rows.filter('.white');

//       $('#showBlackButton').click(function() {
//       black.show();
//       white.hide();
//       });

// $('#showWhiteButton').click(function() {
//     white.show();
//     black.hide();
// });
//     }


    componentWillMount() {
      var self = this;
      console.log("will mount..")     
      console.log("frontend viewing readings for sensor id :", self.state.sensor._id )     
      const data = {
          sensor_id :self.state.sensor._id,
      }
      axios.post("http://localhost:3001/getSensorReadings", data )
          .then(function (response) {
              console.log("response in getSensorList", response.data.data);

              if (response.data.data != null) {
                  self.setState({
                      data: response.data.data
                  })
              }
              if (response.status === 204) {
                  console.log("No sensor readings found for this sensor");
                  console.log("data" + response.data.status)
                  return
              }
          })
  }
    render(){

      const header = ["No.","Sensor_Name", 
      "Type", "Status", "Location", "Reading","Date Created"];
     

       return(
           <div>    
             <div class = "navbar -fluid p-3 mb-2 bg-success text-white" style={{background: '#32CD32'}}>
            <div class = "container">
                <h1 class ="h1 text-center"style= {{color:"white"  }}>SmartAgro</h1>
            </div>
          </div>       
          <div class = "container">
<h2>Infrastructure Data Manager's Dashboard</h2>


<br></br>
<h3>Sensor Profile : {this.state.sensor.sensor_id}</h3>

<div class="input-daterange" id="datepicker">
    <div class="input-group">
        <input type="date" class="input-small" onChange={this.fromDateHandler} name="fromDate" />
        <span class="input-group-addon">to</span>
        <input type="date" class="input-small" onChange={this.toDateHandler} name="toDate" />
<a class="btn btn-info"  role="button" onClick={this.filterByDate}>Apply Filter</a>
</div>
</div>
       
      <table class="table table-bordered">
                    <thead class="thead-dark">
                        <tr>{header.map((h, i) => <th scope="col" key={i}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.state.data).map((k, i) => {
                            let sensor = this.state.data[k];
                            return (
                                <tr key={i}>
                                    <td>{i}</td>                                                                        
                                    <td>{sensor.sensor_name}</td>                                    
                                    <td>{sensor.sensor_type}</td>
                                    <td>{sensor.sensor_status}</td>
                                    <td>{sensor.sensor_location}</td>
                                    <td>{sensor.sensor_reading}</td>
                                    <td>{sensor.created_date}</td>                                   
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
      </div>
      </div>
       )}
}

export default ListSensorReadings;
