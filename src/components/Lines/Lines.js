import React,{Component} from 'react';

class Lines extends Component{
    constructor(props){
        super(props);
        this.state={lines:[],linetypes:[],addstatus:'',getlineinfo:[0]};

        this.addLine=this.addLine.bind(this);
        this.editLine=this.editLine.bind(this);
        this.updateLine=this.updateLine.bind(this);
    }

    componentWillMount(){
        fetch('http://localhost/finance_service/lines/list.php')
        .then((response)=>response.json())
        .then((responsedata)=>{
                this.setState({lines:responsedata})
            }
        );

        fetch('http://localhost/finance_service/lines/linetype_list.php')
        .then((response)=>response.json())
        .then((responsedata)=>{
                this.setState({linetypes:responsedata})
            }
        );
    }

    addLine(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/finance_service/lines/add.php', {
            method: 'POST',            
            body:data,
        })
        .then((response)=>response.json())
        .then((responsedata)=>{
            if(responsedata.length>0){
               this.setState({addstatus:"Added Line"});
               this.setState({lines:responsedata});
               //console.log(responsedata);
               document.getElementById("addformclose").click();
               document.getElementById("lineAddForm").reset();
               this.props.history.push('/lines');
            }else{
                this.setState({addstatus:"Failed to add"});
            }
            
        }
        );
    }

    editLine(id){
        fetch('http://localhost/finance_service/lines/get_lineinfo.php?id='+id)
        .then((response)=>response.json())
        .then((responsejson)=>
        {
            this.setState({getlineinfo:responsejson[0]});
        }
     );
    }

    updateLine(event){
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('http://localhost/finance_service/lines/update.php', {
            method: 'POST',            
            body:data,
        })
        .then((response)=>response.json())
        .then((responsedata)=>{
            if(responsedata){
               this.setState({addstatus:"Updated Line"});
               this.setState({lines:responsedata});
               document.getElementById("updateformclose").click();
               //document.getElementById("lineEditForm").reset();
               this.props.history.push('/lines');
            }else{
                this.setState({addstatus:"Failed to update"});
            }
            
        }
        );
    }

    handleChangeFor = (propertyName) => (event) => {
        const { getlineinfo } = this.state;
        const newlineinfo = {
          ...getlineinfo,
          [propertyName]: event.target.value
        };
        this.setState({ getlineinfo: newlineinfo });
      }

    render(){
        return(
            <div className="row">
            <div className="col-lg-2">&nbsp;</div>
            <div className="col-lg-10">
                <div className="m-2">
                    <button className="btn btn-primary" data-toggle="modal" data-target="#addLine">Add Line</button> 
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
                                <td>Line Name</td>
                                <td>Line Type</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.lines.map((line,i)=>
                                <tr>
                                    <td>{i+1}</td>
                                    <td><a onClick={()=>this.editLine(line.line_id)} href="javascript:;" data-toggle="modal" data-target="#editLine">{line.area}</a></td>
                                    <td>{line.linetype_name}</td>
                                </tr>
                            )}
                            {this.state.lines.length==0 ?                                    
                                (
                                    <tr>
                                        <td colspan="3">No lines Found</td>
                                    </tr>

                                ):''
                            }
                        </tbody>
                    </table>
                </div>
                
                <div className="modal fade" id="editLine">
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
                                <form className="text-dark lineEditForm" onSubmit={this.updateLine}>
                                   <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-12">
                                                <label>Area Name</label>
                                            </div>
                                            <div className="col-lg-8 col-sm-12">
                                                <input className="form-control area" required name="area" type="text"  value={this.state.getlineinfo.area} onChange={this.handleChangeFor('area')}/>
                                                <input type="hidden" name="line_id" value={this.state.getlineinfo.line_id} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-12">
                                                <label>Line Type</label>
                                            </div>
                                            <div className="col-lg-8 col-sm-12">
                                                <select className="form-control" required name="linetype_id" value={this.state.getlineinfo.linetype_id ? this.state.getlineinfo.linetype_id:''} onChange={this.handleChangeFor('linetype_id')}>
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
                
                <div className="modal fade" id="addLine">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="modal-title text-center">
                                    <h4 className="text-info">Add Line Info</h4>                                           
                                </div>
                                <div className="float-right">
                                        <button className="close" id="addformclose" data-dismiss="modal">&times;</button>
                                </div>
                            </div>
                            <div className="modal-body">
                                <form className="text-dark lineAddForm" onSubmit={this.addLine} id="lineAddForm">
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-12">
                                                <label>Area Name</label>
                                            </div>
                                            <div className="col-lg-8 col-sm-12">
                                                <input className="form-control" required name="area" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-12">
                                                <label>Line Type</label>
                                            </div>
                                            <div className="col-lg-8 col-sm-12">
                                                <select className="form-control" required name="linetype_id">
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
                                            <div className="col-lg-12 text-center col-sm-12">
                                                <button className="btn btn-primary" name="addline" type="submit">Add</button>
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

export default Lines;