document.addEventListener('DOMContentLoaded', () => {
    const imagensGaleria = document.querySelectorAll('.galeria img');
    const lightbox = document.getElementById('lightbox');
    const swiperContainer = lightbox.querySelector('.swiper');
    const swiperWrapper = lightbox.querySelector('.swiper-wrapper');
    let swiperInstance;

    function abrirImagem(imagemClicada) {
        const indexImagemClicada = Array.from(imagensGaleria).indexOf(imagemClicada);
        const slidesHTML = Array.from(imagensGaleria)
            .map(img => `<div class="swiper-slide"><img src="${img.src}" alt="${img.alt}"></div>`)
            .join('');

        swiperWrapper.innerHTML = slidesHTML;
        lightbox.style.display = 'flex';
        document.body.classList.add('desativado');

        // Inicializa o Swiper somente quando o lightbox é aberto
        swiperInstance = new Swiper(swiperContainer, {
            loop: false,
            grabCursor:true,
            initialSlide: indexImagemClicada,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    function fecharImagem() {
        lightbox.style.display = 'none';
        document.body.classList.remove('desativado');

        // Destroi a instância do Swiper ao fechar o lightbox
        if (swiperInstance) {
            swiperInstance.destroy();
            swiperInstance = null;
        }
        swiperWrapper.innerHTML = ''; // Limpa os slides
    }

    // Exponha as funções globalmente (necessário devido ao onclick no HTML)
    window.abrirImagem = abrirImagem;
    window.fecharImagem = fecharImagem;
});