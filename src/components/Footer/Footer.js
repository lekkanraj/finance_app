import React, {Component} from 'react';

class Footer extends Component{

    render(){
        return(
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center">
                       <p> &copy; {new Date().getFullYear()} FinApp.com</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;