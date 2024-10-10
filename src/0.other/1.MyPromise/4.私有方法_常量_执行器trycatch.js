// 私有方法，常量代替硬编码（直接使用字符串），异步无法捕捉（原生问题）
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  #state = "pending";
  #result = undefined;
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  #changeState = (state, result) => {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
  };
}
const p = new MyPromise((res, rej) => {
  res(1);
  rej(2);
});
