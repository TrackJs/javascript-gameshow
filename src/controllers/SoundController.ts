export interface SoundOptions {
  name: string,
}

const SOUND_PATH : { [key:string] : string } = {
  "wait1":        "/assets/sounds/1.ogg",
  "wait2":        "/assets/sounds/2.ogg",
  "wait3":        "/assets/sounds/3.ogg",
  "wait4":        "/assets/sounds/4.ogg",
  "win":          "/assets/sounds/win.ogg",
  "lose":         "/assets/sounds/lose.ogg",
  "final_answer": "/assets/sounds/final_answer.ogg"
};

class _SoundController {

  private soundLookup : { [key:string]: {
    arrayBuffer: ArrayBuffer
    audioBuffer?: AudioBuffer
    source?: AudioBufferSourceNode
  } } = {};

  constructor() {
    // preload the audio data, but don't depend on context yet.
    Object.keys(SOUND_PATH).forEach(key => {
      fetch(SOUND_PATH[key])
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          this.soundLookup[key] = { arrayBuffer };
        });
    })
  }

  play(opts: SoundOptions) {
    let context = this.getAudioContext();
    let sound = this.soundLookup[opts.name];

    if (sound.audioBuffer) {
      sound.source = context.createBufferSource();
      sound.source.buffer = sound.audioBuffer;
      sound.source.connect(context.destination);
      sound.source.start(0);
    }
    else {
      context.decodeAudioData(sound.arrayBuffer)
        .then((audioBuffer) => {
          sound.audioBuffer = audioBuffer;
          sound.source = context.createBufferSource();
          sound.source.buffer = audioBuffer;
          sound.source.connect(context.destination);
          sound.source.start(0);
        });
    }
  }

  stop(opts: SoundOptions) {
    let sound = this.soundLookup[opts.name];
    if (sound.source) {
      sound.source.stop();
    }
  }

  private _audioContext : AudioContext|undefined;
  private getAudioContext() : AudioContext {
    if (!this._audioContext) {
      this._audioContext = new AudioContext();
    }
    return this._audioContext;
  }

}

export const SoundController = new _SoundController();