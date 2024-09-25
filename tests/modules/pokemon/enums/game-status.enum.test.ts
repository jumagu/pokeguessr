import { GameStatus } from '@/modules/pokemon/enums';

describe('Tests in GameStatus Enum', () => {
  test('Should have a value of "playing"', () => {
    expect(GameStatus.Playing).toBe('playing');
  });

  test('Should have a value of "won"', () => {
    expect(GameStatus.Won).toBe('won');
  });

  test('Should have a value of "lost"', () => {
    expect(GameStatus.Lost).toBe('lost');
  });
});
