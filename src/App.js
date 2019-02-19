import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import UserList from './UserList';
import NewUser from './NewUser';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar bg="dark" variant="dark">
            <Nav>
              <Nav.Link href="/">Users</Nav.Link>
              <Nav.Link href="/new"> Add New User</Nav.Link>
            </Nav>
          </Navbar>

          <Route exact path="/" component={UserList} />
          <Route exact path="/new" component={NewUser} />
        </div>
      </Router>
    );
  }
}
export default App;
