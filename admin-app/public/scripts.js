'use strict';

let user;
let answers = answers

(async () => {
  console.log('loaded');

  firebase.auth().onAuthStateChanged((_user) => {
    console.log(_user)
    user = _user
  })

  const questionRef = firebase.database().ref('questions')
  questionRef.on('value', snapsot => {
    //  question => snapshot.val()
    //  snapshot.id
  })


})();

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
