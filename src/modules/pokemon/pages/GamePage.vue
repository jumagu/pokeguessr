<script setup lang="ts">
import { GameStatus } from '../enums';
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { options, rndPokemon, isLoading, gameStatus, checkAnswer, getNextRound } = usePokemonGame();
</script>

<template>
  <main v-if="isLoading || !rndPokemon" class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-3xl">Please wait</h1>
    <h2 class="animate-pulse">Loading Pokemons</h2>
  </main>

  <main v-else class="flex flex-col justify-center items-center min-h-screen p-6">
    <h1 class="text-4xl text-center">What is this Pokemon?</h1>
    <div class="h-[88px]">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        class="w-40 p-3 my-5 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        @click="getNextRound()"
      >
        Play Again
      </button>
    </div>

    <PokemonPicture :pokemon-id="rndPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />

    <PokemonOptions
      :options="options"
      :correct-answer="rndPokemon.id"
      :block-selection="gameStatus !== GameStatus.Playing"
      @select-option="checkAnswer"
    />
  </main>
</template>
