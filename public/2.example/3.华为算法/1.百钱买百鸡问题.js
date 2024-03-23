/**
 * 百钱买百鸡问题
 */

function main() {
  let [x, y, z] = [0, 0, 0]
  const xMax = 20
  for (let i = 0; i < xMax; i++) {
    if ((200 - 14 * i) % 8 === 0 && 200 - 14 * i > 0) {
      y = (200 - 14 * i) / 8
      z = 100 - i - y
      x = i
      console.log(`${x} ${y} ${z}`)
    }
  }
}
main()
