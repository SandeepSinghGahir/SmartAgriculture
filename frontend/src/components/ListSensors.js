
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { userInfo } from 'os';
import { Redirect,withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//select cluster_name,cluster_id(show nhi karna bus),location,status from cluster where user_email=neha@gmail.com (obviously role=farmer)

class ListSensors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            redirect:false,
            sensor_id:"",

        }

        this.deleteSensorHandler = this.deleteSensorHandler.bind(this);

    }
    componentWillMount() {
        var self = this;
        console.log("will mount..")
        axios.get("http://localhost:3001/getSensorList")
            .then(function (response) {
                console.log("response in getSensorList", response.data.data);

                if (response.data.data != null) {
                    self.setState({
                        data: response.data.data
                    })
                }
                if (response.status === 204) {
                    console.log("No sensor list found for this farmer");
                    console.log("data" + response.data.status)
                    return
                }
            })
    }

    deleteSensorHandler = e => {   
        this.setState({
            redirect: true
            });     
        //prevent page from refresh
        e.preventDefault();
        var del_sensor_id = e.target.dataset.id;
        const data={
            del_sensor_id :e.target.dataset.id
        }
        console.log("inside delete sensor from client side..")
        console.log("sensor_id to be deleted" ,data )
        axios.post('http://localhost:3001/deleteSensor', data, { withCredentials: true })
             .then(response => {
                 console.log("Status Code : ", response);                                          
             });                   
    }
    viewSensorReadingHandler(e)
    {
     var sensor_id=e.target.dataset.id;
     console.log("sensor_id in history: ",sensor_id)
     this.props.history.push({
        pathname: '/getSensorReadings',
        state: { sensor_id: sensor_id }
      })
    }



    render() {
        const { redirect } = this.state;
        if (redirect) {
            window.location.href="http://localhost:3000/getSensorList";
          }        
        // let sensors;
        // sensors = this.state.data.map(sensor => {
        const header = ["No.", "User_ID", "Cluster_ID", "Node_ID" ,"Sensor_Name", 
        "Type", "Status", "Location", "Date Created","View","Delete"];
        return (
            <div>

                <div class="navbar -fluid p-3 mb-2 bg-success text-white" style={{ background: '#32CD32' }}>
          <div class="container">
            <h1 class="h1 text-center" style={{ color: "white" }}>SmartAgro</h1>
          </div>



        </div>
        <div class="container">
        <h2>Infrastructure Data Manager Dashboard</h2>
          <br></br>

                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>{header.map((h, i) => <th scope="col" key={i}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.state.data).map((k, i) => {
                            let sensor = this.state.data[k];
                            return (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{sensor.email}</td>
                                    <td>{sensor.cluster_id}</td>
                                    <td>{sensor.node_id}</td>                                    
                                    <td>{sensor.sensor_name}</td>                                    
                                    <td>{sensor.sensor_type}</td>
                                    <td>{sensor.sensor_status}</td>
                                    <td>{sensor.sensor_location}</td>
                                    <td>{sensor.created_date}</td>                                                    
                                    <td>     
                                    <Link  to={{
                                        pathname: "/getSensorReadings",
                                         state: {
                                             sensor: sensor
                                             }
                                             }} 
                                             role="button">View</Link>                                   
                                        {/* <a class="btn btn-info" role="button" onClick={this.viewSensorReadingHandler}  data-id={sensor.sensor_id}>View</a>                                         */}
                                        </td>
                                    <td><a class="btn btn-danger" role="button" onClick={this.deleteSensorHandler}  data-id={sensor._id} >Delete</a></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}
//export default withRouter(connect(mapStateToProps)(ListSensors))
export default withRouter(ListSensors)