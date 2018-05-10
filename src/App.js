import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


//Import Components
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import Home from './components/Home/Home';
import Customers from './components/Customers/Customers';
import Lines from './components/Lines/Lines';
import Finance from './components/Finance/Finanace';
import Collection from './components/Collection/Collection';

//Import Styles
import './custom.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App Appcontent container bg-dark">
          <div className="content">
          <Header />
          {/*<Body />*/}
          <div className="min-height-500">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path='/login' component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/customers" component={Customers} />
              <Route exact path="/lines" component={Lines} />
              <Route exact path="/finance" component={Finance} />
              <Route exact path="/collection" component={Collection} />
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
