import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { UrlRouteProps } from 'src/components/app';
import { Game } from 'src/Game';
import { GameController } from 'src/GameController';
import { GameRepository } from 'src/GameRepository';
import { Question, QuestionController } from 'src/QuestionController';
import { shuffleArray } from 'src/utils/shuffleArray';

type QuestionShowState = {
  question: Question
}

export default class QuestionShow extends Component<UrlRouteProps, QuestionShowState> {

  constructor(props: UrlRouteProps) {
    super();

    if (!props.gameId || !props.questionIdx) {
      route("/error/404");
    }

    let question = QuestionController.getQuestion(props.gameId as string, props.questionIdx as string);
    if (!question) {
      alert('TODO could not get a question');
    }

    this.state = {
      question: question as Question
    };
  }

  render(): ComponentChild {
    let answers = shuffleArray(this.state.question.answers);
    return(
      <form class="question" onSubmit={this.onSubmit.bind(this)}>
        <div class="question-text">{this.state.question.text}</div>
        <ol class="answers">
          { answers.map(answer => (
            <li>
              <label>
                <span>{answer.text}</span>
                <input type="radio" name="selectedAnswerId" value={answer.id}></input>
              </label>
            </li>
          ))}
        </ol>
        <button type="submit">Final Answer</button>
      </form>
    );
  }

  onSubmit(e: Event) {
    e.preventDefault();
    let formData = new FormData(e.target as HTMLFormElement);

    let isCorrect = (formData.get("selectedAnswerId") === this.state.question.correctId);

    console.log(isCorrect);
  }

}

