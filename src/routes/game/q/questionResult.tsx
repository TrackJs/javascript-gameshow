import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { UrlRouteProps } from 'src/components/app';
import { Game } from 'src/Game';
import { GameRepository } from 'src/GameRepository';
import { Question, QuestionController } from 'src/QuestionController';

type QuestionResultState = {
  game: Game
  question: Question
}

export default class QuestionResult extends Component<UrlRouteProps, QuestionResultState> {

  constructor(props: UrlRouteProps) {
    super();

    if (!props.gameId || !props.questionIdx) {
      route("/error/404");
    }

    let game = GameRepository.getGame(props.gameId) as Game;
    let question = QuestionController.getQuestion(props.gameId, props.questionIdx) as Question;

    this.state = { game, question };
  }

  render(props: UrlRouteProps, state: QuestionResultState): ComponentChild {
    let result = state.game.questionsAsked[parseInt(props.questionIdx, 10)];

    return(
      <div>
        <h1>{result.isCorrect ? "Correct!" : "Wrong"}</h1>
        <div>{state.question.afterText}</div>
        <div>
          <a href={`/game/${props.gameId}/q/${parseInt(props.questionIdx, 10) + 1}`}>Next Question</a>
        </div>
      </div>
    );
  }


}

