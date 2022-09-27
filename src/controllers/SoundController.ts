export enum SOUND {
  closing = "closing",
  explain = "explain",
  final_answer = "final_answer",
  find_player = "find_player",
  lifeline_friend = "lifeline_friend",
  meet_contestant = "meet_contestant",
  opening_theme = "opening_theme",
  question_1 = "question_1",
  question_2 = "question_2",
  question_3 = "question_3",
  question_4 = "question_4",
  result_lose = "result_lose",
  result_win = "result_win",
};

const BASE_SOUND_PATH = "/assets/sounds";

class _SoundController {

  private _audioContext: AudioContext;
  private _sounds: { [key:string]: Promise<{
    buffer: AudioBuffer,
    lastSource?: AudioBufferSourceNode
  }>} = {};

  constructor() {
    this._audioContext = new AudioContext();

    Object.keys(SOUND).forEach(sound => {
      this._sounds[sound] = fetch(`${BASE_SOUND_PATH}/${sound}.mp3`)
        .then((resp) => resp.arrayBuffer())
        .then((buffer) => this._audioContext.decodeAudioData(buffer))
        .then((buffer) => {
          return { buffer };
        })
    });
  }

  async playQuestionSound(questionIdx: number) {
    if (questionIdx <= 1) {
      this.play(SOUND.question_1);
    }
    else if (questionIdx === 2) {
      this.play(SOUND.question_2);
    }
    else if (questionIdx === 3) {
      this.play(SOUND.question_3);
    }
    else {
      this.play(SOUND.question_4);
    }
  }

  async play(sound: SOUND, offset?: number, duration?: number) {
    let soundData = await this._sounds[sound];

    let source = this._audioContext.createBufferSource();
    source.buffer = soundData.buffer;
    source.connect(this._audioContext.destination);
    source.start(0, offset, duration);

    // only in case we need to stop it.
    soundData.lastSource = source;
  }

  async stop(sound: SOUND) {
    let soundData = await this._sounds[sound];
    if (soundData.lastSource) {
      soundData.lastSource.stop();
    }
  }

  async stopAll() {
    await Object.keys(SOUND).forEach(async sound => {
      await this.stop(sound as SOUND);
    });
  }
}

export const SoundController = new _SoundController();