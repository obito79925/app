export default function timeFormat (timeStamp:string) {
  const timeNow = Number(new Date())
  const mistiming = Math.round(timeNow) / 1000 - Number(timeStamp)
  const arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
  const arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (let i = 0; i < arrn.length; i++) {
    const inm = Math.floor(mistiming / arrn[i])
    if (inm !== 0) {
      return inm + arrr[i] + '前'
    }
  }
}
