import { h, Component, ComponentChild, JSX } from 'preact';
import { VideoBackgroundController, VideoBackgroundState } from 'src/controllers/VideoBackgroundController';
import { Player, PlayerProps, ControlBar } from 'video-react';

import '../../node_modules/video-react/dist/video-react.css'; // import css

interface PlayerProps2 extends PlayerProps {
  loop: boolean
}
const StupidPlayerThatDidTypesWrong = Player as ((props: PlayerProps2) => JSX.Element);

export default class VideoBackground extends Component<any, VideoBackgroundState> {

  private player: any = null;

  constructor() {
    super();
    this.state = VideoBackgroundController.init(() => this.state, this.setState.bind(this));
  }

  componentDidUpdate(prevProps: any, prevState: VideoBackgroundState) {
    if (this.state.sourceUrl !== prevState.sourceUrl) {
      this.player.load();
    }
    if (this.state.playing) {
      this.player.play();
    }
    else {
      this.player.pause();
    }
  }

  render(props: any, state: VideoBackgroundState): ComponentChild {
    return (
      <div class={`c-video-background ${state.greenscreen ? "greenscreen" : ""}`}>
        <StupidPlayerThatDidTypesWrong loop={state.loop} ref={(player: any) => { this.player = player; }}
          fluid={true}
          autoPlay={state.playing} muted={true} >
          <ControlBar disableCompletely={false} />
          <source src={state.sourceUrl} />
        </StupidPlayerThatDidTypesWrong>
      </div>
    );
  }

}
