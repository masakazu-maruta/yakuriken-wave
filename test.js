(function () {
    var unit = 100,
        canvas, context, canvas2, context2,
        height, width, xAxis, yAxis,
        draw;
    function init() {

        canvas = document.getElementById("sineCanvas");

        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = document.documentElement.clientHeight;

        context = canvas.getContext("2d");

        height = canvas.height;
        width = canvas.width;

        xAxis = Math.floor(height / 2);
        yAxis = 0;

        drawWave('#10c2cd', 1, 3, 0);
    }
    function drawWave(color, alpha, zoom, delay) {
        context.fillStyle = color;
        context.globalAlpha = alpha;

        context.beginPath();
        drawSine(0.5 * Math.PI / 0.5, zoom, delay);
        context.lineTo(width + 10, height);
        context.lineTo(0, height);
        context.closePath();
        context.fill();
    }
    function drawSine(t, zoom, delay) {

        // Set the initial x and y, starting at 0,0 and translating to the origin on
        // the canvas.
        var x = t; //時間を横の位置とする
        var y = Math.sin(x) / zoom;
        context.moveTo(yAxis, unit * y + xAxis); //スタート位置にパスを置く

        // Loop to draw segments (横幅の分、波を描画)
        for (i = yAxis; i <= width + 10; i += 10) {
            x = t + (-yAxis + i) / unit / zoom;
            y = Math.sin(x - delay) / 3;
            context.lineTo(i, unit * y + xAxis);
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        init();
    });
})();