!(function(t) {
  function e(e) {
    for (
      var s, n, r = e[0], l = e[1], c = e[2], u = 0, h = [];
      u < r.length;
      u++
    )
      (n = r[u]),
        Object.prototype.hasOwnProperty.call(i, n) && i[n] && h.push(i[n][0]),
        (i[n] = 0)
    for (s in l) Object.prototype.hasOwnProperty.call(l, s) && (t[s] = l[s])
    for (d && d(e); h.length; ) h.shift()()
    return o.push.apply(o, c || []), a()
  }

  function a() {
    for (var t, e = 0; e < o.length; e++) {
      for (var a = o[e], s = !0, r = 1; r < a.length; r++) {
        var l = a[r]
        0 !== i[l] && (s = !1)
      }
      s && (o.splice(e--, 1), (t = n((n.s = a[0]))))
    }
    return t
  }
  var s = {},
    i = {
      app: 0,
    },
    o = []

  function n(e) {
    if (s[e]) return s[e].exports
    var a = (s[e] = {
      i: e,
      l: !1,
      exports: {},
    })
    return t[e].call(a.exports, a, a.exports, n), (a.l = !0), a.exports
  }
  // eslint-disable-next-line no-extra-semi
  ;(n.m = t),
    (n.c = s),
    (n.d = function(t, e, a) {
      n.o(t, e) ||
        Object.defineProperty(t, e, {
          enumerable: !0,
          get: a,
        })
    }),
    (n.r = function(t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, {
          value: 'Module',
        }),
        Object.defineProperty(t, '__esModule', {
          value: !0,
        })
    }),
    (n.t = function(t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t
      var a = Object.create(null)
      if (
        (n.r(a),
        Object.defineProperty(a, 'default', {
          enumerable: !0,
          value: t,
        }),
        2 & e && 'string' != typeof t)
      )
        for (var s in t)
          n.d(
            a,
            s,
            function(e) {
              return t[e]
            }.bind(null, s)
          )
      return a
    }),
    (n.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default
            }
          : function() {
              return t
            }
      return n.d(e, 'a', e), e
    }),
    (n.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (n.p = '/')
  var r = (window.webpackJsonp = window.webpackJsonp || []),
    l = r.push.bind(r)
  ;(r.push = e), (r = r.slice())
  for (var c = 0; c < r.length; c++) e(r[c])
  var d = l
  o.push([0, 'chunk-vendors']), a()
})({
  0: function(t, e, a) {
    t.exports = a('56d7')
  },

  // store
  4360: function(t, e, a) {
    'use strict'
    var n = a('2b0e'),
      r = a('2f62')

    n.a.use(r.a)
    // eslint-disable-next-line no-unused-vars
    var A = (e.a = new r.a.Store({}))
  },

  '4e68': function(t, e, a) {
    var s = a('bee2'),
      o = a('bee2'),
      // 参数1  wares   参数2   波浪的参数
      n = (function() {
        function t(e) {
          // eslint-disable-next-line no-unused-vars
          var a = this,
            s = arguments[1] // 波浪参数
          s = Object.assign(
            {
              onUpdate: function() {},
              onResize: function() {},
            },
            s
          )
          var o = Object.assign(
              {
                time: {
                  type: 'float',
                  value: 4,
                },
                projection: {
                  type: 'mat4',
                  value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                },
              },
              s.uniforms
            ),
            n = Object.assign(
              {
                position: {
                  size: 3,
                  data: [],
                },
                color: {
                  size: 4,
                  data: [],
                },
              },
              s.buffers
            ),
            r = Object.assign(
              {
                fov: 60,
                near: 1,
                far: 1e4,
                aspect: 1,
                z: 100,
                perspective: !0,
              },
              s.camera
            ),
            l = document.createElement('canvas'),
            c = l.getContext('webgl')
          // 判断浏览器是否支持   canvas.getContext('webgl')
          // if (!c) return !1
          ;(this.count = 0),
            (this.gl = c),
            (this.canvas = l),
            (this.camera = r),
            (this.holder = e),
            (this.msaa = s.msaa),
            (this.onUpdate = s.onUpdate),
            (this.onResize = s.onResize),
            (this.data = {}),
            // e: waves 对象
            e.appendChild(l),
            // methods函数
            this.createProgram(s.vertex, s.fragment),
            this.createBuffers(n),
            this.createUniforms(o),
            this.updateBuffers(),
            this.updateUniforms(),
            this.createTexture(s.texture),
            // canvas对象
            c.enable(c.BLEND),
            c.enable(c.CULL_FACE),
            c.blendFunc(c.SRC_ALPHA, c.ONE),
            // 页面大小重置函数
            this.resize(),
            (this.update = this.update.bind(this)),
            (this.time = {
              start: performance.now(),
              old: performance.now(),
            }),
            this.update()
        }
        return (
          Object(o.a)(t, [
            {
              key: 'resize',
              // eslint-disable-next-line no-unused-vars
              value: function(t) {
                var e = this.holder,
                  a = this.canvas,
                  s = this.gl,
                  i = (this.width = e.offsetWidth),
                  o = (this.height = e.offsetHeight),
                  n = (this.aspect = i / o),
                  r = (this.dpi = Math.max(this.msaa ? 2 : 1, devicePixelRatio))
                ;(a.width = i * r),
                  (a.height = o * r),
                  (a.style.width = i + 'px'),
                  (a.style.height = o + 'px'),
                  s.viewport(0, 0, i * r, o * r),
                  s.clearColor(0, 0, 0, 0),
                  (this.uniforms.resolution = [i, o]),
                  (this.uniforms.projection = this.setProjection(n)),
                  this.onResize(i, o, r)
              },
            },
            {
              key: 'setProjection',
              value: function(t) {
                var e = this.camera
                if (e.perspective) {
                  e.aspect = t
                  var a = e.fov * (Math.PI / 180),
                    s = Math.tan(0.5 * Math.PI - 0.5 * a),
                    i = 1 / (e.near - e.far),
                    o = [
                      s / e.aspect,
                      0,
                      0,
                      0,
                      0,
                      s,
                      0,
                      0,
                      0,
                      0,
                      (e.near + e.far) * i,
                      -1,
                      0,
                      0,
                      e.near * e.far * i * 2,
                      0,
                    ]
                  return (o[14] += e.z), (o[15] += e.z), o
                }
                return [
                  2 / this.width,
                  0,
                  0,
                  0,
                  0,
                  -2 / this.height,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  -1,
                  1,
                  0,
                  1,
                ]
              },
            },
            {
              key: 'createShader',
              value: function(t, e) {
                var a = this.gl,
                  s = a.createShader(t)
                if (
                  (a.shaderSource(s, e),
                  a.compileShader(s),
                  a.getShaderParameter(s, a.COMPILE_STATUS))
                )
                  return s
                a.deleteShader(s)
              },
            },
            {
              key: 'createProgram',
              value: function(t, e) {
                var a = this.gl,
                  s = this.createShader(a.VERTEX_SHADER, t),
                  i = this.createShader(a.FRAGMENT_SHADER, e),
                  o = a.createProgram()
                a.attachShader(o, s),
                  a.attachShader(o, i),
                  a.linkProgram(o),
                  a.getProgramParameter(o, a.LINK_STATUS)
                    ? (a.useProgram(o), (this.program = o))
                    : a.deleteProgram(o)
              },
            },
            {
              key: 'createUniforms',
              value: function(t) {
                var e = this,
                  a = this.gl,
                  s = (this.data.uniforms = t),
                  i = (this.uniforms = {})
                Object.keys(s).forEach(function(t) {
                  // eslint-disable-next-line no-extra-semi
                  ;(s[t].location = a.getUniformLocation(e.program, 'u_' + t)),
                    Object.defineProperty(i, t, {
                      set: function(a) {
                        // eslint-disable-next-line no-extra-semi
                        ;(s[t].value = a), e.setUniform(t, a)
                      },
                      get: function() {
                        return s[t].value
                      },
                    })
                })
              },
            },
            {
              key: 'setUniform',
              value: function(t, e) {
                var a = this.gl,
                  i = this.data.uniforms[t]
                switch (((i.value = e), i.type)) {
                  case 'int':
                    a.uniform1i(i.location, e)
                    break
                  case 'float':
                    a.uniform1f(i.location, e)
                    break
                  case 'vec2':
                    a.uniform2f.apply(a, [i.location].concat(Object(s.a)(e)))
                    break
                  case 'vec3':
                    a.uniform3f.apply(a, [i.location].concat(Object(s.a)(e)))
                    break
                  case 'vec4':
                    a.uniform4f.apply(a, [i.location].concat(Object(s.a)(e)))
                    break
                  case 'mat2':
                    a.uniformMatrix2fv(i.location, !1, e)
                    break
                  case 'mat3':
                    a.uniformMatrix3fv(i.location, !1, e)
                    break
                  case 'mat4':
                    a.uniformMatrix4fv(i.location, !1, e)
                }
              },
            },
            {
              key: 'updateUniforms',
              value: function() {
                var t = this,
                  e = (this.gl, this.data.uniforms)
                Object.keys(e).forEach(function(a) {
                  var s = e[a]
                  t.uniforms[a] = s.value
                })
              },
            },
            {
              key: 'createBuffers',
              value: function(t) {
                var e = this,
                  a = (this.gl, (this.data.buffers = t)),
                  s = (this.buffers = {})
                Object.keys(a).forEach(function(t) {
                  var i = a[t]
                  ;(i.buffer = e.createBuffer('a_' + t, i.size)),
                    Object.defineProperty(s, t, {
                      set: function(s) {
                        // eslint-disable-next-line no-extra-semi
                        ;(a[t].data = s),
                          e.setBuffer(t, s),
                          'position' == t &&
                            (e.count = a.position.data.length / 3)
                      },
                      get: function() {
                        return a[t].data
                      },
                    })
                })
              },
            },
            {
              key: 'createBuffer',
              value: function(t, e) {
                var a = this.gl,
                  s = this.program,
                  i = a.getAttribLocation(s, t),
                  o = a.createBuffer()
                return (
                  a.bindBuffer(a.ARRAY_BUFFER, o),
                  a.enableVertexAttribArray(i),
                  a.vertexAttribPointer(i, e, a.FLOAT, !1, 0, 0),
                  o
                )
              },
            },
            {
              key: 'setBuffer',
              value: function(t, e) {
                var a = this.gl,
                  s = this.data.buffers
                ;(null != t || a.bindBuffer(a.ARRAY_BUFFER, null)) &&
                  (a.bindBuffer(a.ARRAY_BUFFER, s[t].buffer),
                  a.bufferData(
                    a.ARRAY_BUFFER,
                    new Float32Array(e),
                    a.STATIC_DRAW
                  ))
              },
            },
            {
              key: 'updateBuffers',
              value: function() {
                this.gl
                var t = this.buffers
                Object.keys(t).forEach(function(e) {
                  // eslint-disable-next-line no-undef
                  return (t[e] = buffer.data)
                }),
                  this.setBuffer(null)
              },
            },
            {
              key: 'createTexture',
              value: function(t) {
                var e = this.gl,
                  a = e.createTexture()
                e.bindTexture(e.TEXTURE_2D, a),
                  e.texImage2D(
                    e.TEXTURE_2D,
                    0,
                    e.RGBA,
                    1,
                    1,
                    0,
                    e.RGBA,
                    e.UNSIGNED_BYTE,
                    new Uint8Array([0, 0, 0, 0])
                  ),
                  (this.texture = a),
                  t && ((this.uniforms.hasTexture = 1), this.loadTexture(t))
              },
            },
            {
              key: 'loadTexture',
              value: function(t) {
                var e = this.gl,
                  a = this.texture,
                  s = new Image()
                ;(s.onload = function() {
                  e.bindTexture(e.TEXTURE_2D, a),
                    e.texImage2D(
                      e.TEXTURE_2D,
                      0,
                      e.RGBA,
                      e.RGBA,
                      e.UNSIGNED_BYTE,
                      s
                    ),
                    e.texParameteri(
                      e.TEXTURE_2D,
                      e.TEXTURE_MIN_FILTER,
                      e.LINEAR
                    ),
                    e.texParameteri(
                      e.TEXTURE_2D,
                      e.TEXTURE_MAG_FILTER,
                      e.LINEAR
                    ),
                    e.texParameteri(
                      e.TEXTURE_2D,
                      e.TEXTURE_WRAP_S,
                      e.CLAMP_TO_EDGE
                    ),
                    e.texParameteri(
                      e.TEXTURE_2D,
                      e.TEXTURE_WRAP_T,
                      e.CLAMP_TO_EDGE
                    )
                }),
                  (s.src = t)
              },
            },
            {
              key: 'update',
              value: function() {
                var t = this.gl,
                  e = performance.now(),
                  a = (e - this.time.start) / 5e3,
                  s = e - this.time.old
                ;(this.time.old = e),
                  (this.uniforms.time = a),
                  this.count > 0 &&
                    (t.COLORBUFFERBIT && t.clear(t.COLORBUFFERBIT),
                    t.drawArrays(t.POINTS, 0, this.count)),
                  this.onUpdate(s),
                  requestAnimationFrame(this.update)
              },
            },
          ]),
          t
        )
      })()
    e.a = function(t) {
      var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 15,
        s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 10,
        i = a
      new n(document.querySelector(t), {
        texture:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAftJREFUeNrsV9FxwjAMDbkMkG4AEwAbwAZhg2SClglaJgAmSDYAJiAbJJ0ANigjVOKeOZ+wjWPC9ae60yU4lp5lS89iEAVI+ROl9MjxsyreoktXH4MA0A96fJKmGGLQFYFvXgJMgDN+kA4tU86kBS2g7gWYABloTZqJTwpgJsb3pEtawDkIGOeottUamWMnVqQb2/kPLKA5oky1YXawJUdfFhsefzfYcPSVExirZ8CJmFfBwcUj29daxitpYV/fAZNRaTCoYdB2zPwJFiDPn0uvuAEj0qNtUqhYgplz5InDLifDCDV67gg4RFLmtjnJAx9smJGjrStDDZUgk+xOYsNYi5JRkmL1DTnOHKD8rRGspsqv9QE+UGQjTiqUgxLevh0BHJE8t0TiMf4malmVEvs6+ABfBdzLRpKDZ4i+RPI0huy92rr423nGONMlzrgUAKbEqcFqD5Mx9slSdkQ6p9eFOH/9HBc8x7cCki5lQk75AtjTDuy0S2NP44uuNR4HcsO35f3lwE/LPzDLGNTXi8DX2Ac4A0HkPYDmIJjMCIwLuhL0WEp67HIfg0ZlS1SpZiDWapTv3rkgdJ0eU59ttdBoi3u4MG41r4Z0yq/iguAtO6Gvihw910lQ6QUUOpVtb2iXGWlbKH+Hd5mefbVNnuur//yfxKv+O/0KMACAidBaPX5LZQAAAABJRU5ErkJggg==',
        uniforms: {
          size: {
            type: 'float',
            value: i,
          },
          field: {
            type: 'vec3',
            value: [0, 0, 0],
          },
          speed: {
            type: 'float',
            value: 7,
          },
        },
        vertex:
          '\n          #define M_PI 3.1415926535897932384626433832795\n  \n          precision highp float;\n  \n          attribute vec4 a_position;\n          attribute vec4 a_color;\n  \n          uniform float u_time;\n          uniform float u_size;\n          uniform float u_speed;\n          uniform vec3 u_field;\n          uniform mat4 u_projection;\n  \n          varying vec4 v_color;\n  \n          void main() {\n  \n            vec3 pos = a_position.xyz;\n  \n            pos.y += (\n              cos(pos.x / u_field.x * M_PI * 8.0 + u_time * u_speed) +\n              sin(pos.z / u_field.z * M_PI * 8.0 + u_time * u_speed)\n            ) * u_field.y;\n  \n            gl_Position = u_projection * vec4( pos.xyz, a_position.w );\n            gl_PointSize = ( u_size / gl_Position.w ) * 200.0;\n  \n            v_color = a_color;\n  \n          }',
        fragment:
          '\n          precision highp float;\n  \n          uniform sampler2D u_texture;\n  \n          varying vec4 v_color;\n  \n          void main() {\n  \n            gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);\n  \n          }',
        onResize: function(t, a, o) {
          for (
            var n = [], r = [], l = (t / a) * 200, c = 1e3, d = s, u = 0;
            u < l;
            u += d
          )
            for (var h = 0; h < c; h += d)
              n.push(-l / 2 + u, -30, -500 + h),
                r.push(0, 1 - (u / l) * 1, 0 + (u / l) * 0.5, e ? 0.1 : h / c)
          ;(this.uniforms.field = [l, 10, c]),
            (this.buffers.position = n),
            (this.buffers.color = r),
            (this.uniforms.size = (a / 400) * i * o)
        },
      })
    }
  },

  // vue框架构建
  '56d7': function(t, e, a) {
    'use strict'
    var s = a('2b0e'),
      r = {
        name: 'App',
        props: ['userId'],
      },
      l = (a('5c0b'), a('2877')),
      c = a('6544'),
      d = a.n(c),
      f = Object(l.a)(r, function() {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e
        return a(
          'div',
          {
            attrs: {
              id: 'app1',
            },
          },
          [
            a(
              'v-app',
              [
                a('router-view', {
                  key: t.searchCounter,
                }),
              ],
              1
            ),
          ],
          1
        )
      }),
      v = f.exports
    d()(f)
    var b = a('a18c')

    new s.a({
      router: b.a,
      render: function(t) {
        return t(v)
      },
    }).$mount('#app1')
  },
  // eslint-disable-next-line no-unused-vars
  '5c0b': function(t, e, a) {},

  '8e32': function(t, e, a) {
    'use strict'
    var s = a('c3c8')
    a.n(s).a
  },

  // vue-router
  a18c: function(t, e, a) {
    var s = a('2909'),
      i = a('2b0e'),
      o = a('8c4f'),
      u = (a('8e32'), a('2877'))
    var G = a('4e68'),
      X = {
        created: function() {
          // 参数1 容器
          // 参数2 真假
          // 参数3 深浅  值越小越签
          console.log(Object(G.a))
          Object(G.a)('#waves', true, 6, 4)
        },
      },
      st = Object(u.a)(X),
      it = st.exports

    i.a.use(o.a)
    var ue = [
        {
          path: '/',
          name: 'Login',
          component: it,
          props: {
            isLogin: !0,
          },
        },
      ],
      he = [],
      pe = new o.a({
        mode: 'history',
        base: '/',
        routes: [].concat(ue, Object(s.a)(he)),
      })
    e.a = pe
  },

  // eslint-disable-next-line no-unused-vars
  c3c8: function(t, e, a) {},
})
