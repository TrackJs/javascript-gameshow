import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { UrlRouteProps } from 'src/components/app';
import { Game } from 'src/Game';
import { GameController } from 'src/GameController';
import { GameRepository } from 'src/GameRepository';
import { Question, QuestionController } from 'src/QuestionController';
import { shuffleArray } from 'src/utils/shuffleArray';

type QuestionShowState = {
  game: Game
  question: Question
}

export default class QuestionShow extends Component<UrlRouteProps, QuestionShowState> {

  constructor(props: UrlRouteProps) {
    super();

    if (!props.gameId || !props.questionIdx) {
      route("/error/404");
    }

    let question = QuestionController.getQuestion(props.gameId, props.questionIdx);
    if (!question) {
      alert('TODO could not get a question');
    }

    let game = GameRepository.getGame(props.gameId) as Game;
    if (!game) {
      alert('TODO could not get the game');
    }

    this.state = {
      game,
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

    this.state.game.QuestionsAsked.push({
      questionIdx: this.props.questionIdx,
      questionId: this.state.question.id,
      isCorrect: (formData.get("selectedAnswerId") === this.state.question.correctId)
    });

    GameRepository.saveGame(this.state.game);
    route(`/game/${this.state.game.id}/q/${this.props.questionIdx}/result`);
  }

}

