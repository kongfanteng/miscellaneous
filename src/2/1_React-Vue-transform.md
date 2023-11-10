# React-Vue 代码转换

## 1 背景+jsx 编译 + React render 方法伪代码+Vue 编译函数伪代码 + React 转换 Vue 代码

### 1.1 背景

- [GitHub 源码地址](https://github.com/encode-studio-fe/react-vue-convert)
- 目标：针对前端框架，如何学好。
- 方向：如何用好框架，而非如何用框架。

### 1.2 jsx 编译

- jsx -> @babel/preset-react -> jsx-runtime -> VDOM -> DOM
- 使用转换的框架 uniapp/taro
- 转换逻辑：
  - 词法分析
  - 语法分析
  - 代码转换
  - 代码生成
-

### 1.3 React render 方法伪代码

```ts
function render(vDOM, container) {
  let dom
  dom = document.createElement(vDOM.type)
  if (vDOM.props) {
    Object.keys(vDOM.props)
      .filter((key) => key !== 'children')
      .forEach((item) => (dom[item] = vDOM.props[item]))
  }
  if (vDOM?.props?.children?.length) {
    vDOM?.props?.children.forEach((child) => render(child, dom))
  }
  container.appendChild(dom)
}
```

### 1.4 Vue 编译函数伪代码

```ts
function baseCompile(template, options) {
  // 1. 先把 template（字符串） parse 成 ast
  const ast = baseParse(template)
  // 2. 给 ast 加点料（- -#）
  transform(
    ast,
    Object.assign(options, {
      nodeTransforms: [transformElement, transformText, transformExpression],
    })
  )
  // 3. 生成 render 函数代码
  return generate(ast)
}
```

### 1.5 React 转换 Vue 代码

#### 1.5.1 [react-to-vue.ts](../../public/1/actual-react-vue-convert/src/react-to-vue.ts)

```ts
export default () => {}
```

#### 1.5.2 bash

```bash
cd public/1/actual-react-vue-convert
pnpm init
```

#### 1.5.3 [package.json](../../public/1/actual-react-vue-convert/package.json)

```json
{
  "devDependencies": {
    "encode-bundle": "^1.4.1",
    "@types/react": "^17.0.2",
    "@types/react-dom": "^17.0.2",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "typescript": "^4.2.4",
    "vite": "^2.1.5",
    "vue": "^3.0.0"
  },
  "peerDependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "vue": "^3.0.0"
  }
}
```

#### 1.5.4 bash-安装依赖包

```bash
pnpm install
```

#### 1.5.5 [react-to-vue.ts](../../public/1/actual-react-vue-convert/src/react-to-vue.ts)

```ts
import { defineComponent } from 'vue'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
export default () => {
  defineComponent({
    inheritAttrs: false,
    setup(_, context) {},
  })
}
```

## 2 react-to-vue

### 2.1 react-to-vue > 创建文件 [index.ts](../../public/1/actual-react-vue-convert/src/index.ts)

### 2.2 react-to-vue > bash-生成 tsconfig.json

```bash
tsc --init
```

- [tsconfig.json](../../public/1/actual-react-vue-convert/tsconfig.json)

```json
{
  // fix
  "target": "ESNext",
  "module": "ESNext",
  "moduleResolution": "Node"
}
```

### 2.3 react-to-vue > [react-to-vue.ts](../../public/1/actual-react-vue-convert/src/react-to-vue.ts)

```ts
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
} from 'vue'
export default (Component: React.FC<any>) => {
  return defineComponent({
    inheritAttrs: false,
    setup(_, context) {
      const el = ref()
      onMounted(() => {
        render(React.createElement(Component, context.attrs), el.value)
      })
      onUpdated(() => {
        render(React.createElement(Component, context.attrs), el.value)
      })
      onBeforeUnmount(() => {
        unmountComponentAtNode(el.value)
      })
      return () =>
        h('div', {
          ref: el,
        })
    },
  })
}
```

### 2.4 react-to-vue > [index.ts](../../public/1/actual-react-vue-convert/src/index.ts)

```ts
import react2Vue from './react-to-vue'
export { react2Vue }
```

### 2.5 react-to-vue > 创建文件

- 创建 [main.tsx](../../public/1/actual-react-vue-convert/react-vue-demo/main.tsx)
- 创建 [index.html](../../public/1/actual-react-vue-convert/react-vue-demo/index.html)
- 创建 [vite.config.ts](../../public/1/actual-react-vue-convert/react-vue-demo/vite.config.ts)

## 3 react-to-vue

### 3.1 react-to-vue > [main.tsx](../../public/1/actual-react-vue-convert/react-vue-demo/main.tsx)

```tsx
import React from 'react'
import { createApp, h } from 'vue'
import { react2Vue } from '../src/index'

const ReactApp: React.FC<{ initial: number }> = ({ initial }) => {
  const [count, setCount] = React.useState(initial)

  React.useEffect(() => {
    console.log('React to Vue')
  }, [])

  return (
    <div className="app">
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

const App = react2Vue(ReactApp)

const app = createApp({
  setup() {
    return () => h(App, { initial: 10 })
  },
})

app.mount('#app')
```

### 3.2 react-to-vue > [index.html](../../public/1/actual-react-vue-convert/react-vue-demo/index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React to Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

### 3.3 react-to-vue > [vite.config.ts](../../public/1/actual-react-vue-convert/react-vue-demo/vite.config.ts)

```ts
import { defineConfig } from 'vite'
export default defineConfig({})
```

### 3.4 react-to-vue > [package.json](../../public/1/actual-react-vue-convert/package.json)

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm",
    "dev:react2vue": "vite react-vue-demo",
    "dev:vue2react": "vite vue-react-demo",
    "build": "encode-bundle src/index.ts --format cjs,esm --dts",
    "prepublishonly": "pnpm run build",
    "pub:beta": "pnpm -r publish --tag beta",
    "pub": "pnpm -r publish"
  }
}
```

### 3.5 react-to-vue > 调试

```bash
npm run dev:react2vue
```

## 4 vue-to-react

### 4.1 vue-to-react > [src/index.ts](../../public/1/actual-react-vue-convert/src/index.ts)

```ts
import react2Vue from './react-to-vue'
import vue2React from './vue-to-react'
export { react2Vue, vue2React }
```

### 4.2 vue-to-react > [src/vue-to-react.ts](../../public/1/actual-react-vue-convert/src/vue-to-react.ts)

```ts
import React from 'react'
import * as Vue from 'vue'

const defaultPassProps = <T = any>(props: T): T => props

export default <TProps = any>(
  Component: any,
  { passProps = defaultPassProps } = {}
) => {
  return (props: TProps) => {
    const el = React.useRef(null)

    React.useEffect(() => {
      if (Vue.createApp) {
        const app = Vue.createApp({
          render: () => Vue.h(Component, (passProps && passProps(props)) || {}),
        })

        // @ts-expect-error
        app.mount(el.current)

        return () => app.unmount()
      }
    })

    return React.createElement(
      'div',
      null,
      React.createElement('div', { ref: el })
    )
  }
}
```

### 4.3 vue-to-react > [vue-react-demo/index.tsx](../../public/1/actual-react-vue-convert/vue-react-demo/index.tsx)

```tsx
import React from 'react'
import { render } from 'react-dom'
import { h } from 'vue'
import { vue2React } from '../src'
const App = vue2React({
  data() {
    return {
      count: 0,
    }
  },

  render() {
    return h('button', this.count)
  },
})
render(<App />, document.getElementById('app'))
```

### 4.4 vue-to-react > [vue-react-demo/vite.config.ts](../../public/1/actual-react-vue-convert/vue-react-demo/vite.config.ts)

```ts
import { defineConfig } from 'vite'

export default defineConfig({})
```

### 4.5 vue-to-react > [vue-react-demo/index.html](../../public/1/actual-react-vue-convert/vue-react-demo/index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue to React</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./index.tsx" type="module"></script>
  </body>
</html>
```

## 5 vue-to-react

### 5.1 vue-to-react > 调试

```bash
npm run dev:vue2react
```
