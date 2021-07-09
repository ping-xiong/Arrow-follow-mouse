var canvas = null
var ctx = null

const imgObj = new Image();

// 图片大小
var img_height = 32
var img_width = 20

// 间隙
var gap = 20

// 窗口大小
var window_height = 0
var window_width = 0

var padding = 10

var background = "#ffffff"

var lastMouseX = 0
var lastMouseY = 0

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.padding) {
            padding = properties.padding.value
            $('html').get(0).style.padding = padding + 'px'
            resizeCanvas()
            drawPic(lastMouseX, lastMouseY, false)
        }
        if (properties.gap) {
            gap = properties.gap.value
            drawPic(lastMouseX, lastMouseY, false)
        }
        if (properties.background) {
            var customColor = properties.background.value.split(' ');
            customColor = customColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            background =  'rgb(' + customColor + ')';
            $('html').get(0).style.background = background
        }
    },
};


$(function() {
    canvas = $('#myCanvas')
    ctx = document.getElementById('myCanvas').getContext('2d')
    //添加窗口尺寸改变响应监听
    $(window).resize(resizeCanvas);
    //页面加载后先设置一下canvas大小
    resizeCanvas();

    $('html').get(0).style.padding = padding + 'px'
    $('html').get(0).style.background = background

    imgObj.src = "./arrow.png"
    imgObj.onload = function () {

        drawPic(0, 0, true)

        $(document).mousemove(function(e){
            lastMouseX = e.pageX - padding
            lastMouseY = e.pageY - padding
            drawPic(lastMouseX, lastMouseY, false)
        });
    }

    console.log('Blog: https://pingxonline.com/')
})

//窗口尺寸改变响应（修改canvas大小）
function resizeCanvas() {
    window_height = $(window).get(0).innerHeight - (padding * 2)
    window_width = $(window).get(0).innerWidth - (padding * 2)
    canvas.attr("width", window_width)
    canvas.attr("height", window_height)
}

// 绘制
function drawPic(mouse_x, mouse_y, firstInit){

    // canvas.attr("width", window_width)
    canvas.attr("height", window_height)

    var start_x = 0
    var start_y = 0

    while (start_y < window_height - gap){

        while (start_x < window_width - gap){
            if (firstInit){
                ctx.drawImage(imgObj, start_x, start_y)
            }else{
                const angle = getAngle(mouse_x, mouse_y, start_x + img_width / 2, start_y + img_width / 2)

                ctx.save()
                ctx.translate(start_x + img_width / 2,  start_y + img_width / 2)
                ctx.rotate(angle * Math.PI / 180)
                ctx.drawImage(imgObj, -img_width/2, -img_height/2, img_width, img_height)
                ctx.restore()
            }
            start_x += gap + img_width
        }

        start_y += gap + img_height
        start_x = 0
    }

}

function getAngle(x1, y1, x2, y2) {
    return -(Math.atan2( y2 - y1 ,x1 - x2) / (Math.PI / 180)) + 90
}