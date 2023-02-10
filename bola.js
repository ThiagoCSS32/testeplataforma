// Cria a div que será animada
var ball = document.getElementById("bola");

// Posição inicial da div
var x = 0;
var y = 0;

// Velocidade inicial da div
var vx = 0;
var vy = 0;

// Aceleração devido à gravidade
var ax = 0;
var ay = 9.81;

// Atualiza a posição da div com base na velocidade e aceleração
function update() {
    vx += ax;
    vy += ay;
    x += vx;
    y += vy;
    ball.style.left = x + "px";
    ball.style.top = y + "px";
    requestAnimationFrame(update);
}

update();
