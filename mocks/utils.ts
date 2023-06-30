export function getRandomElementFromArray<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomNumbers(length: number) {
  let str = [];
  for (let i = 0; i < length; i++) {
    str.push(Math.floor(Math.random() * 9));
  }
  return str.join("");
}
