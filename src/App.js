import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

//Import Components
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container-fluid bg-success">
          <Header />
          <Body />
          <Footer />
        <Switch>
          <Route exact path='/login' component={Login} />
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
