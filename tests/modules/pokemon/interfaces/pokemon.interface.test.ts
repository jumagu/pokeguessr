import type { Pokemon } from '@/modules/pokemon/interfaces';

describe('Tests in Pokemon Interface', () => {
  const pokemon: Pokemon = { id: 1, name: 'Pikachu' };

  test('Should have an id property of type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number));
  });

  test('Should have a name property of type string', () => {
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
