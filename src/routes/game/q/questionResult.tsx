import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController } from 'src/controllers/GameController';
import { Question, QuestionController } from 'src/controllers/QuestionController';

interface QuestionResultState {
  game: Game
  question: Question
}

export default class QuestionResult extends Component<UrlRouteProps, QuestionResultState> {

  constructor(props: UrlRouteProps) {
    super();

    let game = GameController.getGame(props.gameId) as Game;
    let question = QuestionController.getQuestion(props.gameId, props.questionIdx) as Question;
    if (!game || !question) {
      alert("TODO Bad Path");
    }

    this.state = { game, question };
  }

  render(props: UrlRouteProps, state: QuestionResultState): ComponentChild {
    let result = state.game.questionsAsked[parseInt(props.questionIdx, 10)];

    return(
      <div>
        <h1>{result.isCorrect ? "Correct!" : "Wrong"}</h1>
        <div>{state.question.afterText}</div>
        <div>
          <a href={`/game/${props.gameId}/q/${props.questionIdx + 1}`}>Next Question</a>
        </div>
      </div>
    );
  }

}
