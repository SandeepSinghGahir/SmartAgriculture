
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore,applyMiddleware,compose } from "redux";
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import AddCluster from './components/AddCluster';
import AddNode from './components/AddNode';
import AddSensor from './components/AddSensor';
import DeleteNode from './components/DeleteNode';
import UpdateNode from './components/UpdateNode.js';
import Dashboard from './components/Dashboard';
import ListFarmers from './components/ListFarmers';
import ListClusters from './components/ListClusters';
import SignUp from './components/SignUp';
import reducer from './store/reducer';
import {Provider} from 'react-redux';
import promise from "redux-promise";
import ListSensors from  './components/ListSensors'
import Login from  './components/Login'
import ListSensorReadings from './components/ListSensorReadings'
//to work with redux dev tool

import './vendor/font-awesome-4.7/css/font-awesome.min.css';
import './vendor/font-awesome-5/css/fontawesome-all.min.css';
import './vendor/mdi-font/css/material-design-iconic-font.min.css';
import './vendor/bootstrap-4.1/bootstrap.min.css';
import './vendor/animsition/animsition.min.css';
import './vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css';
import './vendor/wow/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/slick/slick.css';
import './vendor/perfect-scrollbar/perfect-scrollbar.css';
import './vendor/select2/select2.min.css';

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
//import createStore from redux
//import Provider from react-redux

//create a store and pass reducer as an argument
//const store = createStore(reducer);
const store = createStore(reducer, composePlugin(applyMiddleware(promise)));

ReactDOM.render(
    <Provider store = {store}>

            <Router>
                <div>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/addcluster" component={AddCluster}/>
                <Route path="/addNode" component={AddNode}/>
                <Route path="/addSensor" component={AddSensor}/>
                <Route path="/updateNode" component={UpdateNode}/>
                <Route path="/deleteNode" component={DeleteNode}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/getFarmerList" component={ListFarmers}/>
                <Route path="/getClusterList" component={ListClusters}/>
                <Route path="/register" component={SignUp}/>
                <Route path="/getSensorList" component={ListSensors}/>
                <Route path="/getSensorReadings" component={ListSensorReadings}/>
                </div>
            </Router>

    </Provider>
    ,
    document.getElementById('root')
);
