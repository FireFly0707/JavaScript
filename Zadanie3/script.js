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
// function skarbonka(owner, initialBalance = 0) {
//     let balance = initialBalance;

//     return function(amount) {
//         if (amount === undefined) {
//             console.log(`${owner} get ${balance}`);
//             return balance;
//         } else {
//             balance += amount;
//             console.log(`${owner} set ${balance}`);
//         }
//     };
// }
// let s = skarbonka("Piotr", 100)
// s(20) // wypisuje "Piotr set 120"
// let ile = s() // zwraca 120, wypisuje do konsoli "Piotr get 120"
//zad3
const students = [
    { imię: "Piotr", nazwisko: "Nowak", punkty: 63 },
    { imię: "Tomasz", nazwisko: "Kowalski", punkty: 88 },
    { imię: "Julia", nazwisko: "Bagińska", punkty: 75 },
    { imię: "Sebek", nazwisko: "Mały", punkty: 75 },
    { imię: "Anna", nazwisko: "Zielińska", punkty: 91 },
    { imię: "Katarzyna", nazwisko: "Wiśniewska", punkty: 82 },
    { imię: "Marek", nazwisko: "Wójcik", punkty: 55 },
    { imię: "Michał", nazwisko: "Kowal", punkty: 47 }
];
const average = students.reduce((acc, student) => acc + student.punkty, 0) / students.length;4
console.log(average);    

const overAverage = students.filter(student => student.punkty > average);
overAverage.forEach(student => console.log(`${student.imię} ${student.nazwisko}`));

const sortedByPoints = [...students].sort((a, b) => b.punkty - a.punkty);
const topThreePoints = sortedByPoints[2].punkty;

const bestStudents = sortedByPoints.filter(student => student.punkty >= topThreePoints);
console.log("Najlepsi studenci:");
bestStudents.forEach(student => console.log(`${student.imię} ${student.nazwisko}`));


const gradeScale = (points) => {
    if (points >= 90) return 'bdb';
    if (points >= 80) return 'db+';
    if (points >= 70) return 'db';
    if (points >= 60) return 'dst+';
    if (points >= 50) return 'dst';
    return 'ndst';
};

const gradedStudents = students.map(student => ({
    nazwisko: student.nazwisko,
    ocena: gradeScale(student.punkty)
}));

gradedStudents.sort((a, b) => a.nazwisko.localeCompare(b.nazwisko))
    .forEach(student => console.log(`${student.nazwisko}: ${student.ocena}`));
    const gradeCount = students.reduce((acc, student) => {
        const grade = gradeScale(student.punkty);
        acc[grade] = (acc[grade] || 0) + 1;
        return acc;
    }, {});
    
    console.log(gradeCount);