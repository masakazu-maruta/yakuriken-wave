(function () {

    var unit = 100,
        canvas, context, canvas2, context2,
        height, width, xAxis, yAxis,
        draw, draw_id;
    /**
     * Init function.
     *
     * Initialize variables and begin the animation.
     */
    function init() {

        canvas = document.getElementById("sineCanvas");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        context = canvas.getContext("2d");

        height = canvas.height;
        width = canvas.width;

        xAxis = Math.floor(height / 2);
        yAxis = 0;
        draw.t = 0;
        if (draw_id == null) {
            draw();
        } else {
            return;
        }
    }

    /**
     * Draw animation function.
     *
     * This function draws one frame of the animation, waits 20ms, and then calls
     * itself again.
     */
    function draw() {

        // キャンバスの描画をクリア
        context.clearRect(0, 0, width, height);

        //波を描画
        drawWave('#1A1A1A', 1, 3, 0);

        // Update the time and draw again
        draw.seconds = draw.seconds + .009;
        console.log(draw.seconds);
        draw.t = draw.seconds * Math.PI;
        const updateTime = 35;
        draw_id = setTimeout(draw, updateTime);
    };
    draw.seconds = 0;
    draw.t = 0;

    /**
    * 波を描画
    * drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
    */
    function drawWave(color, alpha, zoom, delay) {
        context.fillStyle = color;
        context.globalAlpha = alpha;
        const rate = 0.5;
        context.beginPath(); //パスの開始
        drawSine(draw.t / rate, zoom, delay);//
        context.lineTo(width + 10, height); //パスをCanvasの右下へ
        context.lineTo(0, height); //パスをCanvasの左下へ
        context.closePath() //パスを閉じる
        context.fill(); //塗りつぶす
    }

    /**
     * Function to draw sine
     *
     * The sine curve is drawn in 10px segments starting at the origin. 
     * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
     */
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
    window.addEventListener('resize', function () {
        init();
    });
    document.addEventListener("DOMContentLoaded", function () {
        init();
    });
})();