let tituloQuizz = "";
let urlImagemQuizz = "";
let qtdPerguntasQuizz;
let qtdNiveisQuizz;
let textoPergunta = "";
let corPergunta = "";
let textoCorreto = "";
let imgCorreto = "";
let textoIncorreto1 = "";
let imgIncorreto1 = "";
let textoIncorreto2 = "";
let imgIncorreto2 = "";
let textoIncorreto3 = "";
let imgIncorreto3 = "";
let textoIncorreto4 = "";
let imgIncorreto4 = "";
let perguntasQuizz;

function paginaCriarQuizz () {    
    document.querySelector(".pagina-1").classList.add("escondido")
    document.querySelector(".pagina-2").classList.add("escondido")
    document.querySelector(".pagina-8").classList.remove("escondido");
}

function criarQuizzPagina8 () {
    tituloQuizz = document.querySelector(".titulo-quizz").value;
    urlImagemQuizz = document.querySelector(".capa-quizz").value;
    qtdPerguntasQuizz = Number(document.querySelector(".qtd-perguntas").value);
    qtdNiveisQuizz = Number(document.querySelector(".qtd-niveis").value);
    if ((tituloQuizz.length <= 20 || tituloQuizz.length >= 65) || (qtdPerguntasQuizz < 3) || (qtdNiveisQuizz < 2) || ValidURL(urlImagemQuizz) === false) {
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
    criarQuizzPagina9();
}


function criarQuizzPagina9 () {
    perguntasQuizz = document.querySelector(".perguntas-quizz");
    perguntasQuizz.innerHTML = "";
    for (let i = 1; i <= qtdPerguntasQuizz - 1; i++) {
        perguntasQuizz.innerHTML +=
        `<div class="mais-perguntas${i}">
            <div class="perguntas-alinhamentos">
                <p>Pergunta ${i + 1}</p>
                <div onclick="abrirCaixaPergunta(${i})">
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            </div>
        </div>`
              
    }
    perguntasQuizz.innerHTML += 
    `<button type="button" onclick="aprovarPerguntas(this)">Prosseguir para criar níveis</button>`             
}

function aprovarPerguntas () {
    for (let i =0; i < qtdPerguntasQuizz; i++) {
        textoPergunta = document.querySelector(`.texto-pergunta${i}`).value;
        corPergunta = document.querySelector(`.cor-fundo-pergunta${i}`).value;
        textoCorreto = document.querySelector(`.texto-correta${i}`).value;
        imgCorreto = document.querySelector(`.img-correta${i}`).value;
        textoIncorreto1 = document.querySelector(`.resposta-incorreta${i}1`).value;
        imgIncorreto1 = document.querySelector(`.img-incorreta${i}1`).value;
        textoIncorreto2 = document.querySelector(`.resposta-incorreta${i}2`).value;
        imgIncorreto2 = document.querySelector(`.img-incorreta${i}2`).value;
        textoIncorreto3 = document.querySelector(`.resposta-incorreta${i}3`).value;
        imgIncorreto3 = document.querySelector(`.img-incorreta${i}3`).value;
        textoIncorreto4 = document.querySelector(`.resposta-incorreta${i}4`).value;
        imgIncorreto4 = document.querySelector(`.img-incorreta${i}4`).value;
        if (textoPergunta.length < 20 || checarHex === false || textoCorreto1 === "" || textoIncorreto1 === "" || ValidURL(imgCorreto) === false || ValidURL(imgIncorreto) === false) {
            alert('Preencha os campos corretamente.');
            textoPergunta.innerHTML = "";
            corPergunta.innerHTML = "";
            textoCorreto.innerHTML = "";
            imgCorreto.innerHTML = "";
            textoIncorreto1.innerHTML = "";
            imgIncorreto1.innerHTML = "";
            textoIncorreto2.innerHTML = "";
            imgIncorreto2.innerHTML = "";
            textoIncorreto3.innerHTML = "";
            imgIncorreto3.innerHTML = "";
            textoIncorreto4.innerHTML = "";
            imgIncorreto4.innerHTML = "";
        }
        else {
            proximaPagina9();
        }
    }
}

function abrirCaixaPergunta(i) {
    let opcaoPergunta = document.querySelector(`.mais-perguntas${i}`);
    opcaoPergunta.innerHTML = "";
    opcaoPergunta.innerHTML +=
    `<div>
        <p>Pergunta ${i + 1}</p>
        <input type="text" class="texto-pergunta${i}" placeholder="Texto da pergunta" />
        <input type="text" class="cor-fundo-pergunta${i}" placeholder="Cor de fundo da pergunta" />
    </div>
    <div>
        <p>Resposta correta</p>
        <input type="text" class="texto-correta${i}" placeholder="Resposta correta" />
        <input type="text" class="img-correta${i}" placeholder="URL da imagem do seu quizz" />
    </div>
    <div>
        <p>Respostas incorretas</p>
        <div>
            <input type="text" class="resposta-incorreta${i}1" placeholder="Resposta incorreta 1" />
            <input type="text" class="img-incorreta${i}1" placeholder="URL da Imagem 1" />
        </div>
        <div>
                <input type="text" class="resposta-incorreta${i}2" placeholder="Resposta incorreta 2" />
                <input type="text" class="img-incorreta${i}2" placeholder="URL da Imagem 2" />
        </div>
        <div>
            <input type="text" class="resposta-incorreta${i}3" placeholder="Resposta incorreta 3" />
            <input type="text" class="img-incorreta${i}3" placeholder="URL da Imagem 3" />
        </div>
        <div>
            <input type="text" class="resposta-incorreta${i}4" placeholder="Resposta incorreta 4" />
            <input type="text" class="img-incorreta${i}4" placeholder="URL da Imagem 4" />
        </div>
    </div>`
    
}

function ValidURL(imgCorreto) {
    let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(imgCorreto)) {
      return false;
    } else {
      return true;
    }
}

function ValidURL(imgIncorreto1, imgIncorreto2, imgIncorreto3, imgIncorreto4) {
    let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(imgIncorreto1, imgIncorreto2, imgIncorreto3, imgIncorreto4)) {
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