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
            f_fin_id:'',
            f_fin_amt:'',
            f_comp_amt:'',
            f_hand_amt:'',
            f_hold_amt:'',
            f_profit_amt:'',
            f_start_date:'',
            f_end_date:'',
        };
        this.editFinance=this.editFinance.bind(this);
        this.updateFinCustomer=this.updateFinCustomer.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.startDateChange=this.startDateChange.bind(this);
        this.endDateChange=this.endDateChange.bind(this);
        this.finupdate=this.finupdate.bind(this);
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
            this.setState({finance_cusinfo:[0]});
            this.setState({finance_cusinfo:responsejson[0]});
            this.setState({f_fin_id:'',f_fin_amt:'',f_comp_amt:'',f_hand_amt:'',f_hold_amt:'',f_profit_amt:'',f_start_date:'',f_end_date:''});
            var st_date=this.state.finance_cusinfo.fin_start;
            console.log(st_date);
            if(st_date){
                this.setState({f_start_date:moment(st_date)});
            }
            var fin_id=this.state.finance_cusinfo.fin_id;
            if(fin_id!=""){
                this.setState({f_fin_id:fin_id});
            }
            

        
        }
        );
        //console.log(this.state.finance_cusinfo);
    }
   
    updateFinCustomer(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch(HOST+'finance/update_fincustomer.php', {
            method: 'POST',            
            body:data,
        })
        .then((response)=>response.json())
        .then((responsedata)=>{
            if(responsedata){
               this.setState({success_message:"Updated Finance Info"});
               document.getElementById("updateformclose").click();
               this.props.history.push('/finance');
            }else{
                this.setState({error_message:"Failed to update"});
            }
            
        }
        );
    }

    
    finupdate(event){
        var name=event.target.name;
        var val =event.target.value;

        if(name=="fin_amt"){
            this.setState({f_fin_amt:val,f_comp_amt:val});
        }

        if(name=="hold_amt"){
            var to_hand,pre_bal_amt;
            to_hand=(this.state.f_fin_amt-val);
            pre_bal_amt=this.state.finance_cusinfo.bal_amt;
            if(pre_bal_amt!=''){
                to_hand=(to_hand-pre_bal_amt);
            }
            this.setState({f_hold_amt:val,f_hand_amt:to_hand});
        }
    }
    startDateChange(date){
        this.setState({
            f_start_date: date
          });
    }
    endDateChange(date){
        this.setState({
            f_end_date: date
          });
    }

    render(){
        return(
            <div className="row">
                <div className="col-lg-1">&nbsp;</div>
                <div className="col-lg-11">
                    {this.state.success_message ? 
                        <div className="alert alert-info text-warning data-dissmissble">
                            {this.state.success_message}<button className="close" data-dismiss="alert">&times;</button>
                        </div>
                    :''}
                    {this.state.error_message ? 
                        <div className="alert alert-danger text-warning data-dissmissble">
                            {this.state.error_message}<button className="close" data-dismiss="alert">&times;</button>
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
                                        <td>Line Type</td>
                                        <td>Work</td>
                                        <td>Start Date</td>
                                        <td>Finance Amount</td>
                                        <td>Received Amount</td>
                                        <td>Balance Amount</td>
                                        <td>End Date</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.customers.fin_customers.map((customer,i)=>
                                        <tr>
                                            <td className="text-center">{i+1}</td>
                                            <td><a onClick={()=>this.editFinance(customer.cus_id)} href="javascript:;" data-toggle="modal" data-target="#editFinCustomer">{customer.cus_name}</a></td>
                                            <td>{customer.area ? customer.area :"-"}</td>
                                            <td>{customer.linetype_name ? customer.linetype_name :"-"}</td>
                                            <td>{customer.job_name ? customer.job_name :"-"}</td>
                                            <td className="text-center">{customer.fin_start ? customer.fin_start :"-"}</td>
                                            <td className="text-center">{customer.fin_amt ? customer.fin_amt :"-"}</td>
                                            <td className="text-center">{customer.rec_amt ? customer.rec_amt :"-"}</td>
                                            <td className="text-center">{customer.bal_amt ? customer.bal_amt :"-"}</td>
                                            <td className="text-center">{customer.fin_end ? customer.fin_end :"-"}</td>
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
                                            <h4 className="text-info">Update Finance Info</h4>                                           
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
                                                                <input className="form-control cus_id" id="cus_id" name="cus_id" type="hidden" value={this.state.finance_cusinfo.cus_id} />
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
                                                                <input className="form-control" id="fin_id" name="fin_id" readonly="true" value={this.state.f_fin_id} />
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
                                                                <input className="form-control" id="fin_amt" name="fin_amt" required onChange={this.finupdate} value={this.state.f_fin_amt} />
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Hold Amount</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                            <input className="form-control" id="hold_amt" name="hold_amt" required onChange={this.finupdate} value={this.state.f_hold_amt} />
                                                            </div>
                                                        </div>   
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="row mb-1">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">By Hand</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <input className="form-control" id="by_hand_amt" name="by_hand_amt"  readonly="true" value={this.state.f_hand_amt} />
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Company Amount</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <input className="form-control" id="cmpy_amt" name="cmpy_amt" readonly="true" value={this.state.f_comp_amt}/>
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
                                                                <DatePicker name="fin_start" className="form-control" selected={this.state.f_start_date} onChange={this.startDateChange}/>
                                                            </div>
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                <label className="name-label">Pre fin End Date</label>
                                                            </div>
                                                            <div className="col-lg-8 col-sm-12">
                                                                <DatePicker name="fin_end" className="form-control" selected={this.state.f_end_date} onChange={this.endDateChange}/>
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
                                                                <label>: {this.state.finance_cusinfo.finance_status}</label>
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