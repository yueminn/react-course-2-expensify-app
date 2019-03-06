import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';



const store = configureStore();

//-------- Actions test ----------
// Expenses Test
// addExpense -> water bill 
store.dispatch(addExpense({
    description: 'Water bill', 
    amount: 20,
    createdAt: 100,
    note: ''
}))
// addExpense -> gas bill
store.dispatch(addExpense({
    description: 'Gas bill', 
    amount: 50,
    createdAt: 200,
    note: ''
}))

store.dispatch(addExpense({
    description: 'Rent', 
    amount: 1000,
    createdAt: -100,
    note: ''
}))

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(
    jsx, 
    document.getElementById('app')
);

