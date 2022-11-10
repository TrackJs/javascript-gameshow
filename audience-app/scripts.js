const DB_URL = "https://javascript-gameshow-default-rtdb.europe-west1.firebasedatabase.app"

function getUserId() {
  let userId = localStorage.getItem("GAMESHOW_USER_ID");
  if (!userId) {
    userId = `${Math.floor(Math.random() * 9999999999) + 1000000000}.${new Date().getTime()}`
    localStorage.setItem("GAMESHOW_USER_ID", userId);
  }
  return userId;
}

(() => {
  console.log('loaded');

  const userId = getUserId();

  console.log(`userId: ${userId}`);

  const question = fetch(DB_URL + '/activeQuestion.json')
    .then((response) => response.body)
    .then((body) => {
      const reader = body.getReader();
      return new ReadableStream({
        start(controller) {
          // The following function handles each data chunk
          function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then(({ done, value }) => {
              // If there is no more data to read
              if (done) {
                console.log('done', done);
                controller.close();
                return;
              }
              // Get the data and send it to the browser via the controller
              controller.enqueue(value);
              // Check chunks by logging to the console
              console.log(done, value);
              push();
            });
          }

          push();
        },
      });
    })
    .then((stream) =>
    // Respond with our stream
    new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()
  )
  .then(result => JSON.parse(result))
  .then((result) => {
    // Do things with result
    console.log(result);
  });

})();











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
