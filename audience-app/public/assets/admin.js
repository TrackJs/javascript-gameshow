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
  let questionMode = "text";

  // global dom
  const activeQuestionSectionEl = document.querySelector("section#active-question");
  const answerListEl = activeQuestionSectionEl.querySelector("#answer-list");
  const questionsSectionEl = document.querySelector("section#questions");
  const questionsList = questionsSectionEl.querySelector("#question-list");

  window.toggleQuestionMode = function (mode) {
    if (mode === questionMode) { return; }
    document.querySelector("#question-mode-toggle-text").classList.toggle("active");
    document.querySelector("#question-mode-toggle-choice").classList.toggle("active");
    questionMode = mode;
    renderQuestionList();
  };

  document.querySelector("#login-button").addEventListener("click", async (evt) => {
    evt.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  });

  document.querySelector("#logout-button").addEventListener("click", async (evt) => {
    evt.preventDefault();
    await firebase.auth().signOut();
    location.reload();
  });

  document.querySelector("#active-question-clear").addEventListener("click", (evt) => {
    evt.preventDefault();
    if (!confirm("Are you sure you want to clear the question?")) { return; }
    if (!activeQuestionRef) { return; }

    activeQuestionRef.remove();
    document.querySelector("#active-question-show-answer").removeAttribute("disabled");
    document.querySelector("#active-question-void").removeAttribute("disabled");
  });

  document.querySelector("#active-question-show-answer").addEventListener("click", (evt) => {
    evt.preventDefault();
    if (!confirm("Are you sure you want to show the answer?")) { return; }
    if (!activeQuestionRef) { return; }

    let answer;
    if (questionMode === "text") {
      answer = questions[questionMode][activeQuestion.questionId].answer;
    }
    else if (questionMode === "choice") {
      Object.keys(questions[questionMode][activeQuestion.questionId].answers).forEach((answerId) => {
        let a = questions[questionMode][activeQuestion.questionId].answers[answerId];
        if (a.correct) {
          answer = { answerId, ...a };
        }
      })
    }

    activeQuestionRef.update({ answer });
    evt.target.setAttribute("disabled", "disabled");
  });

  document.querySelector("#active-question-void").addEventListener("click", (evt) => {
    evt.preventDefault();
    if (!confirm("Are you sure you want to VOID the question?")) { return; }

    activeQuestionRef.update({ void: true });

    answersRef = firebase.database().ref(`/answers/${activeEventId}/${activeQuestion.questionId}`);
    answersRef.update({ void: true });

    evt.target.setAttribute("disabled", "disabled");
  });

  document.querySelector("#select-question-form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (!activeQuestionRef) { return; }

    const questionId = new FormData(evt.target).get("questionId");

    const questionRef = firebase.database().ref(`questions/${questionMode}/${questionId}`);
    questionRef.update({ used: true });

    activeQuestionRef.set({
      eventId: activeEventId,
      questionId,
      questionMode,
      questionText: questions[questionMode][questionId].questionText,
      answers: questions[questionMode][questionId].answers ?? null,
      submitTime: firebase.database.ServerValue.TIMESTAMP
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
      userAuthEl.style.display = "flex"
      userAuthEl.querySelector("#display-name").innerText = `${user.displayName}`;

      try {
        const activeEventRef = firebase.database().ref('activeEventId');
        activeEventId = (await activeEventRef.get()).val();
        document.querySelector("#event-id").innerHTML = `${activeEventId}`;
      }
      catch (e) {
        alert("Couldn't talk to database. You probably left it locked.");
      }


      startup();
    }
  });

  async function startup() {
    // Get questions and keep them up to date.
    questionRef = firebase.database().ref('questions');
    questionRef.on('value', (snapshot) => {
      questions = snapshot.val();
      renderQuestionList();
    });

    // Get activeQuestion and keep it up to date. Toggle the UI based on this.
    activeQuestionRef = firebase.database().ref('activeQuestion');
    activeQuestionRef.on('value', async (snapshot) => {
      activeQuestion = snapshot.val();
      console.log("Active Question Updated", activeQuestion);
      if (answersRef) { answersRef.off(); }
      if (!activeQuestion) {
        await showQuestionList();
      }
      else {
        // we might start up with a previous state, so check the active question for a mode
        window.toggleQuestionMode(activeQuestion.questionMode);

        await showAnswerList();
      }
    });
  }

  function renderQuestionList() {
    questionsList.innerHTML = "";
    Object.keys(questions[questionMode]).forEach((questionId) => {
      const question = questions[questionMode][questionId];
      questionsList.innerHTML += `
        <li>
          <label class="flex align-center ${question.used ? "used" : ''}">
            <input type="radio" value="${questionId}" name="questionId" required />
            <div><pre>${escapeHtml(question.questionText)}</pre></div>
            ${question.used ? "<div>&nbsp;(used)</div>" : ""}
          </label>
        </li>`;
    });
  }

  function showQuestionList() {
    questionsSectionEl.style.display = "block"
    activeQuestionSectionEl.style.display = "none";
  }

  function showAnswerList() {
    questionsSectionEl.style.display = "none"
    activeQuestionSectionEl.style.display = "block";

    activeQuestionSectionEl.querySelector("#active-question-text").innerHTML = `
      ${activeQuestion.void ? "<div style='color:red'>VOID VOID VOID</div>" : ""}
      <div>What is the result of this JavaScript?</div>
      <pre>${escapeHtml(activeQuestion.questionText)}</pre>`;

    let correctAnswerText;
    if (activeQuestion.questionMode === "text") {
      correctAnswerText = questions[questionMode][activeQuestion.questionId].answer;
    }
    else if (activeQuestion.questionMode === "choice") {
      Object.values(questions[questionMode][activeQuestion.questionId].answers).forEach((answer) => {
        if (answer.correct) {
          correctAnswerText = answer.answerText;
        }
      })
    }

    activeQuestionSectionEl.querySelector("#active-question-answer").innerHTML = `
        <pre>${escapeHtml(correctAnswerText)}</pre>`;

    answersRef = firebase.database().ref(`/answers/${activeEventId}`)
    answersRef.on('value', (snapshot) => {
      const answers = snapshot.val()?.[activeQuestion.questionId];

      answerListEl.innerHTML = "";
      if (!answers) { return; }

      if (activeQuestion.questionMode === 'choice') {
        let scores = {};
        let fullAnswerList = snapshot.val()
        const questionsAsked = Object.keys(fullAnswerList).filter(questionId => questionId.startsWith("qc") && !fullAnswerList[questionId].void).length;
        Object.keys(fullAnswerList)
          .filter(questionId => questionId.startsWith("qc") && !fullAnswerList[questionId].void)
          .forEach((questionId) => {
            Object.keys(fullAnswerList[questionId]).forEach(userId => {
              const userAnswer = fullAnswerList[questionId][userId];
              const answers = (scores[userId] || {}).answers || []
              const aggregatedAnswers = [...answers, userAnswer]
              scores[userId] = {
                userId: userId,
                answers: aggregatedAnswers,
                inRunning: aggregatedAnswers.every(answer => answer.correct) && questionsAsked === aggregatedAnswers.length,
                answerCount: aggregatedAnswers.length,
                correctCount: aggregatedAnswers.filter(answer => answer.correct).length,
                displayName: userAnswer.displayName,
              }

              // Check that we are now counting the "current" question, which is the only
              // one that has display info. Also, if this doesn't exist, it means the user
              // hasn't answered the current question yet.
              if (activeQuestion.questionId === questionId) {
                scores[userId].displayValue = userAnswer.displayValue || '';
                scores[userId].submitTime = userAnswer.submitTime;
                scores[userId].hasAnsweredCurrent = true;
              }


            });
          });
        scores = Object.values(scores);
        Object.values(scores)
          .filter((s) => s.hasAnsweredCurrent)
          .sort((a, b) => b.correct - a.correct)
          .sort((a, b) => (a.submitTime ? a.submitTime : Infinity) - (b.submitTime ? b.submitTime : Infinity))
          .sort((a, b) => b.inRunning - a.inRunning)
          .forEach((score) => {
            answerListEl.innerHTML += `
              <li class="${score.inRunning ? "correct" : ""}">
                <div>${escapeHtml(score.displayName || '')}</div>
                <pre>${escapeHtml(score.displayValue || '(No Answer)')}</pre>
                <div>${score.inRunning ? 'Still in the game' : 'Out of game'} - ${score.correctCount} / ${questionsAsked}</div>
                ${score.correct !== undefined ? score.correct ? '<div>Correct</div>' : '<div>Wrong</div>' : ''}
                <div>${((score.submitTime || Number.MAX_VALUE) - activeQuestion.submitTime) / 1000} sec</div>
              </li>`;
          });
      }
      else {
        Object.values(answers)
          .sort((a, b) => a.submitTime - b.submitTime)
          .sort((a, b) => b.correct - a.correct)
          .forEach((answer) => {
            answerListEl.innerHTML += `
            <li class="${answer.correct ? "correct" : ""}">
              <div>${escapeHtml(answer.displayName)}</div>
              <pre>${escapeHtml(answer.displayValue || answer.answer)}</pre>
              ${answer.correct !== undefined ? answer.correct ? '<div>Correct</div>' : '<div>Wrong</div>' : ''}
              <div>${(answer.submitTime - activeQuestion.submitTime) / 1000} sec</div>
            </li>`;
          });
      }
    });
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replaceAll(/&/gmi, "&amp;")
      .replaceAll(/</gmi, "&lt;")
      .replaceAll(/>/gmi, "&gt;")
      .replaceAll(/"/gmi, "&quot;")
      .replaceAll(/'/gmi, "&#039;");
  }

})();
