import { h, Component, ComponentChild } from 'preact';
import { VideoBackgroundController, VideoBackgroundState } from 'src/controllers/VideoBackgroundController';
import { Player, ControlBar } from 'video-react';

import '../../node_modules/video-react/dist/video-react.css'; // import css

export default class VideoBackground extends Component<any, VideoBackgroundState> {

  private player: any = null;

  constructor() {
    super();
    this.state = VideoBackgroundController.init(() => this.state, this.setState.bind(this));
  }

  componentDidUpdate(prevProps : any, prevState : VideoBackgroundState) {
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
    return(
      <div class={`c-video-background ${state.greenscreen ? "greenscreen" : ""}`}>

          {/*
  // @ts-ignore */}<Player loop={state.loop} ref={(player: any) => {
            this.player = player;
          }}
          fluid={true}
          autoPlay={state.playing} muted={true} >
          <ControlBar disableCompletely={false} />
          <source src={state.sourceUrl} />
        </Player>
      </div>
    );
  }

}
