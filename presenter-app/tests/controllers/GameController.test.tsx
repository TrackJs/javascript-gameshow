import { DateTime } from 'luxon';
import { Game, GameController } from '../../src/controllers/GameController';

describe("GameController", () => {

  describe("getPrizesWon()", () => {

    it("returns no prizes for no correct answers", () => {
      let game = getTestGame();
      game.questionsAsked = [
        {
          questionIdx: 0,
          questionId: "1234",
          answerId: "1",
          isCorrect: false
        }
      ];

      expect(GameController.getPrizesWon(game)).toMatchObject([]);
    });

    it("returns prize for one correct answer and quit", () => {
      let game = getTestGame();
      game.questionsAsked = [
        {
          questionIdx: 0,
          questionId: "1234",
          answerId: "1",
          isCorrect: true
        }
      ];

      expect(GameController.getPrizesWon(game)).toMatchObject([
        {
          id: "0"
        }
      ]);
    });

    it("returns prize for all correct answers", () => {
      let game = getTestGame();
      game.questionsAsked = [
        {
          questionIdx: 0,
          questionId: "000",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 1,
          questionId: "111",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 2,
          questionId: "222",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 3,
          questionId: "333",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 4,
          questionId: "444",
          answerId: "1",
          isCorrect: true
        }
      ];

      expect(GameController.getPrizesWon(game)).toMatchObject([
        { id: "0" },{ id: "1" },{ id: "2" },{ id: "3" },{ id: "4" }
      ]);
    });

    it("returns no prizes for 2nd question incorrect", () => {
      let game = getTestGame();
      game.questionsAsked = [
        {
          questionIdx: 0,
          questionId: "000",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 1,
          questionId: "111",
          answerId: "1",
          isCorrect: false
        }
      ];

      expect(GameController.getPrizesWon(game)).toMatchObject([]);
    });

    it("returns no prizes for 3nd question incorrect", () => {
      let game = getTestGame();
      game.questionsAsked = [
        {
          questionIdx: 0,
          questionId: "000",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 1,
          questionId: "111",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 2,
          questionId: "222",
          answerId: "1",
          isCorrect: false
        }
      ];

      expect(GameController.getPrizesWon(game)).toMatchObject([]);
    });

    it("returns threshold prizes for 4th question incorrect", () => {
      let game = getTestGame();
      game.questionsAsked = [
        {
          questionIdx: 0,
          questionId: "000",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 1,
          questionId: "111",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 3,
          questionId: "333",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 4,
          questionId: "444",
          answerId: "1",
          isCorrect: false
        }
      ];

      expect(GameController.getPrizesWon(game)).toMatchObject([
        { id: "0" }, { id: "1" }, { id: "2" }
      ]);
    });

    it("returns threshold prizes for 5th question incorrect", () => {
      let game = getTestGame();
      game.questionsAsked = [
        {
          questionIdx: 0,
          questionId: "000",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 1,
          questionId: "111",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 3,
          questionId: "333",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 4,
          questionId: "444",
          answerId: "1",
          isCorrect: true
        },
        {
          questionIdx: 5,
          questionId: "555",
          answerId: "1",
          isCorrect: false
        }
      ];

      expect(GameController.getPrizesWon(game)).toMatchObject([
        { id: "0" }, { id: "1" }, { id: "2" }
      ]);
    });
  });

});

function getTestGame(): Game {
  return {
    id: "test-game",
    playerName: "test",
    startedOn: DateTime.now(),
    questionsAsked: [],
    prizeStack: [
      {
        id: "0",
        name: "test prize 0",
        difficulty: 0,
        imageUrl: "",
        sponsorName: "",
        sponsorImageUrl: "",
      },
      {
        id: "1",
        name: "test prize 1",
        difficulty: 1,
        imageUrl: "",
        sponsorName: "",
        sponsorImageUrl: "",
      },
      {
        id: "2",
        name: "test prize 2",
        difficulty: 2,
        imageUrl: "",
        sponsorName: "",
        sponsorImageUrl: "",
        isThreshold: true
      },
      {
        id: "3",
        name: "test prize 3",
        difficulty: 2,
        imageUrl: "",
        sponsorName: "",
        sponsorImageUrl: "",
      },
      {
        id: "4",
        name: "test prize 4",
        difficulty: 3,
        imageUrl: "",
        sponsorName: "",
        sponsorImageUrl: "",
      }
    ],
    prizeWon: [],
    isFinished: false
  } as Game;
}