import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { UrlRouteProps } from 'src/components/app';
import { Game } from 'src/Game';
import { GameController } from 'src/GameController';
import { GameRepository } from 'src/GameRepository';
import { QuestionController } from 'src/QuestionController';

export default class QuestionShow extends Component<UrlRouteProps, any> {

  constructor(props: UrlRouteProps) {
    super();

    if (!props.gameId || !props.questionIdx) {
      route("/error/404");
    }
  }

  render(): ComponentChild {
    let question = QuestionController.getQuestion(this.props.questionIdx as string);

    return(
      <form class="question" onSubmit={this.onSubmit.bind(this)}>
        <div class="question-text">{question.text}</div>
        <ol class="answers">
          { question.options.map(o => (
            <li>
              <label>
                <span>{o.text}</span>
                <input type="radio" name="answer" value={`${!!o.isCorrect}`}></input>
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

    let isCorrect = (formData.get("answer") === "true");

    console.log(isCorrect);
  }

}

