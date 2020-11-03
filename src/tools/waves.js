function getWaves() {
  var SEPARATION = 40
  var AMOUNTX = 60
  var AMOUNTY = 60

  var container
  var camera
  let scene
  let renderer

  var particles
  let particle
  let count = 0

  let userDiv = document.getElementById('user')
  // var mouseX = 29
  // let mouseY = -312
  var mouseX = window.innerWidth / 2
  let mouseY = -window.innerHeight / 2

  // eslint-disable-next-line no-unused-vars
  var windowHalfX = window.innerWidth / 2
  // eslint-disable-next-line no-unused-vars
  var windowHalfY = window.innerHeight / 2

  function init() {
    // 添加容器
    container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = 0
    container.style.right = 0
    container.style.top = '30%'
    container.style.bottom = 0

    userDiv.appendChild(container)
    // 创建tree.js对象
    /*
					该构造函数总共有四个参数，分别是fov，aspect，near，far 
					fov表示摄像机视锥体垂直视野角度，最小值为0，最大值为180，默认值为50，实际项目中一般都定义45，
					因为45最接近人正常睁眼角度；
					aspect表示摄像机视锥体长宽比，默认长宽比为1，即表示看到的是正方形，实际项目中使用的是屏幕的宽高比；
					near表示摄像机视锥体近端面，这个值默认为0.1，实际项目中都会设置为1；
					far表示摄像机视锥体远端面，默认为2000，这个值可以是无限的，说的简单点就是我们视觉所能看到的最远距离。
        */
    // eslint-disable-next-line no-undef
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      25000
    )
    // 上下位置
    camera.position.z = 300

    // 对象的容器
    // eslint-disable-next-line no-undef
    scene = new THREE.Scene()
    // 粒子数组
    particles = new Array()

    // eslint-disable-next-line no-unused-vars
    var PI2 = Math.PI * 2
    let img = new Image()
    img.src = '../assets/images/1.png'
    img.style.width = '20px'
    img.style.height = '20px'

    // eslint-disable-next-line no-undef
    var material = new THREE.ParticleCanvasMaterial({
      color: 0x136829,
      program: function(context) {
        // context.drawImage(img, 0, 0)
        context.beginPath()
        // 控制球的大小
        context.arc(0, 0, 0.8, 0, PI2, true)
        context.fill()
      },
    })

    var i = 0

    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        // eslint-disable-next-line no-undef
        particle = particles[i++] = new THREE.Particle(material)
        particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 1.5
        particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 1.5
        scene.add(particle)
      }
    }

    // eslint-disable-next-line no-undef
    renderer = new THREE.CanvasRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)
    //

    window.addEventListener('resize', onWindowResize, false)
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2
    windowHalfY = window.innerHeight / 2

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  // 开始动画
  // eslint-disable-next-line no-unused-vars
  function animate() {
    requestAnimationFrame(animate)
    render()
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05
    camera.position.y += (-mouseY - camera.position.y) * 0.05
    camera.lookAt(scene.position)

    var i = 0

    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++]
        // 调整波浪高度
        particle.position.y =
          Math.sin((ix + count) * 0.3) * 80 + Math.sin((iy + count) * 0.3) * 150
        particle.scale.x = particle.scale.y = 2
        // (Math.sin((ix + count) * 0.3) + 1) * 3 +
        // (Math.sin((iy + count) * 0.5) + 1) * 3
      }
    }
    renderer.render(scene, camera)
    count += 0.1
  }
  init()
  animate()
}

export { getWaves }
