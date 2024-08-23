/* Randomize array in-place using Durstenfeld shuffle algorithm */
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffleArray(array : Array<any>) : Array<any> {
  const arr = array.slice(0);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}