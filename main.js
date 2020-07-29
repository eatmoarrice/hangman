//0. 알파벳을 일단 정함
//1. 유저가 알파벳을 선택함
//2. 만약에 알파벳이 있다면 보여줌
//3. 없으면 챈스가 깍이고 행맨을 그림
//4. 챈스 0이면 끝남
//5. 글씨 맞추면 추카
let alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let selectedList = [];
let context, myStickman;
let buttonHTML = alphabets.map((item) => `<button class="btn btn-warning" id="${item}" onclick="selectAlphabet('${item}')">${item.toUpperCase()}</button>`).join("");
document.getElementById("buttonArea").innerHTML = buttonHTML;
function drawHackman() {
	drawArray[count]();
}

frame1 = function () {
	draw(0, 150, 150, 150);
};

frame2 = function () {
	draw(10, 0, 10, 600);
};

frame3 = function () {
	draw(0, 5, 70, 5);
};

frame4 = function () {
	draw(60, 5, 60, 15);
};

torso = function () {
	draw(60, 36, 60, 70);
};

rightArm = function () {
	draw(60, 46, 100, 50);
};

leftArm = function () {
	draw(60, 46, 20, 50);
};

rightLeg = function () {
	draw(60, 70, 100, 100);
};

leftLeg = function () {
	draw(60, 70, 20, 100);
};

head = function () {
	myStickman = document.getElementById("canvas");
	context = myStickman.getContext("2d");
	context.beginPath();
	context.arc(60, 25, 10, 0, Math.PI * 2, true);
	context.stroke();
};
let round = 0;
let wordList = [
	"alien",
	"avengers",
	"titanic",
	"matrix",
	"memento",
	"pianist",
	"aquaman",
	"annabelle",
	"deadpool",
	"jumanji",
	"spiderman",
	"frozen",
	"shrek",
	"notebook",
	"avatar",
	"mulan",
	"godfather",
	"leon",
	"psycho"
];
let word = wordList[round];
let answer = [];
let drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];
let correct = 0;
let count = 10;
let gameover = false;
function render() {
	document.getElementById("alphabet").innerHTML = word
		.split("")
		.map((letter) => `<div class="letter"><div class="pot"><img src="img/pot2.png"/></div></div>`)
		.join("");
}

function selectAlphabet(char) {
	if (gameover) {
		return;
	}
	let correct = 0;
	document.getElementById(char).disabled = true;
	selectedList.push(char);
	let wordArray = word.split("");
	if (wordArray.includes(char)) {
		answer.push(char);
		document.getElementById("alphabet").innerHTML = wordArray
			.map((letter, idx) => {
				if (answer.includes(letter)) {
					correct++;
					return `<div id="${idx}" class="letter grow"><div class="flower"><div class="letter-on-top">${letter.toUpperCase()}</div></div><div class="pot"><img src="img/pot2.png"></div></div>`;
				}
				return `<div class="letter"><div class="pot"><img src="img/pot2.png"/></div></div>`;
			})
			.join("");
		console.log(correct, wordArray.length);
		if (correct == wordArray.length) {
			document.getElementById("resultArea").innerHTML = "You Win!!";
			document.getElementById("teacher").src = "img/happyteacher.png";
			document.getElementById("resultArea").classList.add("green");
		}
	} else {
		count--;

		drawHackman();
		if (count <= 0) {
			document.getElementById("resultArea").innerHTML = "GAME OVER";
			document.getElementById("teacher").src = "img/sadteacher.png";
			document.getElementById("resultArea").classList.add("red");
			gameover = true;
			return;
		}
	}
}

function reset() {
	round++;
	word = wordList[round];
	render();
	answer = [];
	correct = 0;
	count = 10;
	selectedList.map((item) => (document.getElementById(`${item}`).disabled = false));
	document.getElementById("resultArea").innerHTML = "";
	context.clearRect(0, 0, myStickman.width, myStickman.height);
	canvas();
	gameover = false;
}

draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
	context.moveTo($pathFromx, $pathFromy);
	context.lineTo($pathTox, $pathToy);
	context.stroke();
};
canvas = function () {
	myStickman = document.getElementById("canvas");
	context = myStickman.getContext("2d");
	context.beginPath();
	context.strokeStyle = "#4287f5";
	context.lineWidth = 2;
};
canvas();
render();
