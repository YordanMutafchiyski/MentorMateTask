var readline = require('readline-sync'); //library that needs to be installed for reading from the console
 
var row = parseInt(readline.question("Enter row number: "))
var col = parseInt(readline.question("Enter col number: "))
 
if (row % 2 != 0 || col % 2 != 0) { //first check the numbers for row and col are even.
	throw new Error(`Row(${row}) and col(${col}) values must be even numbers!`)
}
 
let layer1 = []
for (var iter = 0; iter < row; iter++) {
	var line = readline.question("Enter line " + (iter + 1) + ": ")
	let split = line.split(" ")
	if (split.length == col) {
		layer1.push(split.map((numStr) => {
			return +numStr
		}))
	}
}
 
var layer2 = []
 
for (var r = 0; r < row; r++) { //creating an empty layer with -1 for every cell. 
	layer2.push([])
	for (var c = 0; c < col; c++) {
		layer2[r][c] = -1
	}
}
 
console.log("Layer 1: ")
print2dArr(layer1)
 
var brickCount = row * col / 2;
var taken = [];
for (var r = 0; r < row; r++) {
	for (var c = 0; c < col; c++) {
		if (!isPopulated(layer2[r][c])) {
			if (!isHorizontal(layer1[r][c], layer1[r][c + 1], c, col)) {
				if (c + 1 == col) {
					throw new Error("Cannot place horizontal brick on the last column!")
				}
				var brickNumber = getBrickNumber(brickCount, taken, layer1[r][c])//function accepts 3 params. first brickCount. taken is an array that holds all used bricks  and current brick 
				layer2[r][c] = brickNumber
				layer2[r][c + 1] = brickNumber
			} else {
				if (r + 1 == row) {
					throw new Error("Cannot place vertical brick on the last row!")
				}
				var brickNumber = getBrickNumber(brickCount, taken, layer1[r][c])
				layer2[r][c] = brickNumber
				layer2[r + 1][c] = brickNumber
			}
		}
	}
}
console.log("Layer 2: ")
print2dArr(layer2)
 
function getBrickNumber(brickCount, taken, layer1Current) {
	var num = -1
	for (var i = 1; i <= brickCount; i++) {
		if (!taken.some(function (t) { return t == i }) && //checks if taken array already has that brick. If not it adds it to  the array and return the num of currentBrick. 
			i != layer1Current) {
			num = i
			taken.push(i)
			return num
		}
	}
}
 
function isPopulated(current) {//Checks if the cell is populated if not it returns -1
	return current != -1
}
 
function isHorizontal(current, next, c, col) {// check if the next element is horizontal brick. It accepts the current element ,the next element, the current column and and number of cols.
	return current == next || c == col - 1
}
 
function print2dArr(arr) {//print the brickwall with the separators
	for (var r = 0; r < arr.length; r++) {
		var separator = ""
		for (var c = 0; c < arr[r].length; c++) {
			separator = separator + "  - "
		}
	}
	console.log(separator)
	for (var r = 0; r < arr.length; r++) {
		var line = "| "
		for (var c = 0; c < arr[r].length; c++) {
			line = line + arr[r][c] + " | "
		}
		console.log(line)
		console.log(separator)
		line = ""
	}
}