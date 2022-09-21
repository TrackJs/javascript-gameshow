import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { GameController } from 'src/controllers/GameController';

export default class NewGame extends Component<any, any> {

  render(): ComponentChild {
    return (
    	<div>
        <h1>Start a new game</h1>
        <form onSubmit={this.onNewGameSubmit}>
          <input type="text" name="name" required placeholder="What is your name?"></input>
          <button type="submit">Are you ready to be a JavaScriptær?</button>
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

