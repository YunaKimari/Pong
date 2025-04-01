//variáveis da bolinha
let xBolinha = 300, yBolinha = 200;
let diametro = 13, raio = diametro / 2;
let velocidadeXBolinha = 6, velocidadeYBolinha = 6;

//configuração das raquetes
let raqueteComprimento = 10, raqueteAltura = 90;
let xRaquete = 5, yRaquete = 150;
let xOponente = 585, yOponente = 150, velocidadeYOponente;

//placar
let meusPontos = 0, pontosOponente = 0;

//sons
let raquetada, ponto, trilha;

function preload(){
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup(){
    createCanvas(600, 400);
    trilha.loop();
}

function draw(){
    background(0);
    desenharBolinha();
    moverBolinha();
    verificarColisaoBordas();
    desenharRaquete(xRaquete, yRaquete);
    moverRaquete();
    desenharRaquete(xOponente, yOponente);
    moverOponente();
    verificarColisaoRaquete(xRaquete, yRaquete);
    verificarColisaoRaquete(xOponente, yOponente);
    exibirPlacar();
    atualizarPlacar();
}

function desenharBolinha(){
    circle(xBolinha, yBolinha, diametro);
}

function moverBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificarColisaoBordas(){
    if (yBolinha - raio < 0){
        yBolinha = raio;
        velocidadeYBolinha *= -1;
    } else if (yBolinha + raio > height){
        yBolinha = height - raio;
        velocidadeYBolinha *= -1;
    }
}

function desenharRaquete(x, y){
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function moverRaquete(){
    if(keyIsDown(UP_ARROW) && yRaquete > 0){
        yRaquete -= 10;
    }
    if(keyIsDown(DOWN_ARROW) && yRaquete < height - raqueteAltura){
        yRaquete += 10;
    }
}

function verificarColisaoRaquete(x, y){
    if (
        xBolinha - raio < x + raqueteComprimento && //colisão com a raquete da esquerda
        xBolinha + raio > x && //colisão com a raquete da direita
        yBolinha - raio < y + raqueteAltura &&
        yBolinha + raio > y
    ){
        velocidadeXBolinha *= -1;
        xBolinha += velocidadeXBolinha; //evita que a bolinha fique presa
        raquetada.play();
    }
}

function moverOponente(){
    let direcao = yBolinha - (yOponente + raqueteAltura / 2);
    yOponente += constrain(direcao * 0.1, -5, 5); //movimentação mais suave
    yOponente = constrain(yOponente, 0, height - raqueteAltura);
}

function exibirPlacar(){
    textAlign(CENTER);
    textSize(16);
    fill(255, 140, 0);
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(255, 140, 0);
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosOponente, 470, 26);
}

function atualizarPlacar(){
    if (xBolinha > width){
        meusPontos++;
        ponto.play();
        resetarBolinha();
    } else if (xBolinha < 0){
        pontosOponente++;
        ponto.play();
        resetarBolinha();
    }
}

function resetarBolinha(){
    xBolinha = width / 2;
    yBolinha = height / 2;
//garante um reinício para um lado diferente
    let direcaoX = random ([-1, 1]);
    velocidadeXBolinha = 6 * direcaoX;
//variação no ângulo
    let direcaoY = random ([-1, 1]);
    velocidadeYBolinha = random (3, 6) * direcaoY;
}