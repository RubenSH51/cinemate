// Referencias a elementos del DOM
const mobileMenuBTN = document.querySelector(".hamburger-btn");
const mobileNav = document.querySelector(".mobile-nav");

// Evento clic en el botón de hamburguesa
mobileMenuBTN.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
});


// Funciones del modal
function modalActivated()
{
    document.getElementById('overlay').style = 'display:block';
    setTimeout(function(){
        document.getElementById('modal').classList.add('activado');
    }, 20);
}

function modalDeactivated()
{
    document.getElementById('overlay').style = 'display:none';
    document.getElementById('modal').classList.remove('activado');
}


/* >>>>>>> Paginación */

function nextPage()
{
    page++;
    moviesContainer.innerHTML = '';
    buscarPelis();
    setTimeout(() => {
        pelisEnModal();
    },500)
}

function previousPage()
{
    if (page>1)
    {
        page--;
        moviesContainer.innerHTML = '';
        buscarPelis();
        setTimeout(() => {
        pelisEnModal();
        },500)
    }
    else
    {
        return 
    }
}