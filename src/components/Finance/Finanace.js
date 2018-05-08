import React, {Component} from 'react';
import {connect} from 'react-redux';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

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
            error_message:'',
            lines:[],
            linetypes:[],
        };
        this.editFinance=this.editFinance.bind(this);
        this.updateFinCustomer=this.updateFinCustomer.bind(this);
        this.handleChange=this.handleChange.bind(this);
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

    handleChange(event){
        const { finance_cusinfo } = this.state;
        const newinfo = {
          ...finance_cusinfo,
          [event.target.name]: event.target.value
        };
        this.setState({ finance_cusinfo: newinfo });
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
                            <div className="modal-dialog modal-lg">
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
                                                {/* Customer Info Start*/}
                                                <div className="row m-2">
                                                    <div className="col-lg-6">
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Name</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <label>: {this.state.finance_cusinfo.cus_name}</label>
                                                                <input className="form-control cus_id" id="cus_id" required name="cus_id" type="hidden" value={this.state.finance_cusinfo.cus_id} />
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Work</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <label>: {this.state.finance_cusinfo.job_name}</label>
                                                            </div>
                                                        </div>   
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Line Type</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <label>: {this.state.finance_cusinfo.linetype_name}</label>
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Line(Area)</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <label>: {this.state.finance_cusinfo.area}</label>
                                                            </div>
                                                        </div>  
                                                    </div>                                                                                                   
                                                </div>
                                                {/* Customer Info End*/}
                                                {/* Previous Fin Info Start*/}
                                                <div className="row m-2">
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Pre Finance Amt</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <input className="form-control" id="net_amt" name="net_amt" readonly="true" value={this.state.finance_cusinfo.net_amt} />
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Received Amt</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                            <input className="form-control" id="rec_amt" name="rec_amt" readonly="true" value={this.state.finance_cusinfo.rec_amt} />
                                                            </div>
                                                        </div>   
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Fin Id</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <input className="form-control" id="fin_id" name="fin_id" readonly="true" value={this.state.finance_cusinfo.fin_id} />
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Balance Amt</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <input className="form-control" id="bal_amt" name="bal_amt" readonly="true" value={this.state.finance_cusinfo.bal_amt} />
                                                            </div>
                                                        </div>  
                                                    </div>                                                                                                   
                                                </div>
                                                {/* Previous Fin Info Start*/}
                                                {/* New Fin Info Start*/}
                                                <div className="row m-2">
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Finance Amt</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <input className="form-control" id="fin_amt" name="fin_amt" required onChange={this.handleChange}/>
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Hold Amount</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                            <input className="form-control" id="hold_amt" name="hold_amt" required onChange={this.handleChange}/>
                                                            </div>
                                                        </div>   
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">By Hand</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <input className="form-control" id="by_hand_amt" name="by_hand_amt" readonly="true" value={this.state.finance_cusinfo.by_hand_amt} onChange={this.handleChange}/>
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Company Amount</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <input className="form-control" id="cmpy_amt" name="cmpy_amt" value={this.state.finance_cusinfo.cmpy_amt} onChange={this.handleChange}/>
                                                            </div>
                                                        </div>  
                                                    </div>                                                                                                   
                                                </div>
                                                {/* New Fin Info End*/}
                                                {/* Fin Date Info Start*/}
                                                <div className="row m-2">
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Start Date</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <DatePicker selected={this.state.finance_cusinfo.fin_start} name="fin_start" className="form-control"/>
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">End Date</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <DatePicker selected={this.state.finance_cusinfo.fin_end} name="fin_end" className="form-control"/>
                                                            </div>
                                                        </div>   
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Remarks</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <input className="form-control" id="remarks" name="remarks" value={this.state.finance_cusinfo.remarks} onChange={this.handleChange}/>
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Status</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                
                                                            </div>
                                                        </div>  
                                                    </div>                                                                                                   
                                                </div>
                                                {/* Fin Date Info End*/}
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