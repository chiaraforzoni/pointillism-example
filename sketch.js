var initWidth;

var bombs = [],
    explodedBombs = [],
    explodedBombsSizeRange = [5, 10],
    bombSpeed = 7,
    bombInitColor = '#ffffff',
    bombInitSize = 10,
    xPosCorrectionScale = 1,
    maxBombsCount = 100;


var pointillismAreaHeight = 300,
    points = [],
    pointSizeRange = [5, 10];

function setup() {
    createCanvas(windowWidth, windowHeight);
    initWidth = windowWidth;

}

function draw() {
    background(0, 10, 45);

    drawPointillism();

    drawBombs();

}

function drawBombs() {
    for (var i = 0; i < bombs.length; i++) {
        if (bombs[i].y > height - pointillismAreaHeight) {
            var bomb = bombs[i];
            if (!bomb.color || !bomb.size) {
                // create bright color
                var newColor = lerpColor(randomColor(), color(255, 255, 255), 0.5);
                // tone to red
                bomb.color = lerpColor(newColor, color(255, 0, 0), random(0.5, 1));
                // random size
                bomb.size = random(explodedBombsSizeRange[0], explodedBombsSizeRange[1]);
            }

            if (!points[i]) {
                points[i] = {
                    x: random(0, width),
                    y: random(height - pointillismAreaHeight, height),
                    size: random(pointSizeRange[0], pointSizeRange[1]),
                    color: randomColor()
                }
            }

            fill(bomb.color);
            noStroke();
            ellipse(bomb.x * xPosCorrectionScale, height - pointillismAreaHeight, bomb.size);
        } else {
            /** bomb on the fly */
            fill(bombInitColor);
            noStroke();
            ellipse(bombs[i].x * xPosCorrectionScale, bombs[i].y, bombInitSize);
            bombs[i].y += bombSpeed;
        }
    }
}




function drawPointillism() {
    // draw rect
    noStroke();
    fill(0,25,25);
    rect(0, height - pointillismAreaHeight, width, pointillismAreaHeight);

    // draw point
    for (var i in points) {
        var point = points[i];
        fill(point.color);
        noStroke();
        ellipse(point.x * xPosCorrectionScale, point.y, point.size);
    }
}


    


function randomColor() {
    return color(random(0, 50), random(0, 50), random(0, 50));
}

function mouseClicked() {
    var obj = {x: mouseX, y: mouseY};
    bombs.push(obj);

    if (bombs.length > maxBombsCount) {
        bombs.shift();
    }

}


