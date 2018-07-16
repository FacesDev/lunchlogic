
const answerInput = document.querySelector('.answer');
const rickCounter = document.querySelector('.div-count')
const response = document.querySelector('.response');
const matrix = document.querySelector('.matrix');
var audio = new Audio('./public/rick.mp3');
var teeHeeAudio = new Audio('./public/teehee.mp3');

//Matrix Vars
var canvas = document.getElementById('matrix');
var ctx = canvas.getContext('2d');
var fontSize = 20;
var chars = generateChars();
var columns;
var drops;
var drawnToBottom;
var width;
var height;

// RickClone Variables
var z = 50;
var win = false;
var rickCount = 1;

function checkAnswer(event) {
  const answer = event.target.value;
  if (answer.toLowerCase() == "1keyboard" ){
     response.textContent = 
    `YOU WIN!`;
    response.style.color = "#49fb35";
    response.style.fontSize = "4em";
    response.style.fontWeight = "bold";
    setTimeout(kinda, 1000);
    setTimeout(sorry, 2000);
    setTimeout(teeHee, 3500);
    setTimeout(correctAnswer, 5000);
  } else if (answer == ""){
    response.textContent = "";
  }
  else{
    response.style.color = "#ff0101";
    response.textContent = 
    `WRONG!`;
  }
}

function kinda(){
  $('#kinda').fadeIn();
}
function sorry(){
  $('#sorry').fadeIn(2000);
}
function teeHee(){
  teeHeeAudio.play();
}
answerInput.addEventListener('input', checkAnswer);


function generateChars() {
    var chars = '0123456789';
    for (var i = 0; i <= 55; i++) {
      chars += String.fromCharCode(i + 65382);
    }
  return chars.split('');
}

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.round(canvas.width / fontSize);
  drops = [];

  for (var i = 0; i < columns; i++) {
    drops[i] = 1;
  }
  drawnToBottom = false;
}
window.onresize = function() {
  initCanvas();
};

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#19FF19';
  ctx.font = 'bold ' + fontSize + 'px monospace';

if (win === true ){
  chars = "LO";
  matrix.style.transform = "rotateY(0deg)";
  matrix.style.webkitTransform = "rotateY(0deg)";

}
  var dropCount = drops.length;
  var charCount = chars.length;

  for (var i = 0; i < dropCount; i++) {
    var text = chars[Math.floor(Math.random() * charCount)];
    var rowNum = drops[i] * fontSize;
    ctx.fillText(text, i * fontSize, rowNum);
    if (rowNum > canvas.height) drawnToBottom = true;
    if ((!drawnToBottom && Math.random() > 0.925) || (drawnToBottom && Math.random() > 0.95)) drops[i] = 0;
    drops[i]++;
  }
}

initCanvas();
setInterval(draw, 45);

function correctAnswer() {
  audio.play();
  win = true;
  $('#RickRoll').show();
  $('#wrapper').hide();
  $('#div').show();
  $('#RickRoll').attr("src", "./public/rick.gif");
  setInterval('cloneRick()', 1500);
}

function cloneRick() {
  var x = generaterandom();
  if (x > canvas.width-420){
    x = canvas.width-420;
  }
  var y = generaterandom();
  if (y > canvas.height-315){
    y = canvas.height-315;
  }

$('#RickRoll').clone().insertAfter("#RickRoll").css('position', 'absolute').offset({
  top: x,
  left: y,
}).css('z-index', z);
  z+=10;
  rickCount++
  rickCounter.textContent = rickCount;
}
function generaterandom(){
  var num = Math.floor(Math.random() * 800);
  return num;
}