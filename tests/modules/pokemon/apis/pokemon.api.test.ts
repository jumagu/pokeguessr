import pokemonApi from '@/modules/pokemon/apis/pokemon.api';

describe('Tests in pokemon API', () => {
  test('Should be configured as expected', () => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    expect(pokemonApi.defaults.baseURL).toBe(baseUrl);
  });
});
