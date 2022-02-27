import lottoManager from '../lottoManager.js';
import { isEnoughFare } from '../validation/index.js';
import { calculateLottoCount, calculateRemainFare } from '../domain/index.js';
import { createRandomNumbers } from '../utils/index.js';
import { LOTTO_RULES } from '../constant/index.js';

describe('요금을 1000원 이상 투입해야 한다.', () => {
  test('500원을 입력하면 false가 반환돼야 한다.', () => {
    const fare = 500;

    expect(isEnoughFare(fare)).toBe(false);
  });

  test('5000원을 입력하면 true가 반환돼야 한다.', () => {
    const fare = 5000;

    expect(isEnoughFare(fare)).toBe(true);
  });
});

describe('로또를 구매하고 남은 금액을 반환할 수 있어야 한다.', () => {
  test('1500원을 입력하면 500원이 반환돼야 한다.', () => {
    const fare = 1500;

    expect(calculateRemainFare(fare)).toBe(500);
  });
});

describe('입력한 요금만큼 로또를 생성할 수 있다.', () => {
  test('5000원을 입력하면 5장을 반환해야 한다.', () => {
    const fare = 5000;

    expect(calculateLottoCount(fare)).toBe(5);
  });

  test('5000원을 입력하면 5장의 로또가 생성돼야 한다.', () => {
    const fare = 5000;

    expect(lottoManager.createLottos(calculateLottoCount(fare)).length).toBe(5);
  });
});

describe(`중복되지 않는 1 ~ 45 사이의 숫자를 6개 생성한다.`, () => {
  test(`1 이상의 숫자만 있어야 한다.`, () => {
    createRandomNumbers(
      LOTTO_RULES.MIN_RANGE,
      LOTTO_RULES.MAX_RANGE,
      LOTTO_RULES.BALL_COUNT,
    ).forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(LOTTO_RULES.MIN_RANGE);
    });
  });

  test(`45 이하의 숫자만 있어야 한다.`, () => {
    createRandomNumbers(
      LOTTO_RULES.MIN_RANGE,
      LOTTO_RULES.MAX_RANGE,
      LOTTO_RULES.BALL_COUNT,
    ).forEach((number) => {
      expect(number).toBeLessThanOrEqual(LOTTO_RULES.MAX_RANGE);
    });
  });

  test('중복된 숫자가 있으면 안된다', () => {
    expect(
      new Set(
        createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT),
      ).size,
    ).toBe(LOTTO_RULES.BALL_COUNT);
  });

  test(`6개의 숫자가 반환돼야 한다.`, () => {
    expect(
      createRandomNumbers(LOTTO_RULES.MIN_RANGE, LOTTO_RULES.MAX_RANGE, LOTTO_RULES.BALL_COUNT)
        .length,
    ).toBe(LOTTO_RULES.BALL_COUNT);
  });
});