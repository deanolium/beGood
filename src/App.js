import React, { Component } from 'react';
import './App.css';
import User from './User.js';

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

        // Almost definitely a better way to do this...
        // Though it would be better if I had users as an array in firebase instead of a dictionary
        for (const userId in fbUsers) {
          users.push({
            userId: userId,
            name: fbUsers[userId].name,
            id: fbUsers[userId].id
          });
        }

        // create the new state object and send it on its way
        const data = {
          users: users,
          loaded: true
        };

        return this.setState(data);
      });
  }

  sortUsers() {
    const sortedUsers = this.state.users
      .slice()
      .sort((a, b) => a[this.state.sortOrderKey] > b[this.state.sortOrderKey]);

    return sortedUsers;
  }

  render() {
    // Let's get the sorted users, assuming that the sortOrder is actually a key
    const sortedUsers = this.sortUsers();

    // now render this
    return (
      <div className="App">
        {!this.state.loaded ? (
          <div className="loading">Loading</div>
        ) : (
          <div>
            <div className="controls">
              <div
                className={
                  this.state.sortOrderKey === 'name'
                    ? 'control selected'
                    : 'control'
                }
                onClick={() => this.setState({ sortOrderKey: 'name' })}
              >
                Sort by Name
              </div>
              <div
                className={
                  this.state.sortOrderKey === 'id'
                    ? 'control selected'
                    : 'control'
                }
                onClick={() => this.setState({ sortOrderKey: 'id' })}
              >
                Sort by Id
              </div>
            </div>
            <div className="users">
              {sortedUsers.map((user, index) => (
                <User userData={user} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
