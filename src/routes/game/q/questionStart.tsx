import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController } from 'src/controllers/GameController';
import { Question, QuestionController } from 'src/controllers/QuestionController';

import PrizeStack from 'src/components/prizeStack';

export default class QuestionStart extends Component<UrlRouteProps, any> {

  constructor(props: UrlRouteProps) {
    super();

    let questionIdx = parseInt(props.questionIdx, 10);
    let game = GameController.getGame(props.gameId) as Game;
    let question = QuestionController.getQuestion(props.gameId, questionIdx) as Question;
    if (!game || !question) {
      alert("TODO Bad Path");
    }

    // Selecting this question, save it to the game so we remember it.
    if (!game.questionsAsked.some(q => q.questionIdx === questionIdx)) {
      game.questionsAsked.push({
        questionIdx,
        questionId: question.id,
        isCorrect: null
      });
      GameController.saveGame(game);
    }

    this.state = { game, question, questionIdx };
  }

  render(props: UrlRouteProps, state: any): ComponentChild {
    return(
      <div>
        Show about this next question, prizes, etc.

        <a href={`/game/${this.props.gameId}/q/${this.props.questionIdx}/show`}>Show me the question</a>
        <a href={`/game/${this.props.gameId}/finish`}>Take my stuff and run</a>

        <PrizeStack game={this.state.game} questionIdx={state.questionIdx} />

      </div>
    );
  }


}

