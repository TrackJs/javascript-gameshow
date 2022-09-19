import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { UrlRouteProps } from 'src/components/app';
import { Game } from 'src/Game';
import { GameController } from 'src/GameController';
import { GameRepository } from 'src/GameRepository';

export default class Finish extends Component<UrlRouteProps, any> {

  render(): ComponentChild {

    return(
      <div>
        <h1>Finishing the game</h1>
      </div>
    );
  }


}

