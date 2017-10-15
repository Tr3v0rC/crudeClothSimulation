window.onload = setup;
var width, height, particles, density=18;

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
    resetButton = document.getElementById("reset");
    resetButton.onclick = function() {
        generateParticles(density);
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
    for (i = 100; i < height-100; i += step) {
        for (j = 200; j < width-200; j += step) {
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
