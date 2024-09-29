import type { Mock } from 'vitest';
import { mount } from '@vue/test-utils';

import { GameStatus } from '@/modules/pokemon/enums';
import GamePage from '@/modules/pokemon/pages/GamePage.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';

const POKEMON_OPTIONS = [
  { id: 1, name: 'bulbasaur' },
  { id: 2, name: 'ivysaur' },
  { id: 3, name: 'venusaur' },
  { id: 4, name: 'charmander' },
];

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

describe('Tests in <GamePage />', () => {
  test('Should be initialized with default values', async () => {
    (usePokemonGame as Mock).mockReturnValue({
      options: [],
      isLoading: true,
      gameStatus: GameStatus.Playing,
      rndPokemon: undefined,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(GamePage);

    expect(wrapper.get('h1').text()).toBe('Please wait');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);

    expect(wrapper.get('h2').text()).toBe('Loading Pokemons');
    expect(wrapper.get('h2').classes()).toEqual(['animate-pulse']);
  });

  test('Should render <PokemonPicture /> and <PokemonOptions /> correctly', async () => {
    const imgUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';

    (usePokemonGame as Mock).mockReturnValue({
      options: POKEMON_OPTIONS,
      isLoading: false,
      gameStatus: GameStatus.Playing,
      rndPokemon: POKEMON_OPTIONS[0],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(GamePage);

    const options = wrapper.findAll(
      '.w-40.p-3.m-2.shadow-md.rounded-lg.capitalize.transition-colors.disabled\\:shadow-none.default',
    );

    expect(wrapper.find('img').attributes('src')).toBe(imgUrl);
    expect(options).toHaveLength(4);

    options.forEach((opt, index) => {
      expect(POKEMON_OPTIONS[index].name).toBe(opt.text());
    });
  });

  test('Should render button for a new game', () => {
    (usePokemonGame as Mock).mockReturnValue({
      options: POKEMON_OPTIONS,
      isLoading: false,
      gameStatus: GameStatus.Won,
      rndPokemon: POKEMON_OPTIONS[0],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(GamePage);

    const playAgainBtn = wrapper.find('[data-test-id="new-game-btn"]');

    expect(playAgainBtn.text()).toBe('Play Again');
  });

  test('Should call getNextRound funciton when "Play Again" button is clicked', async () => {
    const getNextRoundSpy = vi.fn();

    (usePokemonGame as Mock).mockReturnValue({
      options: POKEMON_OPTIONS,
      isLoading: false,
      gameStatus: GameStatus.Won,
      rndPokemon: POKEMON_OPTIONS[0],
      checkAnswer: vi.fn(),
      getNextRound: getNextRoundSpy,
    });

    const wrapper = mount(GamePage);

    const playAgainBtn = wrapper.find('[data-test-id="new-game-btn"]');
    await playAgainBtn.trigger('click');

    expect(getNextRoundSpy).toHaveBeenCalled();
    expect(getNextRoundSpy).toHaveBeenCalledWith();
  });
});
