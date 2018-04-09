import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Import Components
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid bg-success">
        <Header />
        <Body />
        <Footer /> 
      </div>
    );
  }
}

export default App;
