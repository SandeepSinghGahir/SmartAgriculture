import React, { Component } from 'react';
//nimport '../App.css';
import axios from 'axios';
import '../theme.css'
import Chart from 'react-google-charts';
import LiquidFillGauge from 'react-liquid-gauge';
import Moisture from './Moisture';

//npmimport '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Addnode extends Component {
    constructor() {
        super();
        this.state = {            
            node_name: "",
            unodeID:"",
            cluster_id: "",
            status: "",
            location: "",
            created_date: "",
            email : "",
            data1: [],
            data2: [],
            unodename:"",
            unodestatus:"",
            new_status:"",
            
        }        
        this.nodeNameChangeHandler = this.nodeNameChangeHandler.bind(this);
        this.clusterIdChangeHandler = this.clusterIdChangeHandler.bind(this);
        this.statusChangeHandler = this.statusChangeHandler.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.submitNodeData = this.submitNodeData.bind(this);
        //this.changeHandlerNodeId=this.changeHandlerNodeId.bind(this);
        //this.fieldTypeChangeHandler=this.fieldTypeChangeHandler.bind(this);
        this.setFarmerEmail=this.setFarmerEmail.bind(this);
        this.setFarmerUpdateEmail=this.setFarmerUpdateEmail.bind(this);
        this.deleteNodeData=this.deleteNodeData.bind(this);
        this.updateNodeData=this.updateNodeData.bind(this);
        this.handleNodeName=this.handleNodeName.bind(this);
        this.handleNodeStatus=this.handleNodeStatus.bind(this);
        this.searchNodeData=this.searchNodeData.bind(this);
        this.updateStatusChangeHandler=this.updateStatusChangeHandler.bind(this);
    }

    handleNodeIDChangeHandler =(event) =>
    {
        console.log(this.state.unodeID)
    this.setState({unodeID: event.target.value})
    }
    
    nodeNameChangeHandler(e) {
        this.setState({ node_name: e.target.value });
        console.log(this.state.node_name)

    }
    handleNodeName(e)
    {
        this.setState({ unodename: e.target.value });
        console.log(this.state.unodename)
    }
  
    handleNodeStatus(e)
    {
        this.setState({ unodestatus: e.target.value });
        //console.log(this.state.unodestatus)

    }
    clusterIdChangeHandler(e) {
        this.setState({ cluster_id: e.target.value });
        console.log("Cluster id: ", this.state.cluster_id)

    }
    statusChangeHandler(e) {
        this.setState({ status: e.target.value });

    }

    locationChangeHandler(e) {
        this.setState({ location: e.target.value });
    }

    dateChangeHandler(e) {
        this.setState({ created_date: e.target.value });
    }
    
    updateStatusChangeHandler(e){
        this.setState({ new_status: e.target.value });
    }

    updateNodeData(e)
    {
        e.preventDefault();
        const data={
            
            unodeID:this.state.unodeID,
            new_status:this.state.new_status,
        }
        axios.post('http://localhost:3001/updateNode', data)
                .then(response => {
                    console.log("Status Code : ", response);
                    
                    if (response.status == 200) {
                        document.getElementById("update-result").innerHTML = "Node updated successfully!";
                        // window.location.href = "http://localhost:3000/dashboard";
                    }
                    
                });
    }
    searchNodeData(e){
        e.preventDefault();
         var self=this;
        const data = {
            id: this.state.unodeID
        }
        console.log(data)
        axios.post("http://localhost:3001/getNodeById", data ,{ withCredentials: true })
            .then(function (response) {
                console.log("response",response)
                //.log("response in getClusterList", response.data.data[0].status);
                if (response.data.data.length == 0) {
                    document.getElementById("update-result").innerHTML = "Node not found!";
                    self.setState({
                        unodename: "",
                        unodestatus: ""
                    })
                    // window.location.href = "http://localhost:3000/dashboard";
                }
                if (response.status == 400) {
                    document.getElementById("update-result").innerHTML = "Node not found!";
                    // window.location.href = "http://localhost:3000/dashboard";
                }
                if (response.data.data.length != 0) {
                    self.setState({
                        unodename: response.data.data[0].node_name,
                        unodestatus: response.data.data[0].status
                    })
                  
                }
               
            })
    }

    
    deleteNodeData(e){
        e.preventDefault();
        var self=this;
           const data = {
               id: this.state.unodeID
           }
           console.log(data)
           axios.post("http://localhost:3001/deleteNodeById", data)
               .then(function (response) {
                   console.log("response in getClusterList", response);
   
                   if (response.status === 200) {
                    document.getElementById("update-result").innerHTML = "Node deleted successfully!";
                    // window.location.href = "http://localhost:3000/dashboard";
                }
               })
       }

    setFarmerEmail(e) {
        e.preventDefault();
        const self = this
        self.setState({
            email: e.target.value

        })
        const data={
            id :e.target.value
        }

        console.log("Inside get cluster list")
        axios.post("http://localhost:3001/getClusterList",data)
        .then(function (response) {
            console.log("response in list cluster", response.data.data);

            if (response.data.data != null) {
                self.setState({
                    data2: response.data.data
                })
            }

        })
    }

    setFarmerUpdateEmail(e) {
        e.preventDefault();
        var self = this;
        console.log("updated email setstate", e.target.value)
        self.setState({
            update_email: e.target.value
        })
        console.log("this.state.update_email", this.state)
        const data = {
            id: self.state.update_email
        }
        axios.post("http://localhost:3001/getClusterList", data)
            .then(function (response) {
                console.log("response in getClusterList", response.data.data);

                if (response.data.data != null) {
                    self.setState({
                        data: response.data.data
                    })
                }
            })
    }

   
    componentWillMount() {
        var self = this;
        console.log("wil mount..")
        axios.get("http://localhost:3001/getFarmerList")
            .then(function (response) {
                console.log("response in list farmer", response.data.data);
                if (response.data.data != null) {
                    self.setState({
                        data1: response.data.data
                    })
                }
            })
        }


    submitNodeData = e => {
        //prevent page from refresh
        e.preventDefault();
        console.log("inside submit node from client side..")
        console.log("node to be saved", this.state.node_name)
        console.log("at cluster_id : ", this.state.cluster_id)

        const data = {            
            node_name: this.state.node_name,
            cluster_id: this.state.cluster_id,
            status: this.state.status,
            location: this.state.location,
            created_date: this.state.created_date
        };
        axios.post('http://localhost:3001/addnode', data, { withCredentials: true })
            .then(response => {
                console.log("Status Code : ", response);

                if (response.status == 201) {
                    document.getElementById("success-result").innerHTML = "New node Added!Please note the Id for future reference.<br>"+response.data.data._id;
                    // window.location.href = "http://localhost:3000/dashboard";
                }
            });
    }

    render() {

        return (
            <div>

                <div class="aimsition">
                    <div class="page-wrapper">

                        <header class="header-mobile d-block d-lg-none">

                            <div class="header-mobile_bar">

                                <div class="header-mobile-inner">
                                    <div class=" bg-success text-white" style={{ background: '#32CD32' }}>
                                        <div class="container-fluid">
                                            <h1 class="h1" style={{ color: "white" }}>SmartAgro</h1>
                                            <button class="hamburger hamburger--slider" type="button">
                                                <span class="hamburger-box">
                                                    <span class="hamburger-inner"></span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <nav class="navbar-mobile">
                                <div class="container-fluid">
                                    <ul class="navbar-mobile__list list-unstyled">
                                        <li>
                                            <a href="#">
                                                <i class="fas fa-tachometer-alt"></i>Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="/addSensor">
                                                <i class="fas fa-check-square"></i>Add Sensor</a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fas fa-table"></i>View Sensor</a>
                                        </li>
                                        <li>
                                            <a href="/addNode">
                                                <i class="fas fa-check-square"></i>Add node</a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fas fa-table"></i>View node</a>
                                        </li>
                                        <li>
                                            <a href="chart.html">
                                                <i class="fas fa-calendar-alt"></i>Reports</a>
                                        </li>
                                        <li>
                                            <a href="chart.html">
                                                <i class="fas fa-map-marker-alt"></i>Maps</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>


                        </header>



                        <aside class="menu-sidebar d-none d-lg-block">
                            <div class="logo text-success">
                                <h1 class="h1 "> SmartAgro </h1>
                            </div>
                            <div class="menu-sidebar__content js-scrollbar1 " style={{ background: "initial" }}>
                                <nav class="navbar-sidebar">
                                    <ul class="list-unstyled navbar__list">
                                        <li class="active has-sub">
                                            <a class="js-arrow" href="#">
                                                <i class="fas fa-tachometer-alt"></i>Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="/addcluster">
                                                <i class="zmdi zmdi-comment-edit"></i>Cluster Management</a>
                                        </li>
                                        
                                        <li>
                                            <a href="/addnode">
                                                <i class="zmdi zmdi-edit"></i>Node Management</a>
                                        </li>
                                       
                                        <li>
                                            <a href="/addSensor">
                                                <i class="fas fa-plus-square"></i>Sensor Management</a>
                                        </li>
                                        
                                        <li>
                                            <a href="form.html">
                                                <i class="far fa-chart-bar"></i>View Reports</a>
                                        </li>
                                        <li>
                                            <a href="form.html">
                                                <i class="zmdi zmdi-leak"></i>Simulation Data</a>
                                        </li>
                                        <li>
                                            <a href="map.html">
                                                <i class="fas fa-map-marker-alt"></i>Maps</a>
                                        </li>
                                        <li class="has-sub">
                                            <a class="js-arrow" href="#">
                                                <i class="fas fa-user"></i>User Profile</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </aside>


                        <div class="page-container">

                            <header class="header-desktop ">
                                <div class="section__content section__content--p30">
                                    <div class="container-fluid">
                                        <div class="header-wrap">

                                            <form class="form-header" action="" method="POST">
                                                <input class="au-input au-input--xl" type="text" name="search" placeholder="Search for datas &amp; reports..." />
                                                <button class="au-btn--submit bg-success" type="submit">
                                                    <i class="zmdi zmdi-search"></i>
                                                </button>
                                            </form>

                                            <div class="header-button">
                                                <div class="noti-wrap">
                                                    <div class="noti__item js-item-menu">
                                                        <i class="zmdi zmdi-comment-more"></i>
                                                        <span class="quantity">1</span>
                                                        <div class="mess-dropdown js-dropdown">
                                                        </div>
                                                    </div>

                                                    <div class="noti__item js-item-menu">
                                                        <i class="zmdi zmdi-notifications"></i>
                                                        <span class="quantity">3</span>
                                                        <div class="notifi-dropdown js-dropdown">
                                                            <div class="notifi__title">
                                                                <p>You have 3 Notifications</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="account-wrap">
                                                    <div class="account-item clearfix js-item-menu">
                                                        <div class="image">
                                                            <img class="rounded-circle" src={require('../images/user.jpg')} alt="User" />
                                                        </div>
                                                        <div class="content">
                                                            <a class="js-acc-btn" href="#">User</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="account-dropdown__footer">
                                                    <a href="#">
                                                        <i class="zmdi zmdi-power"></i>Logout</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header>


                            <div class="main-content">
                                <div class="section__content section__content--p30">
                                    <div class="container-fluid">
                                        <div class="row m-t-25">
                                            <div class="col-sm-6 col-lg-6">
                                                <div class="overview-item overview-item--c1">
                                                    <div class="overview__inner">
                                                        <div class="overview-box clearfix">
                                                            <div class="icon">
                                                                <i class="zmdi zmdi-input-antenna"></i>
                                                            </div>
                                                            <div class="text">
                                                                <h2>10368</h2>
                                                                <span>Number of Sensors</span>
                                                            </div>
                                                        </div>
                                                        <div class="overview-chart">
                                                            <canvas id="widgetChart1"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-lg-6">
                                                <div class="overview-item overview-item--c2">
                                                    <div class="overview__inner">
                                                        <div class="overview-box clearfix">
                                                            <div class="icon">
                                                                <i class="zmdi zmdi-portable-wifi-changes"></i>
                                                            </div>
                                                            <div class="text">
                                                                <h2>9237</h2>
                                                                <span>Active Sensors</span>
                                                            </div>
                                                        </div>
                                                        <div class="overview-chart">
                                                            <canvas id="widgetChart2"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>


                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="au-card recent-report">

                                                    <div class="alert alert-success" id="success-result" role="alert">
                                                    </div>
                                                    <div class="au-card-inner">

                                                        <form>
                                                            <div class="container">
                                                                <p></p>


                                                                <div class="login-form">
                                                                    <div class="">                                                                        

                                                                        <div class="form-group">
                                                                            <input onChange={this.nodeNameChangeHandler} type="text" class="form-control" name="node_name"
                                                                                placeholder="Node Name" required="true" />
                                                                        </div>
                                                                     
                                                                        <div class="form-group">
                                                                            <input onChange={this.dateChangeHandler} type="date" class="form-control" name="created_date"
                                                                                placeholder="Date Created" required="true" />
                                                                        </div>

                                                                        {/* old working href of showing farmers
     <div>
              <a href='#' onClick={this.setFarmerEmail} data-id={farmer.email}> {farmer.firstName} {farmer.lastName}</a>
          </div> */}

                                                                        <div class="form-group">
                                                                          
                                                                                 <select value={this.state.email} onChange={this.setFarmerEmail}>
                                                                                 <option  value="">Choose farmer</option>
                                                                                {this.state.data1.map((farmer) => <option key={farmer.email} value={farmer.email}>{farmer.firstName}</option>)}
                                                                            </select>
                                                                        </div>


                                                                        <div class="form-group">
                                                                           
                                                                                 <select value={this.state.cluster_id} onChange={this.clusterIdChangeHandler}>
                                                                                 <option  value="">Choose Cluster</option>
                                                                                {this.state.data2.map((cluster) => <option key={cluster._id} value={cluster._id}>{cluster.cluster_name}</option>)}
                                                                            </select>
                                                                        </div>



                                                                        <div class="form-group">
                                                                            <select id="status" class="form-control " onChange={this.statusChangeHandler} name="status" required>
                                                                                <option value="" selected disabled hidden>Choose Node status</option>
                                                                                <option value="Active">Active</option>
                                                                        <option value="Inactive">Inactive</option>
                                                                        <option value="Under Maintainence">Under Maintainence </option>
                                                                        <option value="Turn On">Turn On</option>
                                                                        <option value="Turn Off">Turn Off </option>

                                                                            </select>
                                                                        </div>

                                                                        <div class="form-group">
                                                                            <input  onChange={this.locationChangeHandler} type="text" class="form-control"
                                                                                name="location" placeholder="location" required="true" />
                                                                        </div>
                                                                        <button onClick={this.submitNodeData} class="btn btn-primary">Add Node</button>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </form>



                                                    </div>
                                                </div>
                                            </div>

                                            {/* UPDATE NODE STARTS , TODO- have to change handlers and all*/}
                                            <div class="col-lg-6">
                                                <div class="au-card recent-report">
                                                    <div class="alert alert-success" id="update-result" role="alert">
                                                    </div>
                                                    <div class="au-card-inner">

                                                        <form>
                                                            <div class="container">
                                                                <p></p>

                                                                <div class="login-form">
                                                                    <div class="">


                                                                        <div class="form-group">
                                                                            <input  onChange={this.handleNodeIDChangeHandler} type="text" class="form-control" name="unodeID" placeholder="Enter Node ID" />
                                                                        </div>

                                                                    </div >
                                                                  
                                                                    <button onClick={this.searchNodeData} class="btn btn-primary">Search</button>
                                                                    
                                                                   
                                                                </div>

                                                                <div class="form-group">
                                                                    <input onChange={this.handleNodeName} defaultValue={this.state.unodename} type="text" class="form-control" name="unodename"
                                                                        placeholder="Node Name"  />
                                                                </div>
                                                                <div class="form-group">
                                                                    <input onChange={this.handleNodeStatus} defaultValue={this.state.unodestatus} type="text" class="form-control" name="unodestatus"
                                                                        placeholder="Node Status"  />
                                                                </div>



                                                                <div class="form-group"> update Node status
                                                                    <select id="status" class="form-control " onChange={this.updateStatusChangeHandler} name="new_status">
                                                                        <option value="" selected disabled hidden>Select</option>
                                                                        <option value="Active">Active</option>
                                                                        <option value="Inactive">Inactive</option>
                                                                        <option value="Under Maintainence">Under Maintainence </option>
                                                                        <option value="Turn On">Turn On</option>
                                                                        <option value="Turn Off">Turn Off </option>

                                                                    </select>
                                                                </div>
                                                                
                                                                <button onClick={this.updateNodeData} class="btn btn-primary">Update</button>
                                                                <button onClick={this.deleteNodeData} class="btn btn-danger">Delete</button>
                                                                
                                                            </div>
                 
                                      </form>



                                            </div>
                                        </div>
                                    </div>  

{/* UPDATE NODE ENDS */}



  </div>
  </div>
  </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        )

    }
}


export default Addnode;
