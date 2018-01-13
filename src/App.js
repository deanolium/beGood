import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import 'firebase/database';

firebase.initializeApp({
  apiKey: 'AIzaSyCbP-eTgHg7Yd-2nEFQ_nxKU8xVgjs2BLE',
  authDomain: 'begood-bb473.firebaseapp.com',
  databaseURL: 'https://begood-bb473.firebaseio.com',
  projectId: 'begood-bb473',
  storageBucket: 'begood-bb473.appspot.com',
  messagingSenderId: '161487569741'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      sortOrderKey: 'name',
      loaded: false
    };
  }

  componentDidMount() {
    // Connect to firebase and grab the list of users
    firebase
      .database()
      .ref('users')
      .on('value', snapshot => {
        const fbUsers = snapshot.val();
        var users = [];

        for (const userId in fbUsers) {
          users.push({
            userId: userId,
            name: fbUsers[userId].name,
            id: fbUsers[userId].id
          });
        }
        const data = {
          users: users,
          loaded: true
        };

        return this.setState(data);
      });
  }

  render() {
    // Let's get the sorted users, assuming that the sortOrder is actually a key
    const sortedUsers = this.state.users
      .slice()
      .sort((a, b) => a[this.state.sortOrderKey] > b[this.state.sortOrderKey]);

    return (
      <div className="App">
        {!this.state.loaded ? (
          <div className="loading">Loading</div>
        ) : (
          <div>
            <div className="controls">
              <div
                className="control"
                onClick={() => this.setState({ sortOrderKey: 'name' })}
              >
                Sort by Name
              </div>
              <div
                className="control"
                onClick={() => this.setState({ sortOrderKey: 'id' })}
              >
                Sort by Id
              </div>
            </div>
            <div>{sortedUsers.map(user => <div>User: {user.name}</div>)}</div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
