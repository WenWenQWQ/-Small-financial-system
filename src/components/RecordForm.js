import React, {Component} from 'react';
import * as RecordsAPI from '../utils/RecordsAPI'

export default class RecordForm extends Component{
    constructor(props){
        super(props);
        this.state={
            date:"",
            title:"",
            amount:""
        }
    }
    valid(){
        return this.state.date&&this.state.title&&this.state.amount;
    }
    handleChange(event){
        let name,obj;
        name=event.target.name;
        this.setState((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ))
    }
    handleSubmit(event){
        event.preventDefault();
        const data={date:this.state.date,title:this.state.title,amount:Number.parseInt(this.state.amount,0)};
        RecordsAPI.create(data).then(
            res=>{
                this.props.handleNewRecord(res.data);
                this.setState({
                    date:"",
                    title:"",
                    amount:""
                })
            }
        ).catch(
            err=>console.log(err.message)
        )
    }
    render(){
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="date" value={this.state.date} name="date"  />
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="title" value={this.state.title} name="title"/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="amount" value={this.state.amount} name="amount"/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
            </form>
        )
    }
}