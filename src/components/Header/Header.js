import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{

    render(){
        return(
            <div className="row">
                <div className="col-lg-12">
                    <ul className="nav">
                        <li className="navitem p-1">
                            <Link to ="/">Home</Link>
                        </li>
                        <li className="navitem p-1">
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header;