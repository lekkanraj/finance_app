import React, {Component} from 'react';

class Search extends Component{
    constructor(props){
        super(props);

        this.state={
            lines:[],
            linetypes:[],
            sld_linetype:'',
            sld_line:''
        };
        this.searchLines=this.searchLines.bind(this);
    }

    componentWillMount(){
        fetch("http://localhost/finance_service/finance/search_linetype.php")
        .then((response)=>response.json())
        .then((data)=>
            this.setState({linetypes:data})
        );

        fetch("http://localhost/finance_service/finance/search_lines.php")
        .then((response)=>response.json())
        .then((data)=>
            this.setState({lines:data})
        );
    }

    searchLines=()=>(event)=>{
        var id=event.target.value;
        fetch('http://localhost/finance_service/finance/search_lines.php?linetype='+id)
        .then((response)=>response.json())
        .then((responsejson)=>
        {
            this.setState({lines:responsejson});
        }
     );
    }

      render(){
        return(
                <div className="">
                    <form className="text-light searchLinesform form-inline" onSubmit={this.searchLines}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-4 col-sm-12">
                                    <label>Area Name</label>
                                </div>
                                <div className="col-lg-8 col-sm-12">
                                <select className="form-control" name="linetype_id" onChange={this.searchLines()}>
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
                                    <label>Line Type</label>
                                </div>
                                <div className="col-lg-8 col-sm-12">
                                    <select className="form-control" name="linetype_id">
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
                                    <button className="btn btn-primary" name="searchline" type="submit">Search</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
        );
    }
}

export default Search;