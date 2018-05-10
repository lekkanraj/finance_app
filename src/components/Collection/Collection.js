import React, {Component} from 'react';
import {connect} from 'react-redux';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


import {allCustomers} from '../../actions/financeActions';
import {HOST} from '../../constants/constants';

class Collection extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div className="">
                Collection Data
            </div>
        );
    }

}

export default Collection;