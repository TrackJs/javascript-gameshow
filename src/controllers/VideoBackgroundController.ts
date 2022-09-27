export interface VideoBackgroundState {
  greenscreen: boolean
  loop: boolean
  playing: boolean
  sourceUrl: string
}

const SET_DISPLAY_URL = "/assets/video/set_display.mp4";
const SET_FANFARE_URL = "/assets/video/set_fanfare.mp4";

class _VideoBackgroundController {

  private getState: (() => VideoBackgroundState) = (() => { return {} as VideoBackgroundState });
  private setState: ((state: any) => void) | undefined;

  private initialState : VideoBackgroundState = {
    greenscreen: false,
    loop: false,
    playing: false,
    sourceUrl: SET_DISPLAY_URL
  };

  init(getState: () => VideoBackgroundState, setState: (state: any) => void) : VideoBackgroundState {
    this.getState = getState;
    this.setState = setState;
    return this.initialState;
  }

  playBackgroundLoop() : void {
    if (this.setState === undefined) {
      this.initialState = {
        greenscreen: false,
        loop: true,
        playing: true,
        sourceUrl: SET_DISPLAY_URL
      }
    }
    else {
      this.setState({
        greenscreen: false,
        loop: true,
        playing: true,
        sourceUrl: SET_DISPLAY_URL
      });
    }
  }

  pauseBackground() : void {
    if (this.setState === undefined) {
      this.initialState = {
        greenscreen: false,
        loop: true,
        playing: false,
        sourceUrl: SET_DISPLAY_URL
      }
    }
    else {
      this.setState({
        greenscreen: false,
        loop: false,
        playing: false,
        sourceUrl: SET_DISPLAY_URL
      });
    }
  }

  playFanfare() : void {
    if (this.setState === undefined) {
      this.initialState = {
        greenscreen: false,
        loop: false,
        playing: true,
        sourceUrl: SET_FANFARE_URL
      }
    }
    else {
      this.setState({
        greenscreen: false,
        loop: false,
        playing: true,
        sourceUrl: SET_FANFARE_URL
      });
    }
  }

  greenscreen() : void {
    if (this.setState === undefined) {
      this.initialState = {
        greenscreen: true,
        loop: true,
        playing: true,
        sourceUrl: SET_DISPLAY_URL
      }
    }
    else {
      this.setState({
        greenscreen: true,
        loop: true,
        playing: true,
        sourceUrl: SET_DISPLAY_URL
      });
    }
  }

}

export const VideoBackgroundController = new _VideoBackgroundController();