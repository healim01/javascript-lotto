import {
  MIN_PURCHASE_AMOUNT,
  PERCENTATION,
  WINNING_RANK,
} from "../constants/option.js";
import { PRIZE } from "../constants/system.js";

class LottoResult {
  #lottoList;
  #winningLotto;

  constructor(lottoList, WinningLotto) {
    this.#lottoList = lottoList;
    this.#winningLotto = WinningLotto;
  }

  getResult() {
    const rank = this.#getTotalResult();
    const profit = this.#getProfit(
      this.#lottoList.length * MIN_PURCHASE_AMOUNT,
    );

    return { rank, profit };
  }

  #getTotalResult() {
    const results = this.#getRankResult();
    return results.reduce(
      (acc, cur) => {
        acc[cur] += 1;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    );
  }

  #getRankResult() {
    const ranks = this.#lottoList
      .map((lotto) => lotto.getRank(this.#winningLotto))
      .filter((rank) => rank !== WINNING_RANK.NONE);

    return ranks;
  }

  #getProfit(purchaseAmount) {
    const totalReward = this.#getTotalReward();
    return (totalReward / purchaseAmount) * PERCENTATION;
  }

  #getTotalReward() {
    const totalResult = this.#getTotalResult();
    return Object.keys(totalResult).reduce((acc, cur) => {
      const prizeReward = PRIZE[cur].reward * totalResult[cur];
      return acc + prizeReward;
    }, 0);
  }
}

export default LottoResult;
