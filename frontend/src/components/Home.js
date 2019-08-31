import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import swal from 'sweetalert2'
import { connect } from 'react-redux';
import {Charts} from "react-google-charts";


class Home extends Component {
    constructor(){
        super();

        this.state = {
            email: "",
            password: "",

        };
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    emailChangeHandler(e) {

        this.setState({ email: e.target.value });
        console.log("email change handlet" + this.state.email)
        e.target.value == "" ? document.getElementById("email-error").innerHTML = "Please enter the field" :
            document.getElementById("email-error").innerHTML = "";
    }
    passwordChangeHandler(e) {
        this.setState({ password: e.target.value });
        e.target.value == "" ? document.getElementById("password-error").innerHTML = "Please enter the field" :
            document.getElementById("password-error").innerHTML = "";
    }
    validateEmail(email){
        if (email.trim() == "") {
            document.getElementById("email-error").innerHTML = "Please enter your email address";
            return false;
        }
        return true;
    }
    validatePassword(password){
        if (password.trim() == "") {
            document.getElementById("password-error").innerHTML = "Please enter your password";
            return false;
        }
        return true;
    }



    submitLogin = e => {
        //prevent page from refresh
        e.preventDefault();
        console.log("inside submit login from client side..")
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        console.log("user " + data.email + " pwd " + data.password)
        console.log("with credentials true")
        let emailErrorPresent = !this.validateEmail(this.state.email) ? true : false;
        let passwordErrorPresent = !this.validatePassword(this.state.password) ? true : false;
        this.props.onSubmitHandle(data);
    }

    render(){
        return(
            <div>
            <div>
            <header class="header bg-success">


              </header>
              <div class="main-content bg-success" >
                <div class="section__content section__content--p30">
                  `<div class="container-fluid">`
                          <div class="row">

                              <div class="col-md-12 col-lg-6">
                                  <div class="overview-wrap text">
                                      <h1 class="h1 text-white" align="center" style= {{marginLeft: "20%", marginTop: "10%", fontSize:"70px"}}>
                                        SmartAgro
                                        <h2 class="h2 text-white" align="center" style= {{ fontSize:"30px"}} >
                                          Be Smart Be Effective
                                        </h2>
                                      </h1>
                                  </div>
                              </div>

                              <div class="col-md-12 col-lg-6">
      <div class="overview-wrap text">
      <button class="au-btn au-btn-icon au-btn--green"style= {{ marginTop: "20%",marginRight:"0%"}}>
        <a class="accordion-toggle btn-block text-white: " href ="/login" style={{color: "white"}}>
          <i class="zmdi zmdi-account"></i>Login
        </a>
      </button>
      <button class="au-btn au-btn-icon au-btn--green"style= {{marginTop: "20%"}} >
      <a href ="/signup" style={{color: "white"}}>
        <i class="zmdi zmdi-account-add"></i>Sign Up
      </a>
      </button>
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


const mapDispatchStateToProps = dispatch => {
    console.log("hi in mapdispatch...")
    return {
        onSubmitHandle : (data) => {
            console.log("before post")
            axios.post('http://localhost:3001/login', data,{ withCredentials: true })
                .then((response) => {
                    console.log("after post")
                    console.log("response from backend server ",response)
                    // if (response.status === 403) {
                    //     console.log("Incorrect Credentials")
                    //     swal('Incorrect Password!', "Incorrect Credentials", 'error');
                    //          }
                        if (response.code === 404) {
                        console.log("User Not found")
                        swal({
                            type: 'error',
                            title: 'Email not registered.',
                            text: 'You entered invalid credentials or your email not registered!'
                        })
                            }

                            if (response.status == 200) {
                                console.log("success")
                                // swal({
                                //     type: 'success',
                                //     title: 'login Credentials.',
                                //     text: 'You entered invalid credentials or your email not registered!'
                                // })
                                window.location.href = "http://localhost:3000/dashboard";
                            }
                        console.log("response fetched..", response.data.resData)
                        dispatch({type: 'USER_INFO',payload :response.data.updatedList, statusCode : response.status})

            })
        }
    }
}

export default connect(null,mapDispatchStateToProps)(Home);
