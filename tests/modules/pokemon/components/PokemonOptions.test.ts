import { mount } from '@vue/test-utils';

import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';

const OPTIONS = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
];

describe('Tests in <PokemonOptions />', () => {
  test('Should render options with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: { options: OPTIONS, correctAnswer: 1, blockSelection: false },
    });

    const options = wrapper.findAll('button');

    expect(options.length).toBe(OPTIONS.length);

    options.forEach((opt, index) => {
      expect(opt.classes()).toEqual([
        'w-40',
        'p-3',
        'm-2',
        'shadow-md',
        'rounded-lg',
        'capitalize',
        'transition-colors',
        'disabled:shadow-none',
        'default',
      ]);
      expect(opt.text()).toBe(OPTIONS[index].name);
    });
  });

  test('Should emit selectOption event when an option is selected', async () => {
    const wrapper = mount(PokemonOptions, {
      props: { options: OPTIONS, correctAnswer: 1, blockSelection: false },
    });

    const [opt1] = wrapper.findAll('button');

    await opt1.trigger('click');

    expect(wrapper.emitted().selectOption).toBeTruthy();
    expect(wrapper.emitted().selectOption[0]).toEqual([1]);
  });

  test('Options should be disabled when blockSelection prop is true', async () => {
    const wrapper = mount(PokemonOptions, {
      props: { options: OPTIONS, correctAnswer: 1, blockSelection: true },
    });

    const options = wrapper.findAll('button');

    options.forEach((opt) => {
      const attributes = Object.keys(opt.attributes());
      expect(attributes).toContain('disabled');
    });
  });

  test('Should apply correct styling to buttons based on correctAnswer prop', () => {
    const correctAnswer = 2;

    const wrapper = mount(PokemonOptions, {
      props: { options: OPTIONS, correctAnswer, blockSelection: true },
    });

    const options = wrapper.findAll('button');

    options.forEach((opt, index) => {
      expect(opt.classes()).not.toContain('default');

      if (OPTIONS[index].id === correctAnswer) {
        expect(opt.classes()).toContain('correct');
      } else {
        expect(opt.classes()).toContain('incorrect');
      }
    });
  });
});
