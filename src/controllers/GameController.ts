import { DateTime } from "luxon";
import { Prize, PrizeController } from "./PrizeController";
import { QuestionController } from "./QuestionController";

export interface GameOptions {
  playerName: string;
}

export interface GameQuestionAsked {
  questionIdx: number,
  questionId: string,
  answerId?: string,
  isCorrect?: boolean
}

export interface Game {
  id: string
  playerName: string
  startedOn: DateTime
  questionsAsked: GameQuestionAsked[]
  prizeStack: Prize[],
  prizeWon: Prize[],
  isFinished: boolean
}

export interface GameState {
  game: Game | null
  hasStarted: boolean
};

const QUESTION_COUNT = 5;

class _GameController {

  createGame(options: GameOptions) : Game {
    let id = this.getNextGameId();
    let game = {
      id,
      playerName: options.playerName,
      startedOn: DateTime.now(),
      questionsAsked: [],
      prizeStack: this.getPrizeStack(id),
      prizeWon: [],
      isFinished: false
    }
    this.saveGame(game);
    return game;
  }

  finishGame(game: Game) {
    game.prizeWon = this.getPrizesWon(game);

    game.prizeStack.forEach((prize, idx) => {
      let hasWon = game.prizeWon.some(p => p.id === prize.id);
      if (!hasWon) {
        PrizeController.releasePrize(game.id, prize.id);
      }
    });

    game.isFinished = true;
    this.saveGame(game);
  }

  getAllGames() : Game[] {
    const games = [];
    for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key?.startsWith("game-")) {
        let gameId = key.split("game-")[1];
        let game = this.getGame(gameId);
        if (game) {
          games.push(game);
        }
      }
    }
    return games;
  }

  getGame(gameId: string) : Game {
    let gameString = localStorage.getItem(`game-${gameId}`);
    if (!gameString) {
      throw new Error(`No game found for ${gameId}`);
    }

    return JSON.parse(gameString) as Game;
  }

  getDifficultyForIndex(questionIdx: number): 0|1|2|3 {
    let difficultyMap = [0, 1, 2, 2, 3];
    return difficultyMap[questionIdx] as 0|1|2|3;
  }

  getPrizesWon(game: Game): Prize[] {
    let result : Prize[] = [];
    let batch : Prize[] = []; // prizes within a threshold

    game.questionsAsked.forEach((asked, idx) => {
      let prize = game.prizeStack[idx];

      if (asked.isCorrect) {
        batch.push(prize);

        if (prize.isThreshold) {
          result.push.apply(result, batch);
          batch.length = 0;
        }
      }
      else if(asked.isCorrect === false) {
        batch.length = 0;
      }
    });

    result.push.apply(result, batch);
    return result;
  }

  // getLargestPrizeIdx(game: Game): number {
  //   return -1;
  // }

  saveGame(game: Game) {
    localStorage.setItem(`game-${game.id}`, JSON.stringify(game));
  }

  private getNextGameId() : string {
    let games = this.getAllGames();
    return `${games.length}`;
  }

  private getPrizeStack(gameId: string) : Prize[] {
    let prizeStack = [];

    for(let questionIdx = 0; questionIdx < QUESTION_COUNT; questionIdx++) {
      let difficulty = this.getDifficultyForIndex(questionIdx);
      prizeStack[questionIdx] = PrizeController.getPrize(gameId, difficulty);

      if (questionIdx === 2) {
        prizeStack[questionIdx].isThreshold = true;
      }
    }

    return prizeStack;
  }

}

export const GameController = new _GameController();
