/* ==========================================================
   PRESENTE RAISA
   Script.js
   Parte 1
========================================================== */

const musica = document.getElementById("musica");

const btnComecar = document.getElementById("btnComecar");

const telas = {

intro:document.getElementById("intro"),

cena:document.getElementById("cena"),

foto:document.getElementById("fotoCasal"),

carta:document.getElementById("carta"),

revelacao:document.getElementById("revelacao"),

viagem:document.getElementById("viagem"),

final:document.getElementById("final")

};

const imagem1=document.getElementById("imagem1");
const imagem2=document.getElementById("imagem2");

const tituloCena=document.getElementById("tituloCena");

const textoCena=document.getElementById("textoCena");

const textoCarta=document.getElementById("textoCarta");

const abrirPDF=document.getElementById("abrirPDF");



const cenas=[

{

titulo:"Feche os olhos",

texto:"Imagine um lugar especial...",

imgs:["midia/Mídia.jfif","midia/Mídia (1).jfif"]

},

{

titulo:"Existe um lugar...",

texto:"Um lugar que você ama visitar.",

imgs:["midia/Mídia (2).jfif","midia/Mídia (3).jfif"]

},

{

titulo:"Cheio de histórias",

texto:"Lanternas, cultura e lembranças.",

imgs:["midia/Mídia (4).jfif","midia/Mídia (5).jfif"]

},

{

titulo:"Cheio de vida",

texto:"Cada rua parece guardar um momento especial.",

imgs:["midia/Mídia (6).jfif","midia/Mídia (7).jfif"]

},

{

titulo:"Cheio de magia",

texto:"Um lugar iluminado por sonhos.",

imgs:["midia/Mídia (8).jfif","midia/Mídia (9).jfif"]

},

{

titulo:"E existe alguém...",

texto:"Que consegue deixar qualquer lugar mais bonito.",

imgs:["midia/Mídia (10).jfif","midia/Mídia (11).jfif"]

},

{

titulo:"Você",

texto:"❤️",

imgs:["midia/Mídia (12).jfif","midia/Mídia (13).jfif"]

},

{

titulo:"Amor da minha vida",

texto:"Ainda temos muitas lembranças para criar, estamos só no começo.",

imgs:["midia/Mídia (14).jfif","midia/Mídia (15).jfif"]

},

{

titulo:"Está preparada para mais um presente?",

texto:"Porque fiz uma senvegonhice...",

imgs:["midia/Mídia (16).jfif","midia/Mídia (17).jfif"]

}

];



const carta=`

Meu dengo,

Cada viagem ao teu lado
se transformou em uma lembrança
que guardo com muito carinho.

Você faz qualquer lugar
parecer especial.

Então pensei...

Por que não criarmos
mais uma lembrança juntos?

Prepare sua mala...

Porque nossa próxima aventura
já está marcada.

Feliz aniversário.

Eu te amo ❤️

`;



let indiceCena=0;



function esperar(ms){

return new Promise(resolve=>{

setTimeout(resolve,ms);

});

}



function mostrarTela(nome){

Object.values(telas).forEach(t=>{

t.classList.remove("ativa");

});

telas[nome].classList.add("ativa");

}



async function escrever(elemento,texto,vel=45){

elemento.innerHTML="";

for(let i=0;i<texto.length;i++){

elemento.innerHTML+=texto.charAt(i);

await esperar(vel);

}

}



async function preload(){

const lista=[];

cenas.forEach(c=>{

c.imgs.forEach(i=>{

const img=new Image();

img.src=i;

lista.push(img);

});

});

return lista;

}



btnComecar.addEventListener("click",async()=>{

await preload();

mostrarTela("cena");

musica.play();

iniciarHistoria();

});



abrirPDF.addEventListener("click",()=>{

window.open("reserva/passagem.pdf","_blank");

});

/* ==========================================================
   PARTE 2
   Animações das cenas
========================================================== */

let imagemAtual = imagem1;
let imagemOculta = imagem2;



function fadeImagens() {

    imagemAtual.classList.remove("ativa");
    imagemOculta.classList.add("ativa");

    let aux = imagemAtual;
    imagemAtual = imagemOculta;
    imagemOculta = aux;

}



function trocarImagem(src){

    imagemOculta.src = src;

    imagemOculta.style.animation="none";

    imagemOculta.offsetHeight;

    imagemOculta.style.animation="kenburns 14s linear forwards";

    fadeImagens();

}



async function mostrarCena(cena){

    tituloCena.innerHTML="";

    textoCena.innerHTML="";



    imagemAtual.src=cena.imgs[0];

    imagemAtual.style.animation="kenburns 14s linear forwards";



    await esperar(1200);



    await escrever(

        tituloCena,

        cena.titulo,

        40

    );



    await escrever(

        textoCena,

        cena.texto,

        28

    );



    await esperar(4500);



    trocarImagem(

        cena.imgs[1]

    );



    await esperar(6500);

}



async function iniciarHistoria(){

    for(indiceCena=0;

        indiceCena<cenas.length;

        indiceCena++){

        await mostrarCena(

            cenas[indiceCena]

        );

    }



    mostrarTela("foto");



    await esperar(7000);



    mostrarTela("carta");



    escreverCarta();

}

/* ==========================================================
   PARTE 3
   Carta, revelação e final
========================================================== */

async function escreverCarta(){

    textoCarta.innerHTML="";

    for(let i=0;i<carta.length;i++){

        textoCarta.innerHTML+=carta.charAt(i);

        await esperar(38);

    }

    await esperar(5000);

    revelarDestino();

}



async function revelarDestino(){

    mostrarTela("revelacao");



    await esperar(3000);



    const h3=document.querySelector("#revelacao h3");

    const h2=document.querySelector("#revelacao h2");

    const h1=document.querySelector("#revelacao h1");

    const p=document.querySelector("#revelacao p");



    h3.style.opacity=0;

    h2.style.opacity=0;

    h1.style.opacity=0;

    p.style.opacity=0;



    await fadeTexto(h3);

    await fadeTexto(h2);

    await fadeTexto(h1);

    await fadeTexto(p);



    await esperar(7000);



    mostrarResumo();

}



async function mostrarResumo(){

    mostrarTela("viagem");



    const linhas=document.querySelectorAll(".linha");



    linhas.forEach(l=>{

        l.style.opacity=0;

        l.style.transform="translateY(30px)";

    });



    for(let linha of linhas){

        linha.style.transition="1s";



        await esperar(350);



        linha.style.opacity=1;

        linha.style.transform="translateY(0)";

    }



}



async function fadeTexto(el){

    el.style.transition="1.5s";

    el.style.opacity=1;

    el.style.transform="translateY(0)";



    await esperar(1700);

}



abrirPDF.addEventListener("click",async()=>{

    window.open(

        "reserva/passagem.pdf",

        "_blank"

    );



    await esperar(2500);



    mostrarFinal();

});



function mostrarFinal(){

    mostrarTela("final");



    criarConfetes();



}

/* ==========================================================
   PARTE 4
   Partículas, pétalas e efeitos visuais
========================================================== */

const TOTAL_PETALAS = 45;
let animacaoPetalas = null;



function iniciarPetalas(){

    if(animacaoPetalas) return;

    animacaoPetalas = setInterval(criarPetala,350);

}



function pararPetalas(){

    clearInterval(animacaoPetalas);

    animacaoPetalas = null;

}



function criarPetala(){

    const petala = document.createElement("div");

    petala.className = "petala";

    petala.style.left = Math.random()*100 + "vw";

    petala.style.top = "-30px";

    petala.style.animationDuration = (10+Math.random()*8)+"s";

    petala.style.transform = `scale(${0.5+Math.random()*0.8}) rotate(${Math.random()*360}deg)`;

    petala.style.opacity = .5 + Math.random()*.5;

    document.body.appendChild(petala);

    setTimeout(()=>{

        petala.remove();

    },18000);

}



/* ===============================================
   PARTÍCULAS LUMINOSAS
===============================================*/

function criarParticulas(){

    for(let i=0;i<18;i++){

        const p=document.createElement("div");

        p.className="particula";

        p.style.left=Math.random()*100+"vw";

        p.style.top=Math.random()*100+"vh";

        p.style.animationDuration=(5+Math.random()*8)+"s";

        p.style.animationDelay=(Math.random()*6)+"s";

        p.style.opacity=Math.random();

        document.body.appendChild(p);

    }

}



/* ===============================================
   CONFETES FINAIS
===============================================*/

function criarConfetes(){

    for(let i=0;i<120;i++){

        const c=document.createElement("div");

        c.className="confete";

        c.style.left=Math.random()*100+"vw";

        c.style.animationDelay=(Math.random()*2)+"s";

        c.style.animationDuration=(4+Math.random()*5)+"s";

        c.style.transform=`rotate(${Math.random()*360}deg)`;

        document.body.appendChild(c);

        setTimeout(()=>{

            c.remove();

        },10000);

    }

}



/* ===============================================
   TRANSIÇÕES SUAVES
===============================================*/

function fadeOutTela(el){

    return new Promise(resolve=>{

        el.style.transition="1.2s";

        el.style.opacity=0;

        setTimeout(resolve,1200);

    });

}



function fadeInTela(el){

    return new Promise(resolve=>{

        el.style.opacity=0;

        el.classList.add("ativa");

        requestAnimationFrame(()=>{

            el.style.transition="1.2s";

            el.style.opacity=1;

        });

        setTimeout(resolve,1200);

    });

}



/* ===============================================
   EFEITO DE BRILHO NO BOTÃO
===============================================*/

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.animate([

            {transform:"scale(1)"},

            {transform:"scale(1.05)"},

            {transform:"scale(1)"}

        ],{

            duration:450,

            easing:"ease-out"

        });

    });

});



/* ===============================================
   INICIALIZAÇÃO DOS EFEITOS
===============================================*/

window.addEventListener("load",()=>{

    criarParticulas();

    iniciarPetalas();

});

/* ==========================================================
   PARTE 5
   Finalização do projeto
========================================================== */

/* ==========================================
   BARRA DE PROGRESSO
========================================== */

const progresso = document.createElement("div");
progresso.id = "progresso";

const barra = document.createElement("div");
barra.id = "barraProgresso";

progresso.appendChild(barra);
document.body.appendChild(progresso);



function atualizarBarra(indice){

    const total = cenas.length;

    const porcentagem = ((indice+1)/total)*100;

    barra.style.width = porcentagem + "%";

}



/* ==========================================
   TELA CHEIA
========================================== */

async function entrarTelaCheia(){

    if(!document.fullscreenElement){

        try{

            await document.documentElement.requestFullscreen();

        }catch(e){}

    }

}



/* ==========================================
   LOADER
========================================== */

const loader=document.createElement("div");

loader.id="loader";

loader.innerHTML=`

<div class="loaderBox">

<div class="loaderHeart">❤</div>

<p>Preparando sua surpresa...</p>

</div>

`;

document.body.appendChild(loader);



window.addEventListener("load",()=>{

    setTimeout(()=>{

        loader.classList.add("sumir");

    },1800);

});



/* ==========================================
   BOTÃO COMEÇAR
========================================== */

btnComecar.addEventListener("click",()=>{

    entrarTelaCheia();

});



/* ==========================================
   ATUALIZAÇÃO AUTOMÁTICA DA BARRA
========================================== */

const iniciarHistoriaOriginal = iniciarHistoria;

iniciarHistoria = async function(){

    for(indiceCena=0; indiceCena<cenas.length; indiceCena++){

        atualizarBarra(indiceCena);

        await mostrarCena(cenas[indiceCena]);

    }

    mostrarTela("foto");

    await esperar(7000);

    mostrarTela("carta");

    escreverCarta();

};



/* ==========================================
   FECHAR MÚSICA NO FINAL
========================================== */

const mostrarFinalOriginal = mostrarFinal;

mostrarFinal = function(){

    mostrarFinalOriginal();

    musica.volume = 1;

    let fade = setInterval(()=>{

        musica.volume -= 0.05;

        if(musica.volume<=0){

            musica.pause();

            clearInterval(fade);

        }

    },250);

};



/* ==========================================
   TECLA ESPAÇO
========================================== */

window.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(musica.paused){

            musica.play();

        }else{

            musica.pause();

        }

    }

});



/* ==========================================
   MENSAGEM FINAL
========================================== */

console.log(`

❤️

Feliz aniversário, Raisa.

Este pequeno filme foi feito
com muito carinho.

Kevin

❤️

`);