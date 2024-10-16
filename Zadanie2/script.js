//zad1
/*
let text ="";
for(let i = 1;i<=100;i++){
    if(i%2==0 && i%3==0){
        text+="FizBuz";
    }
    else if(i%3==0){
        text+="Buz";
    }
    else if(i%2==0){
        text+="Fiz";
    }
    else{
        text+=i;
    }
}
console.log(text);
*/
//zad2
/*let r = prompt("Podaj promień koła");
r = parseFloat(r);
if (isNaN(r) && r <= 0) {
    console.log("Podano nieprawidłową wartość");

} else {
    let pole = (Math.PI * Math.pow(r, 2)).toFixed(2); // Oblicza pole i zaokrągla do dwóch miejsc po przecinku
    let obwod = (2 * Math.PI * r).toFixed(2);
    console.log("Pole koła o promieniu " + r + " wynosi " + pole + " a obwód wynosi " + obwod); 2
}
*/
//zad3
/*
function createTable(){
    let table =[];
    const random = (min,max) => Math.floor(Math.random()*(max-min+1)+min);
    let sum = 0;
    while(sum<=200)
    {
        let number = random(1,10);
        table.push(number);
        sum+=number;
    }
    return table;
}
let table = createTable();
console.log(table);

function findMinAndDelete(table){
    let min = Math.min(...table);
    let index = table.indexOf(min);
    table.splice(index,1);
}

findMinAndDelete(table);
console.log(table);

function findMaxAndDelete(table){
    let max = Math.max(...table);
    let index = table.lastIndexOf(max);
    table.splice(index,1);
}

findMaxAndDelete(table);
console.log(table);

function countTableItems(table){
    let count=[];
    table.forEach((element)=>{
        if(count[element]==undefined){
            count[element]=1;
        }
        else{
            count[element]++;
        }
    });
    count.forEach((element,index)=>{
        if(element!=undefined){
            console.log("Liczba "+index+" występuje "+element+" razy");
        }
    });
}

countTableItems(table);

function changeTable(table){
    for(let i=0,j=10;i<table.length && i < 10;i++,j--){
        let help = table[i];
        table[i] = table[table.length-j];
        table[table.length-j] = help;
    }
}

changeTable(table);
console.log(table);
*/
//zad4
/*
let names = ["Kazimierz", "Klaudiusz", "Zbobogniew", "Andzelika", "Katarzyna"];

names = names.map((element) => {
    // Zamień string na tablicę znaków
    let chars = element.split('');

    // Zmieniamy litery 'a' i 'e' na 4 i 3
    for (let i = 0; i < chars.length; i++) {
        if (chars[i].toLowerCase() == 'a') {
            chars[i] = '4';
        }
        if (chars[i].toLowerCase() == 'e') {
            chars[i] = '3';
        }
    }

    // Składamy tablicę z powrotem w string
    let modifiedElement = chars.join('');

    // Jeśli imię ma więcej niż 6 znaków, skróć je
    if (modifiedElement.length > 6) {
        modifiedElement = modifiedElement.substring(0, 3) + "..." + modifiedElement.substring(modifiedElement.length - 3);
    }

    return modifiedElement;
});

console.log(names);
*/
//zad5
function losujElementy(tablica, ilosc) {
    let skopiowaneElementy = [];
    let skopiowanaTablica = [...tablica]; // Kopiujemy oryginalną tablicę, aby jej nie modyfikować

    for (let i = 0; i < ilosc; i++) {
        if (skopiowanaTablica.length === 0) break; // Zatrzymaj, jeśli nie ma więcej elementów do losowania

        // Losuj indeks z zakresu dostępnych elementów
        let losowyIndex = Math.floor(Math.random() * skopiowanaTablica.length);

        // Dodaj element z losowego indeksu do wynikowej tablicy
        skopiowaneElementy.push(skopiowanaTablica[losowyIndex]);

        // Usuń wybrany element z kopii tablicy, aby uniknąć powtórzeń
        skopiowanaTablica.splice(losowyIndex, 1);
    }

    return skopiowaneElementy;
}

let nazwyTowarów = "jajka, mleko, masło, chleb";
nazwyTowarów = nazwyTowarów.split(", ");
console.log(nazwyTowarów);
let cennik=[];
for(let i = 0;i<nazwyTowarów.length;i++){
    let cena = (Math.random()*10).toFixed(2);
    cennik[i]={
        nazwa: nazwyTowarów[i],
        cena: cena
    }
}
console.log(cennik);
let listaZakupów = losujElementy(cennik, (cennik.length/2).toFixed(0));
console.log(listaZakupów);
let suma = 0;
for(let i = 0;i<listaZakupów.length;i++){
   listaZakupów[i].ilosc = (Math.random()*10).toFixed(0);
    suma+=listaZakupów[i].cena*listaZakupów[i].ilosc;
}
console.log(listaZakupów);
console.log("Suma: "+suma.toFixed(2));