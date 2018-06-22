import React,{Component} from 'react';


/* var myHOC = ComposedComponent => class extends Component {

}; */
const loaderHoc = (propname)=>(MainComponent) => class extends Component{
    render(){
        return this.props[propname].length==0 ? <div className="loader">Loading</div> : <MainComponent {...this.props} />
    }
}

export default loaderHoc;