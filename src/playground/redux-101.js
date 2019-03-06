import { createStore } from 'redux';


//Action Creators
//Using es6 syntax object destructuring to get the values in the pass in object 
const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
});

const resetCount = () => ({
    type: 'RESET',
});

const setCount = ({setCountBy = store.getState().count} = {}) => ({
    type: 'SET',
    setCountBy: setCountBy
});

//Reducers

const countReducer = (state = { count: 0 }, action) => {

    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.setCountBy
            };
        default:
            return state;
    }
    
}; 

//Create Store
const store = createStore(countReducer);

//Subscribe the store changes
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});


//Make changes to the store
store.dispatch(incrementCount());
store.dispatch(incrementCount());

store.dispatch(decrementCount());

store.dispatch (resetCount());

store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch (setCount({setCountBy: 150}));

