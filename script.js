let tituloQuizz = "";
let urlImagemQuizz = "";
let qtdPerguntasQuizz;
let qtdNiveisQuizz;
let textoPergunta = "";
let corPergunta = "";
let textoCorreto = "";
let imgCorreto = "";
let textoIncorreto = "";
let imgIncorreto = "";

function paginaCriarQuizz (clique) {    
    document.querySelector(".pagina-1").classList.add("escondido")
    document.querySelector(".pagina-2").classList.add("escondido")
    document.querySelector(".pagina-8").classList.remove("escondido");
}

function criarQuizzPagina8 () {
    tituloQuizz = document.querySelector(".titulo-quizz").value;
    urlImagemQuizz = document.querySelector(".capa-quizz").value;
    qtdPerguntasQuizz = Number(document.querySelector(".qtd-perguntas").value);
    qtdNiveisQuizz = Number(document.querySelector(".qtd-niveis").value);
    if ((tituloQuizz.length <= 20 || tituloQuizz.length >= 65) || (qtdPerguntasQuizz <= 3) || (qtdNiveisQuizz <= 2) || ValidURL(urlImagemQuizz) === false) {
        alert('Preencha os dados corretamente.');
        tituloQuizz.innerHTML = "";
        urlImagemQuizz.innerHTML = "";
        qtdPerguntasQuizz.innerHTML = "";
        qtdNiveisQuizz.innerHTML = "";

    } else {
        proximaPagina8();
    }
}

function ValidURL(urlImagemQuizz) {
    let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(urlImagemQuizz)) {
      return false;
    } else {
      return true;
    }
}

function proximaPagina8 (clique) {
    document.querySelector(".pagina-8").classList.add("escondido");
    document.querySelector(".pagina-9").classList.remove("escondido");
}

function respostasIncorretas () {

}

function criarQuizzPagina9 () {
    textoPergunta = document.querySelector(".texto-pergunta").value;
    corPergunta = document.querySelector(".cor-fundo-pergunta").value;
    textoCorreto = document.querySelector(".texto-correta").value;
    imgCorreto = document.querySelector(".img-correta").value;
    textoIncorreto = document.querySelector(".resposta-incorreta").value;
    imgIncorreto = document.querySelector(".img-incorreta").value;

    for (let i =0; i <= qtdPerguntasQuizz; i++) { 
        perguntasQuizz = document.querySelector(".pagina-9");
        perguntasQuizz.innerHTML = "";
        perguntasQuizz.innerHTML +=
        `<div>
            <p>Pergunta ${qtdPerguntasQuizz[i]}</p>
            <input type="text" class="texto-pergunta" placeholder="Texto da pergunta" />
            <input type="text" class="cor-fundo-pergunta" placeholder="Cor de fundo da pergunta" />
        </div>
        <div>
        <p>Resposta correta</p>
            <input type="text" class="texto-correta" placeholder="Resposta correta" />
            <input type="text" class="img-correta" placeholder="URL da imagem do seu quizz" />
        </div>`
        for (let i = 0; i <= 4; i++) {
            `<div>            
                <p>Respostas incorretas</p>
                <div>
                <input type="text" class="resposta-incorreta" placeholder="Resposta incorreta 1" />
                <input type="text" class="img-incorreta" placeholder="URL da Imagem 1" />
                </div>
                <div>
                <input type="text" placeholder="Resposta incorreta 2" />
                <input type="text" placeholder="URL da Imagem 2" />
                </div>
                <div>
                <input type="text" placeholder="Resposta incorreta 3" />
                <input type="text" placeholder="URL da Imagem 3" />
                </div>
            </div>`
        }
        `<div class="mais-perguntas">
            <p>Pergunta ${qtdPerguntasQuizz[i]}</p>
            <ion-icon name="create-outline"></ion-icon>
        </div>`
    }
        
    if (textoPergunta.length <= 20 || checarHex === false || textoCorreto === "" || textoIncorreto === "" || ValidURL(imgCorreto) === false || ValidURL(imgIncorreto) === false) {
      alert('Preencha os campos corretamente.');
      textoPergunta.innerHTML = "";
      corPergunta.innerHTML = "";
      textoCorreto.innerHTML = "";
      imgCorreto.innerHTML = "";
      textoIncorreto.innerHTML = "";
      textoIncorreto.innerHTML = "";
    } else {

      proximaPagina9();
    }
}

criarQuizzPagina9();

function ValidURL(imgCorreto) {
    let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(imgCorreto)) {
      return false;
    } else {
      return true;
    }
}

function ValidURL(imgIncorreto) {
    let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(imgIncorreto)) {
      return false;
    } else {
      return true;
    }
}


function checarHex () {
    const re = /[0-9A-Fa-f]{6}/g;  
    if (re.test(corPergunta)) {
        return true;
    } else {
        return false;
    }
}

function proximaPagina9 () {
    document.querySelector(".pagina-9").classList.add("escondido");
    document.querySelector(".pagina-10").classList.remove("escondido");
}