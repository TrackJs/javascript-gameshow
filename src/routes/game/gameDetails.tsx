import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController } from 'src/controllers/GameController';
import { route } from 'preact-router';
import GameLogo from 'src/components/gameLogo';
import PrizeStack from 'src/components/prizeStack';

interface GameDetailsState {
  game: Game,
  questionIdx: number
}

export default class GameDetails extends Component<UrlRouteProps, any> {

  componentWillMount() {
    let game = GameController.getGame(this.props.gameId);
    let questionIdx = parseInt(this.props.questionIdx, 10);

    if (!game.isFinished) {
      let nextQuestion = 0;

      if (game.questionsAsked.length) {
        let unAnsweredQuestion = game.questionsAsked.find(qa => !qa.answerId);
        if (unAnsweredQuestion) {
          nextQuestion = unAnsweredQuestion.questionIdx;
        }
      }

      route(`/game/${this.props.gameId}/q/${nextQuestion}`, true);
    }

    this.setState({ game, questionIdx });
  }

  render(props: UrlRouteProps, state: GameDetailsState) {
    return (
      <div class="route-game-details">

        <div class="prize-stack-wrap">
          <PrizeStack game={state.game} questionIdx={state.questionIdx} />
        </div>

        <div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route("/")}>Home</button>
        </div>

        <GameLogo />
      </div>
    );
  }

}
