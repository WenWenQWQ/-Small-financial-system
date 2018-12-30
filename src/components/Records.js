import React, { Component } from 'react';
import Record from './Record';
import {getJSON} from 'jquery';
import * as RecordsAPI from '../utils/RecordsAPI';

class Records extends Component {
    constructor(){
        super();
        this.state={
            err:null,
            isLoaded:false,
            records:[]
        }
    }
    componentDidMount(){
        console.log(RecordsAPI.api);
        getJSON(`${RecordsAPI.api}/data/admin`).then(
            res => this.setState({
                records:res,
                isLoaded:true
            }),
            err => this.setState({
                isLoaded:true,
                err:err
            })
        )

    }
    render(){
        const { err,isLoaded,records}=this.state;
        if(err){
            return <div>Error:{err.statusText}</div>
        }else if(!isLoaded){
            return <div>Loading...</div>
        }else{
            return (
                <div>
                    <h2>Records</h2>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        { records.map((record,i)=><Record {...record} key={i}/>)}
                        </tbody>
                    </table>
                </div>
            )
        }

    }
}
export default Records;