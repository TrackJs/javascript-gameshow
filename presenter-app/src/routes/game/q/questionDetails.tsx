import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController, GameLifeLine, GameQuestion } from 'src/controllers/GameController';
import { QuestionController, QuestionLookup } from 'src/controllers/QuestionController';
import { route } from 'preact-router';

import PrizeShow from 'src/components/prizeShow';
import PrizeStack from 'src/components/prizeStack';
import GameLogo from 'src/components/gameLogo';
import AskQuestion from 'src/components/askQuestion';
import LifeLines from 'src/components/lifeLines';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { VideoBackgroundController } from 'src/controllers/VideoBackgroundController';

interface QuestionDetailsState {
  askIdx: number,
  game: Game
  hasQuestionBeenAsked: boolean
  question?: GameQuestion
}

export default class QuestionDetails extends Component<UrlRouteProps, QuestionDetailsState> {

  constructor(props: UrlRouteProps) {
    super();
    this.state = this.getInitialState(props);
  }

  componentDidMount(): void {
    if (this.state.hasQuestionBeenAsked) {
      this.showQuestionAV();
    } else {
      this.showPreQuestionAV();
    }
  }

  componentWillUnmount(): void {
    SoundController.stopAll();
    VideoBackgroundController.pauseBackground();
  }

  componentWillReceiveProps(props: UrlRouteProps): void {
    const state = this.getInitialState(props);
    this.setState(state);
    if (state.hasQuestionBeenAsked) {
      this.showQuestionAV();
    } else {
      this.showPreQuestionAV();
    }
  }

  render(props: UrlRouteProps, state: QuestionDetailsState): ComponentChild {
    return (
      <div class="route-question-details">
        {
          !state.question ?
            this.renderPreQuestion(props, state) :
            this.renderQuestion(props, state)
        }
      </div>
    );
  }

  private getInitialState(props: UrlRouteProps): QuestionDetailsState {
    const askIdx = parseInt(props.askIdx, 10);
    const game = GameController.getGame(props.gameId);
    const hasQuestionBeenAsked = !!game.questions[askIdx];

    if (hasQuestionBeenAsked) {
      const question = GameController.getQuestion(game, askIdx);
      return { askIdx, game, question, hasQuestionBeenAsked }
    }
    
      return { askIdx, game, question: undefined, hasQuestionBeenAsked };
    
  }

  private renderPreQuestion(props: UrlRouteProps, state: QuestionDetailsState): ComponentChild {
    const prize = state.game.prizes[state.askIdx];

    return (
      <div class="pre-question">

        <div class="prize-to-win">
          <PrizeShow prize={prize} />
        </div>

        <div class="prize-stack-wrap glow">
          <PrizeStack game={state.game} askIdx={state.askIdx} />
        </div>

        <div class="life-line-wrap">
          {state.question ? (<LifeLines game={state.game} question={state.question} disabled={true} />) : undefined}
        </div>

        <div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route('/')}>Home</button>
          <button class="btn btn-purple" type="button" onClick={e => this.onShowQuestion()}>Show Question</button>
          <button hidden={state.askIdx === 0} class="btn btn-purple" type="button" onClick={e => this.onFinishGame()}>Take Prizes</button>
        </div>

        <GameLogo />
      </div>
    );
  }

  private renderQuestion(props: UrlRouteProps, state: QuestionDetailsState): ComponentChild {
    return (
      <div class="show-question">

        <div class={`prize-wrap ${(state.question?.isCorrect) ? "show" : ""}`}>
          <PrizeShow prize={state.game.prizes[state.askIdx]} />
        </div>

        <div class="question-wrap">
          <AskQuestion question={state.question as GameQuestion} onResult={this.onAnswer.bind(this)}
            showAnswers={state.question?.playerAnswerIdx != undefined} playerAnswerIdx={state.question?.playerAnswerIdx} game={state.game} />
        </div>

        <div class="life-line-wrap" hidden={state.question?.playerAnswerIdx != undefined}>
          <LifeLines game={state.game} question={state.question as GameQuestion} disabled={state.question?.playerAnswerIdx != undefined} onUsed={this.onLifelineUsed.bind(this)} />
        </div>

        <div class="controls">
          <button hidden={!(state.question?.isCorrect === true && !GameController.isLastAsk(state.askIdx))} type="button" class="btn btn-purple" onClick={e => route(`/game/${state.game.id}/q/${state.askIdx + 1}`)}>Next Question</button>
          <button hidden={!(state.question?.isCorrect === false || GameController.isLastAsk(state.askIdx))} type="button" class="btn btn-purple" onClick={e => this.onFinishGame()}>Finish Game</button>
        </div>

        <GameLogo />
      </div>
    );
  }

  private onShowQuestion(): void {
    const question = GameController.getQuestion(this.state.game, this.state.askIdx);
    this.showQuestionAV();
    this.setState({ question, hasQuestionBeenAsked: true });
  }

  private onLifelineUsed(lifeline: GameLifeLine): void {
    const game = this.state.game;
    lifeline.isUsed = true;
    GameController.saveGame(game);
    this.setState({ game });
  }

  private onAnswer(playerAnswerIdx: number, isCorrect: boolean): void {
    GameController.finalAnswer(this.state.game, this.state.askIdx, playerAnswerIdx);
    SoundController.play(SOUND.final_answer);
    VideoBackgroundController.playFanfare();
    this.setState({ game: this.state.game, question: this.state.question });
  }

  private onFinishGame(): void {
    GameController.finishGame(this.state.game);
    route(`/game/${this.state.game.id}`);
  }

  private showPreQuestionAV() {
    SoundController.stopAll();
    SoundController.play(SOUND.explain);
    VideoBackgroundController.playBackgroundLoop();
  }

  private showQuestionAV() {
    SoundController.stopAll();
    SoundController.playQuestionSound(this.state.askIdx);
    VideoBackgroundController.playFanfare();
    setTimeout(() => {
      VideoBackgroundController.greenscreen();
    }, 4_000);
  }
}

