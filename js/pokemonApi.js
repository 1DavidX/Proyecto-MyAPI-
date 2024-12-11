document.addEventListener("DOMContentLoaded", function() {
    fetchPokemonData();
});

function fetchPokemonData() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=10';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const dataAlbum = document.getElementById('dataAlbumPokemon');
            data.results.forEach(pokemon => {
                const pokemonCard = `
                    <div class="col">
                        <div class="card">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png" class="card-img-top" alt="${pokemon.name}">
                            <div class="card-body">
                                <h5 class="card-title">${pokemon.name}</h5>
                            </div>
                        </div>
                    </div>
                `;
                dataAlbum.innerHTML += pokemonCard;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}