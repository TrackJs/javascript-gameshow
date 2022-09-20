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

  render(): ComponentChild {
    let result = this.state.game.questionsAsked[parseInt(this.props.questionIdx, 10)];
    return(
      <div>
        <h1>{result.isCorrect ? "Correct!" : "Wrong"}</h1>
        <div>{this.state.question.afterText}</div>
      </div>
    );
  }


}

