import React from 'react';
import { Link } from 'react-router-dom';


//Export a stateless functional component
//render a single expense's description, amount and creatAt

const ExpenseListItem = ({ id, description, amount,createdAt, number }) => (
    <div>
        <p>Number Expense # {number}</p>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>Amount: {amount} - Create At: {createdAt}</p>
       
    </div>
);

export default ExpenseListItem;