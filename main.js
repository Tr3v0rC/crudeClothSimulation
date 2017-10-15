window.onload = setup;
var width, height, particles,
    density=18
    gridX = 50,
    gridY = 50,
    size = 30;

function setup() {
    canvas = document.getElementById("canvas");
    c = canvas.getContext("2d");
    sizeCanvas();
    setupControls();
    generateParticles(density);
    window.setInterval(draw, 16.6);
}

function draw() {
    clearCanvas();
    c.font ="15px Arial";
    c.fillStyle = "black";
    c.fillText("x-margin: " + gridX + " y-margin: " + gridY + " Density: " +density, 20,20);
    for (i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.behaviors();
        p.update();
        p.show();
    }
}

function sizeCanvas() {
    height = window.innerHeight;
    width = window.innerWidth;
    canvas.height = height;
    canvas.width = width;
}

function setupControls() {
    var resetButton = document.getElementById("reset");
    resetButton.onclick = function() {
        generateParticles(density);
    }
    var xIn = document.getElementById("xinput");
    var xOut = document.getElementById("xout");
    xOut.innerHTML = gridX;
    xIn.oninput = function() {
      gridX = parseInt(xIn.value);
      generateParticles(density);
      xOut.innerHTML = gridX;
    }
    var yIn = document.getElementById("yinput");
    var yOut = document.getElementById("yout");
    yOut.innerHTML = gridY;
    yIn.oninput = function() {
      gridY = parseInt(yIn.value);
      generateParticles(density);
      yOut.innerHTML = gridY;
    }
    var dIn = document.getElementById("dinput");
    var dOut = document.getElementById("dout");
      dOut.innerHTML = density;
    dIn.oninput = function() {
      density = parseInt(dIn.value);
      generateParticles(density);
      dOut.innerHTML = density;
    }
}

function clearCanvas() {
    c.clearRect(0, 0, width, height);
}
window.onresize = function() {
    sizeCanvas();
    generateParticles(density);
    draw();
};

function generateParticles(step) {
    particles = [];
    for (i = gridY; i < height-gridY; i += step) {
        for (j = gridX; j < width-gridX; j += step) {
            particles.push(new Particle({x:j, y:i}, randomColour()));
        }
    }
}

function randomColour() {
    var r = Math.floor(Math.random() * 150) + 105;
    var g = Math.floor(Math.random() * 150) + 105;
    var b = Math.floor(Math.random() * 150) + 105;
    return "rgb(" + r + "," + g + "," + b + ")";
}
