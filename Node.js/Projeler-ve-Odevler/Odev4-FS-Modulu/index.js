const fs = require('fs');

let data = {
    "name": "Employee 1 Name",
    "salary": "2000"
}


fs.writeFile('employees.json', JSON.stringify(data), (err) => {
    if (err) return console.log(err);
    console.log("Dosya oluşturuldu.");
});



fs.readFile('employees.json', 'utf8', (err, data) => {
    if (err) return console.log(err);
    console.log(data);
})


const file = require('./employees.json');
file.name = 'Lorem Ipsum';
file.salary = '10000';

fs.writeFile('employees.json', JSON.stringify(file), err => {
    if (err) return console.log(err);
    console.log("Dosya güncellendi.");
})