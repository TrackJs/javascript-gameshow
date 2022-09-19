import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { UrlRouteProps } from 'src/components/app';
import { Game } from 'src/Game';
import { GameController } from 'src/GameController';
import { GameRepository } from 'src/GameRepository';

type GameStartState = {
  game: Game
}

export default class GameStart extends Component<any, GameStartState> {

  constructor(props: UrlRouteProps) {
    super();

    if (!props.gameId) {
      route("/error/404");
    }

    let game = GameRepository.getGame(props.gameId as string);
    if (!game) {
      route("/error/404");
    }

    this.state = {
      game: game as Game
    };
  }

  render(): ComponentChild {
    let questionId = GameController.getNextQuestionIndex(this.state.game);

    return(
      <div>
        I am the start

        <a href={`/game/${this.state.game.id}/q/${questionId}`}>Start the next question</a>

      </div>
    );
  }


}

