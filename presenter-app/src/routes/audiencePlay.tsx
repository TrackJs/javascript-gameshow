import { h, Component, ComponentChild } from 'preact';
import { initializeApp } from '@firebase/app';
import { getDatabase, ref, onValue } from '@firebase/database';
import { UrlRouteProps } from 'src/app';
import GameLogo from 'src/components/gameLogo';
import PrizeStack from 'src/components/prizeStack';
import { AudiencePlayController, AudiencePlayGame } from 'src/controllers/AudiencePlayController';
import { Game } from 'src/controllers/GameController';
import PrizeShow from 'src/components/prizeShow';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { VideoBackgroundController } from 'src/controllers/VideoBackgroundController';
import { route } from 'preact-router';

interface AudiencePlayQuestion {
  eventId: string,
  questionId: string,
  questionMode: "choice" | "text",
  questionText: string,
  submitTime: Date,
  answers: {
    [answerId: string]: {
      answerText: string,
      correct: boolean
    }
  }
}

interface AudiencePlayState {
  question?: AudiencePlayQuestion,
  game?: AudiencePlayGame
}

export default class AudiencePlay extends Component<UrlRouteProps, AudiencePlayState> {

  constructor() {
    super();
    this.state = {
      question: undefined,
      game: undefined,
    };

    this._listenToFirebase();

  }

  componentDidUpdate(previousProps: Readonly<UrlRouteProps>, previousState: Readonly<AudiencePlayState>, snapshot: any): void {
    if (this.state.game && this.state.question) {
      SoundController.stopAll();
      SoundController.playQuestionSound(this.state.game.questionsShown.length - 1);
      VideoBackgroundController.playFanfare();
    }
    else {
      SoundController.stopAll();
      SoundController.play(SOUND.explain);
      VideoBackgroundController.playBackgroundLoop();
    }
  }

  componentWillUnmount(): void {
    SoundController.stopAll();
    VideoBackgroundController.pauseBackground();
  }

  // prizeController = new PrizeController();

  render(props: UrlRouteProps, state: AudiencePlayState): ComponentChild {

    let bonusPrize = state.game?.bonusPrizes[state.question?.questionId || -1];

    return (
      <div class="route-audience-play show-question">

        {(state.question) ? (
          <div class="question-wrap">
            <div>What is the result of this JavaScript?</div>
            <pre>{state.question.questionText}</pre>
          </div>
        ) : (
          <div class="waiting-spinner flex-column align-center">
            <div class="instruction">
              <img src="/assets/images/audience-app-qr.png" width="500" height="500" />
              <p><strong>javascript-gameshow.web.app</strong></p>
            </div>
            <div>
              <div class="lds-grid spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )
        }

        {
          (bonusPrize) ? (
            <div class="bonus-prize-to-win">
              <PrizeShow prize={bonusPrize} />
            </div>
          ) : ""
        }

        {!!state.game ? (
          <div class="prize-stack-wrap glow">
            <PrizeStack game={state.game as unknown as Game} askIdx={-1} />
          </div>
        ) : ""}


        <div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route("/")}>Home</button>
          <button hidden={!!state.game} class="btn btn-purple" type="button" onClick={e => this.getGameAndPrizes()}>Show Prizes</button>
        </div>

        <GameLogo />
      </div >
    );
  }

  private getGameAndPrizes(): AudiencePlayGame {
    let game = AudiencePlayController.getGame();
    this.setState({ game });
    return game;
  }

  private _listenToFirebase() {
    const firebaseApp = initializeApp({
      projectId: "javascript-gameshow",
      databaseURL: "https://javascript-gameshow-default-rtdb.europe-west1.firebasedatabase.app"
    });

    const firebaseDB = getDatabase(firebaseApp);
    const activeQuestionRef = ref(firebaseDB, '/activeQuestion');
    onValue(activeQuestionRef, (snapshot) => {
      let question = snapshot.val();
      if (question) {
        let game = this.getGameAndPrizes();
        AudiencePlayController.setQuestionShown(game, question.questionId);
      }
      this.setState({ question });
    });
  }

}
