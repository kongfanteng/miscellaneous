/**
 * 倒计时
 */
function countDown(leftTime) {
  // setInterval
  const useSetInterval = (leftTime) => {
    let t = leftTime
    let timer = setInterval(() => {
      if (t > 0) {
        t = t - 1000
        console.log('useSetInterval', t)
      } else {
        clearInterval(timer)
        timer = null
      }
    }, 1000)
  }
  // useSetInterval(leftTime)

  // setTimeout
  const useSetTimeout = (leftTime) => {
    let t = leftTime
    let timer = setTimeout(() => {
      if (t > 0) {
        t -= 1000
        console.log('useSetTimeout', t)
        useSetTimeout(t)
      } else {
        clearTimeout(timer)
        timer = null
      }
    }, 1000)
  }
  // useSetTimeout(leftTime)

  // requestAnimationFrame
  const useRequestAnimationFrame = (leftTime) => {
    let t = leftTime
    const start = () => {
      requestAnimationFrame(() => {
        if (t > 0) {
          t -= 1000
          setTimeout(() => {
            console.log(t)
            start()
          }, 1000)
        }
      })
    }
    start()
  }
  // useRequestAnimationFrame(leftTime)
  // diffTime, performance.now()
  const diffTime = (leftTime) => {
    const now = performance.now()
    const start = () => {
      let t = leftTime - (performance.now() - now)
      setTimeout(() => {
        if (t > 0) {
          t -= 1000
          console.log(t)
          requestAnimationFrame(start)
        }
      }, 1000)
    }
    start()
  }
  // diffTime(leftTime)
  // nextTime = 1000 - (totalTime % 1000)
  const diffTimeImprove = (leftTime, ms = 1000) => {
    let countDownTimer = null
    let startTimer = null
    let startTime = performance.now()
    let nextTime = leftTime % ms
    const clearTimer = () => {
      countDownTimer && clearTimeout(countDownTimer)
      startTimer && clearTimeout(startTimer)
    }
    const startCountDown = () => {
      clearTimer()
      const currentTime = performance.now()
      const executeTime = currentTime - startTime
      const diffTime =
        executeTime > nextTime ? executeTime - nextTime : nextTime - executeTime
      let c = leftTime - (leftTime % ms === 0 ? ms : leftTime % ms)
      if (c >= 0) {
        leftTime = c
        console.log(c)
      } else {
        clearTimer()
      }
      nextTime = executeTime > nextTime ? ms - diffTime : ms + diffTime
      startTime = performance.now()
      countDownTimer = setTimeout(() => {
        requestAnimationFrame(startCountDown)
      }, nextTime)
    }
    startTimer = setTimeout(startCountDown, nextTime)
  }
  diffTimeImprove(leftTime)
}
countDown(3000)
