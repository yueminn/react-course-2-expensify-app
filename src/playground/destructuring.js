// const person = {
//     name: 'Andrew',
//     age: 26,
//     location: {
//         city: 'Philadelphia',
//         temp: 92
//     }
// };

 

// console.log(`${person.name} is ${person.age}.`);

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         //name: 'Penguin'
//     }
// };
// const {name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);

const item = ['coffee', '$2.00', '$2.50', '$2.75'];
const [drinkName, , mediumPrice] = item;
console.log(`A medium ${drinkName} costs ${mediumPrice}.`); 
