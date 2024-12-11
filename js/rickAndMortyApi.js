document.addEventListener("DOMContentLoaded", function() {
    console.log("Página cargada. Iniciando fetch para Rick and Morty...");
    fetchRickAndMortyData();
});

function fetchRickAndMortyData() {
    const url = 'https://rickandmortyapi.com/api/character/';
    console.log("URL de la API de Rick and Morty:", url);

    fetch(url)
        .then(response => {
            console.log("Respuesta de la API de Rick and Morty:", response);
            return response.json();
        })
        .then(data => {
            console.log("Datos de la API de Rick and Morty:", data);

            const dataAlbum = document.getElementById('dataAlbumRickAndMorty');
            if (!dataAlbum) {
                console.error('No se pudo encontrar el contenedor de los personajes de Rick and Morty.');
                return;
            }

            // Si no hay resultados, mostrar un mensaje
            if (data.results && data.results.length === 0) {
                dataAlbum.innerHTML = '<p>No se encontraron resultados para esta búsqueda.</p>';
                return;
            }

            // Mostrar los personajes de Rick and Morty
            data.results.forEach(character => {
                const characterCard = `
                    <div class="col">
                        <div class="card">
                            <img src="${character.image}" class="card-img-top" alt="${character.name}">
                            <div class="card-body">
                                <h5 class="card-title">${character.name}</h5>
                                <p class="card-text">${character.species}</p>
                            </div>
                        </div>
                    </div>
                `;
                dataAlbum.innerHTML += characterCard;
            });
        })
        .catch(error => {
            console.error('Error fetching data from Rick and Morty API:', error);
        });
}
