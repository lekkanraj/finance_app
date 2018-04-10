import React, {Component} from 'react';

class Login extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-lg-12">
                    <div className="col-lg-4 col-sm-3 float-left">&nbsp;</div>
                    <div className="col-lg-4 col-sm-6 float-left">
                        <jumbotron>
                            <form name="login" className="">
                                <div className="form-group">
                                    <label className="" for="username">User Name</label>
                                    <input type="text" className="form-control" name="username" />
                                </div>
                                <div className="form-group">
                                    <label className="" for="password">Password</label>
                                    <input type="password" className="form-control" name="password" />
                                </div>
                                <div className="text-center">
                                    <button name="login" className="btn btn-primary m-1">Login</button>
                                    <button name="Clear" className="btn btn-info">Reset</button>
                                </div>
                            </form>
                        </jumbotron>
                    </div>
                    <div className="col-lg-4 col-sm-3 float-left">&nbsp;</div>
                </div>
            </div>
        )
    }
}

export default Login;