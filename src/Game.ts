import { DateTime } from 'luxon';

export type GameOptions = {
  playerName: string;
}

export class Game {

  public id: string|undefined
  public playerName: string
  public startedOn: DateTime

  public QuestionsAsked: {
    questionIdx: string,
    questionId: string,
    isCorrect: boolean
  }[] = [];

  constructor(opts: GameOptions) {
    this.playerName = opts.playerName
    this.startedOn = DateTime.now();
  }
}