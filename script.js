let tituloQuizz = "";
let urlImagemQuizz = "";
let qtdPerguntasQuizz;
let qtdNiveisQuizz;


function isValidUrl(){
    const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return matchPattern.test();
}

function paginaCriarQuizz (clique) {    
    document.querySelector(".pagina-1").classList.add("escondido")
    document.querySelector(".pagina-2").classList.add("escondido")
    document.querySelector(".pagina-8").classList.remove("escondido");
}

function criarQuizzPagina8 () {
    tituloQuizz = document.querySelector(".titulo-quizz").value;
    urlImagemQuizz = document.querySelector(".capa-quizz").value;
    qtdPerguntasQuizz = document.querySelector(".qtd-perguntas").value;
    qtdNiveisQuizz = document.querySelector(".qtd-niveis").value;
    while ((tituloQuizz.length < 20 || tituloQuizz.length > 65) || !(isValidUrl(urlImagemQuizz)) || (qtdPerguntasQuizz.value < 3) || (qtdNiveisQuizz.value > 2)) {
        alert ("Preencha os dados corretamente.")
    }
    proximaPagina8();
}

function proximaPagina8 (clique) {
    document.querySelector(".pagina-8").classList.add("escondido");
    document.querySelector(".pagina-9").classList.remove("escondido");
}