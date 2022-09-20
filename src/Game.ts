import { DateTime } from 'luxon';
import { Prize } from './PrizeController';

export type GameOptions = {
  id: string;
  playerName: string;
}

export class Game {

  public id: string
  public playerName: string
  public startedOn: DateTime

  public questionsAsked: {
    questionIdx: string,
    questionId: string,
    isCorrect: boolean
  }[] = [];

  public prizeStack: Prize[] = [];

  constructor(opts: GameOptions) {
    this.id = opts.id;
    this.playerName = opts.playerName;
    this.startedOn = DateTime.now();
  }
}