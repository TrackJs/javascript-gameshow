import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { GameController } from 'src/controllers/GameController';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { VideoBackgroundController } from 'src/controllers/VideoBackgroundController';

export default class GameNew extends Component<any, any> {

  componentDidMount(): void {
    SoundController.play(SOUND.meet_contestant);
    VideoBackgroundController.playBackgroundLoop();
  }

  componentWillUnmount(): void {
    SoundController.stop(SOUND.meet_contestant);
    VideoBackgroundController.pauseBackground();
  }

  render(): ComponentChild {
    return (
      <div class="route-game-new flex flex-column justify-center align-center">
        <img src="/assets/images/logo.png" class="glow" width="400" height="400" />
        <form onSubmit={this.onNewGameSubmit.bind(this)} disabled={this.state.disabled}>
          <div>
            <input type="text" name="name" required placeholder="What is your name?" />
          </div>
          <div class="form-controls">
            <button type="submit" class="btn btn-purple btn-round">Play<br />Game</button>
          </div>
        </form>

        <div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route("/")}>Home</button>
        </div>

      </div>
    );
  }

  onNewGameSubmit(e: Event) {
    e.preventDefault();
    this.setState({ disabled: true });
    const data = new FormData(e.target as HTMLFormElement);

    const game = GameController.createGame({
      playerName: (data.get("name") || "anonymous") as string
    });

    route(`/game/${game.id}/q/0`, false);
  }

}

