import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

//Import Components
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

//Import Styles
import './custom.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App Appcontent container-fluid bg-dark">
          <div className="content">
          <Header />
          {/*<Body />*/}
          <div className="min-height-500">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
          <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
