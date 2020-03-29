var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score = 0
var ball = {
    center: {
        "x": canvas.width/2 + Math.random() * 10 - 5, 
        "y": canvas.height-30
    },
    "r": 10,
    v: {"x": 2, "y": -2},
    color: "#0095DD",
    bounce: function(xOrY) {
        if (xOrY === 'y'){
            this.v.y *= -1
        } else {
            this.v.x *= -1
        }
        this.color = '#'+Math.floor(Math.random()*6)+Math.floor(Math.random()*1048575).toString(16)
    }
}

var paddle = {
    "h": 10,
    "w": 75,
    "x": (canvas.width - 75) / 2,
    color: "#0095DD"
}

var bricks = {
    rows: 3,
    cols: 5,
    width: 75,
    height: 20,
    padding: 10,
    offsetTop: 30,
    offsetLeft: 30,
    bricks: [],
    initBricks: function(){
        for(var c=0; c<this.cols; c++) {
            this.bricks[c] = [];
            for(var r=0; r<this.rows; r++) {
                this.bricks[c][r] = {
                    x: (c*(this.width+this.padding))+this.offsetLeft, 
                    y: (r*(this.height+this.padding))+this.offsetTop,
                    alive: true,
                    color: "#0095DD"
                };
            }
        }
    }
}
bricks.initBricks()

function drawBricks() {
    for(var c=0; c<bricks.cols; c++) {
        for(var r=0; r<bricks.rows; r++) {
            var curBrick = bricks.bricks[c][r]
            if (curBrick.alive){
                ctx.beginPath
                ctx.rect(curBrick.x, curBrick.y, bricks.width, bricks.height)
                ctx.fillStyle = curBrick.color
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height-paddle.h, paddle.w, paddle.h);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.center.x, ball.center.y, ball.r, 0, Math.PI*2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

var rightPressed = false;
var leftPressed = false;
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.w/2;
    }
}

function collisionDetection() {
    var x = ball.center.x
    var y = ball.center.y
    for(var c=0; c<bricks.cols; c++) {
        for(var r=0; r<bricks.rows; r++) {
            var b = bricks.bricks[c][r];
            if (!b.alive){
                continue;
            }
            if(x > b.x && x < b.x+bricks.width && y > b.y && y < b.y+bricks.height) {
                ball.bounce('y')
                b.alive=false
                score++;
                if(score === bricks.rows*bricks.cols) {
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                    clearInterval(interval); // Needed for Chrome to end game
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall()
    drawPaddle()
    drawBricks()
    drawScore()

    collisionDetection()
    if(ball.center.y + ball.v.y < ball.r) {
        ball.bounce('y');
    } else if(ball.center.y + ball.v.y + ball.r > canvas.height) {
        if (ball.center.x > paddle.x && ball.center.x < paddle.x + paddle.w){
            ball.bounce('y')
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }

    if(ball.center.x + ball.v.x < ball.r) {
        ball.bounce('x')
    } else if (ball.center.x + ball.r + ball.v.x > canvas.width) {
        ball.bounce('x')
    }

    if(rightPressed) {
        paddle.x += 7;
        if (paddle.x + paddle.w > canvas.width){
            paddle.x = canvas.width - paddle.w;
        }
    }
    else if(leftPressed) {
        paddle.x -= 7;
        if (paddle.x < 0){
            paddle.x=0
        }
    }
    ball.center.x+=ball.v.x
    ball.center.y+=ball.v.y
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
var interval = setInterval(draw, 10);
