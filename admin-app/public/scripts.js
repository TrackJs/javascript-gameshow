'use strict';

let user;
let answers;
let questions;
let activeEventId;
let activeQuestionId;

(async () => {
  console.log('loaded');

  firebase.auth().onAuthStateChanged((_user) => {
    console.log("user", _user);
    user = _user
    const loginButton = document.querySelector('#login');
    if (!user) {
      loginButton.innerText = "Are you Cool?";
    } else {
      loginButton.innerText = `Hi ${user.displayName}!`;
      handleListeners();
    }
  })

  async function handleListeners() {
    console.log("starting listeners");
    const form = document.querySelector("#selectQuestionForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const values = new FormData(form);
      selectQuestion(values.get("question"));
    })

    const questionRef = firebase.database().ref('questions')
    const activeEventRef = firebase.database().ref('activeEventId')

    activeEventId = (await activeEventRef.get()).val()
    // questionRef.get().then(snapshot => {
    //   console.log(snapshot)
    // })

    document.querySelector("#eventId").innerHTML = `${activeEventId}`;

    questionRef.on('value', snapshot => {
      questions = snapshot.val();
      const questionList = document.querySelector('#questionList');
      questionList.innerHTML = "";
      Object.keys(questions).forEach(questionId => {
        const question = questions[questionId];

        questionList.innerHTML += `
        <li>
          <label>
            <input type="radio" value="${questionId}" name="question" />
            <span>${question.questionText}</span>
          </label>
        </li>`;
      });
    })

    const answersRef = firebase.database().ref(`/answers/${activeEventId}/${activeQuestionId}`)
    answersRef.on('value', snapshot => {
      answers = snapshot.val();

      if (!answers) { return; }

      const answerList = document.querySelector("#answerList");
      answerList.innerHTML = "";
      Object.keys(answers).forEach(a => {
        const answer = questions[questionId];

        answerList.innerHTML += `
          <li>
            <div>${answer.displayName}</div>
            <div>${answer.answer}</div>
          </li>`;
      });
    });

  }

})();

async function selectQuestion(questionId) {
  console.log("questionId", questionId);

  const questionRef = firebase.database().ref(`questions/${questionId}`)
  questionRef.update({ used: true })
  const activeQuestionRef = firebase.database().ref('activeQuestion')
  activeQuestionRef.set({...questions[questionId], eventId: activeEventId})
  activeQuestionId = questionId
}

async function amITodd() {
  const provider = new firebase.auth.GoogleAuthProvider()
  await firebase.auth().signInWithPopup(provider);
}

(function (ready) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
      ready();
  }
  else {
      document.addEventListener("DOMContentLoaded", ready);
  }
})(function () {
  /* the document is now ready. */




});
