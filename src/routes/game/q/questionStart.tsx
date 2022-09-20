import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/components/app';
import { Game } from 'src/Game';
import { GameController } from 'src/GameController';
import { GameRepository } from 'src/GameRepository';

import PrizeStack from 'src/components/prizeStack';
import { Question, QuestionController } from 'src/QuestionController';

export default class QuestionStart extends Component<UrlRouteProps, any> {

  constructor(props: UrlRouteProps) {
    super();

    let game = GameRepository.getGame(props.gameId) as Game;
    let question = QuestionController.getQuestion(props.gameId, props.questionIdx) as Question;
    if (!game || !question) {
      alert("TODO Bad Path");
    }

    // Selecting this question, save it to the game so we remember it.
    if (!game.questionsAsked.some(q => q.questionIdx === props.questionIdx)) {
      game.questionsAsked.push({
        questionIdx: props.questionIdx,
        questionId: question.id,
        isCorrect: null
      });
      GameRepository.saveGame(game);
    }

    this.state = { game, question };
  }

  render(): ComponentChild {
    return(
      <div>
        Show about this next question, prizes, etc.

        <a href={`/game/${this.props.gameId}/q/${this.props.questionIdx}/show`}>Show me the question</a>
        <a href={`/game/${this.props.gameId}/finish`}>Take my stuff and run</a>

        <PrizeStack game={this.state.game} questionIdx={parseInt(this.props.questionIdx, 10)} />

      </div>
    );
  }


}

