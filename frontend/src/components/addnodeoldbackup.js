import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import swal from 'sweetalert2';

class AddNode extends Component {
    constructor() {
        super();
        this.state = {
            nodeName: "",
            createdDate: "",
            status: "",
            cluster_id: "",
            data: []
        }
        this.nodeNameChangeHandler = this.nodeNameChangeHandler.bind(this);
        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.statusChangeHandler = this.statusChangeHandler.bind(this);
        this.submitNodeData = this.submitNodeData.bind(this);
        // ????   Do we need to create state and handler for cluster_id. FYI it's fetched from addCluster or getClusterList based on selection
    }
    nodeNameChangeHandler(e) {
        this.setState({ nodeName: e.target.value });

    }
    dateChangeHandler(e) {
        this.setState({ createdDate: e.target.value });

    }
    statusChangeHandler(e) {
        this.setState({ status: e.target.value });

    }
    componentWillMount() {
        var self = this;
        console.log("will mount..")
        let email_id = localStorage.getItem("email_id");
        console.log("the user_email is in add node component  ", email_id)
        const data = {
            id: email_id
        }
        console.log("before axios request")
        axios.post('http://localhost:3001/getClusterList', data, { withCredentials: true })
            .then(response => {
                console.log("response add node class", response);
                console.log("cluster names in addnode class", response.data.data[0].cluster_name);
                if (response.status === 200) {
                    this.setState({
                        data: response.data.data
                    })
                }
            })
    }
    submitNodeData = e => {
        //prevent page from refresh
        e.preventDefault();
        console.log("inside submit node data from client side..")
        const data = {
            //????  Hardcoding the cluster_id for now
            //put handler and fetch id from tthere
            cluser_id: "5cb980065872562dae6c9982",
            nodeName: this.state.nodeName,
            createdDate: this.state.createdDate,
            status: this.state.status,
        };
        axios.post('http://localhost:3001/addNode', data, { withCredentials: true })
            .then(response => {
                console.log("Status Code : ", response);
                if(response.status==201)
             {
                 //swal('Node added successfully','node data saved','success')
                 
                 swal({
                    type: 'success',
                    title: 'Cluster saved successfully',
                    text: 'cluster data saved',
                    width:"280px",
                })
                 // window.location.href = "http://localhost:3000/dashboard";
             }
            });
    }


    //     createSelectItems() {
    //         let items = [];         
    //         for (let i = 0; i <= this.state.data.length; i++) {             
    //              items.push(<option key={i} value={i}>{i}</option>);   
    //              //here I will be creating my options dynamically based on
    //              //what props are currently passed to the parent component
    //         }
    //         console.log("items: ",items)
    //         return items;
    //     }  

    //    onDropdownSelected(e) {
    //        console.log("THE VAL", e.target.value);
    //        //here you will see the current selected value of the select input
    //    }

    render() {

        return (
            <div>
                <div>

                    <div class="navbar -fluid p-3 mb-2 bg-success text-white" style={{ background: '#32CD32' }}>
                        <div class="container">
                            <h1 class="h1 text-center" style={{ color: "white" }}>SmartAgro</h1>
                        </div>

                    </div>


                    <form method="post" class="form-inline justify-content-center"  >
                        <div class="container col-md-10 ">
                            <p></p>
                            <div class="login-form md-10">
                                <div class="main-div md-10">
                                    <div align="center" style={{ fontSize: '20px' }} >New Node</div>
                                    <div class="panel" align="left">
                                    </div>

                                    <div><input type="hidden" name="type" value="Traveler" /></div>
                                    <div class="form-group">
                                        <input onChange={this.nodeNameChangeHandler} type="text" class="form-control" name="nodeName"
                                            placeholder="nodeName" required="true" />
                                    </div>
                                  
                                    
                                    <select defaultValue="Please select the cluster">
                                    <option value="cluster_name">Choose cluster</option>
                                        {
                                            this.state.data.map(function (cluster, index) {
                                            return <option value="cluster_name" key={index}>{cluster.cluster_name}</option>
                                            })
                                            
                                        }
                                    </select>
        
                                    {/* <input type="select" onChange={this.onDropdownSelected} label="clusterNames" multiple>
                          {this.createSelectItems()}</input> */}
                                    {/* <div class="form-group">
                                            <select id="clusterName" class="form-control " name="clusterName" required>
                                                <option value="option1">{cluster.cluster_name}</option>
                                            </select>
                                        </div> */}


                                    <div class="form-group">
                                        <input onChange={this.dateChangeHandler} type="date" class="form-control" name="createdDate"
                                            placeholder="date created" required="true" />
                                    </div>

                                    <div class="form-group">
                                        <select id="status" class="form-control " onChange={this.statusChangeHandler} name="status" required>
                                            <option value="A">Active</option>
                                            <option value="I">Inactive</option>
                                            <option value="UM">Under Maintainence </option>

                                        </select>
                                    </div>


                                    <div class="form-group">
                                        <input type="text" class="form-control"
                                            name="Location" placeholder="locations" required="true" />
                                    </div>


                                    <div id="map"></div>
                                    {/* <script>
                            
                                    function initMap() {
                                        var map = new google.maps.Map(document.getElementById('map'), {
                                                                      zoom: 10,
                                                                      center: {lat: -25.363882, lng: 131.044922}
                                                                      });
                                                                      
                                                                      var marker = new google.maps.Marker({
                                                                                                          position: map.getCenter(),
                                                                                                          map: map
                                                                                                          });
                                    }
                            </script> */}
                                    <script async defer
                                        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWQbUssB9ze5_GW2C9oOpSsb8W2ztryjo&callback=initMap">
                                    </script>


                                    <button onClick={this.submitNodeData} class="btn btn-primary">Add new Node</button>

                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

        )

        // if (this.state.data != null) {
        //     return (
        //         <div>
        //             {cluster_names}
        //         </div>

        //     )
        // }

    }
}
export default AddNode;