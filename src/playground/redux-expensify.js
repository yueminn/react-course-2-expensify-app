import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
 //----------- Actions Creators----------------

//ADD_EXPENSE
const addExpense = (
    {description = '', 
    note = '', amount = 0, 
    createdAt = 0
    } = {}
) => ({

    type: 'ADD_EXPENSE',
    expense: {
        id:  uuid(),
        description,
        note,
        amount,
        createdAt,
    }

});

//REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id,
});

//EDIT-EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//SET_TEXT_FILER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});
//SORT_BY_AMOUNT
const sortByAmount = () =>({
    type: 'SORT_BY_AMOUNT',
});
//SET_START_DATE
const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
});
//SET_END_DATE
const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
});

//Expenses Reducer
const expenseReducerDefaultState = [];
const expenseReducer = (state = expenseReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense 
            ];
        case 'REMOVE_EXPENSE':
            return state.filter((expense)=>(expense.id != action.id));
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }else {
                    return expense;
                }
            })
            
        default: 
            return state;
    }
}

//Filter Reducer
const filterReducerDefaultState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
}
const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date',
            };
        case 'SORT_BY_AMOUNT':
        return {
            ...state,
            sortBy: 'amount',
        };
        case 'SET_START_DATE':
        return {
            ...state,
            startDate: action.date,
        }
        case 'SET_END_DATE':
        return {
            ...state,
            endDate: action.date,
        }
        default: 
            return state;
    }
};
//Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = !text || expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt? 1 : -1;
        }else if (sortBy === 'amount'){
            return a.amount < b.amount? 1 : -1;
        }
    });
};
//Create Store
const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filterReducer,
    })
);

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 10, createdAt: -1000}));
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 210, createdAt: 1000}));
// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 10,}));

store.dispatch(setTextFilter(''));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//store.dispatch(setStartDate(100));
// store.dispatch(setStartDate());

//store.dispatch(setEndDate(2000));
// store.dispatch(setEndDate());





//------------- Demo Part -----------------


const demoState = {
    expense: [{
        id: '123',
        description: '01 Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0,
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined,
    }
};

// //Object spread
// const user = {
//     name: 'Jan',
//     age: 24
// };

// console.log({
//     ...user,
//     location: 'irvine',
//     age: 27
// });

