import React, {Component} from 'react';

class Customers extends Component{
   constructor(props){
        super(props);
        this.state={customers:[]};
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

    render(){
        return(
                <div className="row">
                    <div className="col-lg-12">
                        <div className="m-2"><button className="btn btn-primary" data-toggle="modal" data-target="#addUser">Add Customer</button> </div>
                        <div className="modal fade" id="addUser">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <h3 className="text-center text-info">Customer Info</h3>
                                </div>
                            </div>
                        </div>
                        
                        <div className="table-reposive">
                            <table className="table-bordered table-hovered">
                                <thead className="">
                                    <tr className="">
                                        <td>Sno</td>
                                        <td>Customer Name</td>
                                        <td>Phone</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.customers.map((customer,i)=>
                                        <tr>
                                            <td>{customer.cus_id}</td>
                                            <td>{customer.cus_name}</td>
                                            <td>{customer.mobile_no}</td>
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
                    </div>
                </div>
        );
    }
}

export default Customers;