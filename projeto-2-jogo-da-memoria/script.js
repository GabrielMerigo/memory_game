const frente = "card_front";
const atrás = "card_back";
const CARTA = "card";
const ICONE = "icon";


iniciarJogo();


function iniciarJogo(){

    cartas = jogo.criadorDeCartasDeTecno(jogo.tecnos);
    iniciadorDeCartas(cartas);
}

function iniciadorDeCartas(){
    let painelDoJogo = document.getElementById('gameBoard');
    painelDoJogo.innerHTML = '';
    
    jogo.cartas.forEach(carta => {
        let elementoDaCarta = document.createElement('div')
        elementoDaCarta.id = carta.id;
        elementoDaCarta.classList.add(CARTA)
        elementoDaCarta.dataset.icon = carta.icon;

        criadorDeConteudoDeCarta(carta, elementoDaCarta);

        elementoDaCarta.addEventListener('click', VirarCarta);
        painelDoJogo.appendChild(elementoDaCarta);
    })
}

function criadorDeConteudoDeCarta(carta, elementoDaCarta){

    CriadorDeFaceDaCarta(frente, carta, elementoDaCarta);
    CriadorDeFaceDaCarta(atrás, carta, elementoDaCarta);
}

function CriadorDeFaceDaCarta(cara, carta, elemento){
    let elementoDaCaraDaCarta = document.createElement('div');
    elementoDaCaraDaCarta.classList.add(cara);
    if(cara === frente){
        let iconeDoElemnto = document.createElement('img');
        iconeDoElemnto.classList.add(ICONE);
        iconeDoElemnto.src = "./img/" + carta.icon + '.png';
        elementoDaCaraDaCarta.appendChild(iconeDoElemnto);
    }else{
        elementoDaCaraDaCarta.innerHTML = "&lt;/&gt";
    }
    elemento.appendChild(elementoDaCaraDaCarta);
}


function VirarCarta(){

    if(jogo.setarCarta(this.id)){
        this.classList.add('virar')
        if(jogo.SegundaCarta){
        if(jogo.checarPartida()){
            jogo.limparCartas();
        if(jogo.checarGameOver()){
            let painelDeFimJogo = document.getElementById('gameOver')
            painelDeFimJogo.style.display = 'flex';
        }    
        }else{
            setTimeout(() =>{
            let PrimeiraCartaVista = document.getElementById(jogo.PrimeiraCarta.id);
            let segundaCartaVista = document.getElementById(jogo.SegundaCarta.id);

            PrimeiraCartaVista.classList.remove('virar');
            segundaCartaVista.classList.remove('virar');
            jogo.desvirarCartas();
            }, 1000);

        }
        }
    }
}

function reiniciar(){
    jogo.limparCartas();
    iniciarJogo();
    let painelDeFimJogo = document.getElementById('gameOver')
    painelDeFimJogo.style.display = 'none';
}