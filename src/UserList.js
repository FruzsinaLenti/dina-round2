import React, { Component } from 'react';
import axios from 'axios';
import User from './User';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import Pagination from 'react-bootstrap/Pagination';


class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      offset: 0,
      usersLength: 0
    }
  }

  componentDidMount() {
    const url = 'http://js-assessment-backend.herokuapp.com';

    axios.get(url + '/users.json',
    {
      headers: {"Access-Control-Allow-Origin": "*"}
    }
    ).then(response => {
      if (response.data) {
        this.userListFromJson(response.data);

      }
    }).catch((err) => {
      console.warn('Err', err);
    });
  }

  userListFromJson(users) {
    this.setState({users: users, usersLength: users.length, loading: false});
  }

  userMap(usr) {
    return usr.map(user => {
      return <User key={user.id} user={user}/>
    });
  }

  userList(offset) {
    const RECORDS_PER_PAGE = 10;
    const page = parseInt(this.getPageNumber(), 10) || 1;
    //const offset = (page - 1) * RECORDS_PER_PAGE;

    let  usr = this.state && this.state.users && this.state.users.slice(0 + this.state.offset, RECORDS_PER_PAGE + this.state.offset);

    return this.userMap(usr);
  }

  getPageNumber() {
    return window.location.search
    .slice(1)
    .split("&")
    .reduce((queryHash, queryParam) => {
      // e.g. ?page=3 becomes ["page", "3"]
      const query = queryParam.split('=');
      return Object.assign({}, queryHash, ({
        [query[0]]: query[1] || null
      }));

    }, {}).page;
  }

  render() {
    let items = [];

    for (let number = 1; number <= this.state.usersLength/10; number++) {
      items.push(
        <Pagination.Item key={number} active={number === this.state.offset} onClick={() => this.userList(this.setState({offset: number}))}>
          {number}
        </Pagination.Item>,
      );
    }
    if (this.state.loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Card>
          <Card.Body></Card.Body>
        </Card>
        <Container>
          {this.userList(this.getPageNumber())}
          <Pagination>{items}</Pagination>
        </Container>
      </div>
    );
  }
}
export default UserList;
