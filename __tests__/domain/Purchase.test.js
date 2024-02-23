/* eslint-disable max-lines-per-function */
import ERROR_MESSAGE from "../../src/constants/error.js";
import { MIN_PURCHASE_AMOUNT } from "../../src/constants/option.js";
import purchaseAmountValidator from "../../src/validator/PurchaseAmountValidator.js";

describe("Purchase validate 테스트", () => {
  test("구입 금액은 숫자로 입력해야한다.", () => {
    const NO_NUMBER_PURCHASE_AMOUNT = "1000원";

    expect(() => purchaseAmountValidator(NO_NUMBER_PURCHASE_AMOUNT)).toThrow(
      ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_TYPE,
    );
  });

  test(`구입 금액은 ${MIN_PURCHASE_AMOUNT}원 이상이어야 한다.`, () => {
    const LESS_THAN_MIN_PURCHASE_AMOUNT = "999";

    expect(() =>
      purchaseAmountValidator(LESS_THAN_MIN_PURCHASE_AMOUNT),
    ).toThrow(ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_RANGE);
  });

  test(`구입 금액은 ${MIN_PURCHASE_AMOUNT}원 단위여야한다.`, () => {
    const CANT_DIVIDED_PURCHASE_AMOUNT = "2100";

    expect(() => purchaseAmountValidator(CANT_DIVIDED_PURCHASE_AMOUNT)).toThrow(
      ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_DIVIDED,
    );
  });
});
