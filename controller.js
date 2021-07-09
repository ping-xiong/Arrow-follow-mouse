var canvas = null
var ctx = null

const imgObj = new Image();

// 图片大小
var img_height = 32
var img_width = 20

// 间隙
var gap = 15

// 窗口大小
var window_height = 0
var window_width = 0

$(function() {
    canvas = $('#myCanvas')
    ctx = document.getElementById('myCanvas').getContext('2d')
    //添加窗口尺寸改变响应监听
    $(window).resize(resizeCanvas);
    //页面加载后先设置一下canvas大小
    resizeCanvas();

    imgObj.src = "./arrow.png"
    imgObj.onload = function () {
        $(document).mousemove(function(e){
            // console.log(e.pageX + ", " + e.pageY)
            drawPic(e.pageX, e.pageY)
        });
    }
})

//窗口尺寸改变响应（修改canvas大小）
function resizeCanvas() {
    window_height = $(window).get(0).innerHeight
    window_width = $(window).get(0).innerWidth
    canvas.attr("width", window_width)
    canvas.attr("height", window_height)
}

// 绘制
function drawPic(mouse_x, mouse_y){

    // canvas.attr("width", window_width)
    canvas.attr("height", window_height)

    var start_x = 0
    var start_y = 0

    while (start_y < window_height - gap){

        while (start_x < window_width - gap){

            const angle = getAngle(mouse_x, mouse_y, start_x + img_width / 2, start_y + img_width / 2);

            ctx.save()
            ctx.translate(start_x + img_width / 2,  start_y + img_width / 2)
            ctx.rotate(angle * Math.PI / 180)
            ctx.drawImage(imgObj, -img_width/2, -img_height/2, img_width, img_height)
            ctx.restore()
            start_x += gap + img_width
        }

        start_y += gap + img_height
        start_x = 0
    }

}

/**
 * 获得角度
 */
function getAngle(x1, y1, x2, y2) {
    var degree = Math.atan2( y2 - y1 ,x1 - x2) / (Math.PI / 180);
    console.log(-degree)
    return -degree + 90;
}