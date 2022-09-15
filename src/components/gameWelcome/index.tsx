import { h, Component, ComponentChild } from 'preact';
import { Game } from 'src/Game';
import { GameController } from 'src/GameController';
import { GameRepository } from 'src/GameRepository';

export default class GameWelcome extends Component<any, any> {

  render(): ComponentChild {
    return(
      <div>
        I am the welcome
        <button type="button" onClick={e => GameController.start()}>Start!!</button>

      </div>
    );
  }


}

