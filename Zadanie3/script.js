//zad1
function combineArrays(operation, array1, array2) {
    const result = [];
    const length = Math.min(array1.length, array2.length); // Ustal długość na podstawie krótszej tablicy
    for (let i = 0; i < length; i++) {
        result.push(operation(array1[i], array2[i]));
    }
    return result;
}
function combineMultipleArrays(operation, ...arrays) {
    const minLength = Math.min(...arrays.map(arr => arr.length)); // Najkrótsza tablica
    const result = [];

    for (let i = 0; i < minLength; i++) {
        const args = arrays.map(arr => arr[i]); // Pobierz i-ty element z każdej tablicy
        result.push(operation(...args)); // Zastosuj funkcję na elementach
    }

    return result;
}

// Przykład użycia:
const array1 = [4, 5, 6];
const array2 = [10, 20, 30];

const sumFunction = (a, b) => a + b;

const result = combineArrays(sumFunction, array1, array2);
console.log(result); // Zwraca [14, 25, 36]

const result2 = combineArrays((a, b) =>({x:a,y:b}), array1, array2);
console.log(result2); // Zwraca [{x:4,y:10}, {x:5,y:20}, {x:6,y:30}]