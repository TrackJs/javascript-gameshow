import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController } from 'src/controllers/GameController';
import { route } from 'preact-router';
import GameLogo from 'src/components/gameLogo';
import PrizeStack from 'src/components/prizeStack';
import PrizeShow from 'src/components/prizeShow';

interface GameDetailsState {
  game: Game
  showPrizes: boolean
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

    this.setState({ game, showPrizes: false });
  }

  render(props: UrlRouteProps, state: GameDetailsState) {
    let largestPrizeIdx = state.game.prizeWon.length - 1;

    return (
      <div class="route-game-details">

        <div class="prizes-won">
          { state.game.prizeWon.map((prize, i) => {
            let sideMargin = 200 - (i*50);
            return (
              <div class={`prize-won-wrap ${state.showPrizes ? "show" : ""}`}
                style={`margin-left:${sideMargin}px;margin-right:${sideMargin}px;z-index:${i};transition-delay:${i}s`}>
                <PrizeShow prize={prize} />
              </div>
            );
          })}
          { state.game.prizeWon.length === 0 ? (
            <div class="box no-prize">
              <h2>No Prizes Won</h2>
            </div>
          ) : null }
        </div>

        <div class="prize-stack-wrap">
          <PrizeStack game={state.game} questionIdx={largestPrizeIdx} highlightLowerIdx={true} />
        </div>

        <div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route("/")}>Home</button>
          <button hidden={!(state.game.prizeWon.length > 0 && !state.showPrizes)} class="btn btn-purple" type="button" onClick={e => this.showPrizes()}>Show Prizes</button>
        </div>

        <GameLogo />
      </div>
    );
  }

  private showPrizes() {
    this.setState({ showPrizes: true });
  }

}
