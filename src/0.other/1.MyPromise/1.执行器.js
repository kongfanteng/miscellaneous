class MyPromise {
  constructor(executor) {
    executor();
  }
}
const p = new MyPromise((res, rej) => {
  res(1);
  rej(2);
});
console.log(p);
