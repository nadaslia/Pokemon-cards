// path to png image of pokemon sprites/other/official-artwork/front_default
// path to pokemon type types/type/name
const pokemonBaseEndpoint = "https://pokeapi.co/api/v2/pokemon?limit=200";
const pokemonUiContainer = document.getElementById("pokemon-container");

async function getPokemons() {
  const basePokemonsResponse = await fetch(pokemonBaseEndpoint);
  const basePokemons = await basePokemonsResponse.json();
  //get the inner urls based in the pokemonBaseEndpoint Object
  const pokemonPromises = [];
  basePokemons.results.forEach((pokemon) =>
    pokemonPromises.push(fetch(pokemon.url))
  );
  const pokemonResponses = await Promise.all(pokemonPromises);
  const pokemons = await Promise.all(pokemonResponses.map((res) => res.json()));
  console.log(pokemons);
  return pokemons;
}

getPokemons().then((pokemons) => {
  let htmlString = ``;

  pokemons.forEach((pokemon) => {
    htmlString += `
    <div
      class="flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg"
    >
      <div class="relative pt-10 px-10 flex items-center justify-center">
        <div
          class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
          style="
            background: radial-gradient(black, transparent 60%);
            transform: rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1);
            opacity: 0.2;
          "
        ></div>
        <img
          class="relative w-40"
          src="${pokemon.sprites.other["official-artwork"].front_default}"
          alt=""
        />
      </div>
      <div class="relative px-6 pb-6 mt-6">
        <span class="block opacity-75 -mb-1">${pokemon.types
          .map((obj) => obj.type.name)
          .join("/")}</span>
        <div class="flex justify-between">
        <span class="block font-semibold text-xl">${pokemon.name}</span>
        </div>
      </div>
    </div>
    `;
  });

  pokemonUiContainer.innerHTML = htmlString;
});
