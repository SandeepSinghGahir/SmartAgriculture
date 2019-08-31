// import React, {Component} from 'react';
// import '../App.css';
// import axios from 'axios';



// class ViewCluster extends Component {
//     constructor(){
//         super();
//         this.state= {
//             clusterName:"",
//             createdDate:"",
//             status:"",
//             fieldType:"",
//         }
//         this.clusterNameChangeHandler = this.clusterNameChangeHandler.bind(this);
//         this.dateChangeHandler = this.dateChangeHandler.bind(this);
//         this.statusChangeHandler = this.statusChangeHandler.bind(this);
//       //******************delete and edit
//       //  this.submitClusterData = this.submitClusterData.bind(this);
//       //********* this.deletecluster = this.deletecluster.bind(this);
//       //*********** this.editcluster = this.editcluster.bind(this);  ***** ON click edit the data should be fillable else locked
//         this.fieldTypeChangeHandler=this.fieldTypeChangeHandler.bind(this);
//     }
//     clusterNameChangeHandler(e) {
//         this.setState({ clusterName: e.target.value });

//     }
//     dateChangeHandler(e) {
//         this.setState({ createdDate: e.target.value });

//     }
//     statusChangeHandler(e) {
//         this.setState({ status: e.target.value });

//     }
//     fieldTypeChangeHandler(e) {
//         this.setState({ fieldType: e.target.value });

//     }

//     //*******************Get cluster data to edit and delete
//     submitClusterData = e => {
//         //prevent page from refresh
//         e.preventDefault();
//         console.log("inside submit login from client side..")
//         const data = {
//             email:"neha@gmail.com",
//             clusterName: this.state.clusterName,
//             createdDate: this.state.createdDate,
//             status: this.state.status,
//             fieldType:this.state.fieldType
//         };
//         axios.post('http://localhost:3001/Signup', data, { withCredentials: true })
//             .then(response => {
//                 console.log("Status Code : ", response);
//              });
//     }

//     render(){
//        return(
//         <div>
//         <div>

//           <div class = "navbar -fluid p-3 mb-2 bg-success text-white" style={{background: '#32CD32'}}>
//             <div class = "container">
//                 <h1 class ="h1 text-center"style= {{color:"white"  }}>SmartAgro</h1>
//             </div>
//           </div>


//           <form method="post" class="form-inline justify-content-center"  >
//               <div class="container col-md-10 ">
//                   <p></p>
//                   <div class="login-form md-10">
//                       <div class="main-div md-10">
//                           <div align="center" style={{ fontSize: '20px' }} >Cluster Details</div>
//                           <div class="panel" align="left">
//                           </div>

//                           <div><input type="hidden" name="type" value="Traveler" /></div>
//                           <div class="form-group">
//                               <input  onChange={this.clusterNameChangeHandler} type="text" class="form-control" name="clustername"
//                                   placeholder="Cluster  Name" required="true" />
//                           </div>

//                           <div class="form-group">
//                           <select id = "fieldType" class = "form-control " onChange={this.fieldTypeChangeHandler} name = "fieldType" required>
//                             <option value="RF">Ranch field</option>
//                             <option value="GF">GreenHouse Field</option>
//                           </select>
//                           </div>

//                           <div class="form-group">
//                               <input onChange={this.dateChangeHandler} type="date" class="form-control" name="createdDate"
//                                   placeholder="date created" required="true" />
//                           </div>

//                           <div class="form-group">
//                           <select id = "status" class = "form-control " onChange={this.statusChangeHandler} name = "status" required>
//                             <option value="A">Active</option>
//                             <option value="I">Inactive</option>
//                             <option value="UM">Under Maintainence </option>

//                           </select>
//                           </div>

//                           <div id="email-error" class="error"></div>
//                           <div class="form-group">
//                               <input  type="text" class="form-control"
//                                name="Model" placeholder="Model" required="true" />
//                           </div>

//                           <div class="form-group">
//                               <input  type="text" class="form-control"
//                                name="Make" placeholder="Make" required="true" />
//                           </div>

//                           <div class="form-group">
//                               <input  type="text" class="form-control"
//                                name="Location" placeholder="locations" required="true" />
//                           </div>


//                             <div id="map"></div>
//                             {/* <script>

//                                     function initMap() {
//                                         var map = new google.maps.Map(document.getElementById('map'), {
//                                                                       zoom: 10,
//                                                                       center: {lat: -25.363882, lng: 131.044922}
//                                                                       });

//                                                                       var marker = new google.maps.Marker({
//                                                                                                           position: map.getCenter(),
//                                                                                                           map: map
//                                                                                                           });
//                                     }
//                             </script> */}
//                             <script async defer
//                                 src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWQbUssB9ze5_GW2C9oOpSsb8W2ztryjo&callback=initMap">
//                             </script>


//                           <button onClick={this.editcluster} class="btn btn-primary" style = {{}}>Edit Cluster</button>
//                           <p></p>
//                           <p></p>
//                           <button onClick={this.deletecluster} class="btn btn-primary">Delete Cluster</button>
//                       </div>
//                   </div>
//               </div>
//           </form>

//       </div>
//     </div>
//        )}
// }

// export default ViewCluster;
