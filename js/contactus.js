
function validacion()
{
    let mensaje = document.getElementById('mensajeEstado');

    let nombre = document.getElementById('nombre').value;
    let email  = document.getElementById('email').value;
    let msg    = document.getElementById('mensaje').value;


    // Verificando que estén completos los campos
    if(nombre.length<1)
    {
        mensaje.textContent = "Completa el campo nombre";
        mensaje.setAttribute('class','error')

    }
    else if(email.length<1)
    {
        mensaje.textContent = "Completa el campo Email";
    }
    else if(msg.length<1)
    {
        mensaje.textContent = "Escribe tu mensaje";
        mensaje.setAttribute('class','error')

    }
    else
    {
        mensaje.textContent = "Mensaje enviado con éxito!";
        mensaje.classList.remove('error');
        mensaje.setAttribute('class','success')

        setTimeout(() => {
            document.getElementById('nombre').value = '';
        document.getElementById('email').value = '';
        document.getElementById('mensaje').value = '';
        },2000)
    }

    // Después de 2 segundos se borra el mensaje
    setTimeout(() => {
        mensaje.textContent = "";
    },2000)
    
}