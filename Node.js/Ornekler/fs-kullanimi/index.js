const fs = require('fs');

// Dosya okumak

fs.readFile('password.txt', 'utf8', (err, data) => {
    if (err) return console.log(err);
    console.log(data);
});




// Dosya yazmak

fs.writeFile('example.txt', 'Kodluyoruz', 'utf8', (err) => {
    if (err) return console.log(err);
})



// JSON bilgi yazmak

let user = {
    "username": "testuser",
    "email": "test@gmail.com",
    "age": 35
};

fs.writeFile('users.json', JSON.stringify(user, null, 2), 'utf8', (err) => {
    if (err) return console.log(err);
    console.log('Dosya yazdırıldı.');
})




// Veri eklemek

fs.appendFile('example.txt', '\nLorem Ipsum', 'utf8', (err) => {
    if (err) return console.log(err);
    console.log('Yeni veri eklendi.');
});



// Dosya Silmek

fs.unlink('password.txt', (err) => {
    if (err) return console.log(err);
    console.log('password.txt silindi.');
})





// Klasörler oluşturma

fs.mkdir('uploads/img', {recursive: true}, err => {
    if (err) return console.log(err);
    console.log('Klasörler oluşturuldu');
})




// Klasörleri silme

fs.rm('uploads', {recursive: true}, err => {
    if (err) return console.log(err);
    console.log('Klasörler silindi');
})