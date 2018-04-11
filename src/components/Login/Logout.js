import React from 'react';

class Logout extends React.Component{
    constructor(props){
        super(props);
        sessionStorage.clear();
        this.props.history.push('/');
    }
    render(){
        return true;
    }
}
export default Logout;