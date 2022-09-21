import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController } from 'src/controllers/GameController';

import PrizeStack from 'src/components/prizeStack';

interface GameStartState {
  game: Game
}

export default class GameStart extends Component<UrlRouteProps, GameStartState> {

  constructor(props: UrlRouteProps) {
    super();

    let game = GameController.getGame(props.gameId as string) as Game;
    if (!game) {
      alert("TODO Bad Path");
    }

    this.state = { game };
  }

  render(props: UrlRouteProps, state: GameStartState): ComponentChild {
    let questionIdx = GameController.getNextQuestionIndex(state.game);

    return(
      <div>
        I am the start

        <a href={`/game/${state.game.id}/q/${questionIdx}`}>Start the next question</a>

        <PrizeStack game={state.game} questionIdx={questionIdx} />

      </div>
    );
  }
}
