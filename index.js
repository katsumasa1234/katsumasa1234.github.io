var cycleCountValue = 1000;
var starCountValue = 10;
var starCountMin = 10;

var div = document.getElementById("firework_background");
var divSize = new Object();

var loopCount = cycleCountValue;
var starCount = 0;
var stars = [];
var olders = [];

function loop() {
    getSize();
    flashStar();

    loopCount++;
    if (loopCount >= cycleCountValue) {
        replace();
        loopCount = 0;
    }
    requestAnimationFrame(loop);
}

function getSize() {
    divSize.width = div.getBoundingClientRect().width;
    divSize.height = div.getBoundingClientRect().height;
}

function replace() {
    for (var i = 0; i < olders.length; i++) {
        olders[i].remove();
    }
    olders = stars;
    stars = [];
    starCount = Math.floor(Math.random() * starCountValue + starCountMin);
    for (var i = 0; i < starCount; i++) {
        stars.push(document.createElement("div"));
        stars[i].style.top = Math.floor(Math.random() * divSize.height) - 20 + "px";
        stars[i].style.left = Math.floor(Math.random() * divSize.width) - 20 + "px";
        stars[i].showTime = Math.floor(Math.random() * cycleCountValue)
        stars[i].style.visibility = "hidden";
        div.appendChild(stars[i]);
        console.log(stars[i].style.top);
    }
}

function flashStar() {
    for (var i = 0; i < stars.length; i++) {
        if (stars[i].showTime == loopCount) {
            stars[i].classList.add("flash");
        }
    }
}



requestAnimationFrame(loop);