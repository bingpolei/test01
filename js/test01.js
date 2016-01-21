//$(window).resize(resizeCanvas);
//function resizeCanvas() {
//    var canvas=document.getElementById('wheelcanvas');
//    canvas.attr("width", $(window).get(0).innerWidth);
//    canvas.attr("height", $(window).get(0).innerWidth);
//    context.fillRect(0, 0, canvas.width(), canvas.height());
//};
//resizeCanvas();


function chg(){
    var hid=document.getElementsByClassName('row')[0];
    var blc=document.getElementById('fm');
    hid.style.display="block";
    blc.style.display="none";
    return false;
}

//document.getElementById("btn").width=document.body.clientWidth/3;

var colors = ["#B8D430", "#3AB745", "#029990", "#3501CB",  "#CC0071", "#F80120", "#F35B20", "#FB9A00"];
var restaraunts = ["六等奖", "四等奖", "八等奖", "五等奖", "一等奖", "三等奖", "七等奖", "二等奖"];
var startAngle = 0;
var arc = Math.PI / 4;
var spinTimeout = null;
var spinArcStart = 8;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;
draw();

function draw() {
        drawRouletteWheel();
    }


function drawRouletteWheel() {
        var canvas = document.getElementById("wheelcanvas");
        if (canvas.getContext) {
            var width=document.body.clientWidth;
            //var height=document.documentElement.clientHeight;
            var outsideRadius = width*2/5;
            var textRadius = width*2/5-40;
            var insideRadius = width*2/5-width*7/25;
            canvas.width=width;
            canvas.height=width;
            //$("#wheelcanvas").css({width:width});
            //$("#wheelcanvas").css({height:width});

            //alert(canvas.style.height)
            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, width, width);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.font = 'bold 12px sans-serif';
            for (var i = 0; i < 8; i++) {
                var angle = startAngle + i * arc;
                ctx.fillStyle = colors[i];
                ctx.beginPath();
                ctx.arc(width/2, width/2, outsideRadius, angle, angle + arc, false);
                ctx.arc(width/2, width/2, insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();
                ctx.save();
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = -1;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "rgb(220,220,220)";
                ctx.fillStyle = "black";
                ctx.translate(width/2 + Math.cos(angle + arc / 2) * textRadius, width/2 + Math.sin(angle + arc / 2) * textRadius);
                ctx.rotate(angle + arc / 2 + Math.PI /2);
                var text = restaraunts[i];
                ctx.fillText(text, -ctx.measureText(text).width /2, 0);
                ctx.restore();
            }

            //Arrow
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.moveTo(width/2 - 4, width/2 - (outsideRadius + 5));
            ctx.lineTo(width/2 + 4, width/2 - (outsideRadius + 5));
            ctx.lineTo(width/2 + 4, width/2 - (outsideRadius - 5));
            ctx.lineTo(width/2 + 9, width/2 - (outsideRadius - 5));
            ctx.lineTo(width/2, width/2 - (outsideRadius - 13));
            ctx.lineTo(width/2 - 9, width/2 - (outsideRadius - 5));
            ctx.lineTo(width/2 - 4, width/2 - (outsideRadius - 5));
            ctx.lineTo(width/2 - 4, width/2 - (outsideRadius + 5));
            ctx.fill();
        }
    }

//
//function stopBtn(){
//    if ( rotateWheel() ){
//        $('btn').attr('disabled','disabled');
//    } else if ( stopRotateWheel() ){
//        $('btn').removeAttr('disabled');
//    }
//}
//stopBtn();


    function spin() {
        $('#btn').attr('disabled','true');   //设置转盘转动中抽奖按钮禁用
        //$('#btn').css('background','grey');   //设置按钮禁用时的颜色
        spinAngleStart = Math.random() * 8 + 8;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3 + 4 * 1000;
        rotateWheel();
    }

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
    var width=document.body.clientWidth;
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 1.5rem sans-serif';
    var text = restaraunts[index]
    ctx.fillText(text, width/2 - ctx.measureText(text).width / 2, width/2 + 8);
    ctx.restore();
    $('#btn').removeAttr('disabled');  //设置转盘停止转动时按钮解除禁用
    //$('#btn').css('background','red');  //按钮解除禁用时设置要变回的颜色
}

    function easeOut(t, b, c, d) {
        var ts = (t /= d) * t;
        var tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }

