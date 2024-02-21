/* eslint-disable max-lines-per-function */
import purchaseAmountValidator from "../../src/validator/PurchaseAmountValidator.js";

describe("Purchase validate 테스트", () => {
  test("구입 금액은 숫자로 입력해야한다.", () => {
    const NO_NUMBER_PURCHASE_AMOUNT = "1000원";

    expect(() =>
      purchaseAmountValidator.validate(NO_NUMBER_PURCHASE_AMOUNT),
    ).toThrow("[ERROR] 구입 금액은 숫자로 입력해주세요.");
  });

  test("구입 금액은 천원 이상이어야 한다.", () => {
    const LESS_THAN_MIN_PURCHASE_AMOUNT = "999";

    expect(() =>
      purchaseAmountValidator.validate(LESS_THAN_MIN_PURCHASE_AMOUNT),
    ).toThrow("[ERROR] 구입 금액은 1,000원 이상의 값을 입력해주세요");
  });

  test("구입 금액은 천원 단위여야한다.", () => {
    const CANT_DIVIDED_PURCHASE_AMOUNT = "2100";

    expect(() =>
      purchaseAmountValidator.validate(CANT_DIVIDED_PURCHASE_AMOUNT),
    ).toThrow("[ERROR] 구입 금액은 1,000원 단위로 입력해주세요.");
  });
});