import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment(); //current time
console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            description: props.description ? props.description : '',
            note: props.note ? props.note : '',
            amount: props.amount ? (props.amount / 100).toString() : '',
            createdAt: props.createdAt ? moment(props.createdAt): moment(),
            calendarFocused: false,
            error: ''
        };
    };
    
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(()=>({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({note}));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}));  
        }
    };
    onDateChange = (createdAt) => {
        if (createdAt){
            this.setState(()=>({createdAt}));
        }
    }; 
    onFocusChange = ({focused}) => {
        this.setState(()=>({calendarFocused: focused}))
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount){
           this.setState(()=>({error: "Please provided description and amount"}));
        }else {
            this.setState(()=>({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf(),
            })
        }
    };
    render() {
        console.log(this.props);
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form  onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={()=>false}
                    />
                    <textarea 
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >

                    </textarea>  
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}