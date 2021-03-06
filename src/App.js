import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Signup from './components/signup.js'
import Login from './components/login.js'
import Dashboard from './components/dashboard.js'
import axios from 'axios';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            loggedIn: false,
            loggedInEmail: null
        }
        this.handleSignUpAjax = this.handleSignUpAjax.bind(this);
        this.handleLogInAjax = this.handleLogInAjax.bind(this);
    }

    handleLogOutAjax(event) {
       // ajax call for logout
          axios.post('http://localhost:3000/logout', {withCredentials: true}).then((response) => {
            this.setState({
              loggedIn: response.data.login,
              loggedInEmail: null,
              selected: '',
            });
          }).catch((err) => {
            console.error(err);
          });
    }

    handleButtonClick(event) {
        this.setState({
            selected: event.currentTarget.value
        });
    }

    handleSignUpAjax(payLoad) {
        // ajax call to post data
        axios.post('http://localhost:3000/addUser', payLoad).then((response) => {
            console.log(response);
            this.setState({
                loggedIn: true,
                loggedInEmail: payLoad.email
            });
        }).catch((err) => {
            console.error(err);
        });

    }

    handleLogInAjax(payLoad) {
        // ajax call to authenticate user
        axios.post('http://localhost:3000/authenticate', payLoad,  {
          headers: {
            authorization: 'I_am_a_genius'
          }, withCredentials: true
        }).then((response) => {
          this.setState({
            loggedIn: response.data.login,
            loggedInEmail: payLoad.email
          });
        }).catch((err) => {
          console.error(err);
        });
    }


  render() {
    return (
      <div className="App">

          <div className="nav">
              { (!this.state.loggedIn )?<button value='signup' onClick = {(e) => this.handleButtonClick(e)}>Sign up</button>:null }
              { (!this.state.loggedIn) ? <button value='login' onClick = {(e) => this.handleButtonClick(e)}>Log In</button>:null  }
              { (this.state.loggedIn) ? <button value='logout' onClick = {(e) => this.handleLogOutAjax(e)}>Log Out</button>:null  }
          </div>

          <div className="App-intro">
              { (!this.state.loggedIn && this.state.selected === 'signup') ? <Signup callbackfunction={this.handleSignUpAjax}/> : null}
              { (!this.state.loggedIn && this.state.selected === 'login') ? <Login callbackfunction={this.handleLogInAjax} loggedIn={this.state.login} loggedInEmail={this.state.loggedInEmail}/> : null}

          </div>

          <div >
              { (this.state.loggedIn) ? <Dashboard email={this.state.loggedInEmail} /> : null  }

          </div>

      </div>
    );
  }
}

export default App;
