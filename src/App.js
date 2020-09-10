import React from 'react';
import logo from './logo.svg';
import './App.css';
function formatUser() {
return user.firstname + " " + user.lastname;
}

const user = {
  firstname: "figi ",
  lastname:" lodo"
};
function list()
{
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1','dogo'),
  React.createElement('ul', 'cato'),
);
}
function App() {
  return (
<div>
  <h1>hello, {formatUser(user)}</h1>
  <div> {list()}</div>



    </div>

  );
}

export default App;
