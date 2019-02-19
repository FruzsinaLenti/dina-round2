import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

  }
  addNewUser() {
    if(this.state.first_name.length > 0 && this.state.last_name.length > 0) {
      const url = 'http://js-assessment-backend.herokuapp.com';

      let valuesToSend = {
        first_name:this.state.first_name,
        last_name: this.state.last_name,
        status: 'active'
      };
      axios.post(url + '/users.json', valuesToSend).then(res => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    return (
        <Form>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleChange} />
          </Form.Group>
          <Button
            onClick={this.addNewUser()}
            variant="primary"
            >
            Submit
          </Button>
        </Form>
    );
  }
}
export default NewUser;
