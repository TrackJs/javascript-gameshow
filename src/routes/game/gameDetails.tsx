import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';
import { Game, GameController } from 'src/controllers/GameController';
import { route } from 'preact-router';

export default class GameDetails extends Component<UrlRouteProps, any> {

  componentWillMount() {
    let game = GameController.getGame(this.props.gameId);

    if (!game.isFinished) {
      let nextQuestion = 0;

      if (game.questionsAsked.length) {
        let unAnsweredQuestion = game.questionsAsked.find(qa => !qa.answerId);
        if (unAnsweredQuestion) {
          nextQuestion = unAnsweredQuestion.questionIdx;
        }
      }

      route(`/game/${this.props.gameId}/q/${nextQuestion}`, true);
    }

  }

  render() {
    return (
      <div>Finished</div>
    );
  }

}
