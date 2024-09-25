import { mount } from '@vue/test-utils';

import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';

describe('Tests in <PokemonPicture />', () => {
  test('Should render the hidden image when showPokemon prop is false', () => {
    const pokemonId = 15;
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

    const wrapper = mount(PokemonPicture, { props: { pokemonId } });

    const img = wrapper.find('img');

    // expect(wrapper.findAll('img').length).toBe(1);
    // expect(img.classes()).toContain('brightness-0');
    // expect(img.attributes('src')).toBe(imgSrc);

    expect(img.attributes()).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
        alt: 'Pokemon Image',
        src: imgSrc,
      }),
    );
  });

  test('Should render the image when showPokemon props is true', () => {
    const pokemonId = 15;
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

    const wrapper = mount(PokemonPicture, { props: { pokemonId, showPokemon: true } });

    const img = wrapper.find('img');

    // expect(wrapper.findAll('img').length).toBe(1);
    // expect(img.classes()).toContain('fade-in');
    // expect(img.classes()).not.contain('brightness-0');
    // expect(img.attributes('src')).toBe(imgSrc);

    expect(img.attributes()).toEqual(
      expect.objectContaining({
        class: 'fade-in h-[200px]',
        alt: 'Pokemon Image',
        src: imgSrc,
      }),
    );
  });
});
