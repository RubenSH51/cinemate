

window.addEventListener('load', function() {

    cargandoPelis();

    setTimeout(() => {
      let movieCards = document.querySelectorAll('.moviecard');
      console.log(movieCards)
      movieCards.forEach(card => {
      card.addEventListener('click', (e) => {
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
  
  
      });
    });
    },250)  // Upcoming es una consulta que requiere más tiempo

})


function cargandoPelis(){


    const trending  = document.getElementById('trending-movies');
    const upcoming  = document.getElementById('upcoming-movies');
    const toprated  = document.getElementById('toprated-movies');
    // Define la URL base de la API de themoviedb.org y la API key
    
    const apiKey = '8df32093a2bc91dd41568c23ba71135a';
    const baseUrl = 'https://api.themoviedb.org/3';

    // Endpoint para obtener las películas actualmente en cartelera
    const nowPlayingEndpoint = '/movie/now_playing';
    const upcomingEndpoint   = '/movie/upcoming';
    const topRatedEndpoint   = '/movie/top_rated';

    // Construye la URL completa para la consulta
    const url_trending = `${baseUrl}${nowPlayingEndpoint}?api_key=${apiKey}&language=en-US&page=1`;
    const url_upcoming = `${baseUrl}${upcomingEndpoint}?api_key=${apiKey}&language=en-US&page=1`;
    const url_toprated = `${baseUrl}${topRatedEndpoint}?api_key=${apiKey}&language=en-US&page=1`;

    // Realiza la solicitud a la API utilizando fetch
    // fetch(url_trending)
    fetchMovies(url_trending, trending);
    fetchMovies(url_upcoming, upcoming);
    fetchMovies(url_toprated, toprated);


} /* Cierre de la función */

function fetchMovies(endpoint,container)
{
    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      // Procesa los datos de respuesta
        console.log(data);

      // Accede a la lista de resultados de películas
        const movies = data.results;

      // recorrer la lista de películas y por cada una crear la card con el contenido.
        movies.slice(0,4).forEach(movie => {
        let div = document.createElement('div');
        div.setAttribute('class','moviecard')
        div.setAttribute('id',movie.id)

        let img = document.createElement('img');
        img.src = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;

        let h2  = document.createElement('h2');
        h2.textContent = movie.title;

        //let p   = document.createElement('p'); 
        //p.textContent = movie.overview;

        div.appendChild(img);
        div.appendChild(h2);

        div.addEventListener('click', function(){
            modalActivated()
        })

        container.appendChild(div);
        
      }) /* Acá termina el bucle forEach */

    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
}



