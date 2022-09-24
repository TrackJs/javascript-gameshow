import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController } from 'src/controllers/GameController';
import { route } from 'preact-router';
import GameLogo from 'src/components/gameLogo';
import PrizeStack from 'src/components/prizeStack';

interface GameDetailsState {
  game: Game
}

export default class GameDetails extends Component<UrlRouteProps, any> {

  componentWillMount() {
    let game = GameController.getGame(this.props.gameId);

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

    this.setState({ game });
  }

  render(props: UrlRouteProps, state: GameDetailsState) {
    let largestPrizeIdx = -1;
    state.game.questionsAsked.forEach(qa => {
      if (qa.isCorrect && qa.questionIdx >= largestPrizeIdx) {
        largestPrizeIdx = qa.questionIdx;
      }
    });

    return (
      <div class="route-game-details">

        <div class="prize-stack-wrap">
          <PrizeStack game={state.game} questionIdx={largestPrizeIdx} highlightLowerIdx={true} />
        </div>

        <div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route("/")}>Home</button>
        </div>

        <GameLogo />
      </div>
    );
  }

}
