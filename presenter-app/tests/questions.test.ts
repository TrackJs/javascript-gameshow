import { Questions } from '../src/questions'

describe("Questions Data", () => {

  it("has the expected number of questions", () => {
    expect(Questions.length).toBe(63);
    expect(Questions.filter(q => q.level === 0).length).toBe(11);
    expect(Questions.filter(q => q.level === 1).length).toBe(11);
    expect(Questions.filter(q => q.level === 2).length).toBe(10);
    expect(Questions.filter(q => q.level === 3).length).toBe(11);
    expect(Questions.filter(q => q.level === 4).length).toBe(10);
    expect(Questions.filter(q => q.level === 9).length).toBe(10);
  })

  it("does not contain duplicates", () => {
    let checked: { [text: string]: boolean } = {};
    Questions.forEach((q) => {
      expect(checked[q.text]).toBeUndefined();
      checked[q.text] = true;
    })
  })

  it("has valid answer indexes", () => {
    Questions.forEach((q) => {
      expect(q.answers[q.correctAnswerIdx]).toBeDefined();
    })
  })

  describe("code questions", () => {

    Questions
      .filter((question) => question.type === "code")
      .forEach((question) => {
        let answer = question.answers[question.correctAnswerIdx];

        it(`"${question.text}" is "${answer.text}"`, () => {
          expect(eval(question.text)).toEqual(eval(answer.text));
        });

      });

  })

})
