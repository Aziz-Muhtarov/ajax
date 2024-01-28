const jsonString = 
`{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
}`

// console.log('jsonString', jsonString);

const data = JSON.parse(jsonString);
console.log('data', data);

const list = data.list;
console.log('list', list);




// Ожидаемый вывод

// {
//     list: [
//       { name: 'Petr', age: 20, prof: 'mechanic' },
//       { name: 'Vova', age: 60, prof: 'pilot' },
//     ]
//   }

