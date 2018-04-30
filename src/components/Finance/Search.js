import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CUSTOMER_BYLINETYPE,CUSTOMER_BYLINE} from '../../actions/financeActions';
import {allCustomers,customerbyLineType,customerbyLine} from '../../actions/financeActions';
import {HOST} from '../../constants/constants';

class Search extends Component{
    constructor(props){
        super(props);

        this.state={
            lines:[],
            linetypes:[],
            sld_linetype:'',
            sld_line:''
        };
        this.onsetLineType=this.onsetLineType.bind(this);
        this.onsetLine=this.onsetLine.bind(this);
        this.onResetCustomers=this.onResetCustomers.bind(this);
    }

    componentWillMount(){
        fetch(HOST+"finance/search_linetype.php")
        .then((response)=>response.json())
        .then((data)=>
            this.setState({linetypes:data})
        );

        fetch(HOST+"finance/search_lines.php")
        .then((response)=>response.json())
        .then((data)=>
            this.setState({lines:data})
        );
    }

    onsetLineType=()=>(event)=>{
       var id=Number(event.target.value);
       console.log(id);
       this.props.setLineType(0,id);
       fetch(HOST+'finance/search_lines.php?linetype='+id)
            .then((response)=>response.json())
            .then((responsejson)=>
            {
                this.setState({lines:responsejson});
            }
        );
        var cuslist;
        fetch(HOST+"finance/list.php?linetype="+id)
            .then((response)=>response.json())
            .then((responsedata)=>{
                cuslist=responsedata;
                this.props.setAllCustomers(cuslist);
            }
        );
       
    }

    onsetLine=()=>(event)=>{
        var id=event.target.value;
        this.props.setLine(id);
        var cuslist;
        fetch(HOST+"finance/list.php?line="+id)
            .then((response)=>response.json())
            .then((responsedata)=>{
                cuslist=responsedata;
                this.props.setAllCustomers(cuslist);
            }
        );
     }

     onResetCustomers=()=>(event)=>{
        var cuslist
        fetch(HOST+"finance/list.php")
            .then((response)=>response.json())
            .then((responsedata)=>{
                cuslist=responsedata;
                this.props.setAllCustomers(cuslist);
            }
        );
        this.props.setLineType(0,0);
        this.props.setLine(0);
     }

    

      render(){
        return(
                <div className="">
                    <form className="text-light searchLinesform form-inline" onSubmit={this.searchLines}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-4 col-sm-12">
                                    <label>Line Type</label>
                                </div>
                                <div className="col-lg-8 col-sm-12">
                                <select className="form-control" name="linetype_id" onChange={this.onsetLineType()} value={this.props.finsearch.linetypeselected}>
                                        <option value="">Select</option>
                                        {this.state.linetypes.map((linetype,i)=>
                                            <option value={linetype.linetype_id} >{linetype.linetype_name}</option>
                                        )}
                                </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-4 col-sm-12">
                                    <label>Area Name</label>
                                </div>
                                <div className="col-lg-8 col-sm-12">
                                    <select className="form-control" name="line_id" onChange={this.onsetLine()} value={this.props.finsearch.lineselected}>
                                        <option value="">Select</option>
                                        {this.state.lines.map((line,i)=>
                                            <option value={line.line_id} >{line.area}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-12 text-center col-sm-12">
                                    <button className="btn btn-primary" name="searchline" type="button" onClick={this.onResetCustomers()}>Clear</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
        );
    }
}

//export default Search;

const mapStateToProps=(state)=>{
    return{
        finsearch:state.finRed,
    }

};

const mapDispatchToProps=(dispatch)=>{
    return{
        setAllCustomers:(customerslist)=>{
            dispatch(allCustomers(0,customerslist));
        },
        setLineType:(payload,linetype)=>{
            dispatch(customerbyLineType(payload,linetype));
        },
        setLine:(line)=>{
            dispatch(customerbyLine(line));
        }
    }

};

export default connect(mapStateToProps,mapDispatchToProps)(Search);

/* Search.propTypes = {
    name: PropTypes.string,
    financeSh_linetype: PropTypes.number,
    financeSh_line: PropTypes.number
  }; */