<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { rndPokemon, isLoading, gameStatus } = usePokemonGame();
</script>

<template>
  <section v-if="isLoading" class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-3xl">Please wait</h1>
    <h2 class="animate-pulse">Loading Pokemons</h2>
  </section>

  <section v-else class="flex flex-col justify-center items-center h-screen">
    <h1 class="mb-5">¿What is this Pokemon?</h1>
    <h3 class="my-2">{{ rndPokemon }}</h3>

    <PokemonPicture />

    <PokemonOptions />
  </section>
</template>
