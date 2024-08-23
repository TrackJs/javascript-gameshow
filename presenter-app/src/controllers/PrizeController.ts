import { Prizes, Prize } from "../prizes";

interface PrizeUsage {
  prizeIdx: number
  askIdx: number
  gameId: string
}

export interface PrizeLookup extends Prize {
  prizeIdx: number,
  claimedQty: number
}

const STORAGE_KEY = "prize-usage";

export class PrizeController {

  _STORAGE_KEY: string = "prize-usage";
  _prizeUsage: PrizeUsage[];
  _prizeMap: PrizeLookup[];

  constructor() {
    this._prizeUsage = this._loadUsage();
    this._prizeMap = Prizes
      .map((prize, idx) => {
        let usage = this._prizeUsage.filter((usage) => usage.prizeIdx === idx);
        return {
          prizeIdx: idx,
          claimedQty: usage.length,
          ...prize
        }
      });
  }

  /**
   * Get the next prize at the specified ask for the game.
   */
  getPrize(gameId: string, askIdx: number): PrizeLookup {
    let chosenPrize = this._prizeMap
      .find(prize => prize.level === askIdx && prize.claimedQty < prize.quantity);

    if (!chosenPrize) {
      throw new Error(`Could not get prize for game ${gameId} for ask ${askIdx}`);
    }

    chosenPrize.claimedQty++;
    this._prizeUsage.push({
      prizeIdx: chosenPrize.prizeIdx,
      askIdx,
      gameId
    });
    this._updateUsage();
    return chosenPrize;
  }

  /**
   * Release a prize back into inventory because it wasn't won in the game
   */
  releasePrize(prizeIdx: number) {
    let releasedPrize = this._prizeMap[prizeIdx];

    releasedPrize.claimedQty--;
    this._prizeUsage = this._prizeUsage.filter((prize) => prize.prizeIdx !== prizeIdx);
    this._updateUsage();
  }

  _loadUsage(): PrizeUsage[] {
    let usageRecords = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return usageRecords;
  }

  _updateUsage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._prizeUsage));
  }

  getPrizeStats(): { label: string, value: number }[] {
    let remainingLevel0 = this._prizeMap.filter((prize) => prize.level === 0).reduce((count: number, prize) => count + (prize.quantity - prize.claimedQty), 0);
    let remainingLevel1 = this._prizeMap.filter((prize) => prize.level === 1).reduce((count: number, prize) => count + (prize.quantity - prize.claimedQty), 0);
    let remainingLevel2 = this._prizeMap.filter((prize) => prize.level === 2).reduce((count: number, prize) => count + (prize.quantity - prize.claimedQty), 0);
    let remainingLevel3 = this._prizeMap.filter((prize) => prize.level === 3).reduce((count: number, prize) => count + (prize.quantity - prize.claimedQty), 0);
    let remainingLevel4 = this._prizeMap.filter((prize) => prize.level === 4).reduce((count: number, prize) => count + (prize.quantity - prize.claimedQty), 0);
    return [
      {
        label: "Total Prizes",
        value: this._prizeMap.reduce((count: number, prize) => count + (prize.quantity), 0)
      },
      {
        label: "Remaining Prizes",
        value: this._prizeMap.reduce((count: number, prize) => count + (prize.quantity - prize.claimedQty), 0)
      },
      {
        label: "Level 0",
        value: remainingLevel0
      },
      {
        label: "Level 1",
        value: remainingLevel1
      },
      {
        label: "Level 2",
        value: remainingLevel2
      },
      {
        label: "Level 3",
        value: remainingLevel3
      },
      {
        label: "Level 4",
        value: remainingLevel4
      },
      {
        label: "Remaining Games",
        value: Math.min(remainingLevel0, remainingLevel1, remainingLevel2, remainingLevel3, remainingLevel4)
      }
    ];
  }
}
