let page = 1;
const moviesContainer = document.getElementById('movies-container');
const h3page = document.getElementById('page');

function buscarPelis(){    

    // Mensaje de página
    h3page.textContent = `Page ${page}`;

    // Define la URL base de la API de themoviedb.org y la API key
    const apiKey = '8df32093a2bc91dd41568c23ba71135a';
    const baseUrl = 'https://api.themoviedb.org/3';

    // Endpoint para obtener las películas actualmente en cartelera
    const nowPlayingEndpoint = '/movie/now_playing';

    // Construye la URL completa para la consulta
    const url = `${baseUrl}${nowPlayingEndpoint}?api_key=${apiKey}&language=en-US&page=${page}`;

    // Realiza la solicitud a la API utilizando fetch
    fetch(url)
      .then(response => response.json())
      .then(data => {
          // Procesa los datos de respuesta
          console.log(data);

          // Accede a la lista de resultados de películas
          const movies = data.results;

          // recorrer la lista de películas y por cada una crear la card con el contenido.
          movies.forEach(movie => {
            let div = document.createElement('div');
            div.setAttribute('class','moviecard')
            
            /* >>>>>>>>>>>>>>>> EXPERIMENTO */
            div.setAttribute('id',movie.id)

            /* >>>>>>>>>>>>>>>>>>>>>>>>>>>> */


            let img = document.createElement('img');
            img.src = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;

            let h2  = document.createElement('h2');
            h2.textContent = movie.title;

            let p   = document.createElement('p'); 
            p.textContent = movie.overview;

            div.appendChild(img);
            div.appendChild(h2);
            div.appendChild(p);

            div.addEventListener('click', function(){
              modalActivated()
            })

            moviesContainer.appendChild(div);
            
          }) /* Acá termina el bucle forEach */

        })
        .catch(error => {
          console.error('Error al obtener datos:', error);
        });

} /* Cierre de la función */

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  */

/* Al cargar la página ejecuta la función buscarPelis */
window.addEventListener('load', function() {
  
  buscarPelis()
  setTimeout(() => {
    pelisEnModal();
  },300)

});



function pelisEnModal()
{
  setTimeout(() => {
    let movieCards = document.querySelectorAll('.moviecard')

    movieCards.forEach(card => {
    card.addEventListener('click', () => {
      const peliculaId = card.id;

      // >>>>>> Rellenando modal
      let API_KEY = '8df32093a2bc91dd41568c23ba71135a';
      let url = `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${API_KEY}&language=es-ES`;

      fetch(url)
        .then(response => response.json())
        .then(data=> {
          let imagen = document.getElementById('imagen-movie');
          let titulo = document.getElementById("nombre-movie");
          let genero = document.getElementById("genero-movie");
          let duracion = document.getElementById('duracion-movie');
          let sinopsis = document.getElementById("sinopsis-movie");
          let calificacion = document.getElementById("calificacion-movie");
          let fecha = document.getElementById("date-movie");

          imagen.src = "https://image.tmdb.org/t/p/w500/" + data.poster_path;
          
          titulo.textContent = data.original_title;

          sinopsis.innerHTML = "<b>Sinopsis:</b> " + data.overview.slice(0,400) + " [...]";
          calificacion.innerHTML = Number(data.vote_average).toFixed(1);
          fecha.innerHTML = "<b>Fecha de lanzamiento:</b> " + data.release_date;
          duracion.innerHTML = "<b>Duración:</b> "+ data.runtime + " minutos";
          genero.innerHTML = "<b>Géneros:</b> ";

          data.genres.forEach(g => {
            genero.innerHTML += g.name + ", ";
          })

        })


    }); // listener
  }); // foreach
  },20)  // setTimeout
}




// function obtenerNombreGenero(id) {
//   const generos = {
//       28: "Acción",
//       12: "Aventura",
//       16: "Animación",
//       35: "Comedia",
//       80: "Crimen",
//       99: "Documental",
//       18: "Drama",
//       10751: "Familia",
//       14: "Fantasía",
//       36: "Historia",
//       27: "Terror",
//       10402: "Música",
//       9648: "Misterio",
//       10749: "Romance",
//       878: "Ciencia ficción",
//       10770: "Película de TV",
//       53: "Suspense",
//       10752: "Guerra",
//       37: "Oeste"
//   };

//   // Comprobamos si el ID de género está en la lista, si no, devolvemos "Desconocido"
//   return generos[id] || "Desconocido";
// }
