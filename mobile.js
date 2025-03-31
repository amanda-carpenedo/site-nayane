// menu mobile

const menuDiv = document.getElementById ('menu-mobile')
const btnAnimar = document.getElementById ('btn-menu-mobile')
const body = document.body;

menuDiv.addEventListener('click', animar)

function animar() {
    menuDiv.classList.toggle('abrir')
    btnAnimar.classList.toggle('ativar')

    body.classList.toggle('no-overflow')
}