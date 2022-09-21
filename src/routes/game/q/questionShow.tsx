import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { UrlRouteProps } from 'src/app';
import { Game, GameController } from 'src/controllers/GameController';
import { Question, QuestionController } from 'src/controllers/QuestionController';
import { shuffleArray } from 'src/utils/shuffleArray';

import PrizeStack from 'src/components/prizeStack';

interface QuestionShowState {
  game: Game
  question: Question
  questionIdx: number
}

export default class QuestionShow extends Component<UrlRouteProps, QuestionShowState> {

  constructor(props: UrlRouteProps) {
    super();

    let questionIdx = parseInt(props.questionIdx, 10);
    let game = GameController.getGame(props.gameId) as Game;
    let question = QuestionController.getQuestion(props.gameId, questionIdx) as Question;
    if (!game || !question) {
      alert("TODO Bad Path");
    }

    this.state = { game, question, questionIdx };
  }

  render(props: UrlRouteProps, state: QuestionShowState): ComponentChild {
    let answers = shuffleArray(this.state.question.answers);
    let questionIdx = parseInt(props.questionIdx, 10);

    return(
      <div>
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

        <PrizeStack game={this.state.game} questionIdx={questionIdx} />
      </div>
    );
  }

  onSubmit(e: Event) {
    e.preventDefault();
    let formData = new FormData(e.target as HTMLFormElement);

    let result = this.state.game.questionsAsked[this.state.questionIdx];
    result.isCorrect = (formData.get("selectedAnswerId") === this.state.question.correctId);
    GameController.saveGame(this.state.game);

    route(`/game/${this.state.game.id}/q/${this.props.questionIdx}/result`);
  }

}

