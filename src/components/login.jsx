import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


class Login extends Component {
    state = { 
      email:'',
      password:''
    } 
  
    getUserName = (e) =>{
      this.setState({
        email : e.target.value
      });
    }
  
    getPassword = (e) =>{
      this.setState({
        password : e.target.value
      });
      
    }
  
    loginEvent = (e) =>{
      e.preventDefault();
  
      const loginData ={
        email : this.state.email,
        password : this.state.password
      }
  
      axios.post('http://localhost:3001/login',loginData)
        .then(res => console.log(res));
      
        window.location = '/';
    }
  
    render() { 
      return ( 
        <div>
          <form onSubmit = {this.loginEvent} >
            <input placeholder = "Enter email" onChange = {this.getUserName} />
            <br/>
            <input placeholder = "Enter password" onChange = {this.getPassword} />
            <br/>
            <button type="submit">Login</button>
          </form>
        </div>
      );
    }
  }
   
  export default Login;
  