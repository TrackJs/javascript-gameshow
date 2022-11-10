import { h, Component, ComponentChild } from 'preact';

export default class GameLogo extends Component<any, any> {

  render(): ComponentChild {
    return(
      <div class="game-logo">
        <img class="glow" src="/assets/images/logo.png" height="120" width="120"/>
      </div>
    );
  }

}
