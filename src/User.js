import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var FontAwesome = require('react-fontawesome');

export default class User extends Component {

  constructor(props) {
    super();
    this.state = {
      isActivated: false,
      status: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }


  handleClick() {
    const url = 'http://js-assessment-backend.herokuapp.com';

    this.setState(state => ({
      status: !state.isActivated
    }))

    let isActive = this.state.isActivated ? 'active' : 'locked'
    console.log(isActive);

    axios.put(url + '/users.json', {status: isActive}).then(res => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }


  render() {
    return (
      <div>
        <Row>
          <Col>{this.props.user.first_name}</Col>
          <Col>{this.props.user.last_name}</Col>
          <Col>{this.props.user.created_at}</Col>
          <Col>
            <Button className="user-isactivate" onClick={this.handleClick}>
              {
                this.props.user.status === 'active' ?
                  <FontAwesome
                    className='user-active'
                    name='rocket'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                  />
                :
                  <FontAwesome
                    className='user-inactive'
                    name='ban'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                  />
              }
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
