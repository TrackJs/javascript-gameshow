import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController, GameQuestionAsked } from 'src/controllers/GameController';
import { Question, QuestionAnswer, QuestionController } from 'src/controllers/QuestionController';
import { SoundController } from 'src/controllers/SoundController';
import { shuffleArray } from 'src/utils/shuffleArray';
import { getRandomInteger } from 'src/utils/getRandomInteger';

import PrizeShow from 'src/components/prizeShow';
import PrizeStack from 'src/components/prizeStack';
import { route } from 'preact-router';

interface QuestionRouteState {
  game: Game
  questionIdx: number,
  step: "start"|"show"|"result"
  showAnswers: boolean
  hasFinalAnswer: boolean
  waitSound: string
  isCorrect?: boolean
  answers?: QuestionAnswer[]
  question?: Question
  questionAsked?: GameQuestionAsked
}

const ANSWER_LABEL = ["A","B","C","D"];

export default class QuestionRoute extends Component<UrlRouteProps, QuestionRouteState> {

  constructor(props: UrlRouteProps) {
    super();

    this.state = this.getInitialState(props);

    if (this.state.questionIdx === 0) {
      setTimeout(() => {
        this.onShowQuestion(new Event("x"));
      }, 0)
    }
  }

  componentWillReceiveProps(props: UrlRouteProps): void {
    let state = this.getInitialState(props);
    this.setState(state);
  }

  render(props: UrlRouteProps, state: QuestionRouteState): ComponentChild {
    let display: ComponentChild;
    if (state.step === "start") {
      display = this.renderQuestionStart(props, state);
      SoundController.play({ name: "wait2" });
    }
    else {
      display = this.renderQuestionShow(props, state);
    }

    return (
      <div class="question">{display}</div>
    )
  }

  private getInitialState(props: UrlRouteProps): QuestionRouteState {
    let questionIdx = parseInt(props.questionIdx, 10);
    let game = GameController.getGame(props.gameId) as Game;
    if (!game) {
      alert("TODO Bad Path");
    }

    let waitSound = `wait${getRandomInteger(1, 5)}`;
    let questionAsked = game.questionsAsked[questionIdx];
    if (questionAsked?.answerId && typeof questionAsked?.isCorrect === "boolean") {
      let question = QuestionController.getQuestion(game.id, questionIdx);
      return {
        game,
        questionIdx,
        step: "result",
        showAnswers: true,
        hasFinalAnswer: true,
        isCorrect: questionAsked.isCorrect,
        answers: question ? shuffleArray(question.answers) : undefined,
        question,
        questionAsked,
        waitSound
      };
    }
    else {
      return {
        game,
        questionIdx,
        step: "start",
        showAnswers: false,
        hasFinalAnswer: false,
        isCorrect: undefined,
        answers: undefined,
        question: undefined,
        questionAsked: undefined,
        waitSound
      };
    }
  }

  private renderQuestionStart(props: UrlRouteProps, state: QuestionRouteState): ComponentChild {
    return(
      <div class="question-start">

        <div class="game-logo">
          <img src="/assets/images/logo.png" height="300" width="300"/>
        </div>

        <div class="prize-stack-wrap">
          <PrizeStack game={state.game} questionIdx={state.questionIdx} />
        </div>

        <div class="controls">
          <button type="button" onClick={e => this.onShowQuestion(e)}>Answer<br/>Question</button>
          <button type="button" onClick={e => route(`/game/${this.props.gameId}/finish`)}>Quit<br/>Game</button>
        </div>
      </div>
    );
  }

  private renderQuestionShow(props: UrlRouteProps, state: QuestionRouteState): ComponentChild {
    let question = state.question as Question;

    return(
      <div class={`question-show`}>

        <div class={`prize ${(state.step === "result" && state.isCorrect) ? "show" : ""}`}>
          <PrizeShow game={state.game} questionIdx={state.questionIdx} />
        </div>

        <form class="question" onSubmit={this.onFinalAnswer.bind(this)}>
          <div class="question-text-bg">
            <div class="flex question-text justify-center align-center">
              {question.type === "code" ?
                <div class="flex flex-column">
                  <span class="code-result">What is the result of this JavaScript?</span>
                  <pre>{question.text}</pre>
                </div> :
                <span>{question.text}</span>
              }
            </div>
          </div>
          <ol class="answers">
            <div class="answer-row flex justify-center">
              { state.answers?.filter((answer, i) => i <= 1).map((answer, i) => (
                <li>
                  <input type="radio" name="selectedAnswerId" value={answer.id} id={`answer-${i}`}
                    checked={state.questionAsked?.answerId === answer.id}
                    class={`${state.step} ${(question.correctId === answer.id) ? "correct" : ""}`}
                    required={true}></input>
                  <label for={`answer-${i}`}>
                    <div class={`answer-text flex align-center ${state.showAnswers ? "show" : ""}`}
                      style={`transition: opacity 200ms ease-in-out ${i}s`}>
                      <span class="letter">{ANSWER_LABEL[i]}:</span>&nbsp;
                      {question.type === "code" ?
                        <pre>{answer.text}</pre> :
                        <span>{answer.text}</span>
                      }
                    </div>
                  </label>
                </li>
              ))}
            </div>
            <div class="answer-row flex justify-center">
            { state.answers?.filter((answer, i) => i > 1).map((answer, i) => (
                <li>
                  <input type="radio" name="selectedAnswerId" value={answer.id} id={`answer-${i+2}`}
                    checked={state.questionAsked?.answerId === answer.id}
                    class={`${state.step} ${(question.correctId === answer.id) ? "correct" : ""}`}
                    required={true}></input>
                  <label for={`answer-${i+2}`}>
                    <div class={`answer-text flex align-center ${state.showAnswers ? "show" : ""}`}
                      style={`transition: opacity 200ms ease-in-out ${i+2}s`}>
                      <span class="letter">{ANSWER_LABEL[i+2]}:</span>&nbsp;
                      {question.type === "code" ?
                        <pre>{answer.text}</pre> :
                        <span>{answer.text}</span>
                      }
                    </div>
                  </label>
                </li>
              ))}
            </div>
          </ol>

          <div class="controls">
            <button hidden={state.showAnswers} type="button" class="show-answer" onClick={e => this.onShowAnswers(e)}>Show<br/>Answers</button>
            <button hidden={!state.showAnswers || state.hasFinalAnswer} type="submit" class="final-answer">Final<br/>Answer</button>
            <button hidden={state.isCorrect !== true} type="button" class="next-question" onClick={e => route(`/game/${state.game.id}/q/${state.questionIdx + 1}`)}>Next<br/>Question</button>
            <button hidden={state.isCorrect !== false} type="button" class="next-question" onClick={e => route(`/game/${state.game.id}/finish`)}>Finish<br/>Game</button>
          </div>
        </form>

        {/* <PrizeStack game={this.state.game} questionIdx={questionIdx} /> */}
      </div>
    );
  }

  private onShowQuestion(e: Event) {
    e.preventDefault();
    let game = this.state.game;
    let questionIdx = this.state.questionIdx;

    // Mark that the user is seeing this question and it will now be added to their game.
    let question = QuestionController.getQuestion(game.id, questionIdx) as Question;
    if (!question) {
      alert("TODO No Question");
    }

    let questionAsked = game.questionsAsked.find(q => q.questionIdx === questionIdx);
    if (!questionAsked) {
      // we haven't shown this before, so build and save it.
      questionAsked = {
        questionIdx: questionIdx,
        questionId: question.id,
        answerId: null,
        isCorrect: null
      }
      game.questionsAsked.push(questionAsked);
      GameController.saveGame(game);
    }

    SoundController.stop({ name: "wait2" });
    SoundController.play({ name: this.state.waitSound });
    this.setState({
      step: "show",
      question,
      game,
      questionAsked,
      answers: shuffleArray(question.answers)
    });
  }

  private onShowAnswers(e: Event) {
    this.setState({ showAnswers: true });
  }

  private onFinalAnswer(e: Event) {
    e.preventDefault();
    let game = this.state.game as Game;
    let question = this.state.question as Question;
    let questionAsked = this.state.questionAsked as GameQuestionAsked;

    let formData = new FormData(e.target as HTMLFormElement);
    questionAsked.answerId = formData.get("selectedAnswerId") as string;
    let isCorrect = (questionAsked.answerId === question.correctId);
    questionAsked.isCorrect = isCorrect
    GameController.saveGame(game);

    SoundController.stop({ name: this.state.waitSound });
    SoundController.play({ name: "final_answer" });

    this.setState({ hasFinalAnswer: true });

    setTimeout(() => {
      this.setState({ step: "result", game, questionAsked, isCorrect });

      if (isCorrect) {
        SoundController.play({ name: "win" });
      }
      else {
        SoundController.play({ name: "lose" });
      }

    }, 5_000);
  }

}

