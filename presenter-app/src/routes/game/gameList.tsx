import { h, Component, ComponentChild } from 'preact';
import { Game, GameController } from 'src/controllers/GameController';
import GameLogo from 'src/components/gameLogo';
import { route } from 'preact-router';
import { SOUND, SoundController } from 'src/controllers/SoundController';

export default class GameList extends Component<any, any> {

  componentDidMount(): void {
    SoundController.play(SOUND.opening_theme);
  }

  componentWillUnmount(): void {
    SoundController.stopAll();
  }

  render(): ComponentChild {
		let games = GameController.getAllGames();

    return (
			<div class="route-game-list">
        <div class="container">
          <h1>Today&apos;s Games</h1>
          <ol>
            { games.map(game => (
              <li class="flex">
                <div class="label">
                  <div class="name">{game.playerName}&apos;s game</div>
                  <div class="status">{game.isFinished ? "Finished" : "In Progress"}</div>
                </div>
                { game.isFinished ?
                  <button type="button" onClick={e => route(`/game/${game.id}`)}>Prizes</button> :
                  <button type="button" onClick={e => route(`/game/${game.id}/q/${game.questionsAsked.length}`)}>Resume</button>
                }
              </li>
            ))}
          </ol>
          <div class="controls">
            <button type="button" class="btn btn-purple" onClick={e => route("/") }>Home</button>
            <button type="button" class="btn btn-purple" onClick={e => this.clearGames() }>Clear Games</button>
          </div>
        </div>
        <GameLogo />
			</div>
		);
  }

  private clearGames() : void {
    let yes = confirm("Are you sure you want to erase everything?");
    if (yes) {
      localStorage.clear();
      route("/games", true);
    }
  }

}
