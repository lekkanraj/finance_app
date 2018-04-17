import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{

    render(){
        return(
            <div className="row pb-3">
                <div className="col-lg-10">
                 <nav className="navbar navbar-expand-xl">
                  <ul className="navbar-nav">
                    {/*<li className="nav-item p-1">
                        <Link className="nav-link" to ="/">Home</Link>
                    </li>*/}
                    {
                        sessionStorage.getItem('isloggedin')==1 ? [
                            <li className="nav-item p-1">
                                <Link className="nav-link" to ="/">Home</Link>
                            </li>,
                            <li className="nav-item p-1">
                                <Link className="nav-link" to="/customers">Customers</Link>
                            </li>,
                            <li className="nav-item p-1">
                                <Link className="nav-link" to="/lines">Lines</Link>
                            </li>
                        ] :''
                    }
                    </ul>
                    {/*
                        sessionStorage.getItem('isloggedin')==1 ? (
                            <Link className="navbar-brand  float-right" to="/">
                                Welcome {sessionStorage.getItem('firstname')},
                            </Link>
                        ):''
                    */}
                    </nav>
                </div>
                <div className="col-lg-2">
                    {
                        sessionStorage.getItem('isloggedin')==1 ? (
                            <div className="mt-3 float-right">
                                <button className="dropdown-toggle" data-toggle="dropdown">
                                    Welcome {sessionStorage.getItem('firstname')},
                                </button>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-itm p-2" to ="/logout">Logout</Link>
                                </div>
                            </div>
                        ):''
                    }
                </div>
            </div>
        )
    }
}

export default Header;