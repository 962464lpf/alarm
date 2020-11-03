import imgUrl from '../assets/images/11111.png'
var parts = 150 //切割数量
var imgIndex = 0 //当前图片
/* eslint-disable */
function getXinDianTu() {
  $(function() {
    var op = {
      width_mt: 523, //外框容器宽度.(与图片宽度一致)
      height_mt: 200, //外框容器高度.(与图片高度一致)
      imgurl: imgUrl, //默认图片.
    }
    var cut_w = op.width_mt / parts //小块宽度
    var cut_h = op.height_mt //小块高度
    var $this = $('.slide_Box_mt')

    //设置小div进行图片切割.
    for (var i = 0; i < parts; i++) {
      var div1 =
        '<div class="scut_mt" style=" \
              width:' +
        cut_w +
        'px; \
              height:' +
        cut_h +
        'px; \
              float:left;\
              display:inline;\
              background-image:url(' +
        op.imgurl +
        ');\
              background-repeat:no-repeat; \
              background-position:' +
        -i * cut_w +
        'px ' +
        0 +
        'px"\
            ></div>'
      $this.append(div1)
    }
    $('.scut_mt').css({ opacity: 0 })

    Jump()
  })

  function Jump() {
    $('.scut_mt:eq(' + imgIndex + ')').animate({ opacity: 1 }, 1, function() {
      $('.scut_mt:eq(' + imgIndex + ')').animate(
        { opacity: 0.7 },
        1,
        function() {
          if (imgIndex < parts - 1) {
            imgIndex++
            Jump()
          } else {
            imgIndex = 0
            $('.scut_mt').css({ opacity: 0 })
            Jump()
          }
        }
      )
    })
  }
}
export { getXinDianTu }
