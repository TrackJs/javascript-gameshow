import { QuestionController, QuestionLookup } from '../../src/controllers/QuestionController';

describe("QuestionController", () => {

  beforeEach(() => {
    QuestionController.prototype._loadUsage = jest.fn(() => []);
    QuestionController.prototype._updateUsage = jest.fn();
  })

  describe("constructor", () => {

    it("creates with nothing in storage", () => {
      QuestionController.prototype._loadUsage = jest.fn(() => []);
      let questionController = new QuestionController();

      expect(questionController._questionUsage).toEqual([]);
      expect(questionController._questionMap[0]).toMatchObject({
        questionIdx: 0,
        askedOn: null,
        text: expect.any(String)
      });
    });

    it("creates with state in storage", () => {
      let usage = [
        {
          gameId: "0",
          askIdx: 0,
          questionIdx: 0
        },
        {
          gameId: "0",
          askIdx: 1,
          questionIdx: 9
        },
        {
          gameId: "0",
          askIdx: 2,
          questionIdx: 19
        }
      ]
      QuestionController.prototype._loadUsage = jest.fn(() => usage);

      let questionController = new QuestionController();

      expect(questionController._questionUsage).toEqual(usage);
      expect(questionController._questionMap[0]).toMatchObject({
        questionIdx: 0,
        askedOn: "0-0",
        text: expect.any(String)
      });
    });

  });

  describe("getQuestion()", () => {

    it("returns unused question from correct level", () => {
      let questionController = new QuestionController();
      questionController._questionMap = [
        {
          questionIdx: 0,
          level: 0,
          text: "foo",
          askedOn: null
        } as QuestionLookup,
        {
          questionIdx: 2,
          level: 1,
          text: "bar",
          askedOn: "0-0"
        } as QuestionLookup,
        {
          questionIdx: 5,
          level: 1,
          text: "baz",
          askedOn: null
        } as QuestionLookup
      ];

      let question = questionController.getQuestion("0", 1);

      expect(question.questionIdx).toBe(5);
      expect(question.text).toBe("baz");
    });

    it("returns same question from previous ask", () => {
      let questionController = new QuestionController();
      questionController._questionMap = [
        {
          questionIdx: 0,
          level: 0,
          text: "foo",
          askedOn: null
        } as QuestionLookup,
        {
          questionIdx: 2,
          level: 1,
          text: "bar",
          askedOn: null
        } as QuestionLookup,
        {
          questionIdx: 5,
          level: 1,
          text: "baz",
          askedOn: null
        } as QuestionLookup
      ];

      let question = questionController.getQuestion("0", 0);
      let question2 = questionController.getQuestion("0", 0);

      expect(question.questionIdx).toBe(0);
      expect(question.text).toBe("foo");
      expect(question).toBe(question2);
    });

  });


});

