import React, {Component} from 'react';
import {HOST} from '../../constants/constants';

class Customers extends Component{
   constructor(props){
        super(props);
        this.state={
            customers:[],
            addstatus:'',
            getcustomerinfo:[0],
            housetypes:[],
            securitytypes:[],
            lines:[]
        };

        this.addcustomer=this.addcustomer.bind(this);
        this.editcustomer=this.editcustomer.bind(this);
        this.updatecustomer=this.updatecustomer.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    
    componentWillMount(){
        /**Customer List */
        fetch(HOST+'customers/list.php')
            .then(response=>response.json())
            .then((responsejson)=>
            {
                this.setState({customers:responsejson})
            }
        );
        /**House Type List */
        fetch(HOST+'customers/get_data.php?info=house')
            .then(response=>response.json())
            .then((responsejson)=>
            {
                this.setState({housetypes:responsejson})
            }
        );
        /**Security List */
        fetch(HOST+'customers/get_data.php?info=security')
            .then(response=>response.json())
            .then((responsejson)=>
            {
                this.setState({securitytypes:responsejson})
            }
        );
         /**Lines List */
         fetch(HOST+'customers/get_data.php?info=lines')
         .then(response=>response.json())
         .then((responsejson)=>
         {
             this.setState({lines:responsejson})
         }
     );
    }

    addcustomer(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch(HOST+'customers/add.php', {
            method: 'POST',            
            body:data,
        })
        .then((response)=>response.json())
        .then((responsedata)=>{
            if(responsedata.length>0){
               this.setState({addstatus:"Added Customer"});
               this.setState({customers:responsedata});
               document.getElementById("addformclose").click();
               document.getElementById("customerAddForm").reset();
               this.props.history.push('/customers');
            }else{
                this.setState({addstatus:"Failed to add"});
            }
            
        }
        );
    }

    editcustomer(id){
       // console.log(id);
        fetch(HOST+'customers/get_customerinfo.php?id='+id)
            .then((response)=>response.json())
            .then((responsejson)=>
            {
                this.setState({getcustomerinfo:responsejson[0]});
            }
        );
    }

    updatecustomer(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch(HOST+'customers/update.php', {
            method: 'POST',            
            body:data,
        })
        .then((response)=>response.json())
        .then((responsedata)=>{
            if(responsedata){
               this.setState({addstatus:"Updated Customer"});
               this.setState({customers:responsedata});
               document.getElementById("updateformclose").click();
              // document.getElementById("customerEditForm").reset();
               this.props.history.push('/customers');
            }else{
                this.setState({addstatus:"Failed to update"});
            }
            
        }
        );
    }

    handleChange(event){
        const { getcustomerinfo } = this.state;
        const newlineinfo = {
          ...getcustomerinfo,
          [event.target.name]: event.target.value
        };
        this.setState({ getcustomerinfo: newlineinfo });
    }

    

    render(){
        return(
                <div className="row">
                    <div className="col-lg-2">&nbsp;</div>
                    <div className="col-lg-10">
                        <div className="m-2">
                            <button className="btn btn-primary" data-toggle="modal" data-target="#addUser">Add Customer</button> 
                        </div>
                        
                        {this.state.addstatus ? 
                        <div className="alert alert-info text-warning data-dissmissble">
                            {this.state.addstatus}<button className="close" data-dismiss="alert">&times;</button>
                        </div>
                        :''}
                        <div className="table-reposive customer-list">
                            <table className="table-bordered table-hover">
                                <thead className="thead-light">
                                    <tr className="">
                                        <td>Sno</td>
                                        <td>Customer Name</td>
                                        <td>Phone</td>
                                        <td>Address</td>
                                        <td>Bailee Name</td>
                                        <td>ID Proof</td>
                                        <td>Amount</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.customers.map((customer,i)=>
                                        <tr>
                                            <td>{i+1}</td>
                                            <td><a onClick={()=>this.editcustomer(customer.cus_id)} href="javascript:;" data-toggle="modal" data-target="#editUser">{customer.cus_name}</a></td>
                                            <td>{customer.mobile_no}</td>
                                            <td>{customer.cur_addr ? customer.cur_addr :"-"}</td>
                                            <td>{customer.bailee_name ? customer.bailee_name :"-"}</td>
                                            <td>{customer.security_id ? customer.security_id :"-"}</td>
                                            <td>{customer.net_amt ? customer.net_amt :"-"}</td>
                                        </tr>
                                    )}
                                    {this.state.customers.length==0 ?                                    
                                        (
                                            <tr>
                                                <td colspan="7">No Custoemrs Found</td>
                                            </tr>

                                        ):''
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="modal fade" id="editUser">
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
                                        <form className="text-dark customerEditForm" onSubmit={this.updatecustomer}>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Name</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control cus_name" id="cus_name" required name="cus_name" type="text" value={this.state.getcustomerinfo.cus_name} onChange = {this.handleChange} />
                                                        <input className="form-control cus_id" id="cus_id" required name="cus_id" type="hidden" value={this.state.getcustomerinfo.cus_id} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Job</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control job_name" required name="job_name" type="text" value={this.state.getcustomerinfo.job_name} onChange = {this.handleChange}  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Mobile No</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control mobile_no" required name="mobile_no" type="text" value={this.state.getcustomerinfo.mobile_no} onChange = {this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Current Address</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control cur_addr" name="cur_addr" type="text" value={this.state.getcustomerinfo.cur_addr} onChange = {this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Permanent Address</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control per_addr" name="per_addr" type="text"  value={this.state.getcustomerinfo.per_addr} onChange = {this.handleChange}  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>House Type</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <select className="form-control house" required name="house" value={this.state.getcustomerinfo.house?this.state.getcustomerinfo.house:''} onChange = {this.handleChange}  >
                                                            <option value="">Select House</option>                                                            
                                                            {
                                                            this.state.housetypes.length >0 ? (
                                                                this.state.housetypes.map((house,i)=>
                                                                    <option value={house.house_id}>{house.house_type}</option>
                                                                )
                                                            ) :""
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Bailee Name</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control bailee_name" required name="bailee_name" type="text" required  value={this.state.getcustomerinfo.bailee_name} onChange = {this.handleChange}  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Bailee Mobile No</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control bailee_mob" required name="bailee_mob" type="text" required  value={this.state.getcustomerinfo.bailee_mob} onChange = {this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Security Type</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <select className="form-control security_type" name="security_type"  value={this.state.getcustomerinfo.security_type ? this.state.getcustomerinfo.security_type:''} onChange = {this.handleChange} >
                                                            <option value="">Select</option>
                                                            {
                                                                this.state.securitytypes.length >0 ? (
                                                                    this.state.securitytypes.map((security,i)=>
                                                                        <option value={security.security_id}>{security.security_name}</option>
                                                                    )
                                                                ) : ""
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Security ID</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control security_id" name="security_id" type="text"  value={this.state.getcustomerinfo.security_id} onChange = {this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Line(Area)</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <select className="form-control line_id" name="line_id"  value={this.state.getcustomerinfo.line_id ? this.state.getcustomerinfo.line_id:''} onChange = {this.handleChange} >
                                                            <option value="">Select Line</option>
                                                            {
                                                            this.state.lines.length >0 ? (
                                                                this.state.lines.map((line,i)=>
                                                                    <option value={line.line_id}>{line.area}</option>
                                                                )
                                                            ) :""
                                                            }
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
                        <div className="modal fade" id="addUser">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <div className="modal-title text-center">
                                            <h4 className="text-info">Add Customer Info</h4>                                           
                                        </div>
                                        <div className="float-right">
                                                <button className="close" id="addformclose" data-dismiss="modal">&times;</button>
                                        </div>
                                    </div>
                                    <div className="modal-body">
                                        <form className="text-dark customerAddForm" onSubmit={this.addcustomer} id="customerAddForm">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Name</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control" required name="cus_name" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Job</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control" required name="job_name" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Mobile No</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control" required name="mobile_no" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Current Address</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control" name="cur_addr" type="text"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Permanent Address</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control" name="per_addr" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>House Type</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <select className="form-control" required name="house">
                                                            <option value="">Select</option>
                                                            {
                                                                this.state.housetypes ? (
                                                                    this.state.housetypes.map((house,i)=>
                                                                        <option value={house.house_id}>{house.house_type}</option>
                                                                    )
                                                                ) : "" 
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Bailee Name</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control" required name="bailee_name" type="text" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Bailee Mobile No</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control" required name="bailee_mob" type="text" required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Security Type</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <select className="form-control" name="security_type">
                                                            <option value="">Select</option>
                                                            {
                                                                this.state.securitytypes.length > 0 ? (
                                                                    this.state.securitytypes.map((security,i)=>
                                                                        <option value={security.security_id}>{security.security_name}</option>
                                                                    )
                                                                ) : ""
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Security ID</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <input className="form-control" name="security_id" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-12">
                                                        <label>Line(Area)</label>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-12">
                                                        <select className="form-control" name="line_id">
                                                            <option value="">Select Line</option>
                                                            {
                                                            this.state.lines.length >0 ? (
                                                                this.state.lines.map((line,i)=>
                                                                    <option value={line.line_id}>{line.area}</option>
                                                                )
                                                            ) :""
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-lg-12 text-center col-sm-12">
                                                        <button className="btn btn-primary" name="addcustomer" type="submit">Add</button>
                                                        <button className="btn btn-warning ml-2" name="clear" type="reset">Clear</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Customers;