'use strict';

(async () => {

  // global refs
  let activeQuestionRef;
  let answersRef;
  let questionRef;

  // global state
  let user;
  let activeEventId;
  let activeQuestion;
  let questions;

  // global dom
  const questionsEl = document.querySelector(".questions");
  const questionsList = questionsEl.querySelector("#question-list");
  const questionAnswerEl = document.querySelector(".question-answer");
  const answerList = questionAnswerEl.querySelector("#answer-list");

  document.querySelector("#login-button").addEventListener("click", async (evt) => {
    evt.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(provider);
  });

  document.querySelector("#active-question-clear").addEventListener("click", (evt) => {
    evt.preventDefault();
    if (!confirm("Are you sure you want to clear the question?")) { return; }
    if (!activeQuestionRef) { return; }

    activeQuestionRef.remove();
  });

  document.querySelector("#select-question-form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (!activeQuestionRef) { return; }

    const questionId = new FormData(evt.target).get("questionId");

    const questionRef = firebase.database().ref(`questions/${questionId}`)
    questionRef.update({ used: true });

    activeQuestionRef.set({
      eventId: activeEventId,
      questionId,
      ...questions[questionId]
    });
  });

  firebase.auth().onAuthStateChanged(async (_user) => {
    const userAuthEl = document.querySelector(".authed");
    const userLoginEl = document.querySelector(".login");

    user = _user;

    if (!user) {
      console.log("no logged in user");
      userLoginEl.style.display = "block"
      userAuthEl.style.display = "none"
    }
    else {
      console.log("user logged in", user);
      userLoginEl.style.display = "none"
      userAuthEl.style.display = "block"
      userAuthEl.innerText = `${user.displayName}`;

      const activeEventRef = firebase.database().ref('activeEventId');
      activeEventId = (await activeEventRef.get()).val();
      document.querySelector("#eventId").innerHTML = `${activeEventId}`;

      startup();
    }
  });

  async function startup() {
    activeQuestionRef = firebase.database().ref('activeQuestion');
    activeQuestionRef.on('value', async (snapshot) => {
      activeQuestion = snapshot.val();
      console.log("Active Question Updated", activeQuestion);

      if (!activeQuestion) {
        await showQuestionList();
      }
      else {
        await showAnswerList();
      }
    });
  }

  async function showQuestionList() {
    questionsEl.style.display = "block"
    questionAnswerEl.style.display = "none";

    if (questionRef) { questionRef.off(); }
    questionRef = firebase.database().ref('questions');
    questionRef.on('value', (snapshot) => {
      questions = snapshot.val();
      questionsList.innerHTML = "";

      Object.keys(questions).forEach((questionId) => {
        const question = questions[questionId];
        questionsList.innerHTML += `
          <li>
            <label class="${question.used ? "used" : ''}">
              <input type="radio" value="${questionId}" name="questionId" required />
              <div><pre>${question.questionText}</pre></div>
            </label>
          </li>`;
      });
    });
  }

  async function showAnswerList() {
    questionsEl.style.display = "none"
    questionAnswerEl.style.display = "block";

    questionAnswerEl.querySelector(".active-question-text").innerHTML = `
      <div>What is the result of this JavaScript?</div>
      <pre>${activeQuestion.questionText}</pre>`;
    questionAnswerEl.querySelector(".active-question-answer").innerHTML = `
      <div>Answer</div>
      <pre>${activeQuestion.answer}</pre>`;

    if (answersRef) { questionRef.off(); }
    answersRef = firebase.database().ref(`/answers/${activeEventId}/${activeQuestion.questionId}`)
    answersRef.on('value', (snapshot) => {
      const answers = snapshot.val();
      answerList.innerHTML = "";
      if (!answers) { return; }

      Object.keys(answers).forEach((uid) => {
        const answer = answers[uid];
        answerList.innerHTML += `
          <li>
            <div>${answer.displayName}</div>
            <pre>${answer.answer}</pre>
          </li>`;
      });
    });
  }

})();
