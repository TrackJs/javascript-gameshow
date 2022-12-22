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
  const userNameEl = document.querySelector("#user-name");
  const userLoginSectionEl = document.querySelector(".login");
  const activeQuestionSectionEl = document.querySelector(".active-question");
  const answerSectionEl = document.querySelector(".answer");
  const answerFormEl = answerSectionEl.querySelector("#answer-form");
  const answerFormResultEl = answerSectionEl.querySelector(".form-result");

  document.querySelector("#user-login-form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    displayName = new FormData(evt.target).get("displayName");
    // Todo security check
    userNameEl.innerText = displayName;
    trySet(USERNAME_KEY, displayName);
    userLoginSectionEl.style.display = "none";
    startup();
  });

  answerFormEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const formLoading = answerSectionEl.querySelector(".form-loading");

    const answer = new FormData(form).get("answer");
    // TODO Security check

    form.style.display = "none";
    formLoading.style.display = "flex";

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
      formLoading.style.display = "none";
      showAnswerResult(answer);
    },
    (rej) => {
      console.error(rej);
      alert(`Failed to submit answer ${rej}. Try again?`);
      form.style.display = "block";
      formLoading.style.display = "none";
    });
  });

  // startup auth
  displayName = tryGet(USERNAME_KEY);
  uid = getUserId();
  if (displayName) {
    userNameEl.innerText = displayName;
    console.log("user", displayName, uid);
    startup();
  }
  else {
    userLoginSectionEl.style.display = "block";
  }

  function startup() {
    activeQuestionSectionEl.style.display = "block";

    const spinnerEl = activeQuestionSectionEl.querySelector(".waiting");
    const activeQuestionTextEl = activeQuestionSectionEl.querySelector(".active-question-text");

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

  function showAnswerResult(answer) {
    answerFormEl.reset();
    answerFormEl.style.display = "none";
    answerFormResultEl.innerHTML = `<pre>${answer}</pre>`;
    answerFormResultEl.style.display = "flex";
    trySet(`${ANSWER_KEY}_${question.questionId}`, answer);
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
      return sessionStorage.getItem(key);
    }
    catch(e) {
      return undefined;
    }
  }
  function trySet(key, value) {
    try {
      sessionStorage.setItem(key, value);
    }
    catch(e) {}
  }

})();
