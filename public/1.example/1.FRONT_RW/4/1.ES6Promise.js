// 提纲: Promise应用；图片加载；各司其职；all汇总结果；race图片超时；
Promise应用 = () => {
  传统处理多层异步 = () => {
    const failCallback = (e) => e
    const doST = (fn, fck) => setTimeout(() => fn(1), 1)
    const doST2 = (fn, fck) => setTimeout(() => fn(2), 1)
    const doST3 = (fn, fck) => setTimeout(() => fn(3), 1)
    doST((res1) => {
      doST2((res2) => {
        doST3((res3) => {
          console.log(res1, res2, res3, '1 2 3')
        }, failCallback)
      }, failCallback)
    }, failCallback)
  }
  // 传统处理多层异步()
  Promise处理多层异步 = () => {
    const failCallback = (e) => e
    const doST = () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(1), 1)
      })
    const doST2 = (last) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(`${last}, 2`), 1)
      })
    const doST3 = (last) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(`${last}, 3`), 1)
      })
    doST()
      .then((result) => {
        return doST2(result)
      })
      .then((...result) => {
        return doST3(result)
      })
      .then((result) => {
        console.log(result, '1, 2, 3')
      })
  }
  Promise处理多层异步()
}
// Promise应用()
图片加载 = () => {
  const preloadImage = (path) => {
    return new Promise((res, rej) => {
      if (typeof Image === 'undefined') rej('Image is not defined ')
      const image = new Image()
      image.onload = res
      image.onerror = rej
      image.src = path
    })
  }
  preloadImage('').then(null, (e) => {
    console.log(e, 'Image is not defined')
  })
}
// 图片加载()
各司其职 = () => {
  const list = {
    bannerList: 'bannerList',
    storeList: 'storeList',
    categoryList: 'categoryList',
  }
  const getList = () =>
    new Promise((res) => {
      res(list)
    })
  getList()
    .then((res) => {
      const { bannerList } = res
      console.log(bannerList, 'bannerList')
      return res
    })
    .then((res) => {
      const { storeList } = res
      console.log(storeList, 'storeList')
      return res
    })
    .then((res) => {
      const { categoryList } = res
      console.log(categoryList, 'categoryList')
      return res
    })
}
// 各司其职()
all汇总结果 = () => {
  const loading = {
    show() {},
    hide() {},
  }
  const getBannerList = () => Promise.resolve([])
  const getStoreList = () => Promise.resolve([])
  const getCategoryList = () => Promise.resolve([])
  const initLoad = () => {
    loading.show()
    Promise.all([getBannerList(), getStoreList(), getCategoryList()])
      .then((res) => {
        console.log(res, `[ [], [], [] ]`)
        loading.hide()
      })
      .catch((err) => {
        loading.hide()
      })
  }
  initLoad()
}
// all汇总结果()
race图片超时 = () => {
  function requestImg() {
    const p = new Promise(function (res, rej) {
      if (typeof Image === 'undefined') rej('Image is undefined')
      const img = Image()
      img.onload = function () {
        res(img)
      }
      img.src = ''
    })
    return p
  }
  function timeout() {
    const p = new Promise((res, rej) => {
      setTimeout(() => {
        rej('图片请求超时')
      }, 2000)
    })
    return p
  }
  Promise.all([requestImg(), timeout()])
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e, 'Image is undefined')
    })
}
race图片超时()
