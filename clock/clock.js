let name = prompt("Adınız nedir?");
let myName = document.querySelector("#myName");

myName.innerHTML = name;

const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]

function clock() {
    var date = new Date();
    document.querySelector("#myClock").innerHTML = `${date.toLocaleString()} ${days[date.getDay()]}`;
}

setInterval(() => {
    clock();
}, 1000);
