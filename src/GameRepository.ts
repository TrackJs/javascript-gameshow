import { Game } from "./Game";

class _GameRepository {

  clear() : void {
    localStorage.clear();
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
    if (!game.id) {
      game.id = GameRepository.getNextGameId();
    }
    localStorage.setItem(`game-${game.id}`, JSON.stringify(game));
  }

  private getNextGameId() : string {
    let games = GameRepository.getAllGames();
    return `${games.length}`;
  }

}

export const GameRepository = new _GameRepository();
