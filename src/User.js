import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.userData.name,
      id: props.userData.id
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.userData.name,
      id: props.userData.id
    });
  }

  render() {
    return (
      <div>
        User: ({this.state.id}) {this.state.name}{' '}
      </div>
    );
  }
}

export default User;
