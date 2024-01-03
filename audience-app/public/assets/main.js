'use strict';

const USERNAME_KEY = "GAMESHOW_USER_NAME";
const USERID_KEY = "GAMESHOW_USER_ID";
const ANSWER_KEY = "GAMESHOW_ANSWER";
const ASSHOLE_KEY = "GAMESHOW_ASSHOLE";
const TOTAL_CORRECT_KEY = "TOTAL_CORRECT";
const TOTAL_COUNT_KEY = "TOTAL_COUNT";

(async () => {

  // global state
  let uid;
  let displayName;
  let question;
  let isAsshole = false;//tryGet(ASSHOLE_KEY) || false;

  // global dom
  const userInfoEl = document.querySelector("#user-info");
  const userLoginSectionEl = document.querySelector("section#login");
  const authedContentEl = document.querySelector("#authed-content");
  const waitingSpinnerSectionEl = document.querySelector("section#waiting-spinner");
  const activeQuestionSectionEl = document.querySelector("section#active-question");
  const correctAnswerSectionEl = document.querySelector("#correct-answer");
  const correctAnswerTextEl = document.querySelector("#active-question-answer");
  const answerFormEl = activeQuestionSectionEl.querySelector("#answer-form");
  const answerFormLoadingEl = activeQuestionSectionEl.querySelector("#form-loading");
  const answerFormResultEl = activeQuestionSectionEl.querySelector("#form-result");
  const sponsorsEl = document.querySelector(".sponsors");

  document.querySelector("#user-login-form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    displayName = new FormData(evt.target).get("displayName");
    checkInputBan(displayName);
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
    checkInputBan(answer);
    if (isAsshole) {
      // shadow ban, don't submit, but don't tell them
      showAnswerFormResult(answer);
      return;
    }

    const payload = {
      displayName,
      answer,
      displayValue: question.questionMode === "choice" ? question.answers[answer].answerText : answer,
      correct: question.questionMode === "choice" ? question.answers[answer].correct : null,
      submitTime: firebase.database.ServerValue.TIMESTAMP
    };

    const answerRef = firebase.database().ref(`/answers/${question.eventId}/${question.questionId}/${uid}`);
    answerRef.set(payload).then(() => {
      console.log("answer submitted", payload);
      showAnswerFormResult(payload.displayValue);
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
    sponsorsEl.style.display = "block";
    correctAnswerSectionEl.style.display = "none";
  }

  function showWaitingSpinner() {
    waitingSpinnerSectionEl.style.display = "block";
    activeQuestionSectionEl.style.display = "none";
    sponsorsEl.style.display = "block";
    correctAnswerSectionEl.style.display = "none";
  }

  function showActiveQuestion() {
    waitingSpinnerSectionEl.style.display = "none";
    activeQuestionSectionEl.style.display = "block";
    sponsorsEl.style.display = "none";
    correctAnswerSectionEl.style.display = "none";

    activeQuestionSectionEl.querySelector("#active-question-text").innerHTML = `
      <div>What is the result of this JavaScript?</div>
      <pre>${escapeHtml(question.questionText)}</pre>`;

    const activeAnswer = tryGet(`${question.eventId}_${ANSWER_KEY}_${question.questionId}`);
    console.log('activeAnswer', activeAnswer)
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
    sponsorsEl.style.display = "none";

    const answerTextContainerEl = document.getElementById("answer-text");

    if (question.questionMode === "choice") {
      let htmlContent = "";
      shuffleArray(Object.keys(question.answers)).forEach((answerId) => {
        let answer = { answerId, ...question.answers[answerId] };
        htmlContent += `<label class="flex choice-option"><input type="radio" name="answer" required value="${answer.answerId}"/><span>${answer.answerText}</span></label>`;
      })

      answerTextContainerEl.innerHTML = htmlContent;
    }
    else if (question.questionMode === "text") {
      answerTextContainerEl.innerHTML = `<label class="flex-column"><span>Your Answer</span><input name="answer" type="text" maxlength="100" required placeholder="null"></label>`;
    }
  }

  function showAnswerFormLoading() {
    answerFormEl.style.display = "none";
    answerFormLoadingEl.style.display = "block";
    answerFormResultEl.style.display = "none";
    sponsorsEl.style.display = "none";
  }

  function showAnswerFormResult(answer) {
    answerFormResultEl.querySelector("#answer-text").innerHTML = `<pre>${escapeHtml(answer)}</pre>`;
    trySet(`${question.eventId}_${ANSWER_KEY}_${question.questionId}`, answer);

    answerFormEl.reset();
    answerFormEl.style.display = "none";
    answerFormLoadingEl.style.display = "none";
    answerFormResultEl.style.display = "block";
    sponsorsEl.style.display = "none";
    correctAnswerTextEl.innerHTML = ''

    if (question.answer) {
      correctAnswerSectionEl.style.display = "block";
      correctAnswerTextEl.innerHTML += `<pre>${escapeHtml(question.answer.answerText || question.answer)}</pre>`;
      if (question.answer.answerText) {
        const correct = question.answer.answerText === answer;
        correctAnswerTextEl.innerHTML += `<p>You are ${correct ? 'Correct! 😊' : 'Wrong! 💩'}</p>`;
        let total = Number(localStorage.getItem(`${question.eventId}_${TOTAL_CORRECT_KEY}`) || 0)
        total++;
        let totalCorrect = Number(localStorage.getItem(`${question.eventId}_${TOTAL_COUNT_KEY}`) || 0)
        if (correct) totalCorrect++;
        correctAnswerTextEl.innerHTML += `<p>${totalCorrect} / ${total} Correct Answers</p>`;
        correctAnswerTextEl.innerHTML += `<p>${totalCorrect === total ? 'You are still in the running' : "Playing for fun now. No prizes for you."}</p>`;

      }
    }
  }

  function getUserId() {
    let uid = tryGet(USERID_KEY);
    if (!uid) {
      uid = `${Math.floor(Math.random() * 9999999999) + 1000000000}-${new Date().getTime()}`
      trySet(USERID_KEY, uid);
    }
    return uid;
  }

  // asshole prevention
  function checkInputBan(input) {
    const matches = /[<>&]/gi.exec(input);
    if (matches) {
      isAsshole = true;
      trySet(ASSHOLE_KEY, true);
    }
  }
  function escapeHtml(unsafe) {
    return unsafe
      .replaceAll(/&/gmi, "&amp;")
      .replaceAll(/</gmi, "&lt;")
      .replaceAll(/>/gmi, "&gt;")
      .replaceAll(/"/gmi, "&quot;")
      .replaceAll(/'/gmi, "&#039;");
  }

  // fuck you safari.
  function tryGet(key) {
    try {
      console.log(localStorage.getItem(key))
      return localStorage.getItem(key);
    }
    catch (e) {
      return undefined;
    }
  }
  function trySet(key, value) {
    try {
      localStorage.setItem(key, value);
    }
    catch (e) { }
  }
  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

})();
