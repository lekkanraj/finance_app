import React, {Component} from 'react';

class Login extends Component{
    constructor(props){
        super(props);
        //sessionStorage.setItem('name','Lekkan');
        this.userlogin=this.userlogin.bind(this);
    }

    userlogin(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/finance_service/user/login.php', {
            method: 'POST',            
            body:data,
        })
        .then((response)=>response.json())
        .then((responsedata)=>{
            console.log(responsedata.status)
            //this.setState({isLoggedin:responsedata.status});
            //console.log(this.state.isLoggedin);
            if(responsedata.user_id>0){
                sessionStorage.setItem("isloggedin",1);
                sessionStorage.setItem("firstname",responsedata.user_name);
               
            }else{
                sessionStorage.setItem("isloggedin",0);
                
            }
            //console.log(this.state.errorMessage);
            if(sessionStorage.getItem("isloggedin")==1){
                    this.props.history.push("/home");
            }else{
                
            }
            
        }
        );
    }
    render(){
        return(
            <div className="row mt-5">
                <div className="col-lg-12">
                    <div className="col-lg-4 col-sm-3 float-left">&nbsp;</div>
                    <div className="col-lg-4 col-sm-6 float-left">
                        <div class="jumbotron">
                            <div className="pb-2 text-center">
                                <h3 className="text-primary">Fin-App Login</h3>
                            </div>
                            <form name="login" className="text-dark" onSubmit={this.userlogin}>
                                <div className="form-group">
                                    <label className="" for="username">User Name</label>
                                    <input type="text" className="form-control" name="username"/>
                                </div>
                                <div className="form-group">
                                    <label className="" for="password">Password</label>
                                    <input type="password" className="form-control" name="password" />
                                </div>
                                <div className="text-center">
                                    <button name="login" className="btn btn-primary m-1" type="submit">Login</button>
                                    <button name="Clear" className="btn btn-info" type="reset">Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-3 float-left">&nbsp;</div>
                </div>
            </div>
        )
    }
}

export default Login;