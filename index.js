let index = 0
const slides = document.querySelectorAll(".slides img")

function mudarSlide() {
    slides[index].classList.remove('ativo')
    index = (index + 1) % slides.length
    slides[index].classList.add('ativo')
}
setInterval(mudarSlide, 4000)


// timeline

document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");

    function checkTimeline() {
        const triggerBottom = window.innerHeight * 0.8;

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;

            if (itemTop < triggerBottom && itemBottom > 50) {
                item.classList.add("aparecer");
            } else {
                item.classList.remove("aparecer");
            }
        });
    }
    window.addEventListener("scroll", checkTimeline);
    checkTimeline();
});


// slides avaliações

let slideIndex = 1
mostrarSlides(slideIndex)

function adicionarSlide(n) {
    mostrarSlides(slideIndex += n)

}

function atualSlide(n) {
    mostrarSlides(slideIndex = n)
}

function mostrarSlides(n) {
    let i
    let slides = document.getElementsByClassName("meusSlides")
    if (n > slides.length - 1) {
        slideIndex = slides.length
        let botaoDireito = document.getElementsByClassName("botao-direito")[0]
        botaoDireito.style.color = ' rgba(104, 103, 103, 0.45)'
        botaoDireito.style.pointerEvents = 'none'
    } else {
        let botaoDireito = document.getElementsByClassName('botao-direito')[0]
        botaoDireito.style.color = ' rgb(0, 0, 0)'
        botaoDireito.style.pointerEvents = 'auto'
    }

    if (n < 1) {
        slideIndex = 1
    }

    if (n === 1) {
        let botaoEsquerdo = document.getElementsByClassName('botao-esquerdo')[0]
        botaoEsquerdo.style.color = ' rgba(104, 103, 103, 0.45)'
        botaoEsquerdo.style.pointerEvents = 'none'
    } else {
        let botaoEsquerdo = document.getElementsByClassName('botao-esquerdo')[0]
        botaoEsquerdo.style.color = ' rgb(0, 0, 0)'
        botaoEsquerdo.style.pointerEvents = 'auto'

    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }
    slides[slideIndex - 1].style.display = "block"

}



// GALERIA

let imagens = Array.from(document.querySelectorAll('.galeria img'));
let indiceAtual = 0;
let startX = 0;
let moveX = 0;

// Abrir imagem no lightbox e definir índice atual
function abrirImagem(imagem) {
    const srcImagem = imagem.src;
    document.getElementById('imagem-grande').src = srcImagem;
    document.getElementById('lightbox').style.display = 'flex';
    document.body.classList.add('desativado');

    // Atualiza o índice da imagem atual
    indiceAtual = imagens.indexOf(imagem);
}

// Fechar lightbox
function fecharImagem() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.classList.remove('desativado');
}

// Mudar imagem no lightbox
function mudarImagem(direcao) {
    indiceAtual += direcao;

    // Garantir que o índice fique dentro do intervalo válido
    if (indiceAtual < 0) {
        indiceAtual = imagens.length - 1; // Volta para a última imagem
    } else if (indiceAtual >= imagens.length) {
        indiceAtual = 0; // Volta para a primeira imagem
    }

    // Atualiza a imagem no lightbox
    document.getElementById('imagem-grande').src = imagens[indiceAtual].src;
}

// Detectar swipe para mudar de imagem no iOS e Android
const imagemGrande = document.getElementById('imagem-grande');

imagemGrande.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
}, { passive: false });

imagemGrande.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Impede que o navegador capture o gesto como um scroll
    moveX = e.touches[0].clientX;
}, { passive: false });

imagemGrande.addEventListener('touchend', (e) => {
    let diferenca = startX - moveX;

    if (diferenca > 50) {
        mudarImagem(1); // Próxima imagem
    } else if (diferenca < -50) {
        mudarImagem(-1); // Imagem anterior
    }
});
