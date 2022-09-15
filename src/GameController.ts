import { Game, GameOptions } from "./Game";

class _GameController {

  newGame(options : GameOptions) {
    let game = new Game(options);
    this.saveGame(game);
  }

  saveGame(game: Game) {
    localStorage.setItem(`game-${game.id}`, JSON.stringify(game));
  }

}

export const GameController = new _GameController();
