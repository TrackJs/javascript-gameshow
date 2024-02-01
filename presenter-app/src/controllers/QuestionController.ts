/*
  Question Plan:
  5 Questions per game:
    1 trivial (sticker, cheap swag)
    1 easy (ok swag)
    2 mod  (p:tokens, good swag)
    1 hard (p:good)

  threshold at 3 (1 mod question);

  up to 10 players
    10x trivial
    10x easy
    20x mod
    10x hard
    +10x find-player
*/

import { getRandomInteger } from "src/utils/getRandomInteger"

export interface QuestionAnswer {
  id: string
  text: string
  hide?: boolean
}

export interface Question {
  id: string,
  difficulty: 0 | 1 | 2 | 3 | 4 | 9,
  type: "code" | "text",
  text: string,
  afterText: string,
  correctId: string
  answers: QuestionAnswer[]
}

interface QuestionClaim {
  claimKey: string
  questionId: string
}

const QUESTIONS: Question[] = [
  // Trivial Difficulty Questions (10)
  {
    "id": "403830a44f1f40368c39e3388e485510",
    "difficulty": 0,
    "type": "code",
    "text": "true == 1",
    "afterText": "Both are truthy values",
    "correctId": "1",
    "answers": [
      { text: "true", "id": "1" },
      { text: "false", "id": "2" },
      { text: "TypeError: Invalid types", "id": "3" },
      { text: "undefined", "id": "4" }
    ]
  },
  {
    "id": "741eeb1cf4e246798c4410dea60c2049",
    "difficulty": 0,
    "type": "code",
    "text": "false == 0",
    "afterText": "Both are falsy values'",
    "correctId": "1",
    "answers": [
      { text: "true", "id": "1" },
      { text: "false", "id": "2" },
      { text: "TypeError: Invalid types", "id": "3" },
      { text: "undefined", "id": "4" }
    ]
  },
  {
    "id": "b5b6db6684c54e229b54e01a7480d473",
    "difficulty": 0,
    "type": "code",
    "text": "true == !!'false'",
    "afterText": "The string 'false' is truthy, which becomes true",
    "correctId": "1",
    "answers": [
      { text: "true", "id": "1" },
      { text: "false", "id": "2" },
      { text: "TypeError: Invalid types", "id": "3" },
      { text: "undefined", "id": "4" }
    ]
  },
  {
    "id": "a2c729f5597f464aa09d13461e4fe80f",
    "difficulty": 0,
    "type": "code",
    "text": "true == !!'true'",
    "afterText": "The string 'true' is truthy, which becomes true",
    "correctId": "1",
    "answers": [
      { text: "true", "id": "1" },
      { text: "false", "id": "2" },
      { text: "TypeError: Invalid types", "id": "3" },
      { text: "undefined", "id": "4" }
    ]
  },
  // {
  //   "id": "298b3fb884974fbca4d020702f16360d",
  //   "difficulty": 0,
  //   "type": "code",
  //   "text": "5 * 10",
  //   "afterText": "JavaScript can do math.",
  //   "correctId": "1",
  //   "answers": [
  //     { text: "50", "id": "1" },
  //     { text: "\"510\"", "id": "2" },
  //     { text: "NaN", "id": "3" },
  //     { text: "15", "id": "4" }
  //   ]
  // },
  // {
  //   "id": "84438a6d585a4d00bcb92d755e9d7365",
  //   "difficulty": 0,
  //   "type": "code",
  //   "text": "\"hello\" + 'world'",
  //   "afterText": "String concatination works regardless of quote type.",
  //   "correctId": "1",
  //   "answers": [
  //     { text: "\"helloworld\"", "id": "1" },
  //     { text: "\"hello world\"", "id": "2" },
  //     { text: "\"hello'world'\"", "id": "3" },
  //     { text: "throw Error", "id": "4" }
  //   ]
  // },
  // {
  //   "id": "a3f2f5e5031b42eba43055c366f5dc77",
  //   "difficulty": 0,
  //   "type": "code",
  //   "text": "'goodbye' + \"world\"",
  //   "afterText": "String concatination works regardless of quote type.",
  //   "correctId": "1",
  //   "answers": [
  //     { text: "\"goodbyeworld\"", "id": "1" },
  //     { text: "\"goodbye world\"", "id": "2" },
  //     { text: "\"'goodbye'world\"", "id": "3" },
  //     { text: "throw Error", "id": "4" }
  //   ]
  // },
  // {
  //   "id": "e5ccf18775b541d3b291439792edc281",
  //   "difficulty": 0,
  //   "type": "code",
  //   "text": "\"Goodbye\" + \"world\"",
  //   "afterText": "String concatination with the plus symbol.",
  //   "correctId": "1",
  //   "answers": [
  //     { text: "\"Goodbyeworld\"", "id": "1" },
  //     { text: "\"Goodbye world\"", "id": "2" },
  //     { text: "true", "id": "3" },
  //     { text: "NaN", "id": "4" }
  //   ]
  // },
  // {
  //   "id": "86d942661c1e435897264241e95e9f2c",
  //   "difficulty": 0,
  //   "type": "code",
  //   "text": "\"Code\" + 4 + \"Life\"",
  //   "afterText": "String concatination with the plus symbol coerces a number.",
  //   "correctId": "1",
  //   "answers": [
  //     { text: "\"Code4Life\"", "id": "1" },
  //     { text: "\"Code 4 Life\"", "id": "2" },
  //     { text: "6", "id": "3" },
  //     { text: "NaN", "id": "4" }
  //   ]
  // },
  // {
  //   "id": "13d5589fc756421284a041e798136c8c",
  //   "difficulty": 0,
  //   "type": "code",
  //   "text": "\"Legit\" + 2 + \"Quit\"",
  //   "afterText": "String concatination with the plus symbol coerces a number.",
  //   "correctId": "1",
  //   "answers": [
  //     { text: "\"Legit2Quit\"", "id": "1" },
  //     { text: "\"Legit 2 Quit\"", "id": "2" },
  //     { text: "3", "id": "3" },
  //     { text: "NaN", "id": "4" }
  //   ]
  // },

  // Easy (10)
  {
    "id": "384977a2498d46c48d7900bf0b16ee47",
    "difficulty": 1,
    "type": "text",
    "text": "JavaScript was originally created by which famous programmer?",
    "afterText": "He created the JavaScript programming language and co-founded the Mozilla project, the Mozilla Foundation, and the Mozilla Corporation.",
    "correctId": "1",
    "answers": [
      { text: "Brendan Eich", "id": "1" },
      { text: "John Resig", "id": "2" },
      { text: "John Carmack", "id": "3" },
      { text: "Linus Torvalds", "id": "4" },
    ]
  },
  {
    "id": "a3dc2d0c66cd4e97895e1c90f487ad0f",
    "difficulty": 1,
    "type": "text",
    "text": "JavaScript was developed and promoted by which technology company?",
    "afterText": "The lead developers of Mosaic then founded the Netscape corporation, which released a more polished browser, Netscape Navigator, in 1994.",
    "correctId": "1",
    "answers": [
      { text: "Netscape", "id": "1" },
      { text: "Microsoft", "id": "2" },
      { text: "Google", "id": "3" },
      { text: "Apple", "id": "4" }
    ]
  },
  {
    "id": "4cb39ef263c640959cc1a682365b7895",
    "difficulty": 1,
    "type": "text",
    "text": "JavaScript was first released in what year?",
    "afterText": "Although the new language and its interpreter implementation were called LiveScript when first shipped as part of a Navigator beta in September 1995, the name was changed to JavaScript for the official release in December.",
    "correctId": "1",
    "answers": [
      { text: "1995", "id": "1" },
      { text: "1993", "id": "2" },
      { text: "1989", "id": "3" },
      { text: "1999", "id": "4" }
    ]
  },
  {
    "id": "5efa3b924bfb4f57813948fcf54f1b2f",
    "difficulty": 1,
    "type": "text",
    "text": "JavaScript™️, the Trademark, is owned by which company?",
    "afterText": "\"JavaScript\" is a trademark of Oracle Corporation in the United States. The trademark was originally issued to Sun Microsystems on 6 May 1997, and was transferred to Oracle when they acquired Sun in 2010.",
    "correctId": "1",
    "answers": [
      { text: "Oracle", "id": "1" },
      { text: "Microsoft", "id": "2" },
      { text: "Google", "id": "3" },
      { text: "Mozilla", "id": "4" }
    ]
  },
  {
    "id": "4fd5a22adf56448e9502a8dd12246be3",
    "difficulty": 1,
    "type": "text",
    "text": "JavaScript conforms to what standard?",
    "afterText": "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.",
    "correctId": "1",
    "answers": [
      { text: "ECMAScript", "id": "1" },
      { text: "JScript", "id": "2" },
      { text: "Java", "id": "3" },
      { text: "jQuery", "id": "4" }
    ]
  },
  // {
  //   "id": "58f39bf97b7c4875962042bebcb1346f",
  //   "difficulty": 1,
  //   "type": "code",
  //   "text": "function(){ return this; }.call(window)",
  //   "afterText": "Call invokes a function with a specified value for `this`.",
  //   "correctId": "3",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "null"
  //     },
  //     {
  //       "id": "2",
  //       "text": "this"
  //     },
  //     {
  //       "id": "3",
  //       "text": "window"
  //     },
  //     {
  //       "id": "4",
  //       "text": "throw Error"
  //     }
  //   ]
  // },
  // {
  //   "id": "336cf3345c71451da25d6c8f3f6285e5",
  //   "difficulty": 1,
  //   "type": "code",
  //   "text": "\"42\" + 1",
  //   "afterText": "The \"+\" is preceded by a String, so is therefore considered concatenation. Subsequent variables are coerced into Strings.",
  //   "correctId": "3",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "43"
  //     },
  //     {
  //       "id": "2",
  //       "text": "\"43\""
  //     },
  //     {
  //       "id": "3",
  //       "text": "\"421\""
  //     },
  //     {
  //       "id": "4",
  //       "text": "NaN"
  //     }
  //   ]
  // },
  // {
  //   "id": "4c72445bcb084c71a32d984cfe34e503",
  //   "difficulty": 1,
  //   "type": "code",
  //   "text": "true && false",
  //   "afterText": "Basic logical AND operators",
  //   "correctId": "1",
  //   "answers": [
  //     { text: "false", "id": "1" },
  //     { text: "\"truefalse\"", "id": "2" },
  //     { text: "true", "id": "3" },
  //     { text: "0", "id": "4" }
  //   ]
  // },
  // {
  //   "id": "6872a24ecd72467f8646c8d5789b6b78",
  //   "difficulty": 1,
  //   "type": "code",
  //   "text": "true || false",
  //   "afterText": "Basic logical OR operators",
  //   "correctId": "1",
  //   "answers": [
  //     { text: "true", "id": "1" },
  //     { text: "\"truefalse\"", "id": "2" },
  //     { text: "false", "id": "3" },
  //     { text: "1", "id": "4" }
  //   ]
  // },
  // {
  //   "id": "1dce307751d14552879ab3bf3ac31cab",
  //   "difficulty": 1,
  //   "type": "code",
  //   "text": "8 / 0",
  //   "afterText": "JavaScript can do math.",
  //   "correctId": "1",
  //   "answers": [
  //     { text: "Infinity", "id": "1" },
  //     { text: "throw Error", "id": "2" },
  //     { text: "undefined", "id": "3" },
  //     { text: "NaN", "id": "4" }
  //   ]
  // },

  // Moderate (10)
  {
    "id": "75bbe984741a45489b23415966cf4819",
    "difficulty": 2,
    "type": "code",
    "text": "42 + true",
    "afterText": "The '+' is considered arithmetic, and coerces the boolean to a Number, 1.",
    "correctId": "1",
    "answers": [
      {
        "id": "1",
        "text": "43"
      },
      {
        "id": "2",
        "text": "true"
      },
      {
        "id": "3",
        "text": "false"
      },
      {
        "id": "4",
        "text": "42"
      }
    ]
  },
  {
    "id": "405af0942771451bb0d43140f6745ab9",
    "difficulty": 2,
    "type": "code",
    "text": "null || undefined || {}",
    "afterText": "Logical OR stops and returns the value of the first truthy value in the series.",
    "correctId": "3",
    "answers": [
      {
        "id": "1",
        "text": "null"
      },
      {
        "id": "2",
        "text": "undefined"
      },
      {
        "id": "3",
        "text": "{}"
      },
      {
        "id": "4",
        "text": "throw Error"
      }
    ]
  },
  // {
  //   "id": "8556d009fdf940e89cfb0f9e2e61457f",
  //   "difficulty": 2,
  //   "type": "code",
  //   "text": "false == \"false\"",
  //   "afterText": "the string \"false\" is a truthy value.",
  //   "correctId": "2",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "true"
  //     },
  //     {
  //       "id": "2",
  //       "text": "false"
  //     },
  //     {
  //       "id": "3",
  //       "text": "throw Error"
  //     },
  //     {
  //       "id": "4",
  //       "text": "\"false\""
  //     }
  //   ]
  // },
  // {
  //   "id": "8930afdb93f344fe93c9333882944521",
  //   "difficulty": 2,
  //   "type": "code",
  //   "text": "(function(a, b, c){ return c; })(1, ...[1, 2, 3])",
  //   "afterText": "The spread operator will expand the array to cover the rest of the available arguments.",
  //   "correctId": "2",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "1"
  //     },
  //     {
  //       "id": "2",
  //       "text": "2"
  //     },
  //     {
  //       "id": "3",
  //       "text": "3"
  //     },
  //     {
  //       "id": "4",
  //       "text": "undefined"
  //     }
  //   ]
  // },
  // {
  //   "id": "7f6c5f32937446d38b8dfbbe880f6a19",
  //   "difficulty": 2,
  //   "type": "code",
  //   "text": "(function(){ return arguments; })(1, 2)",
  //   "afterText": "Arguments is a special array-like object that is built in to normal JavaScript functions.",
  //   "correctId": "1",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "[1, 2]"
  //     },
  //     {
  //       "id": "2",
  //       "text": "[Arguments]"
  //     },
  //     {
  //       "id": "3",
  //       "text": "undefined"
  //     },
  //     {
  //       "id": "4",
  //       "text": "throw Error"
  //     }
  //   ]
  // },
  {
    "id": "2386f8b1f5b1427a983d238edb637b13",
    "difficulty": 2,
    "type": "code",
    "text": "[1,2,3] == [1,2,3]",
    "afterText": "Arrays are reference types in JavaScript. So although they contain the same values, they are different arrays.",
    "correctId": "2",
    "answers": [
      {
        "id": "1",
        "text": "true"
      },
      {
        "id": "2",
        "text": "false"
      },
      {
        "id": "3",
        "text": "throw Error"
      },
      {
        "id": "4",
        "text": "[1,2,3,1,2,3]"
      }
    ]
  },
  // {
  //   "id": "857dbbb9cd9d430cb07293e36565426c",
  //   "difficulty": 2,
  //   "type": "code",
  //   "text": "[1,2,3].toString()",
  //   "afterText": "Arrays are represented as comma-separated strings of values.",
  //   "correctId": "3",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "\"[1, 2, 3]\""
  //     },
  //     {
  //       "id": "2",
  //       "text": "123"
  //     },
  //     {
  //       "id": "3",
  //       "text": "1,2,3"
  //     },
  //     {
  //       "id": "4",
  //       "text": "throw Error"
  //     }
  //   ]
  // },
  {
    "id": "cee98e11ba5a4652b5b1b774f60aaf77",
    "difficulty": 2,
    "type": "code",
    "text": "typeof NaN",
    "afterText": "Despite its name of \"Not a Number\", it is, in fact, an instance of the Number type.",
    "correctId": "4",
    "answers": [
      {
        "id": "1",
        "text": "object"
      },
      {
        "id": "2",
        "text": "null"
      },
      {
        "id": "3",
        "text": "NaN"
      },
      {
        "id": "4",
        "text": "Number"
      }
    ]
  },
  // {
  //   "id": "397c80d1c9724965ba49958184ce2648",
  //   "difficulty": 2,
  //   "type": "code",
  //   "text": "true == \"true\"",
  //   "afterText": "Both true and a non-empty string are truthy types.",
  //   "correctId": "1",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "true"
  //     },
  //     {
  //       "id": "2",
  //       "text": "false"
  //     },
  //     {
  //       "id": "3",
  //       "text": "throw Error"
  //     },
  //     {
  //       "id": "4",
  //       "text": "\"true\""
  //     }
  //   ]
  // },
  // {
  //   "id": "737b2c503cef4cf2a7f4c87cfb7a2b79",
  //   "difficulty": 2,
  //   "type": "code",
  //   "text": "!!\"\"",
  //   "afterText": "Logical negation of a value will coerce it to a Boolean type. Double negation will flip the value back to its original Boolean coerced value.",
  //   "correctId": "3",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "\"\""
  //     },
  //     {
  //       "id": "2",
  //       "text": "true"
  //     },
  //     {
  //       "id": "3",
  //       "text": "false"
  //     },
  //     {
  //       "id": "4",
  //       "text": "throw Error"
  //     }
  //   ]
  // },

  // Mod 2 (10)
  // {
  //   "id": "6b886e2cb39a429ba96f7a8923468a62",
  //   "difficulty": 3,
  //   "type": "code",
  //   "text": "undefined == 0",
  //   "afterText": "Both undefined and 0 are falsy types and will equal with coerced equality.",
  //   "correctId": "1",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "true"
  //     },
  //     {
  //       "id": "2",
  //       "text": "false"
  //     },
  //     {
  //       "id": "3",
  //       "text": "throw Error"
  //     },
  //     {
  //       "id": "4",
  //       "text": "null"
  //     }
  //   ]
  // },
  {
    "id": "c09fee8a1e8e4124aee216eae87b92f8",
    "difficulty": 3,
    "type": "code",
    "text": "[,,,].length",
    "afterText": "The final comma in the Array literal is considered trailing, so no fourth index is added.",
    "correctId": "2",
    "answers": [
      {
        "id": "1",
        "text": "4"
      },
      {
        "id": "2",
        "text": "3"
      },
      {
        "id": "3",
        "text": "2"
      },
      {
        "id": "4",
        "text": "undefined"
      }
    ]
  },
  // {
  //   "id": "81a16112bf584a5990db1a5b5f8bcf0c",
  //   "difficulty": 3,
  //   "type": "code",
  //   "text": "\"poop\" instanceof String",
  //   "afterText": "String literals have the type of string, but are not instances of String",
  //   "correctId": "2",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "true"
  //     },
  //     {
  //       "id": "2",
  //       "text": "false"
  //     },
  //     {
  //       "id": "3",
  //       "text": "throw Error"
  //     },
  //     {
  //       "id": "4",
  //       "text": "\"poop\""
  //     }
  //   ]
  // },
  {
    "id": "bd4e32132c9d480fbf7c7acb4dddc605",
    "difficulty": 3,
    "type": "code",
    "text": "parseInt(\"poop\", 26)",
    "afterText": "The second parameter of parseint is a radix (base) specification.",
    "correctId": "4",
    "answers": [
      {
        "id": "1",
        "text": "NaN"
      },
      {
        "id": "2",
        "text": "26"
      },
      {
        "id": "3",
        "text": "throw Error"
      },
      {
        "id": "4",
        "text": "456273"
      }
    ]
  },
  {
    "id": "07b701cbf7304ef48039125d19b81bf9",
    "difficulty": 3,
    "type": "code",
    "text": "Math.max()",
    "afterText": "Called with no arguments, Math.max() returns the smallest number in JavaScript.",
    "correctId": "3",
    "answers": [
      {
        "id": "1",
        "text": "0"
      },
      {
        "id": "2",
        "text": "Infinity"
      },
      {
        "id": "3",
        "text": "-Infinity"
      },
      {
        "id": "4",
        "text": "10e1000"
      }
    ]
  },
  {
    "id": "81ad581cf6c84749afff796a05e57e8f",
    "difficulty": 3,
    "type": "code",
    "text": "new Date(2016, 5, 31)",
    "afterText": "Months are zero based with respect to Dates in JS.  This is really saying June 31st, which is coerced to Jul 1.",
    "correctId": "1",
    "answers": [
      {
        "id": "1",
        "text": "Fri Jul 01 2016"
      },
      {
        "id": "2",
        "text": "Tue May 31 2016"
      },
      {
        "id": "3",
        "text": "Tue May 31 2017"
      },
      {
        "id": "4",
        "text": "Wed Jun 1 2016"
      }
    ]
  },
  // {
  //   "id": "d9651ed51f1a428990c61016e49fa1cd",
  //   "difficulty": 3,
  //   "type": "code",
  //   "text": "function(){ return this; }.bind(window).call(document)",
  //   "afterText": "Function.prototype.bind locks the value of `this` for all future invocations of a function, even if it has been specified otherwise.",
  //   "correctId": "2",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "null"
  //     },
  //     {
  //       "id": "2",
  //       "text": "window"
  //     },
  //     {
  //       "id": "3",
  //       "text": "document"
  //     },
  //     {
  //       "id": "4",
  //       "text": "throw Error"
  //     }
  //   ]
  // },
  // {
  //   "id": "80881e3a14cd480f8073eea3ba7c8cef",
  //   "difficulty": 3,
  //   "type": "code",
  //   "text": "Math.min()",
  //   "afterText": "Called with no arguments, Math.min() returns the largest number in JavaScript.",
  //   "correctId": "2",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "0"
  //     },
  //     {
  //       "id": "2",
  //       "text": "Infinity"
  //     },
  //     {
  //       "id": "3",
  //       "text": "-Infinity"
  //     },
  //     {
  //       "id": "4",
  //       "text": "10e1000"
  //     }
  //   ]
  // },
  // {
  //   "id": "dbfbc839ff4849bcad2ab77f041e7d02",
  //   "difficulty": 3,
  //   "type": "code",
  //   "text": "[] == ![]",
  //   "afterText": "Array types are not compared natively, so the value is coerced into a string, \"\", which will evaluate to falsy. The second array is forced to a boolean false.",
  //   "correctId": "1",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "true"
  //     },
  //     {
  //       "id": "2",
  //       "text": "false"
  //     },
  //     {
  //       "id": "3",
  //       "text": "throw Error"
  //     },
  //     {
  //       "id": "4",
  //       "text": "[]"
  //     }
  //   ]
  // },
  // {
  //   "id": "ebfbc839ff4849bcad2ab77f041e7d02",
  //   "difficulty": 3,
  //   "type": "code",
  //   "text": "[] == []",
  //   "afterText": "Array types are not compared natively, so the value is coerced into a string, \"\", which will evaluate to falsy. The second array is forced to a boolean true.",
  //   "correctId": "2",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "true"
  //     },
  //     {
  //       "id": "2",
  //       "text": "false"
  //     },
  //     {
  //       "id": "3",
  //       "text": "throw Error"
  //     },
  //     {
  //       "id": "4",
  //       "text": "[]"
  //     }
  //   ]
  // },

  // Hard (10)
  {
    "id": "0e428b04de4548ad8abf71b165749886",
    "difficulty": 4,
    "type": "code",
    "text": "null == false",
    "afterText": "Despite null being a falsy value, it is not equal to false in the abstract equality comparison specification.",
    "correctId": "2",
    "answers": [
      {
        "id": "1",
        "text": "true"
      },
      {
        "id": "2",
        "text": "false"
      },
      {
        "id": "3",
        "text": "throw Error"
      },
      {
        "id": "4",
        "text": "\"null\""
      }
    ]
  },
  // {
  //   "id": "f693faf553424faf85875354fbcc6957",
  //   "difficulty": 4,
  //   "type": "code",
  //   "text": "typeof null",
  //   "afterText": "Null, like almost all other concepts in JavaScript, is an object. However, it is a special case of Object where its type is object, but it is not an instance of object.",
  //   "correctId": "1",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "\"object\""
  //     },
  //     {
  //       "id": "2",
  //       "text": "\"null\""
  //     },
  //     {
  //       "id": "3",
  //       "text": "\"function\""
  //     },
  //     {
  //       "id": "4",
  //       "text": "\"array\""
  //     }
  //   ]
  // },
  // {
  //   "id": "3b42938c00c74921959b2d6a6c65c225",
  //   "difficulty": 4,
  //   "type": "code",
  //   "text": "null instanceof Object",
  //   "afterText": "Null, like almost all other concepts in JavaScript, is an object. However, it is a special case of Object where its type is object, but it is not an instance of object.",
  //   "correctId": "1",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "false"
  //     },
  //     {
  //       "id": "2",
  //       "text": "true"
  //     },
  //     {
  //       "id": "3",
  //       "text": "throw Error"
  //     },
  //     {
  //       "id": "4",
  //       "text": "null"
  //     }
  //   ]
  // },
  {
    "id": "de86307d046c4be081d1659d01ea7199",
    "difficulty": 4,
    "type": "code",
    "text": "return\n  { id: 42 };",
    "afterText": "Automatic Semicolon Insertion (ASI) sees a complete statement in `return` and inserts a semicolon, causing the function to return undefined.",
    "correctId": "3",
    "answers": [
      {
        "id": "1",
        "text": "null"
      },
      {
        "id": "2",
        "text": "{ id: 42 }"
      },
      {
        "id": "3",
        "text": "undefined"
      },
      {
        "id": "4",
        "text": "throw Error"
      }
    ]
  },
  // {
  //   "id": "9193639211a248e2bd782ba62eb26040",
  //   "difficulty": 4,
  //   "type": "code",
  //   "text": "[] + []",
  //   "afterText": "Array.prototype.toString is used in the coercion, which results in an empty string. Both are concatenated.",
  //   "correctId": "1",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "\"\""
  //     },
  //     {
  //       "id": "2",
  //       "text": "[]"
  //     },
  //     {
  //       "id": "3",
  //       "text": "undefined"
  //     },
  //     {
  //       "id": "4",
  //       "text": "throw Error"
  //     }
  //   ]
  // },
  {
    "id": "eb54d2ced1984e21beb464fa26135f68",
    "difficulty": 4,
    "type": "code",
    "text": "(function foo(a, b) {}).length",
    "afterText": "Function.prototype.length returns the number of arguments specified in the function definition.",
    "correctId": "3",
    "answers": [
      {
        "id": "1",
        "text": "0"
      },
      {
        "id": "2",
        "text": "21"
      },
      {
        "id": "3",
        "text": "2"
      },
      {
        "id": "4",
        "text": "undefined"
      }
    ]
  },
  {
    "id": "08ec6fdf6da24e859e325bcd83f8bc9a",
    "difficulty": 4,
    "type": "code",
    "text": "(\"js\", \"rocks\")",
    "afterText": "The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand.",
    "correctId": "1",
    "answers": [
      {
        "id": "1",
        "text": "\"rocks\""
      },
      {
        "id": "2",
        "text": "\"js\""
      },
      {
        "id": "3",
        "text": "undefined"
      },
      {
        "id": "4",
        "text": "throw Error"
      }
    ]
  },
  // {
  //   "id": "8cb65d51350b40af92836c466b48321d",
  //   "difficulty": 4,
  //   "type": "code",
  //   "text": "!!~[1, 2, 3].indexOf(3)",
  //   "afterText": "Bitwise NOT operator (~) will convert any number x to -(x + 1).  Double negation yields answer for whether array contains item.",
  //   "correctId": "2",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "false"
  //     },
  //     {
  //       "id": "2",
  //       "text": "true"
  //     },
  //     {
  //       "id": "3",
  //       "text": "2"
  //     },
  //     {
  //       "id": "4",
  //       "text": "-2"
  //     }
  //   ]
  // },
  // {
  //   "id": "7b20efaf8ef8480aae80951ddbc76485",
  //   "difficulty": 4,
  //   "type": "code",
  //   "text": "(() => arguments)(1, 2)",
  //   "afterText": "Fat arrow functions do not expose an instrinsic \"arguments\" property like normal functions.",
  //   "correctId": "3",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "[1, 2]"
  //     },
  //     {
  //       "id": "2",
  //       "text": "[object Arguments]"
  //     },
  //     {
  //       "id": "3",
  //       "text": "throw Error"
  //     },
  //     {
  //       "id": "4",
  //       "text": "undefined"
  //     }
  //   ]
  // },
  // {
  //   "id": "1a1103afd92845b299ed9e6909f266d3",
  //   "difficulty": 4,
  //   "type": "code",
  //   "text": "Array(0, 1, Array(2));",
  //   "afterText": "Instantiating an Array with multiple arguments creates an Array from those values. However a single argument only specifies the length.",
  //   "correctId": "2",
  //   "answers": [
  //     {
  //       "id": "1",
  //       "text": "[0, 1, [2]]"
  //     },
  //     {
  //       "id": "2",
  //       "text": "[0, 1, [undefined, undefined]]"
  //     },
  //     {
  //       "id": "3",
  //       "text": "[0, 1, 2]"
  //     },
  //     {
  //       "id": "4",
  //       "text": "[0, 1, \"[object Array]\"]"
  //     }
  //   ]
  // },

  // Find Player (10)
  {
    "id": "9b2f2090434b484c94be42af5360c33b",
    "difficulty": 9,
    "type": "code",
    "text": "\"💩\" - \"💩\"",
    "afterText": "The \"-\" operator is always arithmetic, so both items are coerced into Numbers. They cannot be interpreted, and result in NaN.",
    "correctId": "4",
    "answers": [
      { "id": "1", "text": "\"\"" },
      { "id": "2", "text": "\"💩\"" },
      { "id": "3", "text": "throw Error" },
      { "id": "4", "text": "NaN" }
    ]
  },
  {
    "id": "7e863fc1bc444a588fc72dc631bd8fa6",
    "difficulty": 9,
    "type": "code",
    "text": "\"💩\".length",
    "afterText": "Unicode characters, like the 💩 emoji, require two bytes. String.prototype.length returns the number of bytes rather than the number of characters, returning an unexpected result.",
    "correctId": "3",
    "answers": [
      { "id": "1", "text": "0" },
      { "id": "2", "text": "1" },
      { "id": "3", "text": "2" },
      { "id": "4", "text": "NaN" }
    ]
  },
  {
    "id": "75d5a65240894e92a363e7f704de763b",
    "difficulty": 9,
    "type": "code",
    "text": "0.1 + 0.2",
    "afterText": "JavaScript's floating point operations have issues with overflow rounding precision. When doing floating point operations, use Number.prototype.toPrecision() to protect values.",
    "correctId": "3",
    "answers": [
      {
        "id": "1",
        "text": "0.3"
      },
      {
        "id": "2",
        "text": "0.29999999999999991"
      },
      {
        "id": "3",
        "text": "0.30000000000000004"
      },
      {
        "id": "4",
        "text": "null"
      }
    ]
  },
  {
    "id": "feea0ca58e0148be9b3a03315e851ae2",
    "difficulty": 9,
    "type": "code",
    "text": "[1, 2, 3] + [4, 5, 6]",
    "afterText": "Both arrays are converted to a string, then concatenated",
    "correctId": "4",
    "answers": [
      {
        "id": "1",
        "text": "[1, 2, 3, 4, 5, 6]"
      },
      {
        "id": "2",
        "text": "\"1,2,3,4,5,6\""
      },
      {
        "id": "3",
        "text": "throw Error"
      },
      {
        "id": "4",
        "text": "1,2,34,5,6"
      }
    ]
  },
  {
    "id": "9f0b6b6e51504ed6882ef532ae35794b",
    "difficulty": 9,
    "type": "code",
    "text": "1 / 0",
    "afterText": "JavaScript's Number type includes the concepts of positive and negative Infinity.",
    "correctId": "2",
    "answers": [
      {
        "id": "1",
        "text": "NaN"
      },
      {
        "id": "2",
        "text": "Infinity"
      },
      {
        "id": "3",
        "text": "null"
      },
      {
        "id": "4",
        "text": "throw Error"
      }
    ]
  },
  {
    "id": "45175451631647ba8ab3af2e996b7593",
    "difficulty": 9,
    "type": "code",
    "text": "+\"42\"",
    "afterText": "The \"+\" operator is not preceded by a String, so it is considered arithmetic and attempts to coerce the following value into a Number. The gets evaluated as \"0 + 42\".",
    "correctId": "1",
    "answers": [
      {
        "id": "1",
        "text": "42"
      },
      {
        "id": "2",
        "text": "43"
      },
      {
        "id": "3",
        "text": "\"43\""
      },
      {
        "id": "4",
        "text": "NaN"
      }
    ]
  },
  {
    "id": "1cf04949978c4cd3ada36ddb14ec5536",
    "difficulty": 9,
    "type": "code",
    "text": "[10, 5, 1].sort()",
    "afterText": "Array.prototype.sort's default comparator assumes String operations. All values are coerced and compared as Strings.",
    "correctId": "2",
    "answers": [
      {
        "id": "1",
        "text": "[1, 5, 10]"
      },
      {
        "id": "2",
        "text": "[1, 10, 5]"
      },
      {
        "id": "3",
        "text": "[10, 5, 1]"
      },
      {
        "id": "4",
        "text": "[5, 10, 1]"
      }
    ]
  },
  {
    "id": "8dc45b8b9fbf4ba69ff3f90135a07d8e",
    "difficulty": 9,
    "type": "code",
    "text": "NaN == NaN",
    "afterText": "NaN is a value assigned to an instance of a Number, rather than a discrete value. Each instance is independent and will not equal other instances. To evaluate, you must use `isNaN()`.",
    "correctId": "1",
    "answers": [
      {
        "id": "1",
        "text": "false"
      },
      {
        "id": "2",
        "text": "true"
      },
      {
        "id": "3",
        "text": "throw Error"
      },
      {
        "id": "4",
        "text": "null"
      }
    ]
  },
  {
    "id": "9dc45b8b9fbf4ba69ff3f90135a07a8e",
    "difficulty": 9,
    "type": "code",
    "text": "3 > 2 > 1",
    "afterText": "3 > 2 is first evaluated as true, then true > 1, which cannot be compared.",
    "correctId": "1",
    "answers": [
      {
        "id": "1",
        "text": "false"
      },
      {
        "id": "2",
        "text": "true"
      },
      {
        "id": "3",
        "text": "throw Error"
      },
      {
        "id": "4",
        "text": "null"
      }
    ]
  },
  {
    "id": "0dc45b8b9fbf4ba69ff3f9d135a07a8e",
    "difficulty": 9,
    "type": "code",
    "text": "typeof typeof 1",
    "afterText": "typeof returns a string, which has a type of string",
    "correctId": "2",
    "answers": [
      {
        "id": "1",
        "text": "number"
      },
      {
        "id": "2",
        "text": "string"
      },
      {
        "id": "3",
        "text": "object"
      },
      {
        "id": "4",
        "text": "throw Error"
      }
    ]
  }
];

const STORAGE_KEY = "question-usage";

class _QuestionController {

  getAllQuestions(): Question[] {
    return QUESTIONS;
  }

  /**
   * Get a random question at the specified difficulty for the game. If it has already been
   * requested, the same question is returned.
   */
  getQuestion(gameId: string, questionIdx: number, difficulty: 0 | 1 | 2 | 3 | 4 | 9): Question {
    let claims = this.getClaimRecords();
    let claimKey = `${gameId}${questionIdx}`;

    let existingClaim = claims.find(claim => claim.claimKey === claimKey);
    if (existingClaim) {
      return QUESTIONS.find(question => question.id === existingClaim?.questionId) as Question;
    }

    let availableQuestions = QUESTIONS
      .filter(question => !claims.some(claim => claim.questionId === question.id)) // remove existing claims
      .filter(question => question.difficulty === difficulty); // match difficulty

    let question = availableQuestions[getRandomInteger(0, availableQuestions.length)];

    if (!question) {
      throw new Error(`No questions remaining for difficulty ${difficulty}.`);
    }

    claims.push({
      claimKey, questionId: question.id
    });
    this.saveClaimRecords(claims);

    return question;
  }

  logQuestions() {
    console.groupCollapsed("Question Integrity Check");
    console.info(`There are ${QUESTIONS.length} questions.`)
    console.info(`${QUESTIONS.filter(q => !!QUESTIONS.find(qi => qi.id === q.id && q !== qi)).length} have duplicate ids`);
    console.info(`${QUESTIONS.filter(q => q.answers.filter(a => a.id === q.correctId).length !== 1).length} have invalid answers`);
    console.info(`${QUESTIONS.filter(q => q.difficulty === 0).length} have difficulty 0`);
    console.info(`${QUESTIONS.filter(q => q.difficulty === 1).length} have difficulty 1`);
    console.info(`${QUESTIONS.filter(q => q.difficulty === 2).length} have difficulty 2`);
    console.info(`${QUESTIONS.filter(q => q.difficulty === 3).length} have difficulty 3`);
    console.info(`${QUESTIONS.filter(q => q.difficulty === 4).length} have difficulty 4`);
    console.info(`${QUESTIONS.filter(q => q.difficulty === 9).length} have difficulty 9`);
    console.groupEnd();
  }

  private getClaimRecords(): QuestionClaim[] {
    let usageRecords = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return usageRecords;
  }

  private saveClaimRecords(usageRecords: QuestionClaim[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usageRecords));
  }
}

export const QuestionController = new _QuestionController();

const INDEX_TO_DIFFICULTY = [
  0,
  1,
  2,
  3,
  3,
  4,
  4, // lock in after. 6x prizes
  4, // 3x good prizes per game up to 15? 9 committed now
  5,
  5
];



