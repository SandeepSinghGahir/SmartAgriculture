import React, {Component} from 'react';
//nimport '../App.css';
import axios from 'axios';
import '../theme.css'
import Chart from 'react-google-charts';
import LiquidFillGauge from 'react-liquid-gauge';
import Moisture from'./Moisture';
import ListFarmers from './ListFarmers'
//npmimport '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Dashboard extends Component {
  constructor(){
    super();
    this.state={
         data:[],
         email:"",
         size:""
     }


}




componentWillMount() {
var self = this;
console.log("will mount sensor data.")

axios.post("http://localhost:3001/getSensorReadings")
    .then(function (response) {
        console.log("response in getSensorList", response.data.data);

        if (response.data.data != null) {
            self.setState({
                data: response.data.data.slice(-5)
            })
        }
        if (response.status === 204) {
            console.log("No sensor readings found for this sensor");
            console.log("data" + response.data.status)
            return
        }
    })
}
    // componentDidMount()
    // {
    //   console.log("in will mount...")
    //   this.drawChart();
    // }


    render(){
      const header = ["Sensor_Name",
  "Type", "Status", "Reading","Date Created"];
       return(
        <div>

          <div class = "aimsition">
            <div class = "page-wrapper">

               <header class = "header-mobile d-block d-lg-none">

                  <div class = "header-mobile_bar">

                    <div class="header-mobile-inner">
                          <div class = " bg-success text-white" style={{background: '#32CD32'}}>
                            <div class = "container-fluid">
                              <h1 class ="h1"style= {{color:"white"  }}>SmartAgro</h1>
                              <button class="hamburger hamburger--slider"  type="button">
                    					   <span class="hamburger-box">
                    						   <span class="hamburger-inner"></span>
                    					   </span>
                              </button>
                            </div>
                          </div>
                    </div>
                  </div>
                  <nav class="navbar-mobile">
                    <div class = "container-fluid">
                      <ul class="navbar-mobile__list list-unstyled">
                          <li>
                              <a href="#">
                              <i class="fas fa-tachometer-alt"></i>Dashboard</a>
                          </li>
                          <li>
                            <a href="chart.html">
                            <i class="fas fa-check-square"></i>Add Sensor</a>
                         </li>
                         <li>
                           <a href="chart.html">
                           <i class="fas fa-table"></i>View Sensor</a>
                        </li>
                        <li>
                          <a href="chart.html">
                          <i class="fas fa-check-square"></i>Add Cluster</a>
                       </li>
                       <li>
                         <a href="chart.html">
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
                      <h1 class = "h1 "> SmartAgro </h1>
                  </div>
                  <div class="menu-sidebar__content js-scrollbar1 " style = {{background: "initial" }}>
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
                                  <a href="table.html">
                                      <i class="fas fa-table"></i>View Cluster</a>
                              </li>
                              <li>
                                  <a href="chart.html">
                                      <i class="zmdi zmdi-edit"></i>Node Management</a>
                              </li>
                              <li>
                                  <a href="table.html">
                                      <i class="zmdi zmdi-view-web"></i>View Node</a>
                              </li>
                              <li>
                                  <a href="chart.html">
                                        <i class="fas fa-plus-square"></i>Sensor Management</a>
                              </li>
                              <li>
                                  <a href="table.html">
                                      <i class="fas fa-table"></i>View Sensor</a>
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
                                      <input class="au-input au-input--xl" type="text" name="search"  placeholder="Search for datas &amp; reports..." />
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
                          <div class="row">
                              <div class="col-md-12">
                                  <div class="overview-wrap text">
                                      <h2 class="title-1">DashBoard</h2>
                                      <button class="au-btn au-btn-icon au-btn--blue">
                                        <i class="zmdi zmdi-plus"></i>Hi Neha
                                      </button>
                                  </div>
                              </div>
                          </div>

                          <div class="row m-t-25">
                                <div class="col-sm-6 col-lg-3">
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
                                <div class="col-sm-6 col-lg-3">
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
                                <div class="col-sm-6 col-lg-3">
                                    <div class="overview-item overview-item--c3">
                                        <div class="overview__inner">
                                            <div class="overview-box clearfix">
                                                <div class="icon">
                                                    <i class="zmdi zmdi-portable-wifi-changes"></i>
                                                </div>
                                                <div class="text">
                                                    <h2>4086</h2>
                                                    <span>No. of Nodes</span>
                                                </div>
                                            </div>
                                            <div class="overview-chart">
                                                <canvas id="widgetChart3"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-lg-3">
                                      <div class="overview-item overview-item--c4">
                                          <div class="overview__inner">
                                              <div class="overview-box clearfix">
                                                  <div class="icon">
                                                      <i class="zmdi zmdi-group-work"></i>
                                                  </div>
                                                  <div class="text">
                                                      <h2>1762</h2>
                                                      <span>Number Of Clusters</span>
                                                  </div>
                                              </div>
                                              <div class="overview-chart">
                                                  <canvas id="widgetChart4"></canvas>
                                              </div>
                                          </div>
                                      </div>
                                </div>
                          </div>


                          <div class="row">
                            <div class="col-lg-6">
                                <div class="au-card recent-report">
                                    <div class="au-card-inner">
                                        <h3 class="title-2">Temperature Report</h3>


                                        <div class="recent-report__chart">
                                          <Chart
                                            width={300}
                                            height={'300px'}
                                            chartType="AreaChart"
                                            loader={<div>Loading Chart</div>}
                                            data={[
                                              ['Time', 'Temp'],
                                              ['1', 75],
                                              ['6', 82],
                                              ['12', 78],
                                              ['00', 70],
                                            ]}
                                            options={{
                                              title: '',
                                              hAxis: { title: 'Hours', titleTextStyle: { color: '#333' } },
                                              vAxis: { minValue: 0 },
                                              // For the legend to fit, we make the chart area smaller
                                              chartArea: { width: '50%', height: '70%' },
                                              // lineWidth: 25
                                            }}/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="au-card chart-percent-card">
                                    <div class="au-card-inner">
                                        <h3 class="title-2 tm-b-5">Average Moisture Reaing</h3>
                                        <h3></h3>
                                        <div class="row no-gutters">
                                            <div class="col-xl-6">
                                                <div class="chart-note-wrap">
                                                  <Moisture></Moisture>

                                                </div>
                                            </div>
                                            <div class="col-xl-6">
                                                <div class="percent-chart">
                                                    <canvas id="percent-chart"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>



                          <div class="row">
                            <div class="col-lg-9">
                                <h2 class="title-1 m-b-25 text success">Sensor Data</h2>
                                <div class="table-responsive table--no-card m-b-40">
                                    <table class="table table-borderless table-striped table-earning">
                                    <thead class="thead-dark">
                                        <tr>{header.map((h, i) => <th scope="col" key={i}>{h}</th>)}</tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(this.state.data).map((k, i) => {
                                            let sensor = this.state.data[k];
                                            return (
                                                <tr key={i}>

                                                    <td>{sensor.sensor_name}</td>
                                                    <td>{sensor.sensor_type}</td>
                                                    <td>{sensor.sensor_status}</td>
                                                    <td>{sensor.sensor_reading}</td>
                                                    <td>{sensor.created_date}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <h2 class="title-1 m-b-25">Farmers List</h2>
                                <div class="au-card au-card--bg-blue au-card-top-countries m-b-40">
                                    <div class="au-card-inner">
                                        <div class="table-responsive">
                                            <table class="table table-top-countries">
                                              <tbody>
                                                <ListFarmers></ListFarmers>
                                              </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>


                </div>




                </div>

              </div>



              </div>




            </div>
          </div>

        </div>

       )}
}

export default Dashboard;
