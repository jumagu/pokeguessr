import { flushPromises } from '@vue/test-utils';

import confetti from 'canvas-confetti';
import MockAdapter from 'axios-mock-adapter';

import { GameStatus } from '@/modules/pokemon/enums';
import { withSetup } from '../../../utils/with-setup';
import pokemonApi from '@/modules/pokemon/apis/pokemon.api';
import { FAKE_POKEMONS } from '../../../data/fake-pokemons.data';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';

const pokemonApiMock = new MockAdapter(pokemonApi);
pokemonApiMock.onGet('/?limit=150').reply(200, {
  results: FAKE_POKEMONS,
});

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Tests in usePokemonGame composable', () => {
  test('Should be initialized with the correct default value', async () => {
    // ! Composables that uses life cycle hooks can't be used without a setup() execution
    // const { options, gameStatus, rndPokemon, isLoading } =usePokemonGame();

    const [result] = withSetup(usePokemonGame);

    const { options, gameStatus, rndPokemon, isLoading } = result;

    expect(options.value).toEqual([]);
    expect(isLoading.value).toBe(true);
    expect(rndPokemon.value).toBe(undefined);
    expect(gameStatus.value).toBe(GameStatus.Playing);

    // ? Bad practice
    // await new Promise((r) => setTimeout(r, 1000));
    await flushPromises();

    expect(isLoading.value).toBe(false);
    expect(options.value.length).toBe(4);
    expect(rndPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('Should call getNextRound correctly', async () => {
    const [result] = withSetup(usePokemonGame);

    await flushPromises();

    const { options, gameStatus, getNextRound } = result;

    gameStatus.value = GameStatus.Won;
    getNextRound(6);

    // expect(getNextRound).toHaveBeenCalled();
    expect(options.value).toHaveLength(6);
    expect(gameStatus.value).toBe(GameStatus.Playing);
  });

  test('Options should change when getNextRound is called', async () => {
    const [result] = withSetup(usePokemonGame);

    await flushPromises();

    const { options, getNextRound } = result;

    const firstOptionsNames = options.value.map((opt: any) => opt.name);

    getNextRound();

    const newOptions = result.options.value;

    expect(options).not.toEqual(newOptions);
    newOptions.forEach((opt: any) => {
      expect(firstOptionsNames).not.toContain(opt.name);
    });
  });

  test('checkAnswer funciton should handle an incorrect answer correctly', async () => {
    const [result] = withSetup(usePokemonGame);

    await flushPromises();

    const { checkAnswer, gameStatus } = result;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(1000000);

    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('checkAnswer funciton should handle a correct answer correctly', async () => {
    const [result] = withSetup(usePokemonGame);

    await flushPromises();

    const { checkAnswer, gameStatus, rndPokemon } = result;

    const correctAnswer = rndPokemon.value.id;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(correctAnswer);

    expect(confetti).toHaveBeenCalled();
    expect(confetti).toHaveBeenCalledWith({
      spread: 150,
      particleCount: 300,
    });
    expect(gameStatus.value).toBe(GameStatus.Won);
  });
});
