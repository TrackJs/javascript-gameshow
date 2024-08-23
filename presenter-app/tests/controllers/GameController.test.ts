import { DateTime } from 'luxon';
import { Game, GameController } from '../../src/controllers/GameController';

describe("GameController", () => {

  beforeEach(() => {
    localStorage.clear();
    GameController._reset();
  });

  it("works with all correct answers", () => {

    let game = GameController.createGame({ playerName: "test" });
    expect(game).toMatchObject({
      id: "0",
      playerName: "test",
      startedOn: expect.any(DateTime),
      lifeLines: [
        expect.objectContaining({
          name: expect.any(String),
          isUsed: false
        })
      ],
      questions: [],
      prizes: [
        expect.objectContaining({
          prizeIdx: expect.any(Number)
        }),
        expect.objectContaining({
          prizeIdx: expect.any(Number)
        }),
        expect.objectContaining({
          prizeIdx: expect.any(Number)
        }),
        expect.objectContaining({
          prizeIdx: expect.any(Number)
        }),
        expect.objectContaining({
          prizeIdx: expect.any(Number)
        })
      ],
      isFinished: false
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("game-0", expect.any(String));
    expect(localStorage.setItem).not.toHaveBeenCalledWith("question-usage", expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith("prize-usage", expect.any(String));
    jest.clearAllMocks();

    let question1 = GameController.getQuestion(game, 0);

    expect(game.questions[0]).toBe(question1);
    expect(question1.askedOn).toBe("0-0");
    expect(localStorage.setItem).toHaveBeenCalledWith("game-0", expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith("question-usage", expect.any(String));
    jest.clearAllMocks();

    GameController.finalAnswer(game, 0, question1.correctAnswerIdx);

    expect(question1.isCorrect).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("game-0", expect.any(String));
    expect(localStorage.setItem).not.toHaveBeenCalledWith("question-usage", expect.any(String));
    expect(localStorage.setItem).not.toHaveBeenCalledWith("prize-usage", expect.any(String));
    jest.clearAllMocks();

    let question2 = GameController.getQuestion(game, 1);
    GameController.finalAnswer(game, 1, question2.correctAnswerIdx);

    expect(game.questions[1]).toBe(question2);
    expect(question2.askedOn).toBe("0-1");
    expect(question2.isCorrect).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("game-0", expect.any(String));
    jest.clearAllMocks();

    let question3 = GameController.getQuestion(game, 2);
    GameController.finalAnswer(game, 2, question3.correctAnswerIdx);

    expect(game.questions[2]).toBe(question3);
    expect(question3.askedOn).toBe("0-2");
    expect(question3.isCorrect).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("game-0", expect.any(String));
    jest.clearAllMocks();

    let question4 = GameController.getQuestion(game, 3);
    GameController.finalAnswer(game, 3, question4.correctAnswerIdx);

    expect(game.questions[3]).toBe(question4);
    expect(question4.askedOn).toBe("0-3");
    expect(question4.isCorrect).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("game-0", expect.any(String));
    jest.clearAllMocks();

    let question5 = GameController.getQuestion(game, 4);
    GameController.finalAnswer(game, 4, question5.correctAnswerIdx);

    expect(game.questions[4]).toBe(question5);
    expect(question5.askedOn).toBe("0-4");
    expect(question5.isCorrect).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("game-0", expect.any(String));
    jest.clearAllMocks();

    GameController.finishGame(game);

    expect(game.isFinished).toBe(true);
    expect(game.prizes).toEqual([
      expect.objectContaining({
        isWon: true
      }),
      expect.objectContaining({
        isWon: true
      }),
      expect.objectContaining({
        isWon: true
      }),
      expect.objectContaining({
        isWon: true
      }),
      expect.objectContaining({
        isWon: true
      })
    ]);
    expect(localStorage.setItem).toHaveBeenCalledWith("game-0", expect.any(String));
    expect(localStorage.setItem).not.toHaveBeenCalledWith("prize-usage", expect.any(String));
  });

  it("works with 1st answer wrong", () => {

    let game = GameController.createGame({ playerName: "test" });
    expect(game).toMatchObject({
      id: "0",
      playerName: "test",
      startedOn: expect.any(DateTime),
      lifeLines: [
        expect.objectContaining({
          name: expect.any(String),
          isUsed: false
        })
      ],
      questions: [],
      prizes: [
        expect.objectContaining({
          prizeIdx: expect.any(Number)
        }),
        expect.objectContaining({
          prizeIdx: expect.any(Number)
        }),
        expect.objectContaining({
          prizeIdx: expect.any(Number)
        }),
        expect.objectContaining({
          prizeIdx: expect.any(Number)
        }),
        expect.objectContaining({
          prizeIdx: expect.any(Number)
        })
      ],
      isFinished: false
    });

    let question1 = GameController.getQuestion(game, 0);
    GameController.finalAnswer(game, 0, (question1.correctAnswerIdx - 1));

    expect(question1.isCorrect).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith("game-0", expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith("question-usage", expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith("prize-usage", expect.any(String));
    jest.clearAllMocks();

    GameController.finishGame(game);

    expect(game.isFinished).toBe(true);
    expect(game.prizes).toEqual([
      expect.objectContaining({
        isWon: false
      }),
      expect.objectContaining({
        isWon: false
      }),
      expect.objectContaining({
        isWon: false
      }),
      expect.objectContaining({
        isWon: false
      }),
      expect.objectContaining({
        isWon: false
      })
    ]);
    expect(localStorage.setItem).toHaveBeenCalledWith("game-0", expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith("prize-usage", expect.any(String));
  });

  it("works with at least 3 fully-won games", () => {

    for (let gameIdx = 0; gameIdx < 3; gameIdx++) {
      let game = GameController.createGame({ playerName: `player${gameIdx}` });
      for (let questionIdx = 0; questionIdx < 5; questionIdx++) {
        let question = GameController.getQuestion(game, questionIdx);
        GameController.finalAnswer(game, questionIdx, question.correctAnswerIdx);
      }
      GameController.finishGame(game);
      expect(game.questions).toEqual([
        expect.objectContaining({ isCorrect: true }),
        expect.objectContaining({ isCorrect: true }),
        expect.objectContaining({ isCorrect: true }),
        expect.objectContaining({ isCorrect: true }),
        expect.objectContaining({ isCorrect: true })
      ]);
      expect(game.prizes).toEqual([
        expect.objectContaining({ isWon: true }),
        expect.objectContaining({ isWon: true }),
        expect.objectContaining({ isWon: true }),
        expect.objectContaining({ isWon: true }),
        expect.objectContaining({ isWon: true })
      ]);
    }

    let questionUsageResult = JSON.parse(localStorage.getItem("question-usage") as string);
    expect(questionUsageResult).toEqual([
      expect.objectContaining({ gameId: "0", askIdx: 0 }),
      expect.objectContaining({ gameId: "0", askIdx: 1 }),
      expect.objectContaining({ gameId: "0", askIdx: 2 }),
      expect.objectContaining({ gameId: "0", askIdx: 3 }),
      expect.objectContaining({ gameId: "0", askIdx: 4 }),
      expect.objectContaining({ gameId: "1", askIdx: 0 }),
      expect.objectContaining({ gameId: "1", askIdx: 1 }),
      expect.objectContaining({ gameId: "1", askIdx: 2 }),
      expect.objectContaining({ gameId: "1", askIdx: 3 }),
      expect.objectContaining({ gameId: "1", askIdx: 4 }),
      expect.objectContaining({ gameId: "2", askIdx: 0 }),
      expect.objectContaining({ gameId: "2", askIdx: 1 }),
      expect.objectContaining({ gameId: "2", askIdx: 2 }),
      expect.objectContaining({ gameId: "2", askIdx: 3 }),
      expect.objectContaining({ gameId: "2", askIdx: 4 })
    ]);


    let prizeUsageResult = JSON.parse(localStorage.getItem("prize-usage") as string);
    expect(prizeUsageResult).toEqual([
      expect.objectContaining({ gameId: "0", askIdx: 0 }),
      expect.objectContaining({ gameId: "0", askIdx: 1 }),
      expect.objectContaining({ gameId: "0", askIdx: 2 }),
      expect.objectContaining({ gameId: "0", askIdx: 3 }),
      expect.objectContaining({ gameId: "0", askIdx: 4 }),
      expect.objectContaining({ gameId: "1", askIdx: 0 }),
      expect.objectContaining({ gameId: "1", askIdx: 1 }),
      expect.objectContaining({ gameId: "1", askIdx: 2 }),
      expect.objectContaining({ gameId: "1", askIdx: 3 }),
      expect.objectContaining({ gameId: "1", askIdx: 4 }),
      expect.objectContaining({ gameId: "2", askIdx: 0 }),
      expect.objectContaining({ gameId: "2", askIdx: 1 }),
      expect.objectContaining({ gameId: "2", askIdx: 2 }),
      expect.objectContaining({ gameId: "2", askIdx: 3 }),
      expect.objectContaining({ gameId: "2", askIdx: 4 })
    ]);

  });

  it("works with at least 3 games with 2 answered questions, then 3 fully answered games", () => {

    for (let gameIdx = 0; gameIdx < 3; gameIdx++) {
      let game = GameController.createGame({ playerName: `player${gameIdx}` });
      let question1 = GameController.getQuestion(game, 0);
      GameController.finalAnswer(game, 0, question1.correctAnswerIdx);
      let question2 = GameController.getQuestion(game, 1);
      GameController.finalAnswer(game, 1, question2.correctAnswerIdx - 1);

      GameController.finishGame(game);
      expect(game.questions).toEqual([
        expect.objectContaining({ isCorrect: true }),
        expect.objectContaining({ isCorrect: false })
      ]);
      expect(game.prizes).toEqual([
        expect.objectContaining({ isWon: false }),
        expect.objectContaining({ isWon: false }),
        expect.objectContaining({ isWon: false }),
        expect.objectContaining({ isWon: false }),
        expect.objectContaining({ isWon: false })
      ]);
    }

    for (let gameIdx = 2; gameIdx < 5; gameIdx++) {
      let game = GameController.createGame({ playerName: `player${gameIdx}` });
      for (let questionIdx = 0; questionIdx < 5; questionIdx++) {
        let question = GameController.getQuestion(game, questionIdx);
        GameController.finalAnswer(game, questionIdx, question.correctAnswerIdx);
      }
      GameController.finishGame(game);
      expect(game.questions).toEqual([
        expect.objectContaining({ isCorrect: true }),
        expect.objectContaining({ isCorrect: true }),
        expect.objectContaining({ isCorrect: true }),
        expect.objectContaining({ isCorrect: true }),
        expect.objectContaining({ isCorrect: true })
      ]);
      expect(game.prizes).toEqual([
        expect.objectContaining({ isWon: true }),
        expect.objectContaining({ isWon: true }),
        expect.objectContaining({ isWon: true }),
        expect.objectContaining({ isWon: true }),
        expect.objectContaining({ isWon: true })
      ]);
    }

  });

  describe("finalizePrizes()", () => {

    it("state contains no prizes for no correct answers", () => {
      let game = {
        questions: [
          { isCorrect: false },
        ],
        prizes: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz", isThreshold: true },
          { name: "goo" },
          { name: "bla" }
        ]
      } as Game;

      GameController.finalizePrizes(game);

      expect(game.prizes.filter(p => p.isWon)).toMatchObject([]);
    });

    it("state has 1 prize for 1 correct answer and quit", () => {
      let game = {
        questions: [
          { isCorrect: true },
        ],
        prizes: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz", isThreshold: true },
          { name: "goo" },
          { name: "bla" }
        ]
      } as Game;

      GameController.finalizePrizes(game);

      expect(game.prizes.filter(p => p.isWon)).toMatchObject([{ name: "foo", isWon: true }]);
    });

    it("state has 2 prize for 2 correct answer and quit", () => {
      let game = {
        questions: [
          { isCorrect: true },
          { isCorrect: true },
        ],
        prizes: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz", isThreshold: true },
          { name: "goo" },
          { name: "bla" }
        ]
      } as Game;

      GameController.finalizePrizes(game);

      expect(game.prizes.filter(p => p.isWon)).toMatchObject([
        { name: "foo", isWon: true },
        { name: "bar", isWon: true }
      ]);
    });

    it("state has 3 prize for 3 correct answer and quit", () => {
      let game = {
        questions: [
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: true },
        ],
        prizes: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz", isThreshold: true },
          { name: "goo" },
          { name: "bla" }
        ]
      } as Game;

      GameController.finalizePrizes(game);

      expect(game.prizes.filter(p => p.isWon)).toMatchObject([
        { name: "foo", isWon: true },
        { name: "bar", isWon: true },
        { name: "baz", isWon: true },
      ]);
    });

    it("state has 4 prize for 4 correct answer and quit", () => {
      let game = {
        questions: [
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: true },
        ],
        prizes: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz", isThreshold: true },
          { name: "goo" },
          { name: "bla" }
        ]
      } as Game;

      GameController.finalizePrizes(game);

      expect(game.prizes).toMatchObject([
        { name: "foo", isWon: true },
        { name: "bar", isWon: true },
        { name: "baz", isWon: true },
        { name: "goo", isWon: true },
        { name: "bla", isWon: false }
      ]);
    });

    it("state contains no prizes for 1 correct and 1 wrong", () => {
      let game = {
        questions: [
          { isCorrect: true },
          { isCorrect: false },
        ],
        prizes: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz", isThreshold: true },
          { name: "goo" },
          { name: "bla" }
        ]
      } as Game;

      GameController.finalizePrizes(game);

      expect(game.prizes.filter(p => p.isWon)).toMatchObject([]);
    });

    it("state contains no prizes for 2 correct and 1 wrong", () => {
      let game = {
        questions: [
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: false },
        ],
        prizes: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz", isThreshold: true },
          { name: "goo" },
          { name: "bla" }
        ]
      } as Game;

      GameController.finalizePrizes(game);

      expect(game.prizes.filter(p => p.isWon)).toMatchObject([]);
    });

    it("state contains threshold prizes for 3 correct and 1 wrong", () => {
      let game = {
        questions: [
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: false },
        ],
        prizes: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz", isThreshold: true },
          { name: "goo" },
          { name: "bla" }
        ]
      } as Game;

      GameController.finalizePrizes(game);

      expect(game.prizes.filter(p => p.isWon)).toMatchObject([
        { name: "foo", isWon: true },
        { name: "bar", isWon: true },
        { name: "baz", isWon: true }
      ]);
    });

    it("state contains threshold prizes for 4 correct and 1 wrong", () => {
      let game = {
        questions: [
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: false }
        ],
        prizes: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz", isThreshold: true },
          { name: "goo" },
          { name: "bla" }
        ]
      } as Game;

      GameController.finalizePrizes(game);

      expect(game.prizes.filter(p => p.isWon)).toMatchObject([
        { name: "foo", isWon: true },
        { name: "bar", isWon: true },
        { name: "baz", isWon: true }
      ]);
    });

    it("state has all prizes for all correct answers", () => {
      let game = {
        questions: [
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: true },
          { isCorrect: true }
        ],
        prizes: [
          { name: "foo" },
          { name: "bar" },
          { name: "baz", isThreshold: true },
          { name: "goo" },
          { name: "bla" }
        ]
      } as Game;

      GameController.finalizePrizes(game);

      expect(game.prizes.filter(p => p.isWon)).toMatchObject([
        { name: "foo", isWon: true },
        { name: "bar", isWon: true },
        { name: "baz", isWon: true },
        { name: "goo", isWon: true },
        { name: "bla", isWon: true }
      ]);
    });

  });

});
