import { h, Component, ComponentChild } from 'preact';
import { Game } from 'src/Game';
import { GameController } from 'src/GameController';
import { GameRepository } from 'src/GameRepository';

export default class QuestionStart extends Component<any, any> {

  render(): ComponentChild {
    return(
      <div>
        I am the question start
        <button type="button" onClick={e => GameController.start()}>Start!!</button>

      </div>
    );
  }


}

