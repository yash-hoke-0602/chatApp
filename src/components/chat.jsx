import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

axios.defaults.withCredentials = true;

const socket = io('localhost:3001');

class Chat extends Component {
    state = { 
      sender:'',
      userName:'',
      msg:'',
      receivedMsg:[]
    } 

    componentDidMount(){
        axios.get('http://localhost:3001/updateUser')
              .then(res =>{
                  this.setState({
                      sender:res.data
                  })
                  console.log(this.state.sender)
              

            });
              
              socket.on('connect', () => {
                socket.emit('updateSocket',this.state.sender)
                console.log(socket.id);
                socket.on('getMsg',(data)=>{
                  console.log(data)
                  this.setState({
                    receivedMsg: [...this.state.receivedMsg, data]
                  })
                })
            
              });

              
    }


      
    getUserName = (e) =>{
      this.setState({
        userName : e.target.value
      });
    }
  
    getMsg = (e) =>{
      this.setState({
        msg : e.target.value
      });
      
    }
  
    sendEvent = (e) =>{
      e.preventDefault();
  
      
        const msgData ={
          userName : this.state.userName,
          msg : this.state.msg,
          sender:this.state.sender
        }
        
        console.log(msgData);
        
        socket.emit('sendMsg',msgData)
      
      
    }
  
    render() { 
      

      return ( 
        <div>
          Welcome {this.state.sender}
          <form onSubmit = {this.sendEvent} >
            <select name="user" id="user" onChange={this.getUserName}>
              <option value="kiran">kiran</option>
              <option value="suraj">suraj</option>
              <option value="yash">yash</option>
            </select>
            <br/>
            <input placeholder = "Enter Message" onChange = {this.getMsg} />
            <br/>
            <button type="submit">Send</button>
          </form>
          <div>
            <ul>{this.state.receivedMsg.map((d,i) => <li key={i}>{d.msg} ---{d.sender}</li>)}</ul>
          </div>
        </div>
      );
    }
  }
   
  export default Chat;
  