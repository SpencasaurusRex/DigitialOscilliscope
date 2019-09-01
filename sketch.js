var lastPoint;
var offset;
var left;
var right;
var fftLeft;
var fftRight;
var leftWave;
var rightWave;

function preload()
{
    soundFormats('ogg', 'wav')
    left = loadSound('assets/test1.wav');
    right = loadSound('assets/test2.wav');
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.style('padding', '0');
    //background(255, 0, 200);

    offset = createVector(windowWidth / 2, windowHeight / 2);

    fftLeft = new p5.FFT(0, 1024*4)
    fftLeft.setInput(left)

    fftRight = new p5.FFT(0, 1024*4)
    fftRight.setInput(right)
    left.play();
    right.play();
    frameRate(43);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    offset = createVector(windowWidth / 2, windowHeight / 2);
}

function draw()
{
    background(40)
    stroke(255);
    strokeWeight(2);

    leftWave = fftLeft.waveform()
    rightWave = fftRight.waveform()

    //lastPoint = createVector(0,0)
    let vec = createVector(0, 0)
    
    for (var i = 0; i < leftWave.length; i++)
    {
        vec.x = map(leftWave[i], -1, 1, -width/2, width/2);
        vec.y = map(rightWave[i], -1, 1, -height/2, height/2) * 2;
        drawPoint(vec)
    }
}

function drawPoint(vec)
{
    point(vec.x + offset.x, vec.y + offset.y);
    //line(lastPoint.x, lastPoint.y, vec.x, vec.y);
    //console.log(vec.y)
    //line(lastPoint.x + offset.x, lastPoint.y + offset.y, vec.x + offset.x, vec.y + offset.y);
    //lastPoint.x = vec.x;
    //lastPoint.y = vec.y;
}