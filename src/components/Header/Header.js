import React,{Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

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
                                <NavLink exact className="nav-link" to ="/home">Home</NavLink>
                            </li>,
                            <li className="nav-item p-1">
                                <NavLink exact className="nav-link" to="/lines">Lines</NavLink>
                            </li>,
                            <li className="nav-item p-1">
                                <NavLink exact className="nav-link" to="/customers">Customers</NavLink>
                            </li>,
                            <li className="nav-item p-1">
                                <NavLink exact className="nav-link" to="/finance">Finance</NavLink>
                            </li>,
                            <li className="nav-item p-1">
                                <NavLink exact className="nav-link" to="/collection">Collections</NavLink>
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
                                    Welcome {this.props.Profile.username}-{},
                                </button>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-itm p-2" to ="/profile">Profile</Link><br></br>
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

const mapStatetoProps=(state)=>{
    return{
        Profile:state.proRed
    }
}

export default connect(mapStatetoProps)(Header);