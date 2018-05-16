import React, {Component} from 'react';
import {connect} from 'react-redux';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import {HOST} from '../../constants/constants';

class Collection extends Component{
    constructor(props){
        super(props);
        this.state={
            lines:[],
            linetypes:[],
            selected_date:moment(),
            collection_list:[],
            sld_linetype:'',
            sld_line:''
        };
        this.onsetLineType=this.onsetLineType.bind(this);
        this.onsetLine=this.onsetLine.bind(this);
        this.searcCollection=this.searcCollection.bind(this);
        this.startDateChange=this.startDateChange.bind(this);
        this.updateCollection=this.updateCollection.bind(this);  
        this.collectionSubmit=this.collectionSubmit.bind(this); 
        
    }

    componentWillMount(){
        fetch(HOST+"collection/search_linetype.php")
        .then((response)=>response.json())
        .then((data)=>
            this.setState({linetypes:data})
        );

        fetch(HOST+"collection/search_lines.php")
        .then((response)=>response.json())
        .then((data)=>
            this.setState({lines:data})
        );
    }

    onsetLineType=()=>(event)=>{
       var id=Number(event.target.value);
       fetch(HOST+'collection/search_lines.php?linetype='+id)
            .then((response)=>response.json())
            .then((responsejson)=>
            {
                this.setState({lines:responsejson});
            }
        );       
    }
    onsetLine=()=>(event)=>{
       var id=Number(event.target.value);
       this.setState({sld_line:id});                
    }

    searcCollection(event){
        event.preventDefault();
        const data = new FormData(event.target);
        this.setState({collection_list:[]});
        fetch(HOST+"collection/list.php",{
            method: 'POST',            
            body:data,
        })
        .then((response)=>response.json())
        .then((responsedata)=>{
            this.setState({collection_list:responsedata});
        }
        );
     }
     startDateChange(date){
        this.setState({
            selected_date: date
          });
    }

    updateCollection(event){
        event.preventDefault();
        const data = new FormData(event.target);

        fetch(HOST+"collection/update_collection.php",{
            method: 'POST',            
            body:data,
        })
        .then((response)=>response.json())
        .then((responsedata)=>{
            this.setState({collection_list:responsedata});
        }
        );
    }

    collectionSubmit(event){
        console.log(event.target.value);
        //console.log(event.form.submit());
        //event.form.submit();

    }


    render(){
        return(
            <div className="">
                <div className="">
                <form className="text-light form-inline" onSubmit={this.searcCollection}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-3 col-sm-12">
                                    <label>Line Type</label>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                <select className="form-control" name="linetype_id" onChange={this.onsetLineType()} required>
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
                                <div className="col-lg-3 col-sm-12">
                                    <label>Area Name</label>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <select className="form-control" name="line" required onChange={this.onsetLine()}>
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
                                <div className="col-lg-3 col-sm-12">
                                    <label>Collection Date</label>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                <DatePicker name="collection_date" className="form-control" selected={this.state.selected_date} onChange={this.startDateChange} required/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-12 text-center col-sm-12">
                                    <button className="btn btn-primary" name="searchline" type="submit" >Search</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Collection List*/}
                <div className="table-reposive customer-list">
                            <table className="table-bordered table-hover">
                                <thead className="thead-light">
                                    <tr className="">
                                        <td>Sno</td>
                                        <td>Customer Name</td>
                                        <td>Collection Amount</td>
                                        <td>Finance Amount</td>
                                        <td>Received Amount</td>
                                        <td>Balance Amount</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.collection_list.map((customer,i)=>
                                        <tr>
                                            <td className="text-center">{i+1}</td>
                                            <td className="text-center">{customer.cus_name}</td>
                                            <td className="text-center">
                                                <form onSubmit={this.updateCollection}>
                                                    <input name="coll_amt" value={customer.coll_amt} type="text" onBlur={this.collectionSubmit} />
                                                    <button type="submit">Update</button>
                                                    <input name="cus_id" value={customer.cus_id} type="hidden" />
                                                    <input name="fin_id" value={customer.fin_id} type="hidden" />
                                                    <input name="rec_amt" value={customer.rec_amt} type="hidden" />
                                                    <input name="bal_amt" value={customer.bal_amt} type="hidden" />
                                                    <input name="line_id" value={this.state.sld_line} type="hidden" />
                                                    <input name="collection_date" value={moment(this.state.selected_date,"DD-MM-YYYY").format("DD-MM-YYYY")} type="hidden" />
                                                 </form>
                                            </td>
                                            <td className="text-center">{customer.net_amt ? customer.net_amt :"-"}</td>
                                            <td className="text-center">{customer.rec_amt ? customer.rec_amt :"-"}</td>
                                            <td className="text-center">{customer.bal_amt ? customer.bal_amt :"-"}</td>
                                        </tr>
                                    )}
                                    {this.state.collection_list.length==0 ?                                    
                                        (
                                            <tr>
                                                <td colspan="6">No Customers Found</td>
                                            </tr>

                                        ):''
                                    }
                                </tbody>
                            </table>
                        </div>
               
            </div>
        );
    }

}

export default Collection;