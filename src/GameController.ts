import { Game } from "./Game";

class _GameController {

  loadGame(gameId: string) : Game | null {
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
