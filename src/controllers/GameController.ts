import { DateTime } from "luxon";
import { Prize, PrizeController } from "./PrizeController";

export interface GameOptions {
  playerName: string;
}

export interface Game {
  id: string,
  playerName: string,
  startedOn: DateTime,
  questionsAsked: {
    questionIdx: number,
    questionId: string,
    isCorrect: boolean|null
  }[],
  prizeStack: Prize[]
}

export interface GameState {
  game: Game | null
  hasStarted: boolean
};

class _GameController {

  createGame(options: GameOptions) : Game {
    let id = this.getNextGameId();
    let game = {
      id,
      playerName: options.playerName,
      startedOn: DateTime.now(),
      questionsAsked: [],
      prizeStack:  PrizeController.getPrizeStack(id)
    }
    this.saveGame(game);
    return game;
  }

  getNextQuestionIndex(game : Game) : number {
    return game.questionsAsked.length;
  }

  getNextGameId() : string {
    let games = this.getAllGames();
    return `${games.length}`;
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

  getGame(gameId: string) : Game | null {
    let gameString = localStorage.getItem(`game-${gameId}`);
    if (!gameString) {
      return null;
    }

    return JSON.parse(gameString) as Game;
  }

  saveGame(game: Game) {
    localStorage.setItem(`game-${game.id}`, JSON.stringify(game));
  }

}

export const GameController = new _GameController();
