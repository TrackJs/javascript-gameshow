import { Game } from "./Game";
import { GameRepository } from "./GameRepository";

export interface GameState {
  game: Game | null
  hasStarted: boolean
};

class _GameController {

  getState!: () => GameState;
  setState!: (state: any) => void;

  init(getState: () => GameState, setState: (state: any) => void, gameId: string): GameState {

    this.getState = getState;
    this.setState = setState;

    return {
      game: GameRepository.getGame(gameId),
      hasStarted: false
    };
  }

  start(): void {
    this.setState({ hasStarted: true });
  }

  getNextQuestionIndex(game : Game) : number {
    return game.questionsAsked.length;
  }

}

export const GameController = new _GameController();
