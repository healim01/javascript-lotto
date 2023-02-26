const LottoGame = require("../domain/LottoGame");
const validation = require("../domain/Validation");
const View = require("../view/View");
const { $, $$ } = require("../util/Dom");
const { selectorId } = require("../constant/Constant");

class LottoController {
  #lottoGame;
  #view;

  constructor() {
    this.#view = new View(this);
  }

  playLotto() {
    this.#view.hiddenWinLottoElements();
    this.#lottoGame = new LottoGame();

    this.#view.onMoneySubmit(this.submitMoneyForm);
    this.#view.onWinLottoSubmit(this.submitWinLottoForm);
    this.restart();
    this.exitModal();
  }

  submitMoneyForm(money) {
    if (!this.validateMoney(money)) return;

    this.#lottoGame.purchaseLottos(money);
    const lottos = this.#lottoGame.lottos;

    this.#view.showWinLottoElements();
    this.#view.showLottoTickets(lottos);
  }

  submitWinLottoForm(inputNums, inputBonus) {
    if (!this.validateWinNumbers(inputNums)) return;
    if (!this.validateWinBonusNumber(inputNums, inputBonus)) return;

    const numbers = inputNums.map((num) => parseInt(num, 10));
    const bonusNumber = parseInt(inputBonus);

    const winLotto = this.#lottoGame.makeWinLotto(numbers, bonusNumber);
    const rankResult = this.#lottoGame.calculateRankResult(this.#lottoGame.lottos, winLotto);
    const revenue = this.#lottoGame.calculateRevenueRate(rankResult, this.#lottoGame.lottos.length);

    this.#view.showGameResult(rankResult, revenue);
  }

  validateMoney(money) {
    try {
      validation.validateMoney(money);
      return true;
    } catch (e) {
      alert(e.message);
      $(`${selectorId.INPUT_MONEY_FORM} input`).value = null;
      this.#view.hiddenWinLottoElements();
      return false;
    }
  }

  validateWinNumbers(numbers) {
    try {
      validation.validateWinNumber(numbers);
      return true;
    } catch (e) {
      alert(e.message);
      $$(`${selectorId.WINNUMBERS_ELEMENT} input`).forEach((element) => {
        element.value = null;
      });
      return false;
    }
  }

  validateWinBonusNumber(numbers, bonusNumber) {
    try {
      validation.validateBonusNumber(numbers, bonusNumber);
      return true;
    } catch (e) {
      alert(e.message);
      $(`${selectorId.BONUS_ELEMENT} input`).value = null;
      return false;
    }
  }
}

module.exports = LottoController;