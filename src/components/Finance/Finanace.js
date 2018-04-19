import React, {Component} from 'react';
import Search from './Search';

class Finance extends Component{
    constructor(props){
        super(props);
        this.state={
            finance_cus:[],
            search_lineid:'',
            success_message:'',
            error_message:''
        };
        this.editFinance=this.editFinance.bind(this);
    }

    componentWillMount(){
        fetch("http://localhost/finance_service/finance/list.php")
            .then((response)=>response.json())
            .then((responsedata)=>{
                this.setState({
                    finance_cus:responsedata
                });
            }
        );
    }

    editFinance($id){
        console.log("sdfd");
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
                                    {this.state.finance_cus.map((customer,i)=>
                                        <tr>
                                            <td>{i+1}</td>
                                            <td><a onClick={()=>this.editFinance(customer.cus_id)} href="javascript:;" data-toggle="modal" data-target="#editUser">{customer.cus_name}</a></td>
                                            <td>{customer.area ? customer.area :"-"}</td>
                                        </tr>
                                    )}
                                    {this.state.finance_cus.length==0 ?                                    
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

export default Finance;