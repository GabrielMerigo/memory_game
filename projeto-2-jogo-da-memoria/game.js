let jogo = {
    Bloqueado: false,
    PrimeiraCarta: null,
    SegundaCarta: null, 

    tecnos: ['bootstrap',
    'css',
    'electron',
    'html',
    'react',
    'javascript', 
    'jquery', 
    'node-js',
    'firebase',
    'angular'],
    
    cartas: null,

    setarCarta: function(id){
        let carta = this.cartas.filter(carta => carta.id === id)[0];
         if( carta.virada || this.Bloqueado){
             return false;
         }
         if(!this.PrimeiraCarta){
             this.PrimeiraCarta = carta;
             this.PrimeiraCarta.virada = true;
             return true;
         } else{
             this.SegundaCarta = carta;
             this.SegundaCarta.virada = true;    
             this.Bloqueado = true;
             return true;
         }
    },

    checarPartida: function(){
        if(!this.PrimeiraCarta || !this.SegundaCarta){ 
            return false;
        }
        return this.PrimeiraCarta.icon === this.SegundaCarta.icon;
    },

    limparCartas: function(){
        this.PrimeiraCarta = null;
        this.SegundaCarta = null;
        this.Bloqueado = false;
    },

    desvirarCartas: function(){
        this.PrimeiraCarta.virada = false;
        this.SegundaCarta.virada = false;
        this.limparCartas();
    },

    checarGameOver: function(){
        return this.cartas.filter(carta => !carta.virada).length == 0;
    },


    criadorDeCartasDeTecno: function(tecnos){ // Função - Criando Carta
        
        this.cartas = []; //Criei um array vazio.
        
        for(tecno of tecnos){ //Loop para criar o par da carta.
            this.cartas.push(this.CriadorDeParDaTecno(tecnos)); //Adiciono no final array vazio um push para colocar no final do array.
                                                  //Usando a funcao createPair passando a tecno.                  
        }
    
        this.cartas = this.cartas.flatMap(par => par); //Transformando em 20 pares.
        this.embaralhoDeCartas(); 
        return this.cartas;
    },
    
    CriadorDeParDaTecno: function(){ //Criando par 
        return [{
            id: this.criadorDeIdParCartas(tecno), //Criando ID random.
            icon: tecno, //Criando icon.
            virada: false, //Deixando sempre virada.
        }, {
            id: this.criadorDeIdParCartas(tecno), //Criando ID random.
            icon: tecno, //Criando icon.
            virada: false, //Deixando sempre virada.
        }]
    },
    
    criadorDeIdParCartas: function(){
        return tecno + parseInt(Math.random() * 1000) //Mandando retornar a minha tecno + um numero aleatório.
    },

    embaralhoDeCartas: function(cartas){
        let IndexAtual = this.cartas.length;
        let indexAleatorio = 0;
    
        while (IndexAtual !== 0){
            indexAleatorio = Math.floor(Math.random() * IndexAtual);
            IndexAtual--;
            [this.cartas[indexAleatorio], this.cartas[IndexAtual]] = [this.cartas[IndexAtual], this.cartas[indexAleatorio]];
        }
    }
}

