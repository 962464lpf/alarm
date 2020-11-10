/*
 * selector：需要生成led样式容器的选择器；例  #testId
 * options：参数对象
  options: {
	  color:red,-- led灯的颜色，默认orange
	  width:100,-- led灯的宽度，默认50
	  height:200,-- led灯的高度，默认100
	  values:-123.4,-- led需要显示的值，默认0
	  lineWidth:5,--led灯的线宽，默认5
	  italics:10 --倾斜角度，默认0
	  opacity:0.1 --led不发光时的透明度，默认0.1
  }
 */
function ledSetValue(selector, options = {}) {
  let space = 1.5
  if (options == null) options = {}
  // options各属性初始值
  let {
    color = 'orange',
    width = 50,
    height = 100,
    values = 0,
    lineWidth = 5,
    italics = 0,
    opacity = 0,
  } = options
  //判断传入值是否为“0-9”、“.”、“-”三种类型
  if (!/^[\d.-]*$/.test(values.toString())) {
    alert('传入内容只能为“0-9”、“.”、“-”三种类型的值')
  }

  let valuesArr = values.toString().split('')
  let commaCount =
    values.toString().match(/\./g) == null
      ? 0
      : values.toString().match(/\./g).length
  let divWidth =
    (valuesArr.length - commaCount) * width +
    (valuesArr.length - commaCount - 1) * lineWidth * space +
    (width * space - space * lineWidth) * commaCount
  //生成一个随机数，该数用来作为canvas画板的id
  let random =
    'canvas' +
    new Date().getTime().toString() +
    (Math.random() * 10000000)
      .toString()
      .substring(0, 6)
      .replace(/\./g, '')
  let html = `<canvas id="${random}" width="${divWidth}" height="${height}" style="transform:skewX(${italics +
    'deg'})">
  您的浏览器不支持 HTML5 canvas 标签。
  </canvas>`
  document.querySelector(selector).innerHTML = html
  let c = document.querySelector('#' + random)

  let ctx = c.getContext('2d')
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = color

  let distanceLeft = 0
  for (let i = 0; i < valuesArr.length; i++) {
    let styleLed = setNumber(valuesArr[i], opacity)

    if (valuesArr[i] != '.') {
      ctx.lineCap = 'round'
      //七段数码管第一段（关于七段数码管详情请百度）
      ctx.beginPath()
      ctx.globalAlpha = styleLed[0]
      ctx.moveTo(1.5 * lineWidth + distanceLeft, 0.5 * lineWidth)
      ctx.lineTo(width - 1.5 * lineWidth + distanceLeft, 0.5 * lineWidth)
      ctx.stroke()
      //七段数码管第二段
      ctx.beginPath()
      ctx.globalAlpha = styleLed[1]
      ctx.moveTo(width - 0.5 * lineWidth + distanceLeft, 1.5 * lineWidth)
      ctx.lineTo(width - 0.5 * lineWidth + distanceLeft, height / 2 - lineWidth)
      ctx.stroke()
      //七段数码管第三段
      ctx.beginPath()
      ctx.globalAlpha = styleLed[2]
      ctx.moveTo(width - 0.5 * lineWidth + distanceLeft, height / 2 + lineWidth)
      ctx.lineTo(
        width - 0.5 * lineWidth + distanceLeft,
        height - 1.5 * lineWidth
      )
      ctx.stroke()
      //七段数码管第四段
      ctx.beginPath()
      ctx.globalAlpha = styleLed[3]
      ctx.moveTo(1.5 * lineWidth + distanceLeft, height - 0.5 * lineWidth)
      ctx.lineTo(
        width - 1.5 * lineWidth + distanceLeft,
        height - 0.5 * lineWidth
      )
      ctx.stroke()
      //七段数码管第五段
      ctx.beginPath()
      ctx.globalAlpha = styleLed[4]
      ctx.moveTo(0.5 * lineWidth + distanceLeft, height / 2 + lineWidth)
      ctx.lineTo(0.5 * lineWidth + distanceLeft, height - 1.5 * lineWidth)
      ctx.stroke()
      //七段数码管第六段
      ctx.beginPath()
      ctx.globalAlpha = styleLed[5]
      ctx.moveTo(0.5 * lineWidth + distanceLeft, 1.5 * lineWidth)
      ctx.lineTo(0.5 * lineWidth + distanceLeft, height / 2 - lineWidth)
      ctx.stroke()
      //七段数码管第七段
      ctx.beginPath()
      ctx.globalAlpha = styleLed[6]
      ctx.moveTo(1.5 * lineWidth + distanceLeft, height / 2)
      ctx.lineTo(width - 1.5 * lineWidth + distanceLeft, height / 2)
      ctx.stroke()

      distanceLeft += width + space * lineWidth
    } else {
      ctx.beginPath()
      ctx.lineCap = 'square'
      ctx.globalAlpha = 1
      ctx.moveTo(
        0.25 * width - 0.5 * lineWidth + distanceLeft,
        height - lineWidth
      )
      ctx.lineTo(
        0.25 * width - 0.5 * lineWidth + distanceLeft,
        height - lineWidth
      )
      ctx.stroke()
      distanceLeft += 0.5 * width - 0.5 * lineWidth
    }
  }
  /*
   *设置单个数字的值的方法
   *number：传入单个数字的值
   *opacity：设置led不亮部分的透明度，此处默认为0.1，但是如果需要调整请在调用此方法的地方输入透明度
   */
  function setNumber(number, opacity) {
    let styleLed = []
    switch (number.toString()) {
      case '0':
        styleLed = [1, 1, 1, 1, 1, 1, opacity]
        break
      case '1':
        styleLed = [opacity, 1, 1, opacity, opacity, opacity, opacity]
        break
      case '2':
        styleLed = [1, 1, opacity, 1, 1, opacity, 1]
        break
      case '3':
        styleLed = [1, 1, 1, 1, opacity, opacity, 1]
        break
      case '4':
        styleLed = [opacity, 1, 1, opacity, opacity, 1, 1]
        break
      case '5':
        styleLed = [1, opacity, 1, 1, opacity, 1, 1]
        break
      case '6':
        styleLed = [1, opacity, 1, 1, 1, 1, 1]
        break
      case '7':
        styleLed = [1, 1, 1, opacity, opacity, opacity, opacity]
        break
      case '8':
        styleLed = [1, 1, 1, 1, 1, 1, 1]
        break
      case '9':
        styleLed = [1, 1, 1, 1, opacity, 1, 1]
        break
      case '-':
        styleLed = [opacity, opacity, opacity, opacity, opacity, opacity, 1]
        break
      default:
        styleLed = [
          opacity,
          opacity,
          opacity,
          opacity,
          opacity,
          opacity,
          opacity,
        ]
        break
    }
    return styleLed
  }
}

export { ledSetValue }
