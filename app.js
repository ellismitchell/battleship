
let playerGrid = new Array(10);
for (let i = 0; i < 10; i++) {
	playerGrid[i] = new Array(10);
}
let compGrid = new Array(10);
for (let i = 0; i < 10; i++) {
	compGrid[i] = new Array(10);
}
let playerGuesses = new Array(10);
for (let i = 0; i < 10; i++) {
	playerGuesses[i] = new Array(10);
}
let compGuesses = new Array(10);
for (let i = 0; i < 10; i++) {
	compGuesses[i] = new Array(10);
}

//initialize all grids to 10x10 empty arrays
for (let i = 0; i < 10; i++) {
	for (let j = 0; j < 10; j++) {
		playerGrid[i][j] = "e"; // empty
		compGrid[i][j] = "e";
		playerGuesses[i][j] = "e";
		compGuesses[i][j] = "e";
	}
}

// Place ships in playerGrid and compGrid here
//
//
playerGrid[0][1] = "c";
playerGrid[0][2] = "c";
playerGrid[0][3] = "c";
playerGrid[0][4] = "c";
playerGrid[0][5] = "c";

playerGrid[3][0] = "b";
playerGrid[4][0] = "b";
playerGrid[5][0] = "b";
playerGrid[6][0] = "b";

playerGrid[3][8] = "k";
playerGrid[4][8] = "k";
playerGrid[5][8] = "k";

playerGrid[6][2] = "s";
playerGrid[6][3] = "s";
playerGrid[6][4] = "s";

playerGrid[8][8] = "d";
playerGrid[8][9] = "d";

compGrid[0][1] = "c";
compGrid[0][2] = "c";
compGrid[0][3] = "c";
compGrid[0][4] = "c";
compGrid[0][5] = "c";

compGrid[3][0] = "b";
compGrid[4][0] = "b";
compGrid[5][0] = "b";
compGrid[6][0] = "b";

compGrid[3][8] = "k";
compGrid[4][8] = "k";
compGrid[5][8] = "k";

compGrid[6][2] = "s";
compGrid[6][3] = "s";
compGrid[6][4] = "s";

compGrid[8][8] = "d";
compGrid[8][9] = "d";

let message = "";

let playerShips = {
	carrier: 5,
	battleship: 4,
	cruiser: 3,
	submarine: 3,
	destroyer: 2
}

let compShips = {
	carrier: 5,
	battleship: 4,
	cruiser: 3,
	submarine: 3,
	destroyer: 2
}
function playerGuess(x,y) {
	if (compGrid[x][y] === "e") {
		playerGuesses[x][y] = "m";
		return "m"; //miss
	}
	else {
		if (compGrid[x][y] === "c"){
			playerShips.carrier--;
			if (playerShips.carrier === 0)
				message = "You sunk my carrier";
		}
		else if (compGrid[x][y] === "b"){
			playerShips.battleship--;
			if (playerShips.battleship === 0)
				message = "You sunk my battleship";
		}
		else if (compGrid[x][y] === "k"){
			playerShips.cruiser--;
			if (playerShips.cruiser === 0)
				message = "You sunk my cruiser";
		}
		else if (compGrid[x][y] === "s"){
			playerShips.submarine--;
			if (playerShips.submarine === 0)
				message = "You sunk my submarine";
		}
		else if (compGrid[x][y] === "d"){
			playerShips.destroyer--;
			if (playerShips.destroyer === 0)
				message = "You sunk my destroyer";
		}
		compGrid[x][y] = "h";
		return "h"; //  hit
	}
}

function compGuess(x,y) {
	if (playerGrid[x][y] === "e") {
		compGuesses[x][y] = "m";
		return "m"; // miss
	}
	else
		compGuesses[x][y] = "h";
		return "h"; // hit
}

function printPlayerGuesses() {
	str = "";
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			str += playerGuesses[i][j];
		}
		str+= '\n';
	}
	console.log(str);
}

function printCompGuesses() {
	str = "";
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			str += compGuesses[i][j];
		}
		str+= '\n';
	}
	console.log(str);
}

function printPlayerGrid() {
	str = "";
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			str += playerGrid[i][j];
		}
		str+= '\n';
	}
	console.log(str);
}

function printCompGrid() {
	str = "";
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			str += compGrid[i][j];
		}
		str+= '\n';
	}
	console.log(str);
}

$(document).ready(function() {
	str = ""
	for (let i = 0; i < 10; i++) {
		str+='<div class="row">';
		for (let j = 0; j < 10; j++) {
			str+='<div class="col col-1" id="g'+i+j+'">'
			+playerGuesses[i][j]
			+'</div>';
		}
		str+='</div>';
	}
	$('#guesses').append(str);
	str = ""
	for (let i = 0; i < 10; i++) {
		str+='<div class="row">';
		for (let j = 0; j < 10; j++) {
			str+='<div class="col col-1" id="s'+i+j+'">'
			+playerGrid[i][j]
			+'</div>';
		}
		str+='</div>';
	}
	$('#ships').append(str);

	$('#guesses').click(function (event) {
		console.log(this);
    	console.log(event.target);
    	console.log(event.target.id[1]);
    	if (playerGuesses[event.target.id[1]][event.target.id[2]] === "e"){
	    	let result = playerGuess(event.target.id[1], event.target.id[2]);
	    	$(event.target).text(result);
	    	$(event.target).addClass(result);
	    	let compGuessX = Math.floor(Math.random()*10);
	    	let compGuessY = Math.floor(Math.random()*10);
	    	result = compGuess(compGuessX,compGuessY);
	    	$('#s'+compGuessX+compGuessY).addClass(result);
	    	$('#message').text(message);
    	}
	});
});