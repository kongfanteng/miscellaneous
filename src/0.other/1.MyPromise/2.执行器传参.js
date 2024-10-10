class MyPromise {
  constructor(executor) {
    // 传2参数，成功和失败函数，不能放到类方法，影响this指向，
    const resolve = () => {};
    const reject = () => {};
    executor(resolve, reject);
  }
}
const p = new MyPromise((res, rej) => {
  res(1);
  rej(2);
});
console.log(p);
