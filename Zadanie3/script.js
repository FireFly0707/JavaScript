// //zad1
// function combineArrays(operation, array1, array2) {
//     const result = [];
//     const length = Math.min(array1.length, array2.length); // Ustal długość na podstawie krótszej tablicy
//     for (let i = 0; i < length; i++) {
//         result.push(operation(array1[i], array2[i]));
//     }
//     return result;
// }
// function combineMultipleArrays(operation, ...arrays) {
//     const minLength = Math.min(...arrays.map(arr => arr.length)); // Najkrótsza tablica
//     const result = [];

//     for (let i = 0; i < minLength; i++) {
//         const args = arrays.map(arr => arr[i]); // Pobierz i-ty element z każdej tablicy
//         result.push(operation(...args)); // Zastosuj funkcję na elementach
//     }

//     return result;
// }

// // Przykład użycia:
// const array1 = [1, 2, 3];
// const array2 = [5, 6, 7];
// const array3 = [10, 20, 30];

// const sumThreeNumbers = (a, b, c) => a + b + c;

// const result = combineMultipleArrays(sumThreeNumbers, array1, array2, array3);
// console.log(result); // Zwraca [16, 28, 40]

//zad2
function skarbonka(owner, initialBalance = 0) {
    let balance = initialBalance;

    return function(amount) {
        if (amount === undefined) {
            console.log(`${owner} get ${balance}`);
            return balance;
        } else {
            balance += amount;
            console.log(`${owner} set ${balance}`);
        }
    };
}
let s = skarbonka("Piotr", 100)
s(20) // wypisuje "Piotr set 120"
let ile = s() // zwraca 120, wypisuje do konsoli "Piotr get 120"