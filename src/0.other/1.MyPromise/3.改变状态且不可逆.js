class MyPromise {
  // 改变promise状态，#私有属性，
  #state = "pending";
  #result = undefined;
  constructor(executor) {
    const resolve = (data) => {
      if (this.#state !== "pending") return;
      this.#state = "fulfilled";
      this.#result = data;
    };
    const reject = (reason) => {
      if (this.#state !== "pending") return;
      this.#state = "rejected";
      this.#result = reason;
    };
    executor(resolve, reject);
  }
}
const p = new MyPromise((res, rej) => {
  res(1);
  rej(2);
});
