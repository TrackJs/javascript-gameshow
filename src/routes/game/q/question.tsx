import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { UrlRouteProps } from 'src/app';
import { Game, GameController, GameQuestionAsked } from 'src/controllers/GameController';
import { Question, QuestionAnswer, QuestionController } from 'src/controllers/QuestionController';
import { SoundController } from 'src/controllers/SoundController';
import { shuffleArray } from 'src/utils/shuffleArray';

import PrizeStack from 'src/components/prizeStack';

interface QuestionShowState {
  game: Game
  questionIdx: number,
  step: "start"|"show"|"result"
  showAnswers: boolean
  hasFinalAnswer: boolean
  answers?: QuestionAnswer[]
  question?: Question
  questionAsked?: GameQuestionAsked
}

const ANSWER_LABEL = ["A","B","C","D"];

export default class QuestionShow extends Component<UrlRouteProps, QuestionShowState> {

  constructor(props: UrlRouteProps) {
    super();

    let questionIdx = parseInt(props.questionIdx, 10);
    let game = GameController.getGame(props.gameId) as Game;
    if (!game) {
      alert("TODO Bad Path");
    }

    this.state = {
      game,
      questionIdx,
      step: "start",
      showAnswers: false,
      hasFinalAnswer: false
    };
  }

  render(props: UrlRouteProps, state: QuestionShowState): ComponentChild {
    let display: ComponentChild;
    if (state.step === "start") {
      display = this.renderQuestionStart(props, state);
    }
    else {
      display = this.renderQuestionShow(props, state);
    }

    return (
      <div class="question">{display}</div>
    )
  }

  private renderQuestionStart(props: UrlRouteProps, state: QuestionShowState): ComponentChild {
    return(
      <div>
        Show about this next question, prizes, etc.

        <button type="button" onClick={e => this.onShowQuestion(e)}>Show Question</button>

        <a href={`/game/${this.props.gameId}/finish`}>Take my stuff and run</a>

        <PrizeStack game={this.state.game} questionIdx={state.questionIdx} />

      </div>
    );
  }

  private renderQuestionShow(props: UrlRouteProps, state: QuestionShowState): ComponentChild {
    let question = state.question as Question;

    return(
      <div class={`question-show`}>
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
                  <input type="radio" name="selectedAnswerId" value={answer.id} id={`answer-${i}`} class={`${state.step} ${(question.correctId === answer.id) ? "correct" : ""}`} required={true}></input>
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
                  <input type="radio" name="selectedAnswerId" value={answer.id} id={`answer-${i+2}`} class={`${state.step} ${(question.correctId === answer.id) ? "correct" : ""}`} required={true}></input>
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
          </div>
        </form>

        {/* <PrizeStack game={this.state.game} questionIdx={questionIdx} /> */}
      </div>
    );
  }

  private renderQuestionResult(props: UrlRouteProps, state: QuestionShowState): ComponentChild {
    let question = state.question as Question;
    let result = state.game.questionsAsked[state.questionIdx];

    return(
      <div>
        <h1>{result.isCorrect ? "Correct!" : "Wrong"}</h1>
        <div>{question.afterText}</div>
        <div>
          <a href={`/game/${props.gameId}/q/${props.questionIdx + 1}`}>Next Question</a>
        </div>
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
        isCorrect: null
      }
      game.questionsAsked.push(questionAsked);
      GameController.saveGame(game);
    }

    SoundController.play({ name: "wait1" });
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
    questionAsked.isCorrect = (formData.get("selectedAnswerId") === question.correctId);
    GameController.saveGame(game);

    SoundController.stop({ name: "wait1" });
    SoundController.play({ name: "final_answer" });

    this.setState({ hasFinalAnswer: true });

    setTimeout(() => {
      this.setState({ step: "result", game, questionAsked });

      if (questionAsked.isCorrect) {
        SoundController.play({ name: "win" });
      }
      else {
        SoundController.play({ name: "lose" });
      }

    }, 5_000);
  }

}

