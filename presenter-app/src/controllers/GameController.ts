import { DateTime } from "luxon";
import { PrizeLookup, PrizeController } from "./PrizeController";
import { QuestionController, QuestionLookup, AnswerLookup } from "./QuestionController";

const QUESTION_COUNT = 5;
const THRESHOLD_IDX = 2;
const LIFELINES: GameLifeLine[] = [
  {
    name: "50-50",
    iconUrl: "/assets/images/5050.svg",
    isUsed: false,
  },
  {
    name: "Ask for help",
    iconUrl: "/assets/images/ask_a_speaker.svg",
    isUsed: false,
  }
];

export interface GamePrize extends PrizeLookup {
  isThreshold: boolean,
  isWon?: boolean
}

export interface GameQuestion extends QuestionLookup {
  playerAnswerIdx?: number
  isCorrect?: boolean,
  answers: GameAnswer[]
}

export interface GameAnswer extends AnswerLookup {
  hide?: boolean
}

export interface GameLifeLine {
  name: string
  iconUrl: string
  isUsed: boolean
  options?: {
    name: string
    imageUrl: string
  }[]
}

export interface Game {
  id: string
  playerName: string
  startedOn: DateTime
  lifeLines: GameLifeLine[],
  questions: GameQuestion[],
  prizes: GamePrize[],
  isFinished: boolean
}

const STORAGE_KEY = "game_usage";

class _GameController {

  _questionController = new QuestionController();
  _prizeController = new PrizeController();

  _reset() {
    this._questionController = new QuestionController();
    this._prizeController = new PrizeController();
  }

  createGame(options: { playerName: string }): Game {
    const gameId = this.getNextGameId();
    const game: Game = {
      id: gameId,
      playerName: options.playerName,
      startedOn: DateTime.now(),
      lifeLines: LIFELINES.slice(),
      questions: [],
      prizes: [],
      isFinished: false
    }
    this.saveGame(game); //  save fast so we don't double create things when we start claiming prizes
    game.prizes = this.getPrizes(gameId);
    this.saveGame(game);

    return game;
  }

  finishGame(game: Game) {
    this.finalizePrizes(game);

    game.prizes
      .filter((prize) => !prize.isWon)
      .forEach((unWonPrize) => {
        this._prizeController.releasePrize(unWonPrize.prizeIdx);
      });

    game.isFinished = true;
    this.saveGame(game);
  }

  getQuestion(game: Game, askIdx: number): GameQuestion {
    if (!game.questions[askIdx]) {
      game.questions[askIdx] = this._questionController.getQuestion(game.id, askIdx) as GameQuestion;
      this.saveGame(game);
    }
    return game.questions[askIdx];
  }

  finalAnswer(game: Game, askIdx: number, playerAnswerIdx: number): void {
    const question = game.questions[askIdx];
    question.playerAnswerIdx = playerAnswerIdx;
    question.isCorrect = (playerAnswerIdx === question.correctAnswerIdx);
    this.saveGame(game);
  }

  isLastAsk(askId: number) {
    return askId >= (QUESTION_COUNT - 1);
  }

  getAllGames(): Game[] {
    const gameUsage = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    return gameUsage.map((gameId: string) => {
      return this.getGame(gameId);
    });
  }

  getGame(gameId: string): Game {
    const gameString = localStorage.getItem(`game-${gameId}`);
    if (!gameString) {
      throw new Error(`No game found for ${gameId}`);
    }

    return JSON.parse(gameString) as Game;
  }

  finalizePrizes(game: Game): void {
    const result: GamePrize[] = [];
    const batch: GamePrize[] = []; // prizes within a threshold

    game.prizes.forEach((prize, idx) => {
      const question = game.questions[idx];

      if (question?.isCorrect === true) {
        batch.push(prize);

        // Once the user crosses a threshold, they won everything in the batch
        if (prize.isThreshold) {
          batch.forEach((prize) => { prize.isWon = true });
          batch.length = 0;
        }
      }
      else if (question?.isCorrect === false) {
        prize.isWon = false;
        batch.forEach((prize) => { prize.isWon = false; })
        batch.length = 0;
      }
      else {
        // question was not asked
        prize.isWon = false;
      }
    });

    // anything remaining the in batch are top prizes won.
    batch.forEach((prize) => { prize.isWon = true });
  }

  saveGame(game: Game) {
    const gameUsage = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    if (gameUsage.indexOf(game.id) < 0) {
      gameUsage.push(game.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameUsage));
    }
    localStorage.setItem(`game-${game.id}`, JSON.stringify(game));
  }

  private getNextGameId(): string {
    const games = this.getAllGames();
    return `${games.length}`;
  }

  private getPrizes(gameId: string): GamePrize[] {
    const prizes: GamePrize[] = [];

    for (let askIdx = 0; askIdx < QUESTION_COUNT; askIdx++) {
      const prize = this._prizeController.getPrize(gameId, askIdx) as GamePrize;
      prize.isThreshold = (askIdx === THRESHOLD_IDX);
      prizes[askIdx] = prize;
    }

    return prizes;
  }

}

export const GameController = new _GameController();
