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

// function abrirImagem(imagem) {
//     const srcImagem = imagem.src
//     document.getElementById('imagem-grande').src = srcImagem
//     document.getElementById('lightbox').style.display = 'flex'
   
//     document.body.classList.add('desativado')
// }

// function fecharImagem() {
//     document.getElementById('lightbox').style.display = 'none'

//     document.body.classList.remove('desativado')
// }



let touchStartX = 0;
let touchEndX = 0;

function abrirImagem(imagem) {
    const srcImagem = imagem.src;
    document.getElementById('imagem-grande').src = srcImagem;
    document.getElementById('lightbox').style.display = 'flex';
    document.body.classList.add('desativado');

    // Adiciona ouvintes de eventos de toque
    const imagemGrande = document.getElementById('imagem-grande');
    imagemGrande.addEventListener('touchstart', handleTouchStart, false);
    imagemGrande.addEventListener('touchmove', handleTouchMove, false);
    imagemGrande.addEventListener('touchend', handleTouchEnd, false);
}

function fecharImagem() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.classList.remove('desativado');

    // Remove ouvintes de eventos de toque
    const imagemGrande = document.getElementById('imagem-grande');
    imagemGrande.removeEventListener('touchstart', handleTouchStart, false);
    imagemGrande.removeEventListener('touchmove', handleTouchMove, false);
    imagemGrande.removeEventListener('touchend', handleTouchEnd, false);
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
    const deltaX = touchEndX - touchStartX;
    const swipeThreshold = 50; // Ajuste este valor conforme necessário

    if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
            // Swipe para a direita (imagem anterior)
            navegarImagem(-1);
        } else {
            // Swipe para a esquerda (próxima imagem)
            navegarImagem(1);
        }
    }
}

function navegarImagem(direcao) {
    const imagemGrande = document.getElementById('imagem-grande');
    const galeria = document.querySelectorAll('.galeria img'); // Ajuste o seletor conforme necessário

    const imagensSrc = Array.from(galeria).map(img => img.src);
    const indiceAtual = imagensSrc.indexOf(imagemGrande.src);
    let novoIndice = indiceAtual + direcao;

    if (novoIndice < 0) {
        novoIndice = imagensSrc.length - 1; // Volta para a última imagem
    } else if (novoIndice >= imagensSrc.length) {
        novoIndice = 0; // Volta para a primeira imagem
    }

    imagemGrande.src = imagensSrc[novoIndice];
}