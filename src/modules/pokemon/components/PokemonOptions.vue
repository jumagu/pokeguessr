<script setup lang="ts">
import { ref } from 'vue';

import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
  correctAnswer: number;
  blockSelection: boolean;
}

defineProps<Props>();
const emit = defineEmits<{ selectOption: [id: number] }>();

const selectedOption = ref<number | null>(null);

const clickHandler = (pokemonId: number) => {
  selectedOption.value = pokemonId;
  emit('selectOption', pokemonId);
};
</script>

<template>
  <section class="mt-5">
    <ul>
      <li v-for="{ id, name } in options" :key="id" role="none">
        <button
          :class="[
            'w-40 p-3 m-2 shadow-md rounded-lg capitalize transition-colors disabled:shadow-none',
            {
              default: !blockSelection,
              correct: blockSelection && correctAnswer === id,
              incorrect: blockSelection && correctAnswer !== id,
              selected: selectedOption === id,
            },
          ]"
          @click="clickHandler(id)"
          :disabled="blockSelection"
        >
          {{ name }}
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.default {
  @apply bg-white hover:bg-gray-100;
}

.correct {
  @apply bg-green-500 text-white;
}

.correct.selected {
  @apply ring-[3px] ring-green-500 ring-offset-2;
}

.incorrect {
  @apply bg-red-500 text-white;
}

.incorrect.selected {
  @apply ring-[3px] ring-red-500 ring-offset-2;
}
</style>
