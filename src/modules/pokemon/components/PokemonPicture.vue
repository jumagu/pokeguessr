<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
}

// const props = withDefaults(defineProps<Props>(), { showPokemon: false });
const { pokemonId, showPokemon = false } = defineProps<Props>();

const pokemonImage = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`,
);
</script>

<template>
  <section>
    <img v-if="showPokemon" class="h-[200px]" :src="pokemonImage" alt="Pokemon Image" />
    <img v-else class="fade-in brightness-0 h-[200px]" :src="pokemonImage" alt="Pokemon Image" />
  </section>
</template>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
