import React, { Component } from 'react';

import axios from 'axios';
axios.defaults.withCredentials = true;          //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials

class Home extends Component {
    state = {  
        loggedUser:"No User"
    }

    componentDidMount(){
        console.log("Start");
        axios.get('http://localhost:3001/isLogin')
              .then(res =>{
                  if(res.data.loggedStatus){
                    this.setState({
                        loggedUser: res.data.loggedUser
                    });
                    console.log(this.state.loggedUser);
                }
              });
    }

    logoutEvent = (e) =>{
        e.preventDefault();
        axios.get('http://localhost:3001/logout')
            .then(res =>{
                if(res.data === 'logout'){
                    this.setState({
                        loggedUser:"No User"
                    })
                }
            });

    }

    logoutButton(){
        if(this.state.loggedUser !== "No User"){
            return (<button onClick = {this.logoutEvent}> Logout</button>)
        }
        else{
            return (<div><a href="/login"><button> Login</button></a></div>)
        }
    }

    chatButton(){
        if(this.state.loggedUser !== "No User"){
            return (<div><a href="/chat"><button > chat</button></a></div>)
        }
    }

    render() { 
        return (  
            <div>
                {this.state.loggedUser}
                <div>{this.logoutButton()}</div>
                <div>{this.chatButton()}</div>
            </div>
        );
    }
}
 
export default Home;