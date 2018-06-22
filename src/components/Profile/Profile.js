import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProfile} from '../../actions/profileActions'

class Profile extends Component{
    constructor(props){
        super(props);
        this.update=this.update.bind(this);
    }

    update(e){
        //console.log("sdfsdfsdfdsfsdfsdf");
        var username=e.target.value;
        //console.log(username);
        this.props.updateProfileProps(0,username);
    }
    
    render(){
        return(
            <div className="row">
                <form className="" >
                    <div className="form-group">
                        <label className="" > User Name</label>
                        <input className="form-input" name="username" onChange={this.update} value={this.props.Profiledata.username} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" name="username" type="submit" >Update</button>
                    </div>
                </form>
                
            </div>
        )
    }

}

const mapStatetoProps=(state)=>{
    return{
        Profiledata:state.proRed
    }
}

const mapDispatchtoProps=(dispatch)=>{
    return{
        updateProfileProps:(payload,username)=>{
            dispatch(updateProfile(payload,username));
        }
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Profile);
