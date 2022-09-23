import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController } from 'src/controllers/GameController';

import PrizeStack from 'src/components/prizeStack';
import { route } from 'preact-router';

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
      <div class="game-start">

        <div class="game-logo">
          <img src="/assets/images/logo.png" height="300" width="300"/>
        </div>

        <div class="prize-stack-wrap">
          <PrizeStack game={state.game} questionIdx={questionIdx} />
        </div>

        <div class="controls">
          <button type="button" onClick={e => route(`/game/${state.game.id}/q/${questionIdx}`)}>
            Start<br/>Game
          </button>
        </div>

      </div>
    );
  }
}
