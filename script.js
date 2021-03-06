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
let tituloNivel = "";
let porcentagemNivel;
let imagemNivel = "";
let descricaoNivel;
let respostas = [];


const QuizzAPI = 'https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes';
let listaQuizzes = [];
let posicao;
let niveisQuizz = [];
let numeroDeAcertos = 0;
let numeroDePeguntasRespondidas = 0;
let listaPerguntasQuizz = [];
let quizzCriado = {
  title: "",
  image: "",
  questions: [],
  levels: []
}

function buscarQuizzes() {
    const promise = axios.get(`${QuizzAPI}`);
    promise.then(carregarQuizzes);
}

buscarQuizzes();

function carregarQuizzes(resposta) {
    listaQuizzes = resposta.data;
    const adicionaQuizz = document.querySelector('.linha-quizz')
    adicionaQuizz.innerHTML = "";

    for(let i=0;i<listaQuizzes.length;i++){
        let quizz = listaQuizzes[i];
        adicionaQuizz.innerHTML += `
        <div id="${i}" class="lista-quizz" api-id="${quizz.id}" onclick="escolherQuizz(this)" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizz.image}) no-repeat center center / cover;">
        <div class="nome-quizz">
            <p>${quizz.title}</p>
            </div>  
        </div>`;
    }
}

function alterarTela2(url, titulo, questoes, niveis){
    const containerTela2 = document.querySelector(".pagina-3");
    containerTela2.innerHTML +=`
    <div class="quizz-atual" style="background: url(${url}) no-repeat center center / cover;">
        <div class="quizz-nome">${titulo}</div>
    </div>
    `;
    for(let i=0;i<questoes.length;i++){
        let respostas = questoes[i].answers;
        respostas.sort(comparador);

        containerTela2.innerHTML +=`
        <div class="quizz-card">
            <div class="quizz-pergunta numero${i}" style="background-color: ${questoes[i].color}">
                <span>${questoes[i].title}</span>
            </div>
        </div>
        `;
        
        if(respostas.length%2 === 0){
            for(let j=0; j<respostas.length/2; j++){
                containerTela2.querySelector(".quizz-card").innerHTML +=`
                <div class="quizz-opcoes">
                    <div class="quizz-opcao" onclick="verificarResposta(this)">
                        <img src="${respostas[j*2].image}" alt="" />
                        <span>${respostas[j*2].text}</span>
                    </div>
                    <div class="quizz-opcao" onclick="verificarResposta(this)">
                        <img src="${respostas[j*2+1].image}" alt="" />
                        <span>${respostas[j*2+1].text}</span>
                    </div>
                </div>
                `;
            }
        }else{
            containerTela2.querySelector(".quizz-card").innerHTML +=`
            <div class="quizz-opcoes">
                <div class="quizz-opcao" onclick="verificarResposta(this)">
                    <img src="${respostas[0].image}" alt="" />
                    <span>${respostas[0].text}</span>
                </div>
                <div class="quizz-opcao" onclick="verificarResposta(this)">
                    <img src="${respostas[1].image}" alt="" />
                    <span>${respostas[1].text}</span>
                </div>
                <div class="quizz-opcao" onclick="verificarResposta(this)">
                    <img src="${respostas[2].image}" alt="" />
                    <span>${respostas[2].text}</span>
                </div>
            </div>
            `;
        }
    }
}

function verificarResposta(elemento){
    numeroDePeguntasRespondidas++;
    const conjuntoRespostas = elemento.parentNode.parentNode;
    numeroDaPergunta = Number(conjuntoRespostas.classList[1].replace("numero", ""));
    conjuntoRespostas.querySelectorAll(".quizz-opcao").forEach(aplicarOpacidade);
    elemento.classList.remove("outras-respostas");
}

function aplicarOpacidade(item, index){
    item.classList.add("outras-respostas");
    item.onclick = "";
    if(listaPerguntasQuizz[numeroDaPergunta].answers[index].isCorrectAnswer){
        item.classList.add("resposta-certa");
    }else{
        item.classList.add("resposta-errada");
    }
}

function visualizarTela2(){
    document.querySelector(".pagina-1").classList.add("escondido");
    document.querySelector(".pagina-2").classList.add("escondido");
    document.querySelector(".pagina-3").classList.remove("escondido");
    document.querySelector(".quizz-atual").scrollIntoView(false);
    numeroDeAcertos = 0;
    numeroDePeguntasRespondidas = 0;
}

function escolherQuizz(elemento){
    posicao = Number(elemento.id);
    const quizzSelecionado = listaQuizzes[posicao];
    const urlImagem = quizzSelecionado.image;
    const tituloQuizz = quizzSelecionado.title;
    const questoesQuizz = quizzSelecionado.questions;

    niveisQuizz = quizzSelecionado.levels;

    alterarTela2(urlImagem, tituloQuizz, questoesQuizz, niveisQuizz);

    visualizarTela2();
    listaPerguntasQuizz = questoesQuizz;
}

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
    let pergunta1Quizz = document.querySelector(".perguntas-quizz");
    pergunta1Quizz.innerHTML += 
    `<h5>Crie suas perguntas</h5>          
    <div>
      <p>Pergunta 1</p>
      <input type="text" class="texto-pergunta0" placeholder="Texto da pergunta" />
      <input type="text" class="cor-fundo-pergunta0" placeholder="Cor de fundo da pergunta" />
    </div>
    <div>
      <p>Resposta correta</p>
      <input type="text" class="texto-correta0" placeholder="Resposta correta" />
      <input type="text" class="img-correta0" placeholder="URL da imagem do seu quizz" />
    </div>
    <div>
      <p>Respostas incorretas</p>
      <div>
          <input type="text" class="resposta-incorreta01" placeholder="Resposta incorreta 1" />
          <input type="text" class="img-incorreta01" placeholder="URL da Imagem 1" />
      </div>
      <div>
          <input type="text" class="resposta-incorreta02" placeholder="Resposta incorreta 2" />
          <input type="text" class="img-incorreta02" placeholder="URL da Imagem 2" />
      </div>
      <div>
          <input type="text" class="resposta-incorreta03" placeholder="Resposta incorreta 3" />
          <input type="text" class="img-incorreta03" placeholder="URL da Imagem 3" />
      </div>
      <div>
      <input type="text" class="resposta-incorreta04" placeholder="Resposta incorreta " />
      <input type="text" class="img-incorreta04" placeholder="URL da Imagem 4" />
      </div>
    </div>`     
    perguntasQuizz = document.querySelector(".perguntas-quizz");
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
    `<button type="button" onclick="aprovarPerguntas(this)">Prosseguir para criar n??veis</button>`             
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
        if (textoPergunta.length < 20 || checarHex === false || textoCorreto === "" || textoIncorreto1 === "" || ValidURL(imgCorreto) === false || ValidURL(imgIncorreto1, imgIncorreto2, imgIncorreto3, imgIncorreto4) === false) {
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
    abrirPagina10();
}

function abrirPagina10 () {
    let layoutPagina10 = document.querySelector(".pagina-10");
    layoutPagina10.innerHTML = "";
    layoutPagina10.innerHTML += 
    `<h5>Agora, decida os n??veis</h5>          
    <div>
      <p>N??vel 1</p>
      <input type="text" class="titulo-nivel0" placeholder="T??tulo do n??vel" />
      <input type="text" class="porcentagem-nivel0" placeholder="% de acerto m??nimo" />
      <input type="text" class="img-nivel0" placeholder="URL da imagem do n??vel" />
      <input type="text" class="descricao-nivel0" placeholder="Descri????o do n??vel" />
    </div>`
    for (let i = 1; i <= qtdNiveisQuizz - 1; i++) {
        layoutPagina10.innerHTML += 
        `<div class="mais-niveis${i}">
            <div class="perguntas-alinhamentos">
                <p>N??vel ${i + 1}</p>       
                <div>
                    <ion-icon name="create-outline" onclick="abrirCaixaNiveis(${i})")></ion-icon>
                </div>        
            </div>
        </div>`
    }
    layoutPagina10.innerHTML += 
    `<button type="button" onclick="aprovarNiveis(this)">Finalizar Quizz</button>`

}

function abrirCaixaNiveis (i) {
    let opcaoNiveis = document.querySelector(`.mais-niveis${i}`);
    opcaoNiveis.innerHTML = "";
    opcaoNiveis.innerHTML +=
    `<div>
        <p>N??vel ${i + 1}</p>
        <input type="text" class="titulo-nivel${i}" placeholder="T??tulo do n??vel" />
        <input type="text" class="porcentagem-nivel${i}" placeholder="% de acerto m??nimo" />
        <input type="text" class="img-nivel${i}" placeholder="URL da imagem do n??vel" />
        <input type="text" class="descricao-nivel${i}" placeholder="Descri????o do n??vel" />
    </div>`

}

function aprovarNiveis () {
    for (let i = 0; i < qtdNiveisQuizz; i++) {
        tituloNivel = document.querySelector(`.titulo-nivel${i}`).value;
        porcentagemNivel = document.querySelector(`.porcentagem-nivel${i}`).value;
        imagemNivel = document.querySelector(`.img-nivel${i}`).value;
        descricaoNivel = document.querySelector(`.descricao-nivel${i}`).value;
        if (tituloNivel.length < 10 || porcentagemNivel > 100 ||  ValidURL(imagemNivel) === false || descricaoNivel.length < 30){
            alert('Preencha os campos corretamente.');
            tituloNivel.innerHTMl = "";
            porcentagemNivel.innerHTMl = "";
            imagemNivel.innerHTMl = "";
            descricaoNivel.innerHTMl = "";
        }
        else {
            carregarPagina11();
        }
    }

}

function ValidURL(imagemNivel) {
    let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(imagemNivel)) {
      return false;
    } else {
      return true;
    }
}

function carregarPagina11 () {
    document.querySelector(".pagina-9").classList.add("escondido");
    document.querySelector(".pagina-10").classList.remove("escondido");
    enviarQuizz();
    
}

function sortearRespostas () {
    respostas = ["texto-correta0", "resposta-incorreta${i}1", "resposta-incorreta${i}2", "resposta-incorreta${i}3", "resposta-incorreta${i}4"];
    const respostasComTexto = respostas.filter(temTexto);
    respostasComTexto.sort(comparador);
}

function temTexto (respostas) {
    if (respostas !== "") {
        return true;
    }
    return false;
}

function comparador () {
    return Math.random() - 0.5;
}

function descerCaixaResultado () {
    setTimeInterval(descerCaixaResultado, 2000).scrollIntoView;
}

function enviarQuizz () {
    quizzEnivar = {
        title: tituloQuizz,
        image: urlImagemQuizz,
        questions: [
            {
                title: document.querySelector(".texto-pergunta0").value,
                color: document.querySelector(".cor-fundo-pergunta0").value,
                answers: [
                    {
                        text: document.querySelector(".texto-correta0").value,
                        image: document.querySelector("img-correta0").value,
                        isCorrectAnswer: true
                    },
                    {
                        text: document.querySelector(".texto-incorreta0").value,
                        image: document.querySelector("img-incorreta0").value,
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: textoPergunta,
                color: corPergunta,
                answers: [
                    {
                        text: textoCorreto,
                        image: imgCorreto,
                        isCorrectAnswer: true
                    },
                    {
                        text: textoIncorreto1,
                        image: imgIncorreto1,
                        isCorrectAnswer: false
                    },
                    {
                        text: textoIncorreto2,
                        image: imgIncorreto2,
                        isCorrectAnswer: false
                    },
                    {
                        text: textoIncorreto3,
                        image: imgIncorreto3,
                        isCorrectAnswer: false
                    },
                    {
                        text: textoIncorreto4,
                        image: imgIncorreto4,
                        isCorrectAnswer: false
                    }
                ]
            },

        ],
        levels: [
            {
                title: document.querySelector(".titulo-nivel0").value,
                image: document.querySelector(".img-nivel0").value,
                text: document.querySelector(".descricao-nivel0").value,
                minValue: 0,
                value: document.querySelector(".porcentagem-nivel0").value,
            },
            {
                title: tituloNivel,
                image: imagemNivel,
                text: descricaoNivel,
                minValue: 0,
                value: porcentagemNivel,
            }
        ]
    }
    const promiseEnvio = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', quizzEnviar)
}

