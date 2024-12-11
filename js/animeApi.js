document.addEventListener("DOMContentLoaded", function() {
    console.log("Página cargada. Iniciando fetch para Anime...");
    fetchAnimeData();
});

function fetchAnimeData() {
    const url = 'https://api.jikan.moe/v4/anime';
    console.log("URL de la API de Anime:", url);

    fetch(url)
        .then(response => {
            console.log("Respuesta de la API de Anime:", response);
            return response.json();
        })
        .then(data => {
            console.log("Datos de la API de Anime:", data);
            const dataAlbum = document.getElementById('dataAlbumAnime');
            
            if (data.data.length === 0) {
                dataAlbum.innerHTML = '<p>No se encontraron resultados para esta búsqueda.</p>';
            } else {
                data.data.forEach(anime => {
                    const animeCard = `
                        <div class="col">
                            <div class="card">
                                <img src="${anime.images.jpg.large_image_url}" class="card-img-top" alt="${anime.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${anime.title}</h5>
                                    <p class="card-text">${anime.synopsis}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    dataAlbum.innerHTML += animeCard;
                });
            }
        })
        .catch(error => console.error('Error fetching data from Anime API:', error));
}

function getAnime() {
    const searchQuery = document.getElementById('searchAnime').value;
    if (searchQuery) {
        const url = `https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=10`;
        console.log("URL de búsqueda de Anime:", url);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const dataAlbum = document.getElementById('dataAlbumAnime');
                dataAlbum.innerHTML = ''; // Limpiar resultados anteriores
                if (data.data.length === 0) {
                    dataAlbum.innerHTML = '<p>No se encontraron resultados para esta búsqueda.</p>';
                } else {
                    data.data.forEach(anime => {
                        const animeCard = `
                            <div class="col">
                                <div class="card">
                                    <img src="${anime.images.jpg.large_image_url}" class="card-img-top" alt="${anime.title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${anime.title}</h5>
                                        <p class="card-text">${anime.synopsis}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                        dataAlbum.innerHTML += animeCard;
                    });
                }
            })
            .catch(error => console.error('Error buscando anime:', error));
    }
}
