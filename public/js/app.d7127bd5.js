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
          'data:image/png;base64,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',
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
