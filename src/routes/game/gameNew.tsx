import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { GameController } from 'src/controllers/GameController';

export default class NewGame extends Component<any, any> {

  render(): ComponentChild {
    return (
    	<div class="route-game-new flex flex-column justify-center align-center">
        <img src="/assets/images/logo.png" width="400" height="400" />
        <form onSubmit={this.onNewGameSubmit}>
          <div>
            <input type="text" name="name" required placeholder="What is your name?"></input>
          </div>
          <div class="controls">
            <button type="submit">Play<br/>Game</button>
          </div>
        </form>
      </div>
    );
  }

  onNewGameSubmit(e: Event) {
    e.preventDefault();
    let data = new FormData(e.target as HTMLFormElement);

    let game = GameController.createGame({
      playerName: (data.get("name") || "anonymous") as string
    });

    route(`/game/${game.id}`, false);
  }

}

