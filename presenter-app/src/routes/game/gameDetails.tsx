import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController, GamePrize } from 'src/controllers/GameController';
import { route } from 'preact-router';
import GameLogo from 'src/components/gameLogo';
import PrizeStack from 'src/components/prizeStack';
import PrizeShow from 'src/components/prizeShow';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { VideoBackgroundController } from 'src/controllers/VideoBackgroundController';

interface GameDetailsState {
  game: Game
  showPrizes: boolean,
  showRemaining: boolean
}

export default class GameDetails extends Component<UrlRouteProps, any> {

  componentWillUnmount(): void {
    SoundController.stopAll();
  }

  componentWillMount() {
    const game = GameController.getGame(this.props.gameId);

    if (!game.isFinished) {
      let nextQuestion = 0;

      if (game.questions.length) {
        const unAnsweredQuestion = game.questions.find(q => !q.playerAnswerIdx);
        if (unAnsweredQuestion) {
          nextQuestion = unAnsweredQuestion.questionIdx;
        }
      }

      route(`/game/${this.props.gameId}/q/${nextQuestion}`, true);
    }

    SoundController.play(SOUND.closing);
    VideoBackgroundController.playBackgroundLoop();
    this.setState({ game, showPrizes: false });
  }

  render(props: UrlRouteProps, state: GameDetailsState) {
    const wonPrizes = state.game.prizes.filter((p) => p.isWon);
    const largestPrizeIdx = wonPrizes.length - 1;
    const unWonPrizes = state.game.prizes.filter(p => !p.isWon);

    return (
      <div class="route-game-details">

        <div class="prizes">
          {wonPrizes.map((prize: GamePrize, i) => {
            const sideMargin = 200 - (i * 50);
            return (
              <div class={`prize-wrap ${state.showPrizes ? "show" : ""}`}
                style={`margin-left:${sideMargin}px;margin-right:${sideMargin}px;z-index:${i};transition-delay:${i}s`}>
                <PrizeShow prize={prize} />
              </div>
            );
          })
          }
          {wonPrizes.length === 0 ? (
            <div class="box no-prize">
              <h2>No Prizes Won</h2>
            </div>
          ) : null}
        </div>

        <div class="prizes" hidden={!this.state.showRemaining}>
          {unWonPrizes.map((prize, i) => {
            return (
              <div class={`prize-wrap ${state.showRemaining ? "show" : ""}`}>
                <PrizeShow prize={prize} />
              </div>
            );
          })}
        </div>

        <div class="prize-stack-wrap">
          <PrizeStack game={state.game} askIdx={largestPrizeIdx} highlightLowerIdx={true} />
        </div>

        <div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route("/")}>Home</button>
          <button hidden={!(wonPrizes.length < state.game.prizes.length && !state.showRemaining)} class="btn btn-purple" type="button" onClick={e => this.showRemaining()}>Show Remaining</button>
          <button hidden={!(wonPrizes.length > 0 && !state.showPrizes)} class="btn btn-purple" type="button" onClick={e => this.showPrizes()}>Show Prizes</button>
        </div>

        <GameLogo />
      </div>
    );
  }

  private showPrizes() {
    this.setState({ showPrizes: true, showRemaining: false });
  }

  private showRemaining() {
    this.setState({ showPrizes: false, showRemaining: true });
  }

}
