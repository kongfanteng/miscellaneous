/*
```
Subject 类代表被观察的主题，它维护了一个观察者列表，并提供了注册、移除观察者和通知所有观察者的方法。
ViewModel 类继承自 Subject，它作为被观察的对象，负责在其状态发生变化时通知观察者。
Observer 接口定义了观察者应该有的行为，即当主题状态发生变化时，调用 update 方法。
View 类实现了 Observer 接口，并在 update 方法中更新视图以反映新的状态。
```
*/
// 定义观察者接口
interface Observer {
  update(newValue: any): void
}
// 定义被观察的主题
// Subject, observers, state, 注册观察者 registerObserver, 移除观察者 removeObserver, 通知观察者 notifyObservers，设置状态并通知观察者 setState，获取状态 getState
class Subject {
  private observers: Observer[]
  private state: any

  constructor() {
    this.state = null
    this.observers = []
  }

  // 注册观察者 registerObserver
  registerObserver(observer: Observer): void {
    this.observers.push(observer)
  }

  // 移除观察者 removeObserver
  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer)
    if (index !== -1) {
      this.observers.splice(index, 1)
    }
  }

  // 通知观察者 notifyObservers
  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.state)
    }
  }

  // 设置状态并通知观察者 setState
  setState(newState: any): void {
    this.state = newState
    this.notifyObservers()
  }

  // 获取状态 getState
  getState(): any {
    return this.state
  }
}

// ViewModel 作为被观察的主题
class ViewModel extends Subject {}

// View 作为观察者
class View implements Observer {
  private viewModel: ViewModel
  // textBox: HTMLInputElement

  constructor(viewModel: ViewModel) {
    this.viewModel = viewModel
    this.viewModel.registerObserver(this)
  }

  // 当主题状态发生变化时，调用 update 方法
  update(newValue: any): void {
    console.log(`View updated with new value: ${newValue}`)
    // this.textBox.value = newValue
  }
}

// 示例使用
const viewModel = new ViewModel()
const view = new View(viewModel)
viewModel.setState('Hello, Everyone!')
setTimeout(() => {
  viewModel.setState('Welcome to Observer Pattern!')
}, 1000);
