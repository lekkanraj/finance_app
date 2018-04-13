import React, {Component} from 'react';
class Customers extends Component{
   constructor(props){
        super(props);
        this.state={customers:[],addstatus:''};

        this.addcustomer=this.addcustomer.bind(this);
    }
    
    componentWillMount(){
        fetch('http://localhost/finance_service/customers/list.php')
            .then((response)=>response.json())
            .then((responsejson)=>
            {
                this.setState({customers:responsejson})
            }
        );
    }

    addcustomer(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/finance_service/customers/add.php', {
            method: 'POST',            
            body:data,
        })
        .then((response)=>response.json())
        .then((responsedata)=>{
            if(responsedata){
               this.setState({addstatus:"Added Customer"});
               document.getElementById("addformclose").click();
               this.props.history.push('/customers');
            }else{
                this.setState({addstatus:"Failed to add"});
            }
            
        }
        );


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
                            <p>{this.state.addstatus}<button className="close" data-dismiss="alert">&times;</button></p>
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
                                            <td>{customer.cus_id}</td>
                                            <td>{customer.cus_name}</td>
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
                                                <td colspan="3">No Custoemrs Found</td>
                                            </tr>

                                        ):''
                                    }
                                </tbody>
                            </table>
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
                                        <form className="text-dark customerAddForm" onSubmit={this.addcustomer}>
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
                                                            <option value="1">Own House</option>
                                                            <option value="2">Rental House</option>
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
                                                            <option value="1">AADHAR</option>
                                                            <option value="2">Voter ID</option>
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
                                                            <option value="1">Velachery</option>
                                                            <option value="2">Guindy</option>
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