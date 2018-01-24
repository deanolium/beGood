import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('main app', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('can sort users by id', () => {
    const testApp = new App();
    testApp.state.sortOrderKey = 'id';
    testApp.state.users = [
      { id: 0, name: 'c' },
      { id: 10, name: 'a' },
      { id: 2, name: 'b' }
    ];

    const expectedUsers = [
      { id: 0, name: 'c' },
      { id: 2, name: 'b' },
      { id: 10, name: 'a' }
    ];

    expect(testApp.sortUsers()).toEqual(expectedUsers);
  });

  it('can sort users by name', () => {
    const testApp = new App();
    testApp.state.sortOrderKey = 'name';
    testApp.state.users = [
      { id: 0, name: 'c' },
      { id: 10, name: 'a' },
      { id: 2, name: 'b' }
    ];

    const expectedUsers = [
      { id: 10, name: 'a' },
      { id: 2, name: 'b' },
      { id: 0, name: 'c' }
    ];

    expect(testApp.sortUsers()).toEqual(expectedUsers);
  });

  it('intentionally failing', () => {
    expect(1).toEqual(2);
  });
});
