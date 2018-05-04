import React, {Component} from 'react';
import {connect} from 'react-redux';
import Search from './Search';
import {allCustomers} from '../../actions/financeActions';
import {HOST} from '../../constants/constants';

class Finance extends Component{
    constructor(props){
        super(props);
        this.state={
            finance_cus:[],
            finance_cusinfo:[0],
            search_lineid:'',
            success_message:'',
            error_message:''
        };
        this.editFinance=this.editFinance.bind(this);
        this.updateFinCustomer=this.updateFinCustomer.bind(this);
        var cuslist,searchpath="";
        if(this.props.customers.linetypeselected){
           searchpath="?linetype="+this.props.customers.linetypeselected;
        }
        if(this.props.customers.lineselected){
            searchpath=searchpath+"&line="+this.props.customers.lineselected;
        }
        fetch(HOST+"finance/list.php"+searchpath)
            .then((response)=>response.json())
            .then((responsedata)=>{
                cuslist=responsedata;
                this.props.setAllCustomers(cuslist);
            }
        );
        
       
    }

    editFinance(id){
        fetch(HOST+'finance/get_fincustomer_info.php?id='+id)
        .then((response)=>response.json())
        .then((responsejson)=>
        {
            this.setState({finance_cusinfo:responsejson[0]});
        }
        );
        console.log(this.state.finance_cusinfo);
    }

    updateFinCustomer(){

    }
    render(){
        return(
            <div className="row">
                <div className="col-lg-2">&nbsp;</div>
                <div className="col-lg-10">
                    {this.state.success_message ? 
                        <div className="alert alert-info text-warning data-dissmissble">
                            {this.state.success_message}<button className="close" data-dismiss="alert">&times;</button>
                        </div>
                    :''}
                    <div className="row">
                    <Search />
                    </div>
                        <div className="table-reposive customer-list">
                            <table className="table-bordered table-hover">
                                <thead className="thead-light">
                                    <tr className="">
                                        <td>Sno</td>
                                        <td>Customer Name</td>
                                        <td>Area-Line</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.customers.fin_customers.map((customer,i)=>
                                        <tr>
                                            <td>{i+1}</td>
                                            <td><a onClick={()=>this.editFinance(customer.cus_id)} href="javascript:;" data-toggle="modal" data-target="#editFinCustomer">{customer.cus_name}</a></td>
                                            <td>{customer.area ? customer.area :"-"}</td>
                                        </tr>
                                    )}
                                    {this.props.customers.fin_customers.length==0 ?                                    
                                        (
                                            <tr>
                                                <td colspan="3">No Customers Found</td>
                                            </tr>

                                        ):''
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/*Edit Modal Start*/}
                        <div className="modal fade" id="editFinCustomer">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <div className="modal-title text-center">
                                            <h4 className="text-info">Edit Customer Info</h4>                                           
                                        </div>
                                        <div className="float-right">
                                                <button className="close" id="updateformclose" data-dismiss="modal">&times;</button>
                                        </div>
                                    </div>
                                    <div className="modal-body">
                                        <form className="text-dark finCustomerEditForm" onSubmit={this.updateFinCustomer}>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Name</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control cus_name" id="cus_name" required name="cus_name" type="text" value={this.state.finance_cusinfo.cus_name} onChange = {this.handleChange} />
                                                        <input className="form-control cus_id" id="cus_id" required name="cus_id" type="hidden" value={this.state.finance_cusinfo.cus_id} />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Line(Area)</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <select className="form-control line_id" name="line_id"  value={this.state.finance_cusinfo.line_id ? this.state.finance_cusinfo.line_id:''} onChange = {this.handleChange} >
                                                            <option value="">Select Line</option>
                                                            {/*
                                                            this.state.lines.length >0 ? (
                                                                this.state.lines.map((line,i)=>
                                                                    <option value={line.line_id}>{line.area}</option>
                                                                )
                                                            ) :""
                                                        */ }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-12 text-center col-sm-12">
                                                        <button className="btn btn-primary" name="updatecustomer" type="submit">Update</button>
                                                        <button className="btn btn-warning ml-2" name="cancel close" data-dismiss="modal">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Edit Modal End*/}
                </div>
            </div>
        );
    }

}

//export default Finance;

const mapStateToProps=(state)=>{
    return{
        customers:state.finRed,
    }

};

const mapDispatchToProps=(dispatch)=>{
    return{
        setAllCustomers:(customerslist)=>{
            dispatch(allCustomers(0,customerslist));
        }
    }

};

export default connect(mapStateToProps,mapDispatchToProps)(Finance);