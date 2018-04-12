import React, {Component} from 'react';

import Customers from '../Customers/Customers';
class Home extends Component{
    constructor(props){
        super(props);
        if(sessionStorage.getItem('isloggedin')!=1){
            this.props.history.push('/');
        }
    }

    render(){
        return(
            <div className="row mt-5">
                <div className="col-lg-12">
                    <p className=""> Home page content here</p>
                    <Customers />
                </div>
            </div>
        )
    }
}

export default Home;