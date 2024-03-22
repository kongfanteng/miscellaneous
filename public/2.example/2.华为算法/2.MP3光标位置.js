/**
 * MP3光标位置
 * @example
 *
 */
function getMP3Cursor(n, str) {
  const first = (n, str) => {
    let num = parseInt(n)
    let arr = str.split('')
    let menu = []
    let se = 1
    if (num <= 4) {
      menu = [1, 2, 3, 4].slice(0, num)
      arr.forEach((s) => {
        if (s === 'U') {
          se === 1 ? (se = num) : se--
        } else {
          se === num ? (se = 1) : se++
        }
      })
    } else {
      arr.forEach((s) => {
        if (s === 'U') {
          if (se === 1) {
            se = num
            menu = [num - 3, num - 2, num - 1, num]
          } else {
            se--
            se <= menu[0] && (menu = [se, se + 1, se + 2, se + 3])
          }
        } else {
          if (se === num) {
            se = 1
            menu = [1, 2, 3, 4]
          } else {
            se++
            se >= menu[3] && (menu = [se - 3, se - 2, se - 1, se])
          }
        }
      })
    }
    console.log(menu.join(' '))
    console.log(se)
  }
  const second = (n, str) => {
    // n <= 4
    // 1-1,2,3,4-U = 4-1,2,3,4 curNum = 1 && control = U ==> curNum = 4; curNum = n
    // 3-1,2,3,4-U = 2-1,2,3,4 curNum = 3 && control = U ==> curNum = 2; curNum--
    // 4-1,2,3,4-D = 1-1,2,3,4 curNum = 4 && control = D ==> curNum = 1; curNum = 1
    // 2-1,2,3,4-D = 3-1,2,3,4 curNum = 2 && control = D ==> curNum = 3; curNum++
    // n > 4
    // 1-1,2,3,4-U = 10-7,8,9,10; curNum = 1 && control = U ==> curNum = 10, curMenu = [7,8,9,10]; curNum = n, curMenu = [curMenu-3,curMenu-2,curMenu-1,curMenu]
    // 4-4,5,6,7-U = 3-3,4,5,6; curNum = 4 && control = U ==> curNum = 3, curMenu = [3,4,5,6]; curNum--, curNum <= curMenu[0] && (curMenu = [curNum,curNum+1,curNum+2,curNum+3]),
    // 10-7,8,9,10 = 1-1,2,3,4; curNum = 10 && control = D ==> curNum = 1, curMenu = [1,2,3,4]; curNum = 1, curMenu = [curNum, curNum+1,curNum+2, curNum+3]
    // 7-4,5,6,7-D = 8-5,6,7,8; curNum = 7 && control = D ==> curNum = 8, curMenu = [5,6,7,8]; curNum++, curNum >= curMenu[3] && (curMenu = [curNum-3,curNum-2,curNum-1,curNum])
    const controls = str.split('')
    const num = parseInt(n)
    let curNum = 1
    let curMenu = []
    if (n <= 4) {
      curMenu = [1, 2, 3, 4].slice(0, num)
      controls.forEach((control) => {
        if (control === 'U') {
          if (curNum === 1) {
            curNum = num
          } else {
            curNum--
          }
        } else if (control === 'D') {
          if (curNum === num) {
            curNum = 1
          } else {
            curNum++
          }
        }
      })
    } else {
      controls.forEach((control) => {
        if (control === 'U') {
          if (curNum === 1) {
            curNum = num
            curMenu = [curNum - 3, curNum - 2, curNum - 1, curNum]
          } else {
            curNum--
            curNum <= curMenu[0] &&
              (curMenu = [curNum, curNum + 1, curNum + 2, curNum + 3])
          }
        } else if (control === 'D') {
          if (curNum === num) {
            curNum = 1
            curMenu = [1, 2, 3, 4]
          } else {
            curNum++
            curNum >= curMenu[3] &&
              (curMenu = [curNum - 3, curNum - 2, curNum - 1, curNum])
          }
        }
      })
    }
    console.log(curMenu.join(' '))
    console.log(curNum)
  }
  first(n, str)
  second(n, str)
}
getMP3Cursor(`109`, 'DDUUUDDUDUDUDDUDDDUUUUDUUUUUD')
