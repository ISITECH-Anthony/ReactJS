console.log("TP - JS");

let response;

console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();


function findLargestNumber(numbers) {
    return Math.max(...numbers);
}

response = findLargestNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log("findLargestNumber", response);


console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();


const sortWords = (words) => words.sort();

response = sortWords(["Banana", "Orange", "Apple", "Mango"]);

console.log("sortWords", response);


console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();


function countOccurrences(string, substring) {
    let count = 0;

    for (const iterator of string) {
        if (iterator === substring) {
            count++;
        }
    }

    return count;
}

response = countOccurrences("Ma phrase contient combien de n ?", "n");

console.log("countOccurrences", response);


console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();


function flattenArray(array) {
    return array.flat(Infinity);
}

response = flattenArray([1, 2, 3, [4, 5, 6, [7, 8, 9]]]);

console.log("flattenArray", response);


console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();


function removeDupes(array) {
    return [...new Set(array)];
}

response = removeDupes([1, 2, 3, 1, 5, 2, 6, 4]);

console.log("removeDupes", response);


console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();

function swapVariables(a, b) {
    return [b, a];
}

response = swapVariables(1, 2);

console.log("swapVariables", response);


console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();


// Manière de faire plus simple et plus rapide
function parseObject(object) {
    return Object.values(object);
}

response = parseObject({a: 1, b: 2, c: 3});

console.log("parseObject", response);


console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();


function mergeObjects(object1, object2) {
    return {...object1, ...object2};
}

response = mergeObjects({a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6});

console.log("mergeObjects", response);


console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();


// Manière de faire plus simple et plus rapide
function sumArray(array) {
    return array.reduce((a, b) => a + b);
}

response = sumArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log("sumArray", response);


console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();


function sortObject(object) {
    const array = [];

    for (const key in object) {
        array.push({[key]: object[key]});
    }

    return array.sort((a, b) => a[Object.keys(a)[0]] - b[Object.keys(b)[0]]);
}

response = sortObject({b: 2, a: 1, c: 3, d: 6, f: 5, e: 4});

console.log("sortObject", response);


console.log();
console.log("––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––");
console.log();