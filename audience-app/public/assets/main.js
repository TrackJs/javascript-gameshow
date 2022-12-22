'use strict';

const USERNAME_KEY = "GAMESHOW_USER_NAME";
const USERID_KEY = "GAMESHOW_USER_ID";
const ANSWER_KEY = "GAMESHOW_ANSWER";

(async () => {

  // global state
  let uid;
  let displayName;
  let question;

  // global dom
  const userInfoEl = document.querySelector("#user-info");
  const userLoginSectionEl = document.querySelector("section#login");
  const authedContentEl = document.querySelector("#authed-content");
  const waitingSpinnerSectionEl = document.querySelector("section#waiting-spinner");
  const activeQuestionSectionEl = document.querySelector("section#active-question");
  const answerFormEl = activeQuestionSectionEl.querySelector("#answer-form");
  const answerFormLoadingEl = activeQuestionSectionEl.querySelector("#form-loading");
  const answerFormResultEl = activeQuestionSectionEl.querySelector("#form-result");

  document.querySelector("#user-login-form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    displayName = new FormData(evt.target).get("displayName");
    // Todo security check
    trySet(USERNAME_KEY, displayName);
    showAuthContent();
  });

  document.querySelector("#change-name-button").addEventListener("click", () => {
    showLogin();
  });

  answerFormEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
    showAnswerFormLoading();

    const form = evt.target;
    const answer = new FormData(form).get("answer");
    // TODO Security check

    const payload = {
      uid,
      displayName,
      answer,
      questionId: question.questionId,
      submitTime: firebase.database.ServerValue.TIMESTAMP
    };

    const answerRef = firebase.database().ref(`/answers/${question.eventId}/${question.questionId}/${uid}`);
    answerRef.set(payload).then(() => {
      console.log("answer submitted", payload);
      showAnswerFormResult(answer);
    },
    (rej) => {
      console.error(rej);
      alert(`Failed to submit answer ${rej}. Try again?`);
      showAnswerForm();
    });
  });

  // startup listeners
  const questionRef = firebase.database().ref('/activeQuestion')
  questionRef.on('value', (snapshot) => {
    question = snapshot.val();
    console.log("question", question);

    if (!question) {
      showWaitingSpinner();
    }
    else {
      showActiveQuestion();
    }
  });

  // startup auth
  displayName = tryGet(USERNAME_KEY);
  uid = getUserId();
  if (displayName) {
    showAuthContent();
  }
  else {
    showLogin();
  }

  function startup() {

    const questionRef = firebase.database().ref('/activeQuestion')
    questionRef.on('value', (snapshot) => {
      question = snapshot.val();
      console.log("question", question);

      if (!question) {
        spinnerEl.style.display = "flex";
        activeQuestionTextEl.style.display = "none"
        answerSectionEl.style.display = "none";
      }
      else {
        spinnerEl.style.display = "none";
        activeQuestionTextEl.style.display = "block"
        activeQuestionTextEl.innerHTML = `
          <div>What is the result of this JavaScript?</div>
          <pre>${question.questionText}</pre>`;

        const activeAnswer = tryGet(`${ANSWER_KEY}_${question.questionId}`);
        if (activeAnswer) {
          showAnswerResult(activeAnswer);
        }
        answerSectionEl.style.display = "block";
      }
    });

  }

  function showAuthContent() {
    userInfoEl.querySelector("#display-name").innerText = displayName;
    userInfoEl.style.display = "block";
    authedContentEl.style.display = "block";
    userLoginSectionEl.style.display = "none";
    console.log("user", displayName, uid);
  }

  function showLogin() {
    userInfoEl.style.display = "none";
    authedContentEl.style.display = "none";
    userLoginSectionEl.style.display = "block";
  }

  function showWaitingSpinner() {
    waitingSpinnerSectionEl.style.display = "block";
    activeQuestionSectionEl.style.display = "none";
  }

  function showActiveQuestion() {
    waitingSpinnerSectionEl.style.display = "none";
    activeQuestionSectionEl.style.display = "block";

    activeQuestionSectionEl.querySelector("#active-question-text").innerHTML = `
      <div>What is the result of this JavaScript?</div>
      <pre>${question.questionText}</pre>`;

    const activeAnswer = tryGet(`${ANSWER_KEY}_${question.questionId}`);
    if (activeAnswer) {
      showAnswerFormResult(activeAnswer);
    }
    else {
      showAnswerForm();
    }
  }

  function showAnswerForm() {
    answerFormEl.style.display = "block";
    answerFormLoadingEl.style.display = "none";
    answerFormResultEl.style.display = "none";
  }

  function showAnswerFormLoading() {
    answerFormEl.style.display = "none";
    answerFormLoadingEl.style.display = "block";
    answerFormResultEl.style.display = "none";
  }

  function showAnswerFormResult(answer) {
    answerFormResultEl.querySelector("#answer-text").innerHTML = `<pre>${answer}</pre>`;
    trySet(`${ANSWER_KEY}_${question.questionId}`, answer);

    answerFormEl.reset();
    answerFormEl.style.display = "none";
    answerFormLoadingEl.style.display = "none";
    answerFormResultEl.style.display = "block";
  }

  function getUserId() {
    let uid = tryGet(USERID_KEY);
    if (!uid) {
      uid = `${Math.floor(Math.random() * 9999999999) + 1000000000}-${new Date().getTime()}`
      trySet(USERID_KEY, uid);
    }
    return uid;
  }

  // fuck you safari.
  function tryGet(key) {
    try {
      return localStorage.getItem(key);
    }
    catch(e) {
      return undefined;
    }
  }
  function trySet(key, value) {
    try {
      localStorage.setItem(key, value);
    }
    catch(e) {}
  }

})();
