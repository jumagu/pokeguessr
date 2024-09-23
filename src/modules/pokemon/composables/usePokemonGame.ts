import { computed, onMounted, ref } from 'vue';

import { GameStatus } from '../enums';
import pokemonApi from '../apis/pokemon.api';
import type { Pokemon, PokemonListResponse } from '../interfaces';

export const usePokemonGame = () => {
  const options = ref<Pokemon[]>([]);
  const pokemons = ref<Pokemon[]>([]);
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const isLoading = computed<boolean>(() => gameStatus.value.length === 0);
  const rndPokemon = computed<Pokemon>(() => {
    const index = Math.floor(Math.random() * options.value.length);
    return options.value[index];
  });

  const fetchPokemons = async (): Promise<Pokemon[]> => {
    const res = await pokemonApi.get<PokemonListResponse>('/?limit=150');

    const pokemons: Pokemon[] = res.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = Number(urlParts.at(-2) ?? 0);

      return {
        id,
        name: pokemon.name,
      };
    });

    return pokemons.sort(() => Math.random() - 0.5);
  };

  const getNextOptions = (quantity: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    options.value = pokemons.value.slice(0, quantity);
    pokemons.value = pokemons.value.slice(quantity);
  };

  onMounted(async () => {
    pokemons.value = await fetchPokemons();
    getNextOptions();
    console.log(options.value);
  });

  return {
    // Properties
    options,
    isLoading,
    gameStatus,
    rndPokemon,

    // Functions
    getNextOptions,
  };
};
