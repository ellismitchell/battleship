
// Initialize 2d arrays

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

// Place computer's ships randomly

while(!compPlaceShip(Math.floor(Math.random()*10),
	Math.floor(Math.random()*10),
	5,Math.random() >= 0.5,'c')) {}
	while(!compPlaceShip(Math.floor(Math.random()*10),
		Math.floor(Math.random()*10),
		4,Math.random() >= 0.5,'b')) {}
		while(!compPlaceShip(Math.floor(Math.random()*10),
			Math.floor(Math.random()*10),
			3,Math.random() >= 0.5,'k')) {}
			while(!compPlaceShip(Math.floor(Math.random()*10),
				Math.floor(Math.random()*10),
				3,Math.random() >= 0.5,'s')) {}
				while(!compPlaceShip(Math.floor(Math.random()*10),
					Math.floor(Math.random()*10),
					2,Math.random() >= 0.5,'d')) {}

let message = "Place your ships. Use space to rotate";
let gameOver = false;

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

function placeShip(x,y,length,horizontal,ship) {
	if (!horizontal) {
		for (let i = 0; i < length; i++){
			if (x+i> 9 || playerGrid[x+i][y] !== "e")
				return false;
		}
		for (let i = 0; i < length; i++)
			playerGrid[x+i][y] = ship;
	}
	else {
		for (let i = 0; i < length; i++){
			if (y+i >9 || playerGrid[x][y+i] !== "e")
				return false;
		}
		for (let i = 0; i < length; i++)
			playerGrid[x][y+i] = ship;
	}
	return true;
}

function compPlaceShip(x,y,length,horizontal,ship) {
	if (!horizontal) {
		for (let i = 0; i < length; i++){
			if (x+i> 9 || compGrid[x+i][y] !== "e")
				return false;
		}
		for (let i = 0; i < length; i++)
			compGrid[x+i][y] = ship;
	}
	else {
		for (let i = 0; i < length; i++){
			if (y+i >9 || compGrid[x][y+i] !== "e")
				return false;
		}
		for (let i = 0; i < length; i++)
			compGrid[x][y+i] = ship;
	}
	return true;
}


function playerGuess(x,y) {
	if (compGrid[x][y] === "e") {
		playerGuesses[x][y] = "m";
		return "m"; //miss
	}
	else {
		if (compGrid[x][y] === "c"){
			compShips.carrier--;
			if (compShips.carrier === 0)
				message += '<br>You sunk my carrier';
		}
		else if (compGrid[x][y] === 'b'){
			compShips.battleship--;
			if (compShips.battleship === 0)
				message += '<br>You sunk my battleship';
		}
		else if (compGrid[x][y] === 'k'){
			compShips.cruiser--;
			if (compShips.cruiser === 0)
				message += '<br>You sunk my cruiser';
		}
		else if (compGrid[x][y] === 's'){
			compShips.submarine--;
			if (compShips.submarine === 0)
				message += '<br>You sunk my submarine';
		}
		else if (compGrid[x][y] === 'd'){
			compShips.destroyer--;
			if (compShips.destroyer === 0)
				message += '<br>You sunk my destroyer';
		}
		if (compShips.carrier === 0 &&
			compShips.battleship === 0 &&
			compShips.cruiser === 0 &&
			compShips.submarine === 0 &&
			compShips.destroyer === 0) {
			message += '<br>YOU WIN!';
		gameOver = true;
	}
	playerGuesses[x][y] = 'h';
		return 'h'; //  hit
	}
}

function compGuess(x,y) {
	if (playerGrid[x][y] === "e") {
		compGuesses[x][y] = "m";
		return "m"; // miss
	}
	else {
		if (playerGrid[x][y] === "c"){
			playerShips.carrier--;
			if (playerShips.carrier === 0)
				message += '<br>I sunk your carrier';
		}
		else if (playerGrid[x][y] === 'b'){
			playerShips.battleship--;
			if (playerShips.battleship === 0)
				message += '<br>I sunk your battleship';
		}
		else if (playerGrid[x][y] === 'k'){
			playerShips.cruiser--;
			if (playerShips.cruiser === 0)
				message += '<br>I sunk your cruiser';
		}
		else if (playerGrid[x][y] === 's'){
			playerShips.submarine--;
			if (playerShips.submarine === 0)
				message += '<br>I sunk your submarine';
		}
		else if (playerGrid[x][y] === 'd'){
			playerShips.destroyer--;
			if (playerShips.destroyer === 0)
				message += '<br>I sunk your destroyer';
		}
		if (playerShips.carrier === 0 &&
			playerShips.battleship === 0 &&
			playerShips.cruiser === 0 &&
			playerShips.submarine === 0 &&
			playerShips.destroyer === 0) {
			message += '<br>YOU LOSE!';
		gameOver = true;
	}
	compGuesses[x][y] = "h";
		return "h"; // hit
	}
}

//functions for console testing
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
	// Player sets up ships
	$('#message').html(message);
	let shipsAreSet = false;
	let horizontal = true;
	let length = 4;
	let ships = [
	{
		length: 5,
		letter: 'c'
	},
	{
		length: 4,
		letter: 'b'
	},
	{
		length: 3,
		letter: 'k'
	},
	{
		length: 3,
		letter: 's'
	},
	{
		length: 2,
		letter: 'd'
	}
	]
	let shipsCounter = 0;
	let ship = ships[shipsCounter];
	str = "";
	for (let i = 0; i < 10; i++) {
		str+='<div class="row">';
		for (let j = 0; j < 10; j++) {
			str+='<div class="col col-1" id="a'+i+j+'">'
			+'</div>';
		}
		str+='</div>';
	}
	$('#setup').append(str);
	let recentSquare;
	let recentSquare2;
	if(!shipsAreSet){
		$(window).on("keypress",function(event) {
			if (event.which == 32) {
				// erase ship
				square = recentSquare;
				for (let i = 0; i < ship.length; i++){
					square.removeClass(ship.letter);
					if (horizontal)
						square = square.next();
					else {
						let id = recentSquare2.id;
						let x = id[1];
						let y = id[2];
						square = $('#a'+(parseInt(x)+1+i)+y);
					}
				}
				horizontal = !horizontal;
				// paint ship
				square = recentSquare;
				for (let i = 0; i < ship.length; i++){
					square.addClass(ship.letter);
					if (horizontal)
						square = square.next();
					else {
						let id = recentSquare2.id;
						let x = id[1];
						let y = id[2];
						square = $('#a'+(parseInt(x)+1+i)+y);
					}
				} 
			}
		});
		$('.col').hover(paintShip,eraseShip);

		function paintShip(event){
			let square = $(event.target);
			recentSquare = square;
			recentSquare2 = event.target;
			for (let i = 0; i < ship.length; i++){
				square.addClass(ship.letter);
				if (horizontal)
					square = square.next();
				else {
					let id = event.target.id;
					let x = id[1];
					let y = id[2];
					square = $('#a'+(parseInt(x)+1+i)+y);
				}
			}    

		}
		function eraseShip(event){
			let square = $(event.target);
			for (let i = 0; i < ship.length; i++){
				square.removeClass(ship.letter);
				if (horizontal)
					square = square.next();
				else {
					let id = event.target.id;
					let x = id[1];
					let y = id[2];
					square = $('#a'+(parseInt(x)+1+i)+y);
				}
			}	   
		}
		$('.col').click(function(event){
			let square = event.target;
			if (placeShip(parseInt(square.id[1]),parseInt(square.id[2]),ship.length,horizontal,ship.letter)){
				if (shipsCounter >= 4) {
					shipsAreSet = true;
					printPlayerGrid();
					ship.letter='x'; // hacky fix
					message = "";
					$('#message').html(message);
					playGame();
				}
				else {
					shipsCounter++;
					ship = ships[shipsCounter];
				}
			}
		});}

		function playGame() {
			$('#setup').hide();
			let str=""
			for (let i = 0; i < 10; i++) {
				str+='<div class="row">';
				for (let j = 0; j < 10; j++) {
					str+='<div class="col col-1" id="g'+i+j+'">'
			+'</div>';
		}
		str+='</div>';
	}
	$('#guesses').append(str);
	str = ""
	for (let i = 0; i < 10; i++) {
		str+='<div class="row">';
		for (let j = 0; j < 10; j++) {
			str+='<div class="col col-1 '+playerGrid[i][j]+'" id="s'+i+j+'">'
			+'</div>';
		}
		str+='</div>';
	}
	$('#ships').append(str);

	$('#guesses').click(function (event) {
		if (playerGuesses[event.target.id[1]][event.target.id[2]] === "e"){
			let result = playerGuess(event.target.id[1], event.target.id[2]);
	    	$(event.target).addClass(result);
	    	// Super sophisticated AI
	    	let compGuessX = Math.floor(Math.random()*10);
	    	let compGuessY = Math.floor(Math.random()*10);
	    	while(compGuesses[compGuessX][compGuessY] != "e") {
	    		compGuessX = Math.floor(Math.random()*10);
	    		compGuessY = Math.floor(Math.random()*10);
	    	}
	    	result = compGuess(compGuessX,compGuessY);
	    	$('#s'+compGuessX+compGuessY).addClass(result);
	    	$('#message').html(message);
	    	if (gameOver)
	    		$('#guesses').off('click');
	    }
	});
}
});