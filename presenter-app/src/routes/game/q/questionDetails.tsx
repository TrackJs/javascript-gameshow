import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController, GameQuestionAsked } from 'src/controllers/GameController';
import { Question, QuestionController } from 'src/controllers/QuestionController';
import { route } from 'preact-router';

import PrizeShow from 'src/components/prizeShow';
import PrizeStack from 'src/components/prizeStack';
import GameLogo from 'src/components/gameLogo';
import AskQuestion from 'src/components/askQuestion';
import LifeLines from 'src/components/lifeLines';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { VideoBackgroundController } from 'src/controllers/VideoBackgroundController';

interface QuestionDetailsState {
  game: Game
  question?: Question
  questionAsked?: GameQuestionAsked
  questionIdx: number
}

export default class QuestionDetails extends Component<UrlRouteProps, QuestionDetailsState> {

  constructor(props: UrlRouteProps) {
    super();
    this.state = this.getInitialState(props);
  }

  componentDidMount(): void {
    if (this.state.questionAsked) {
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
    let state = this.getInitialState(props);
    this.setState(state);

    if (state.questionAsked) {
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
    // if !question -- show prize stack and controls
    // if question && !answer -- show question
    // if question && answer -- show finished question
    let questionIdx = parseInt(props.questionIdx, 10);
    let game = GameController.getGame(props.gameId);
    let questionAsked = game.questionsAsked[questionIdx];
    let difficulty = GameController.getDifficultyForIndex(questionIdx);

    // question has not yet been asked
    if (!questionAsked) {
      return {
        game,
        question: undefined,
        questionAsked: undefined,
        questionIdx
      };
    }
    // question has been asked
    else {
      let question = QuestionController.getQuestion(game.id, questionIdx, difficulty);
      return {
        game,
        question,
        questionAsked,
        questionIdx
      }
    }
  }

  private renderPreQuestion(props: UrlRouteProps, state: QuestionDetailsState): ComponentChild {
    let prize = state.game.prizeStack[state.questionIdx];

    return(
      <div class="pre-question">

        <div class="prize-to-win">
          <PrizeShow prize={prize} />
        </div>

        <div class="prize-stack-wrap glow">
          <PrizeStack game={state.game} questionIdx={state.questionIdx} />
        </div>

        <div class="life-line-wrap">
          <LifeLines game={state.game} disabled={true} />
        </div>

        <div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route('/')}>Home</button>
          <button class="btn btn-purple" type="button" onClick={e => this.onShowQuestion()}>Show Question</button>
          <button hidden={state.questionIdx === 0} class="btn btn-purple" type="button" onClick={e => this.onFinishGame()}>Take Prizes</button>
        </div>

        <GameLogo />
      </div>
    );
  }

  private renderQuestion(props: UrlRouteProps, state: QuestionDetailsState): ComponentChild {
    let game = state.game;
    let question = state.question as Question;
    let questionAsked = state.questionAsked as GameQuestionAsked;
    let prize = game.prizeStack[state.questionIdx];
    let lastQuestionIdx = game.prizeStack.length-1;

    return (
      <div class="show-question">

        <div class={`prize-wrap ${(questionAsked.isCorrect) ? "show" : ""}`}>
          <PrizeShow prize={prize} />
        </div>

        <div class="question-wrap">
          <AskQuestion question={question} onResult={this.onAnswer.bind(this)}
            showAnswers={!!questionAsked.answerId} answerId={questionAsked.answerId} />
        </div>

        <div class="life-line-wrap" hidden={!!questionAsked.answerId}>
          <LifeLines game={state.game} disabled={!!questionAsked.answerId} />
        </div>

        <div class="controls">
          <button hidden={!(questionAsked.isCorrect && state.questionIdx < lastQuestionIdx)} type="button" class="btn btn-purple" onClick={e => route(`/game/${game.id}/q/${state.questionIdx + 1}`)}>Next Question</button>
          <button hidden={!(questionAsked.isCorrect === false || state.questionIdx >= lastQuestionIdx)} type="button" class="btn btn-purple" onClick={e => this.onFinishGame()}>Finish Game</button>
        </div>

        <GameLogo />
      </div>
    );
  }

  private onShowQuestion(): void {
    let game = this.state.game;
    let questionIdx = this.state.questionIdx;
    let difficulty = GameController.getDifficultyForIndex(questionIdx);

    // Mark that the user is seeing this question and it will now be added to their game.
    let question = QuestionController.getQuestion(game.id, questionIdx, difficulty);
    let questionAsked = {
      questionIdx: questionIdx,
      questionId: question.id
    }

    game.questionsAsked.push(questionAsked);
    GameController.saveGame(game);

    this.showQuestionAV();

    this.setState({
      question,
      questionAsked
    });
  }

  private onAnswer(answerId: string, isCorrect: boolean): void {
    let questionAsked = this.state.questionAsked as GameQuestionAsked;
    questionAsked.answerId = answerId;
    questionAsked.isCorrect = isCorrect;

    SoundController.play(SOUND.final_answer);
    VideoBackgroundController.playFanfare();

    GameController.saveGame(this.state.game);// persist that the question has been answered.
    this.setState({ questionAsked });
  }

  private onFinishGame() : void {
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
    SoundController.playQuestionSound(this.state.questionIdx);
    VideoBackgroundController.playFanfare();
    setTimeout(() => {
      VideoBackgroundController.greenscreen();
    }, 4_000);
  }
}

