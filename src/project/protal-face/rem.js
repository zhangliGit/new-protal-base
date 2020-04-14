/**
 * @description 多屏视频
 * @author zhangli
 */

;(function() {
  var screenW = document.documentElement.clientWidth || document.body.clientWidth
  var hDom = document.getElementsByTagName('html')[0]
  if (screenW < 1334) screenW = 1334
  hDom.style.fontSize = screenW / 19.2 + 'px'
})()
