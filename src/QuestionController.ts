export type Question = {
  id: string,
  difficulty?: 0|1|2|3|4,
  text: string,
  afterText: string,
  correctId: string
  answers: {
    id: string
    text: string,
  }[]
}

type UsageRecords = [
  {
    questionId: string,
    gameId: string,
    questionIdx: string
  }
]

class _QuestionController {

  getQuestion(gameId: string, questionIdx: string) : Question | undefined {
    let difficulty = INDEX_TO_DIFFICULTY[questionIdx];
    let usageRecords = this.getUsageRecords();

    let existingUsage = usageRecords.find(ur => ur.gameId === gameId && ur.questionIdx === questionIdx);
    if (existingUsage) {
      return QUESTIONS.find(q => q.id === existingUsage?.questionId);
    }

    let usedQuestionIds = usageRecords.map(ur => ur.questionId);
    let question = QUESTIONS
      .filter(q => !usedQuestionIds.some(uqid => uqid === q.id))
      .find(q => q.difficulty === difficulty);

    if (question) {
      usageRecords.push({
        questionId: question.id,
        gameId,
        questionIdx
      });
      this.saveUsageRecords(usageRecords);

      return question;
    }
  }



  private getUsageRecords() : UsageRecords {
    let usageRecords = JSON.parse(localStorage.getItem("question-usage-records") || "[]");
    return usageRecords;
  }

  private saveUsageRecords(usageRecords: UsageRecords) : void  {
    localStorage.setItem("question-usage-records", JSON.stringify(usageRecords));
  }


  /*
    difficulties:

    10 questions

    0 trivial     2 20
    1 easy        2 20
    2 moderate    3 30
    3 hard        2 20
    4 impossible  1 10

    10 players

    100 questions
  */

}


export const QuestionController = new _QuestionController();

const INDEX_TO_DIFFICULTY : { [questionIndex: string]: number } = {
  "0": 0,
  "1": 0,
  "2": 1,
  "3": 1,
  "4": 2,
  "5": 2,
  "6": 2,
  "7": 3,
  "8": 3,
  "9": 4
};


const QUESTIONS : Question[] = [
  {
    id: '1',
    difficulty: 0,
    text: '"\u{1F4A9}".length',
    afterText: 'Unicode characters, like the \u{1F4A9} emoji, require two bytes. String.prototype.length returns the number of bytes rather than the number of characters, returning an unexpected result.',
    correctId: '3',
    answers: [
      { id: '1', text: '0' },
      { id: '2', text: '1' },
      { id: '3', text: '2' },
      { id: '4', text: 'NaN' }
    ]
  },
  {
    id: '2',
    difficulty: 0,
    text: '+"42"',
    afterText: 'The "+" operator is not preceded by a String, so it is considered arithmetic and attempts to coerce the following value into a Number. The gets evaluated as "0 + 42".',
    correctId: '1',
    answers: [
      { id: '1', text: '42' },
      { id: '2', text: '43' },
      { id: '3', text: '"43"' },
      { id: '4', text: 'NaN' }
    ]
  },
  {
    id: '29',
    difficulty: 0,
    text: 'Math.min()',
    afterText: 'Called with no arguments, Math.min() returns the largest number in JavaScript.',
    correctId: '2',
    answers: [
      { id: '1', text: '0' },
      { id: '2', text: 'Infinity' },
      { id: '3', text: '-Infinity' },
      { id: '4', text: '10e1000' },
    ]
  },
  {
    id: '4',
    text: '"\u{1F4A9}" - "\u{1F4A9}"',
    afterText: 'The "-" operator is always arithmetic, so both items are coerced into Numbers. They cannot be interpreted, and result in NaN.',
    correctId: '4',
    answers: [
      { id: '1', text: '""' },
      { id: '2', text: '"\u{1F4A9}"' },
      { id: '3', text: 'Will throw Error' },
      { id: '4', text: 'NaN' }
    ]
  },
  {
    id: '5',
    text: '[10, 5, 1].sort()',
    afterText: "Array.prototype.sort's default comparator assumes String operations. All values are coerced and compared as Strings.",
    correctId: '2',
    answers: [
      { id: '1', text: '[1, 5, 10]' },
      { id: '2', text: '[1, 10, 5]' },
      { id: '3', text: '[10, 5, 1]' },
      { id: '4', text: '[5, 10, 1]' }
    ]
  },
  {
    id: '6',
    text: 'NaN == NaN',
    afterText: "NaN is a value assigned to an instance of a Number, rather than a discrete value. Each instance is independent and will not equal other instances. To evaluate, you must use `isNaN()`.",
    correctId: '1',
    answers: [
      { id: '1', text: 'false' },
      { id: '2', text: 'true' },
      { id: '3', text: 'Will throw Error' },
      { id: '4', text: 'null' }
    ]
  },
  {
    id: '7',
    text: 'typeof null',
    afterText: "Null, like almost all other concepts in JavaScript, is an object. However, it is a special case of Object where its type is object, but it is not an instance of object.",
    correctId: '1',
    answers: [
      { id: '1', text: '"object"' },
      { id: '2', text: '"null"' },
      { id: '3', text: '"function"' },
      { id: '4', text: '"array"' }
    ]
  },
  {
    id: '8',
    text: 'null instanceof Object',
    afterText: "Null, like almost all other concepts in JavaScript, is an object. However, it is a special case of Object where its type is object, but it is not an instance of object.",
    correctId: '1',
    answers: [
      { id: '1', text: 'false' },
      { id: '2', text: 'true' },
      { id: '3', text: 'Will throw Error' },
      { id: '4', text: 'null' }
    ]
  },
  {
    id: '9',
    text: '0.1 + 0.2',
    afterText: "JavaScript's floating point operations have issues with overflow rounding precision. When doing floating point operations, use Number.prototype.toPrecision() to protect values.",
    correctId: '3',
    answers: [
      { id: '1', text: '0.3' },
      { id: '2', text: '0.29999999999999991' },
      { id: '3', text: '0.30000000000000004' },
      { id: '4', text: 'null' }
    ]
  },
  {
    id: '10',
    text: '1 / 0',
    afterText: "JavaScript's Number type includes the concepts of positive and negative Infinity.",
    correctId: '2',
    answers: [
      { id: '1', text: 'NaN' },
      { id: '2', text: 'Infinity' },
      { id: '3', text: 'null' },
      { id: '4', text: 'Will throw Error' }
    ]
  },
  {
    id: '11',
    text: 'undefined == 0',
    afterText: "Both undefined and 0 are falsy types and will equal with coerced equality.",
    correctId: '1',
    answers: [
      { id: '1', text: 'true' },
      { id: '2', text: 'false' },
      { id: '3', text: 'Will throw Error' },
      { id: '4', text: 'null' }
    ]
  },
  {
    id: '12',
    text: 'Array(0, 1, Array(2));',
    afterText: "Instantiating an Array with multiple arguments creates an Array from those values. However a single argument only specifies the length.",
    correctId: '2',
    answers: [
      { id: '1', text: '[0, 1, [2]]' },
      { id: '2', text: '[0, 1, [undefined, undefined]]' },
      { id: '3', text: '[0, 1, 2]' },
      { id: '4', text: '[0, 1, "[object Array]"]' },
    ]
  },
  {
    id: '13',
    text: '!!""',
    afterText: "Logical negation of a value will coerce it to a Boolean type. Double negation will flip the value back to its original Boolean coerced value.",
    correctId: '3',
    answers: [
      { id: '1', text: '""' },
      { id: '2', text: 'true' },
      { id: '3', text: 'false' },
      { id: '4', text: 'Syntax Error' },
    ]
  },
  {
    id: '14',
    text: 'function(){\n  return this;\n}.call(window)',
    afterText: "Call invokes a function with a specified value for `this`.",
    correctId: '3',
    answers: [
      { id: '1', text: 'null' },
      { id: '2', text: 'this' },
      { id: '3', text: 'window' }
    ]
  },
  {
    id: '15',
    text: 'function(){\n  return this;\n}.bind(window).call(document)',
    afterText: "Function.prototype.bind locks the value of `this` for all future invocations of a function, even if it has been specified otherwise.",
    correctId: '2',
    answers: [
      { id: '1', text: 'null' },
      { id: '2', text: 'window' },
      { id: '3', text: 'document' },
    ]
  },
  {
    id: '16',
    text: '42 + true',
    afterText: "The '+' is considered arithmetic, and coerces the boolean to a Number, 1.",
    correctId: '1',
    answers: [
      { id: '1', text: '43' },
      { id: '2', text: 'true' },
      { id: '3', text: 'false' },
      { id: '4', text: '42' },
    ]
  },
  {
    id: '17',
    text: 'null || undefined || {}',
    afterText: "Logical OR stops and returns the value of the first truthy value in the series.",
    correctId: '3',
    answers: [
      { id: '1', text: 'null' },
      { id: '2', text: 'undefined' },
      { id: '3', text: '{}' },
      { id: '4', text: 'Will throw Error' },
    ]
  },
  {
    id: '3',
    text: '"42" + 1',
    afterText: 'The "+" is preceded by a String, so is therefore considered concatenation. Subsequent variables are coerced into Strings.',
    correctId: '3',
    answers: [
      { id: '1', text: '43' },
      { id: '2', text: '"43"' },
      { id: '3', text: '"421"' },
      { id: '4', text: 'NaN' }
    ]
  },
  {
    id: '18',
    text: 'return\n  { id: 42 };',
    afterText: "Automatic Semicolon Insertion (ASI) sees a complete statement in `return` and inserts a semicolon, causing the function to return undefined.",
    correctId: '3',
    answers: [
      { id: '1', text: 'null' },
      { id: '2', text: '{ id: 42 }' },
      { id: '3', text: 'undefined' },
      { id: '4', text: 'Will throw Error' },
    ]
  },
  {
    id: '19',
    text: '[] + []',
    afterText: "Array.prototype.toString is used in the coercion, which results in an empty string. Both are concatenated.",
    correctId: '1',
    answers: [
      { id: '1', text: '""' },
      { id: '2', text: '[]' },
      { id: '3', text: 'undefined' },
      { id: '4', text: 'Will throw Error' },
    ]
  },
  {
    id: '20',
    text: '(function foo(a, b) {}).length',
    afterText: "Function.prototype.length returns the number of arguments specified in the function definition.",
    correctId: '3',
    answers: [
      { id: '1', text: '0' },
      { id: '2', text: '21' },
      { id: '3', text: '2' },
      { id: '4', text: 'undefined' },
    ]
  },
  {
    id: '21',
    text: '("js", "rocks")',
    afterText: 'The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand.',
    correctId: '1',
    answers: [
      { id: '1', text: '"rocks"' },
      { id: '2', text: '"js"' },
      { id: '3', text: 'undefined' },
      { id: '4', text: 'Syntax Error' },
    ]
  },
  {
    id: '22',
    text: '!!~[1, 2, 3].indexOf(3)',
    afterText: 'Bitwise NOT operator (~) will convert any number x to -(x + 1).  Double negation yields answer for whether array contains item.',
    correctId: '2',
    answers: [
      { id: '1', text: 'false' },
      { id: '2', text: 'true' },
      { id: '3', text: '2' },
      { id: '4', text: '-2' },
    ]
  },
  {
    id: '23',
    text: '(() => arguments)(1, 2)',
    afterText: 'Fat arrow functions do not expose an instrinsic "arguments" property like normal functions.',
    correctId: '3',
    answers: [
      { id: '1', text: '[1, 2]' },
      { id: '2', text: '[object Arguments]' },
      { id: '3', text: 'Error: arguments is not defined' },
      { id: '4', text: 'undefined' },
    ]
  },
  {
    id: '24',
    text: '"js" + + "rocks"',
    afterText: 'JavaScript treats this code as "js" + (+"rocks").  "rocks" cannot be coerced to a number.',
    correctId: '4',
    answers: [
      { id: '1', text: 'Syntax Error' },
      { id: '2', text: '"js0rocks"' },
      { id: '3', text: '"jsrocks"' },
      { id: '4', text: '"jsNaN"' },
    ]
  },
  {
    id: '35',
    text: 'false == "false"',
    afterText: 'the string "false" is a truthy value.',
    correctId: '2',
    answers: [
      { id: '1', text: 'true' },
      { id: '2', text: 'false' },
      { id: '3', text: 'TypeError' },
      { id: '4', text: '"false"' },
    ]
  },
  {
    id: '25',
    text: 'new Date(2016, 5, 31)',
    afterText: 'Months are zero based with respect to Dates in JS.  This is really saying June 31st, which is coerced to Jul 1.',
    correctId: '1',
    answers: [
      { id: '1', text: 'Fri Jul 01 2016' },
      { id: '2', text: 'Tue May 31 2016' },
      { id: '3', text: 'Tue May 31 2017' },
      { id: '4', text: 'Wed Jun 1 2016' },
    ]
  },
  {
    id: '26',
    text: '(function(a, b, c){\n  return c;\n})(1, ...[1, 2, 3])',
    afterText: 'The spread operator will expand the array to cover the rest of the available arguments.',
    correctId: '2',
    answers: [
      { id: '1', text: '1' },
      { id: '2', text: '2' },
      { id: '3', text: '3' },
    ]
  },
  {
    id: '27',
    text: '(function(){\n  return arguments;\n})(1, 2)',
    afterText: 'Arguments is a special array-like object that is built in to normal JavaScript functions.',
    correctId: '1',
    answers: [
      { id: '1', text: '[1, 2]' },
      { id: '2', text: '[Arguments]' },
      { id: '4', text: 'Error: arguments is not defined' },
    ]
  },
  {
    id: '28',
    text: 'Math.max()',
    afterText: 'Called with no arguments, Math.max() returns the smallest number in JavaScript.',
    correctId: '3',
    answers: [
      { id: '1', text: '0' },
      { id: '2', text: 'Infinity' },
      { id: '3', text: '-Infinity' },
      { id: '4', text: '10e1000' },
    ]
  },
  {
    id: '30',
    text: '[1,2,3] == [1,2,3]',
    afterText: 'Arrays are reference types in JavaScript. So although they contain the same values, they are different arrays.',
    correctId: '2',
    answers: [
      { id: '1', text: 'true' },
      { id: '2', text: 'false' },
      { id: '3', text: 'Error' },
      { id: '4', text: '[1,2,3,1,2,3]' },
    ]
  },
  {
    id: '31',
    text: '[1,2,3].toString()',
    afterText: 'Arrays are represented as comma-separated strings of values.',
    correctId: '3',
    answers: [
      { id: '1', text: '"[1, 2, 3]"' },
      { id: '2', text: '123' },
      { id: '3', text: '1,2,3' },
      { id: '4', text: 'TypeError: no method "toString" on object' },
    ]
  },
  {
    id: '32',
    text: 'typeof NaN',
    afterText: 'Despite its name of "Not a Number", it is, in fact, an instance of the Number type.',
    correctId: '4',
    answers: [
      { id: '1', text: 'object' },
      { id: '2', text: 'null' },
      { id: '3', text: 'NaN' },
      { id: '4', text: 'Number' },
    ]
  },
  {
    id: '33',
    text: '[] == ![]',
    afterText: 'Array types are not compared natively, so the value is coerced into a string, "", which will evaluate to falsy. The second array is forced to a boolean false.',
    correctId: '1',
    answers: [
      { id: '1', text: 'true' },
      { id: '2', text: 'false' },
      { id: '3', text: 'TypeError' },
      { id: '4', text: '[]' },
    ]
  },
  {
    id: '34',
    text: 'true == "true"',
    afterText: 'Both true and a non-empty string are truthy types.',
    correctId: '1',
    answers: [
      { id: '1', text: 'true' },
      { id: '2', text: 'false' },
      { id: '3', text: 'TypeError' },
      { id: '4', text: '"true"' },
    ]
  },
  {
    id: '36',
    text: 'null == false',
    afterText: 'Despite null being a falsy value, it is not equal to false in the abstract equality comparison specification.',
    correctId: '2',
    answers: [
      { id: '1', text: 'true' },
      { id: '2', text: 'false' },
      { id: '3', text: 'TypeError' },
      { id: '4', text: '"null"' },
    ]
  },
  {
    id: '37',
    text: '[1, 2, 3] + [4, 5, 6]',
    afterText: 'Both arrays are converted to a string, then concatenated',
    correctId: '4',
    answers: [
      { id: '1', text: '[1, 2, 3, 4, 5, 6]' },
      { id: '2', text: '"1,2,3,4,5,6"' },
      { id: '3', text: 'TypeError' },
      { id: '4', text: '1,2,34,5,6' },
    ]
  },
  {
    id: '38',
    text: 'parseInt("poop", 26)',
    afterText: 'The second parameter of parseint is a radix (base) specification.',
    correctId: '4',
    answers: [
      { id: '1', text: 'NaN' },
      { id: '2', text: '26' },
      { id: '3', text: 'Error' },
      { id: '4', text: '456273' },
    ]
  },
  {
    id: '39',
    text: '"poop" instanceof String',
    afterText: 'String literals have the type of string, but are not instances of String',
    correctId: '2',
    answers: [
      { id: '1', text: 'true' },
      { id: '2', text: 'false' },
      { id: '3', text: 'Error' },
      { id: '4', text: '"poop"' },
    ]
  },
  {
    id: '40',
    text: '[,,,].length',
    afterText: 'The final comma in the Array literal is considered trailing, so no fourth index is added.',
    correctId: '2',
    answers: [
      { id: '1', text: '4' },
      { id: '2', text: '3' },
      { id: '3', text: '2' },
      { id: '4', text: 'undefined' },
    ]
  }
];