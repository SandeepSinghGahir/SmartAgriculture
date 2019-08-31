import React, { Component } from 'react';
//nimport '../App.css';
import axios from 'axios';
import '../theme.css'
import Chart from 'react-google-charts';
import LiquidFillGauge from 'react-liquid-gauge';
import Moisture from './Moisture';
import ListClusters from './ListClusters';
import TestChild from './TestChild';
//npmimport '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class AddCluster extends Component {
    constructor() {
        super();
        this.state = {
            clusterName: "",
            createdDate: "",
            status: "",
            fieldType: "",
            email: "",
            data: [],
            update_email: "",
                uclusterID: "",
                uclustername: "",
                uclusterstatus: "",
                new_status:""
            
        }
        this.clusterNameChangeHandler = this.clusterNameChangeHandler.bind(this);
        this.dateChangeHandler = this.dateChangeHandler.bind(this);
        this.statusChangeHandler = this.statusChangeHandler.bind(this);
        this.submitClusterData = this.submitClusterData.bind(this);
        this.fieldTypeChangeHandler = this.fieldTypeChangeHandler.bind(this);
        this.setFarmerEmail = this.setFarmerEmail.bind(this);
       // this.setFarmerUpdateEmail = this.setFarmerUpdateEmail.bind(this);

        this.handleClusterId = this.handleClusterId.bind(this);
        this.handleClusterName = this.handleClusterName.bind(this);
        this.updateStatusChangeHandler=this.updateStatusChangeHandler.bind(this);
        this.handleClusterStatus = this.handleClusterStatus.bind(this);
        this.searchClusterData=this.searchClusterData.bind(this);
        this.updateClusterData=this.updateClusterData.bind(this);
        this.deleteClusterData=this.deleteClusterData.bind(this);
        
    }
    clusterNameChangeHandler(e) {
        this.setState({ clusterName: e.target.value });
        console.log(this.state.clusterName)

    }
    updateStatusChangeHandler(e)
    {
        this.setState({ new_status: e.target.value });
    }
    dateChangeHandler(e) {
        this.setState({ createdDate: e.target.value });

    }
    statusChangeHandler(e) {
        this.setState({ status: e.target.value });

    }
    fieldTypeChangeHandler(e) {
        this.setState({ fieldType: e.target.value });

    }
    handleClusterId(e){
        this.setState({ uclusterID: e.target.value });
        console.log(e.target.value)
    }
    handleClusterName(e){
        this.setState({ uclustername: e.target.value });
    }
    handleClusterStatus(e){
        this.setState({ uclusterstatus: e.target.value });
    }

    setFarmerEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    updateClusterData(e)
    {
        e.preventDefault();
        const data={
            
            uclusterID:this.state.uclusterID,
            new_status:this.state.new_status,
        }
        axios.post('http://localhost:3001/updateCluster', data)
                .then(response => {
                    console.log("Status Code : ", response);
                    
                    if (response.status == 200) {
                        document.getElementById("update-result").innerHTML = "Cluster updated successfully!";
                        // window.location.href = "http://localhost:3000/dashboard";
                    }
                    
                });
    }

    componentWillMount() {
        var self = this;
        console.log("wil mount..")
        axios.get("http://localhost:3001/getFarmerList")
            .then(function (response) {
                console.log("response in listfarmer", response.data.data);

                if (response.data.data != null) {
                    self.setState({
                        data: response.data.data
                    })
                }

            })
    }
 
    searchClusterData(e){
        e.preventDefault();
     var self=this;
        const data = {
            id: this.state.uclusterID
        }
        console.log(data)
        axios.post("http://localhost:3001/getClusterById", data ,{ withCredentials: true })
            .then(function (response) {
                console.log("response",response)
                //.log("response in getClusterList", response.data.data[0].status);
                if (response.data.data.length == 0) {
                    document.getElementById("update-result").innerHTML = "Cluster not found!";
                    self.setState({
                        uclustername: "",
                        uclusterstatus: ""
                    })
                    // window.location.href = "http://localhost:3000/dashboard";
                }
                if (response.status == 400) {
                    document.getElementById("update-result").innerHTML = "Cluster not found!";
                    // window.location.href = "http://localhost:3000/dashboard";
                }
                if (response.data.data.length != 0) {
                    self.setState({
                        uclustername: response.data.data[0].cluster_name,
                        uclusterstatus: response.data.data[0].status
                    })
                  
                }
               
            })
    }

    
    deleteClusterData(e){
        e.preventDefault();
        var self=this;
           const data = {
               id: this.state.uclusterID
           }
           console.log(data)
           axios.post("http://localhost:3001/deleteClusterById", data)
               .then(function (response) {
                   console.log("response in getClusterList", response);
   
                   if (response.status === 200) {
                    document.getElementById("update-result").innerHTML = "Cluster deleted successfully!";
                    // window.location.href = "http://localhost:3000/dashboard";
                }
               })
       }

    submitClusterData = e => {
        //prevent page from refresh
        e.preventDefault();
        console.log("inside submit login from client side..")
        console.log("email to be sent", this.state.email)
        const data = {
            email: this.state.email,
            clusterName: this.state.clusterName,
            createdDate: this.state.createdDate,
            status: this.state.status,
            fieldType: this.state.fieldType
        };
        axios.post('http://localhost:3001/addcluster', data, { withCredentials: true })
            .then(response => {
                console.log("Status Code : ", response);

                if (response.status == 201) {
                    
                    document.getElementById("success-result").innerHTML = "New Cluster Added! Please note the Id for future reference.<br>"+response.data.data._id;
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
                                            <a href="/addCluster">
                                                <i class="fas fa-check-square"></i>Add Cluster</a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fas fa-table"></i>View Cluster</a>
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
                                            <a href="/addCluster">
                                                <i class="zmdi zmdi-comment-edit"></i>Cluster Management</a>
                                        </li>
                                       
                                        <li>
                                            <a href="/addNode">
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
                                            <div class="col-sm-4 col-lg-4">
                                                <div class="overview-item overview-item--c1">
                                                    <div class="overview__inner">
                                                        <div class="overview-box clearfix">
                                                            <div class="icon">
                                                                <i class="zmdi zmdi-input-antenna"></i>
                                                            </div>
                                                            <div class="text">
                                                                <h2>Add Your Cluster Below</h2>
                 
                                                            </div>
                                                        </div>
                                                        <div class="overview-chart">
                                                            <canvas id="widgetChart1"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-lg-4">
                                                <div class="overview-item overview-item--c2">
                                                    <div class="overview__inner">
                                                        <div class="overview-box clearfix">
                                                            <div class="icon">
                                                                <i class="zmdi zmdi-portable-wifi-changes"></i>
                                                            </div>
                                                            <div class="text">
                                                                <h2>Update Cluster Info</h2>
                                                               
                                                            </div>
                                                        </div>
                                                        <div class="overview-chart">
                                                            <canvas id="widgetChart2"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                        {/* ADD CLUSTER STARTS  */}

                                        <div class="row">
                                            <div class="col-lg-4">
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
                                                                            <input onChange={this.clusterNameChangeHandler} type="text" class="form-control" name="clustername"
                                                                                placeholder="Cluster Name" required="true" />
                                                                        </div>

                                                                        <div class="form-group">
                                                                            <select id="fieldType" class="form-control " onChange={this.fieldTypeChangeHandler} name="fieldType" required>
                                                                                <option value="" selected disabled hidden>Choose your fields</option>
                                                                                <option value="RF">Ranch field</option>
                                                                                <option value="GF">GreenHouse Field</option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <input onChange={this.dateChangeHandler} type="date" class="form-control" name="createdDate"
                                                                                placeholder="date created" required="true" />
                                                                        </div>

                                                                        {/* old working href of showing farmers
     <div>
              <a href='#' onClick={this.setFarmerEmail} data-id={farmer.email}> {farmer.firstName} {farmer.lastName}</a>
          </div> */}

                                                                        <div class="form-group">
                                                                           
                                                                                <select value={this.state.email} onChange={this.setFarmerEmail}>
                                                                                <option  value="">Choose farmer</option>
                                                                                {this.state.data.map((farmer) => 
                                                                                <option key={farmer.email} value={farmer.email}>{farmer.firstName}</option>)}
                                                                            </select>
                                                                        </div>


                                                                        <div class="form-group">
                                                                       
                                                                            <select id="status" class="form-control " onChange={this.statusChangeHandler} name="status" required>
                                                                                <option value="" selected disabled hidden>Choose cluster status</option>
                                                                                <option value="Active">Active</option>
                                                                        <option value="Inactive">Inactive</option>
                                                                        <option value="Under Maintainence">Under Maintainence </option>
                                                                        <option value="Turn On">Turn On</option>
                                                                        <option value="Turn Off">Turn Off </option>

                                                                            </select>
                                                                        </div>

                                                                        <div class="form-group">
                                                                            <input type="text" class="form-control"
                                                                                name="Location" placeholder="location" required="true" />
                                                                        </div>
                                                                        <button onClick={this.submitClusterData} class="btn btn-primary">Add Cluster</button>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </form>



                                                    </div>
                                                </div>
                                            </div>
                                            {/* ADD CLUSTER ENDS */}


                                            {/* UPDATE CLUSTER STARTS OLD */}
                                            <div class="col-lg-4">
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
                                                                            <input onChange={this.handleClusterId} type="text" class="form-control" name="uclusterID"
                                                                                placeholder="Enter Cluster ID" required="true" />
                                                                        </div>

                                                                    </div >
                                                                  
                                                                    <button onClick={this.searchClusterData} class="btn btn-primary">Search</button>
                                                                    
                                                                   
                                                                </div>

                                                                <div class="form-group">
                                                                    <input onChange={this.handleClusterName} defaultValue={this.state.uclustername} type="text" class="form-control" name="uclustername"
                                                                        placeholder="Cluster Name"  />
                                                                </div>
                                                                <div class="form-group">
                                                                    <input onChange={this.handleClusterStatus} defaultValue={this.state.uclusterstatus} type="text" class="form-control" name="uclusterstatus"
                                                                        placeholder="Cluster Status"  />
                                                                </div>



                                                                <div class="form-group"> update cluster status
                                                                    <select id="status" class="form-control " onChange={this.updateStatusChangeHandler} name="new_status">
                                                                        <option value="" selected disabled hidden>Select</option>
                                                                        <option value="Active">Active</option>
                                                                        <option value="Inactive">Inactive</option>
                                                                        <option value="Under Maintainence">Under Maintainence </option>
                                                                        <option value="Turn On">Turn On</option>
                                                                        <option value="Turn Off">Turn Off </option>

                                                                    </select>
                                                                </div>
                                                                
                                                                <button onClick={this.updateClusterData} class="btn btn-primary">Update</button>
                                                                <button onClick={this.deleteClusterData} class="btn btn-danger">Delete</button>
                                                                
                                                            </div>
                 
                                      </form>



                                            </div>
                                        </div>
                                    </div>
                                </div>






                            </div>




                        </div>

                    </div>



                </div>




            </div>
        </div >

      </div >
     )

    }
}


export default AddCluster;
