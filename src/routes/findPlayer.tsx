import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { SOUND, SoundController } from 'src/controllers/SoundController';

export default class FindPlayer extends Component<any, any> {

	componentDidMount(): void {
		SoundController.play(SOUND.find_player, 0, 50);
	}

	componentWillUnmount(): void {
		SoundController.stop(SOUND.find_player);
	}

	render() : ComponentChild {
		return (
			<div class="route-find-player flex flex-column align-center">

        <div class="box flex flex-column align-center">
          <h1><span class="sub">Who&apos;s ready to be a</span> <span class="main">JavaScriptær?</span></h1>
          <div class="instruction">
            Fastest Tweet to <strong>@ToddHGardner</strong> with the correct answer
          </div>
        </div>

				<div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route("/")}>Home</button>
					<button class="btn btn-purple" type="button" onClick={e => this.onShowQuestion()}>Show Question</button>
				</div>

			</div>
		);
	}

  private onShowQuestion() : void {
    SoundController.stop(SOUND.find_player);
    SoundController.play(SOUND.find_player, 51.6);
  }

}