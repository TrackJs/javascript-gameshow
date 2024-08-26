import { DateTime } from "luxon";
import { PrizeLookup, PrizeController } from "./PrizeController";

export interface GamePrize extends PrizeLookup {
  isThreshold: boolean,
  isWon?: boolean
}

export interface AudiencePlayGame {
  id: string,
  startedOn: DateTime,
  prizes: GamePrize[],
  bonusPrizes: {
    [questionId: string]: GamePrize
  },
  questionsShown: string[]
}

const STORAGE_KEY = "audience-play-game";

class _AudiencePlayController {

  _prizeController = new PrizeController();

  _reset() {
    this._prizeController = new PrizeController();
  }

  getGame(): AudiencePlayGame {
    let game = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as AudiencePlayGame;
    if (!game) {
      game = {
        id: "ap",
        startedOn: DateTime.now(),
        prizes: [],
        questionsShown: [],
        bonusPrizes: {}
      };
      this.saveGame(game); //  save fast so we don't double create things when we start claiming prizes
      game.prizes = this.getPrizes(game.id);
      this.saveGame(game);
    }
    return game;
  }

  setQuestionShown(game: AudiencePlayGame, questionId: string) {
    let askIdx = game.questionsShown.length;
    if (game.questionsShown.indexOf(questionId) < 0) {
      game.questionsShown.push(questionId);

      if (askIdx >= 1) {
        game.bonusPrizes[questionId] = this._prizeController.getPrize(game.id, askIdx) as GamePrize;
      }

      this.saveGame(game);
    }
  }

  saveGame(game: AudiencePlayGame) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
  }

  private getPrizes(gameId: string): GamePrize[] {
    const prizes: GamePrize[] = [];

    for (let askIdx = 0; askIdx < 5; askIdx++) {
      const prize = this._prizeController.getPrize(gameId, askIdx) as GamePrize;
      prizes[askIdx] = prize;
    }

    return prizes;
  }

}

export const AudiencePlayController = new _AudiencePlayController();
