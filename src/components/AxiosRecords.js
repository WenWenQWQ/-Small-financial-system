import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import * as RecordsAPI from '../utils/RecordsAPI';
import AmountBox from './AmountBox';

class AxiosRecords extends Component {
    constructor(){
        super();
        this.state={
            err:null,
            isLoaded:false,
            records:[]
        }
    }
    componentDidMount(){
        RecordsAPI.getAll().then(
            res => this.setState({
                records:res.data,
                isLoaded:true
            })
        ).catch(
            err => this.setState({
                isLoaded:true,
                err:err
            })
        )

    }
    addRecord(record){
        this.setState({
            err:null,
            isLoaded:true,
            records:[
                ...this.state.records,
                record
            ]
        })
    }
    updateRecord(record,data){
        const recordIndex=this.state.records.indexOf(record);
        const newRecords=this.state.records.map((item,index)=>{
            if(index!==recordIndex){
                return item;
            }
            return{
                ...item,
                ...data
            };
        });
        this.setState({
            records:newRecords
        })
    }
    deleteRecord(record){
        const recordIndex=this.state.records.indexOf(record);
        const newRecords=this.state.records.filter((item,index)=>
            index!==recordIndex
       );
        this.setState({
            records:newRecords
        })
    }
    credits(){
        let credits=this.state.records.filter((record)=>{
            return record.amount>=0
        });
        return credits.reduce((pre,curr)=>{
            return pre+Number.parseInt(curr.amount,0)
        },0)
    }
    debits(){
        let credits=this.state.records.filter((record)=>{
            return record.amount<0
        });
        return credits.reduce((pre,curr)=>{
            return pre+Number.parseInt(curr.amount,0)
        },0)
    }
    balance(){
        return this.credits()+this.debits();
    }
    render(){
        const { err,isLoaded,records}=this.state;
        let recordsComponent;
        if(err){
            return <div>Error:{err.message}</div>
        }else if(!isLoaded){
            return <div>Loading...</div>
        }else{
            recordsComponent= (
                <div>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        { records.map((record,i)=>(
                            <Record
                                record={record}
                                key={i}
                                handleEditRecord={this.updateRecord.bind(this)}
                                handleDeleteRecord={this.deleteRecord.bind(this)}
                            />
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            )
        }
        return(
            <div>
                <h2>Records</h2>
                <div className="row mb-3">
                    <AmountBox text="Credits" type="success" amount={this.credits()}/>
                    <AmountBox text="Debits" type="danger" amount={this.debits()}/>
                    <AmountBox text="Balance" type="info" amount={this.balance()}/>
                </div>
                <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
                {recordsComponent}
            </div>
        );
    }
}
export default AxiosRecords;