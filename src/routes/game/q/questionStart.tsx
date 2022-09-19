import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/components/app';
import { Game } from 'src/Game';
import { GameController } from 'src/GameController';
import { GameRepository } from 'src/GameRepository';

export default class QuestionStart extends Component<UrlRouteProps, any> {

  render(): ComponentChild {
    return(
      <div>
        Show about this next question, prizes, etc.

        <a href={`/game/${this.props.gameId}/q/${this.props.questionIdx}/show`}>Show me the question</a>
        <a href={`/game/${this.props.gameId}/finish`}>Take my stuff and run</a>

      </div>
    );
  }


}

