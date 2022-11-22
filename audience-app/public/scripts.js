'use strict';

let uid;
let question;

function getUserId() {
  uid = localStorage.getItem("GAMESHOW_USER_ID");
  if (!uid) {
    uid = `${Math.floor(Math.random() * 9999999999) + 1000000000}.${new Date().getTime()}`
    localStorage.setItem("GAMESHOW_USER_ID", uid);
  }
  return uid;
}

(() => {
  console.log('loaded');
  const questionRef = firebase.database().ref('/activeQuestion')
  const userId = getUserId();
  console.log(`userId: ${userId}`);
  
  questionRef.on('value', snapshot => updateQuestion(snapshot.val()));
  
  const form = document.getElementById('form')
  form.addEventListener('submit', event => submitAnswer(event))
})();

function updateQuestion(value) {
  const questionElem = document.getElementById('question');
  question = value;
  questionElem.innerText = value?.questionText;
}

function submitAnswer(event) {
  event.preventDefault();
  const valid = event.target.checkValidity();
  if (!valid) {
    alert('Please fill out all the fields with values that are less than 100 characters');
    return;
  }
  const formData = new FormData(event.target)
  const payload = {
    uid,
    submitTime: Date.now(),
  }
  for (const [key, value] of formData) {
    if (value) { payload[key] = value; }
  }
  console.log(payload)
  //  TODO: Submit to Firebase
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
