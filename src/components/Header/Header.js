import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{

    render(){
        return(
            <div className="row pb-3">
                <div className="col-lg-12">
                 <nav className="navbar navbar-expand-xl">
                 {
                    sessionStorage.getItem('isloggedin')==1 ? (
                        <Link className="navbar-brand" to="/">
                            Welcome {sessionStorage.getItem('firstname')},
                        </Link>
                    ):''
                }
                  <ul className="navbar-nav">
                    {/*<li className="nav-item p-1">
                        <Link className="nav-link" to ="/">Home</Link>
                    </li>*/}
                    {
                        sessionStorage.getItem('isloggedin')==1 ? (
                            
                            <li className="nav-item p-1">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        ) :''
                    }
                    </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Header;