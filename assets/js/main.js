const prevPageButton = document.getElementById('prevPageButton');
const nextPageButton = document.getElementById('nextPageButton');
const changeLimitButton = document.getElementById('changeLimitButton');
const limitInput = document.getElementById('limitInput');
const pokemonList = document.getElementById('pokemonList');
let limit = parseInt(limitInput.value); // Initialize limit from the input
let currentPage = 1;

function loadPokemonItems(pageNumber, limit) {
    const offset = (pageNumber - 1) * limit;
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newList = pokemons.map((pokemon) => `
        <a href="card.html?id=${pokemon.number}" id="linkCard">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li> 
        </a>
        `).join('');

        pokemonList.innerHTML = newList;
    });
}

function loadNextPage() {
    currentPage++;
    loadPokemonItems(currentPage, limit);
}

function loadPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadPokemonItems(currentPage, limit);
    }
}

function changeLimit() {
    limit = parseInt(limitInput.value);
    currentPage = 1; // Reset to the first page when changing the limit
    loadPokemonItems(currentPage, limit);
}

// Initial load
loadPokemonItems(currentPage, limit);

nextPageButton.addEventListener('click', loadNextPage);
prevPageButton.addEventListener('click', loadPrevPage);
changeLimitButton.addEventListener('click', changeLimit);
