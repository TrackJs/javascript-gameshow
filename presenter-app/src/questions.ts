import { Level } from "./constants";

export type QuestionType = "code" | "text" | "choice";
export type Answer = {
  text: string
}
export type Question = {
  type: QuestionType,
  level: Level,
  text: string,
  explanation: string,
  correctAnswerIdx: number,
  answers: Answer[]
};

export const Questions: Question[] = [
  {
    type: 'code',
    level: 0,
    text: 'true == 1',
    explanation: 'Both are truthy values',
    correctAnswerIdx: 0,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'TypeError: Invalid types' },
      { text: 'undefined' }
    ]
  },
  {
    type: 'code',
    level: 0,
    text: 'false == 0',
    explanation: "Both are falsy values'",
    correctAnswerIdx: 0,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'TypeError: Invalid types' },
      { text: 'undefined' }
    ]
  },
  {
    type: 'code',
    level: 0,
    text: "true == false",
    explanation: "true is not false, not even in JavaScript",
    correctAnswerIdx: 1,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'TypeError: Invalid types' },
      { text: 'undefined' }
    ]
  },
  {
    type: 'code',
    level: 0,
    text: "false == true",
    explanation: "false is not true, not even in JavaScript",
    correctAnswerIdx: 1,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'TypeError: Invalid types' },
      { text: 'undefined' }
    ]
  },
  {
    type: 'code',
    level: 1,
    text: "true == !!'false'",
    explanation: "The string 'false' is truthy, which becomes true",
    correctAnswerIdx: 0,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'TypeError: Invalid types' },
      { text: 'undefined' }
    ]
  },
  {
    type: 'code',
    level: 0,
    text: '5 * 10',
    explanation: 'JavaScript can do math.',
    correctAnswerIdx: 0,
    answers: [
      { text: '50' },
      { text: '"510"' },
      { text: 'NaN' },
      { text: '15' }
    ]
  },
  {
    type: 'code',
    level: 0,
    text: `"hello" + 'world'`,
    explanation: 'String concatination works regardless of quote type.',
    correctAnswerIdx: 0,
    answers: [
      { text: '"helloworld"' },
      { text: '"hello world"' },
      { text: `"hello'world'"` },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 0,
    text: `'goodbye' + "world"`,
    explanation: 'String concatination works regardless of quote type.',
    correctAnswerIdx: 0,
    answers: [
      { text: '"goodbyeworld"' },
      { text: '"goodbye world"' },
      { text: `"'goodbye'world"` },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 0,
    text: `'goodbye' - "bye"`,
    explanation: 'Strings cannot be subtracted',
    correctAnswerIdx: 2,
    answers: [
      { text: '"good"' },
      { text: '"goodbye"' },
      { text: `NaN` },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 0,
    text: '"Goodbye" + "world"',
    explanation: 'String concatination with the plus symbol.',
    correctAnswerIdx: 0,
    answers: [
      { text: '"Goodbyeworld"' },
      { text: '"Goodbye world"' },
      { text: 'true' },
      { text: 'NaN' }
    ]
  },
  {
    type: 'code',
    level: 0,
    text: '"Code" + 4 + "Life"',
    explanation: 'String concatination with the plus symbol coerces a number.',
    correctAnswerIdx: 0,
    answers: [
      { text: '"Code4Life"' },
      { text: '"Code 4 Life"' },
      { text: '6' },
      { text: 'NaN' }
    ]
  },
  {
    type: 'code',
    level: 0,
    text: '"Legit" + 2 + "Quit"',
    explanation: 'String concatination with the plus symbol coerces a number.',
    correctAnswerIdx: 0,
    answers: [
      { text: '"Legit2Quit"' },
      { text: '"Legit 2 Quit"' },
      { text: '3' },
      { text: 'NaN' }
    ]
  },
  {
    type: 'text',
    level: 1,
    text: 'JavaScript was originally created by which famous programmer?',
    explanation: 'He created the JavaScript programming language and co-founded the Mozilla project, the Mozilla Foundation, and the Mozilla Corporation.',
    correctAnswerIdx: 0,
    answers: [
      { text: 'Brendan Eich' },
      { text: 'John Resig' },
      { text: 'John Carmack' },
      { text: 'Linus Torvalds' }
    ]
  },
  {
    type: 'text',
    level: 1,
    text: 'JavaScript was developed and promoted by which technology company?',
    explanation: 'The lead developers of Mosaic then founded the Netscape corporation, which released a more polished browser, Netscape Navigator, in 1994.',
    correctAnswerIdx: 0,
    answers: [
      { text: 'Netscape' },
      { text: 'Microsoft' },
      { text: 'Google' },
      { text: 'Apple' }
    ]
  },
  {
    type: 'text',
    level: 1,
    text: 'JavaScript was first released in what year?',
    explanation: 'Although the new language and its interpreter implementation were called LiveScript when first shipped as part of a Navigator beta in September 1995, the name was changed to JavaScript for the official release in December.',
    correctAnswerIdx: 0,
    answers: [
      { text: '1995' },
      { text: '1993' },
      { text: '1989' },
      { text: '1999' }
    ]
  },
  {
    type: 'text',
    level: 1,
    text: 'JavaScript™️, the Trademark, is owned by which company?',
    explanation: '"JavaScript" is a trademark of Oracle Corporation in the United States. The trademark was originally issued to Sun Microsystems on 6 May 1997, and was transferred to Oracle when they acquired Sun in 2010.',
    correctAnswerIdx: 0,
    answers: [
      { text: 'Oracle' },
      { text: 'Microsoft' },
      { text: 'Google' },
      { text: 'Mozilla' }
    ]
  },
  {
    type: 'text',
    level: 1,
    text: 'JavaScript conforms to what standard?',
    explanation: 'JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.',
    correctAnswerIdx: 0,
    answers: [
      { text: 'ECMAScript' },
      { text: 'JScript' },
      { text: 'Java' },
      { text: 'jQuery' }
    ]
  },
  {
    type: 'code',
    level: 1,
    text: '(function (){ return this; }).call(self)',
    explanation: 'Call invokes a function with a specified value for `this`.',
    correctAnswerIdx: 2,
    answers: [
      { text: 'null' },
      { text: 'this' },
      { text: 'self' },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 1,
    text: '"42" + 1',
    explanation: 'The "+" is preceded by a String, so is therefore considered concatenation. Subsequent variables are coerced into Strings.',
    correctAnswerIdx: 2,
    answers: [
      { text: '43' },
      { text: '"43"' },
      { text: '"421"' },
      { text: 'NaN' }
    ]
  },
  {
    type: 'code',
    level: 1,
    text: 'true && false',
    explanation: 'Basic logical AND operators',
    correctAnswerIdx: 0,
    answers: [
      { text: 'false' },
      { text: '"truefalse"' },
      { text: 'true' },
      { text: '0' }
    ]
  },
  {
    type: 'code',
    level: 1,
    text: 'true || false',
    explanation: 'Basic logical OR operators',
    correctAnswerIdx: 0,
    answers: [
      { text: 'true' },
      { text: '"truefalse"' },
      { text: 'false' },
      { text: '1' }
    ]
  },
  {
    type: 'code',
    level: 1,
    text: '8 / 0',
    explanation: 'JavaScript can do math.',
    correctAnswerIdx: 0,
    answers: [
      { text: 'Infinity' },
      { text: 'throw Error' },
      { text: 'undefined' },
      { text: 'NaN' }
    ]
  },
  {
    type: 'code',
    level: 2,
    text: '42 + true',
    explanation: "The '+' is considered arithmetic, and coerces the boolean to a Number, 1.",
    correctAnswerIdx: 0,
    answers: [
      { text: '43' },
      { text: 'true' },
      { text: 'false' },
      { text: '42' }
    ]
  },
  {
    type: 'code',
    level: 2,
    text: '(null || undefined || 0)',
    explanation: 'Logical OR return the first truthy value in the series, or the last value',
    correctAnswerIdx: 2,
    answers: [
      { text: 'null' },
      { text: 'undefined' },
      { text: '0' },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 2,
    text: 'false == "false"',
    explanation: 'the string "false" is a truthy value.',
    correctAnswerIdx: 1,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' },
      { text: '"false"' }
    ]
  },
  {
    type: 'code',
    level: 2,
    text: '(function(a, b, c){ return c; })(1, ...[1, 2, 3])',
    explanation: 'The spread operator will expand the array to cover the rest of the available arguments.',
    correctAnswerIdx: 1,
    answers: [
      { text: '1' },
      { text: '2' },
      { text: '3' },
      { text: 'undefined' }
    ]
  },
  {
    type: 'code',
    level: 2,
    text: '[1,2,3] == [1,2,3]',
    explanation: 'Arrays are reference types in JavaScript. So although they contain the same values, they are different arrays.',
    correctAnswerIdx: 1,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' },
      { text: '[1,2,3,1,2,3]' }
    ]
  },
  {
    type: 'code',
    level: 2,
    text: '[1,2,3].toString()',
    explanation: 'Arrays are represented as comma-separated strings of values.',
    correctAnswerIdx: 2,
    answers: [
      { text: '"[1, 2, 3]"' },
      { text: '123' },
      { text: '"1,2,3"' },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 2,
    text: 'typeof NaN',
    explanation: 'Despite its name of "Not a Number", it is, in fact, an instance of the Number type.',
    correctAnswerIdx: 3,
    answers: [
      { text: '"object"' },
      { text: '"null"' },
      { text: '"NaN"' },
      { text: '"number"' }
    ]
  },
  {
    type: 'code',
    level: 2,
    text: 'true == "true"',
    explanation: 'Because of mixed boolean, JS first converts boolean to number (1) then to string, "1".',
    correctAnswerIdx: 1,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' },
      { text: '"true"' }
    ]
  },
  {
    type: 'code',
    level: 2,
    text: '"1" == true',
    explanation: 'Because of mixed boolean, JS first converts boolean to number (1) then to string, "1".',
    correctAnswerIdx: 0,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' },
      { text: '"true"' }
    ]
  },
  {
    type: 'code',
    level: 2,
    text: '!!""',
    explanation: 'Logical negation of a value will coerce it to a Boolean type. Double negation will flip the value back to its original Boolean coerced value.',
    correctAnswerIdx: 2,
    answers: [
      { text: '""' },
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: 'undefined == 0',
    explanation: 'Both sides must be null or undefined to be compared truthy.',
    correctAnswerIdx: 1,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' },
      { text: 'null' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: 'undefined == null',
    explanation: 'Both sides must be null or undefined to be compared truthy, which they are.',
    correctAnswerIdx: 0,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' },
      { text: 'null' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: '[,,,].length',
    explanation: 'The final comma in the Array literal is considered trailing, so no fourth index is added.',
    correctAnswerIdx: 1,
    answers: [
      { text: '4' },
      { text: '3' },
      { text: '2' },
      { text: 'undefined' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: '"2" + "2" - "2"',
    explanation: '"2" + "2" are strings and concatinated to "22". - is only numeric, so they are converted to numbers and subtracted.',
    correctAnswerIdx: 1,
    answers: [
      { text: '2' },
      { text: '20' },
      { text: '"2"' },
      { text: 'NaN' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: '"poop" instanceof String',
    explanation: 'String literals have the type of string, but are not instances of String',
    correctAnswerIdx: 1,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' },
      { text: '"poop"' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: 'parseInt("poop", 26)',
    explanation: 'The second parameter of parseint is a radix (base) specification.',
    correctAnswerIdx: 3,
    answers: [
      { text: 'NaN' },
      { text: '26' },
      { text: 'throw Error' },
      { text: '456273' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: 'Math.max()',
    explanation: 'Called with no arguments, Math.max() returns the smallest number in JavaScript.',
    correctAnswerIdx: 2,
    answers: [
      { text: '0' },
      { text: 'Infinity' },
      { text: '-Infinity' },
      { text: '10e1000' }
    ]
  },
  {
    type: 'code',
    level: 4,
    text: 'new Date(2024, 5, 31).toDateString()',
    explanation: 'Months are zero based with respect to Dates in JS.  This is really saying June 31st, which is coerced to Jul 1.',
    correctAnswerIdx: 0,
    answers: [
      { text: '"Mon Jul 01 2024"' },
      { text: '"Fri May 31 2024"' },
      { text: '"Tue May 31 2025"' },
      { text: '"Sat Jun 1 2024"' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: '(function(){ return this; }).bind(self).call(undefined)',
    explanation: 'Function.prototype.bind locks the value of `this` for all future invocations of a function, even if it has been specified otherwise.',
    correctAnswerIdx: 1,
    answers: [
      { text: 'null' },
      { text: 'self' },
      { text: 'undefined' },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: 'Math.min()',
    explanation: 'Called with no arguments, Math.min() returns the largest number in JavaScript.',
    correctAnswerIdx: 1,
    answers: [
      { text: '0' },
      { text: 'Infinity' },
      { text: '-Infinity' },
      { text: '10e1000' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: '[] == ![]',
    explanation: 'Array types are not compared natively, so the value is coerced into a string, "", which will evaluate to falsy. The second array is forced to a boolean false.',
    correctAnswerIdx: 0,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' },
      { text: '[]' }
    ]
  },
  {
    type: 'code',
    level: 3,
    text: '[] == []',
    explanation: 'Array types are not compared natively, so the value is coerced into a string, "", which will evaluate to falsy. The second array is forced to a boolean true.',
    correctAnswerIdx: 1,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' },
      { text: '[]' }
    ]
  },
  {
    type: 'code',
    level: 4,
    text: 'null == false',
    explanation: 'Despite null being a falsy value, it is not equal to false in the abstract equality comparison specification.',
    correctAnswerIdx: 1,
    answers: [
      { text: 'true' },
      { text: 'false' },
      { text: 'throw Error' },
      { text: '"null"' }
    ]
  },
  {
    type: 'code',
    level: 4,
    text: 'typeof null',
    explanation: 'Null, like almost all other concepts in JavaScript, is an object. However, it is a special case of Object where its type is object, but it is not an instance of object.',
    correctAnswerIdx: 0,
    answers: [
      { text: '"object"' },
      { text: '"null"' },
      { text: '"function"' },
      { text: '"array"' }
    ]
  },
  {
    type: 'code',
    level: 4,
    text: 'null instanceof Object',
    explanation: 'Null, like almost all other concepts in JavaScript, is an object. However, it is a special case of Object where its type is object, but it is not an instance of object.',
    correctAnswerIdx: 0,
    answers: [
      { text: 'false' },
      { text: 'true' },
      { text: 'throw Error' },
      { text: 'null' }
    ]
  },
  {
    type: 'code',
    level: 4,
    text: '(() => { return\n  { id: 42 } })()',
    explanation: 'Automatic Semicolon Insertion (ASI) sees a complete statement in `return` and inserts a semicolon, causing the function to return undefined.',
    correctAnswerIdx: 2,
    answers: [
      { text: 'null' },
      { text: '{ id: 42 }' },
      { text: 'undefined' },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 4,
    text: '[] + []',
    explanation: 'Array.prototype.toString is used in the coercion, which results in an empty string. Both are concatenated.',
    correctAnswerIdx: 0,
    answers: [
      { text: '""' },
      { text: '[]' },
      { text: 'undefined' },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 4,
    text: '(function foo(a, b) {}).length',
    explanation: 'Function.prototype.length returns the number of arguments specified in the function definition.',
    correctAnswerIdx: 2,
    answers: [
      { text: '0' },
      { text: '21' },
      { text: '2' },
      { text: 'undefined' }
    ]
  },
  {
    type: 'code',
    level: 4,
    text: '("js", "rocks")',
    explanation: 'The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand.',
    correctAnswerIdx: 0,
    answers: [
      { text: '"rocks"' },
      { text: '"js"' },
      { text: 'undefined' },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 4,
    text: '!!~[1, 2, 3].indexOf(3)',
    explanation: 'Bitwise NOT operator (~) will convert any number x to -(x + 1).  Double negation yields answer for whether array contains item.',
    correctAnswerIdx: 1,
    answers: [
      { text: 'false' },
      { text: 'true' },
      { text: '2' },
      { text: '-2' }
    ]
  },
  {
    type: 'code',
    level: 4,
    text: 'Array(0, 1, Array(2));',
    explanation: 'Instantiating an Array with multiple arguments creates an Array from those values. However a single argument only specifies the length.',
    correctAnswerIdx: 1,
    answers: [
      { text: '[0, 1, [2]]' },
      { text: '[0, 1, [undefined, undefined]]' },
      { text: '[0, 1, 2]' },
      { text: '[0, 1, "[object Array]"]' }
    ]
  },
  {
    type: 'code',
    level: 9,
    text: '"💩" - "💩"',
    explanation: 'The "-" operator is always arithmetic, so both items are coerced into Numbers. They cannot be interpreted, and result in NaN.',
    correctAnswerIdx: 3,
    answers: [
      { text: '""' },
      { text: '"💩"' },
      { text: 'throw Error' },
      { text: 'NaN' }
    ]
  },
  {
    type: 'code',
    level: 9,
    text: '"💩".length',
    explanation: 'Unicode characters, like the 💩 emoji, require two bytes. String.prototype.length returns the number of bytes rather than the number of characters, returning an unexpected result.',
    correctAnswerIdx: 2,
    answers: [{ text: '0' }, { text: '1' }, { text: '2' }, { text: 'NaN' }]
  },
  {
    type: 'code',
    level: 9,
    text: '0.1 + 0.2',
    explanation: "JavaScript's floating point operations have issues with overflow rounding precision. When doing floating point operations, use Number.prototype.toPrecision() to protect values.",
    correctAnswerIdx: 2,
    answers: [
      { text: '0.3' },
      { text: '0.29999999999999991' },
      { text: '0.30000000000000004' },
      { text: 'null' }
    ]
  },
  {
    type: 'code',
    level: 9,
    text: '[1, 2, 3] + [4, 5, 6]',
    explanation: 'Both arrays are converted to a string, then concatenated',
    correctAnswerIdx: 3,
    answers: [
      { text: '[1, 2, 3, 4, 5, 6]' },
      { text: '"1,2,3,4,5,6"' },
      { text: 'throw Error' },
      { text: '"1,2,34,5,6"' }
    ]
  },
  {
    type: 'code',
    level: 9,
    text: '1 / 0',
    explanation: "JavaScript's Number type includes the concepts of positive and negative Infinity.",
    correctAnswerIdx: 1,
    answers: [
      { text: 'NaN' },
      { text: 'Infinity' },
      { text: 'null' },
      { text: 'throw Error' }
    ]
  },
  {
    type: 'code',
    level: 9,
    text: '+"42"',
    explanation: 'The "+" operator is not preceded by a String, so it is considered arithmetic and attempts to coerce the following value into a Number. The gets evaluated as "0 + 42".',
    correctAnswerIdx: 0,
    answers: [
      { text: '42' },
      { text: '43' },
      { text: '"43"' },
      { text: 'NaN' }
    ]
  },
  {
    type: 'code',
    level: 9,
    text: '[10, 5, 1].sort()',
    explanation: "Array.prototype.sort's default comparator assumes String operations. All values are coerced and compared as Strings.",
    correctAnswerIdx: 1,
    answers: [
      { text: '[1, 5, 10]' },
      { text: '[1, 10, 5]' },
      { text: '[10, 5, 1]' },
      { text: '[5, 10, 1]' }
    ]
  },
  {
    type: 'code',
    level: 9,
    text: 'NaN == NaN',
    explanation: 'NaN is a value assigned to an instance of a Number, rather than a discrete value. Each instance is independent and will not equal other instances. To evaluate, you must use `isNaN()`.',
    correctAnswerIdx: 0,
    answers: [
      { text: 'false' },
      { text: 'true' },
      { text: 'throw Error' },
      { text: 'null' }
    ]
  },
  {
    type: 'code',
    level: 9,
    text: '3 > 2 > 1',
    explanation: '3 > 2 is first evaluated as true, then true > 1, which cannot be compared.',
    correctAnswerIdx: 0,
    answers: [
      { text: 'false' },
      { text: 'true' },
      { text: 'throw Error' },
      { text: 'null' }
    ]
  },
  {
    type: 'code',
    level: 9,
    text: 'typeof typeof 1',
    explanation: 'typeof returns a string, which has a type of string',
    correctAnswerIdx: 1,
    answers: [
      { text: '"number"' },
      { text: '"string"' },
      { text: '"object"' },
      { text: 'throw Error' }
    ]
  }
]