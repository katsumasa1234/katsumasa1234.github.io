let cycleCountValue = 1000;
let starCountMin = 10;
let starCountValue = 10;
let maxFireWorkCount = 3;
let fireTipsMin = 20;
let fireTipsValue = 10;
let fireTipsSpeedValue = 300;

let div = document.getElementById("firework_background");
let divSize = {};

let loopCount = cycleCountValue;
let starCount = 0;
let stars = [];
let olders = [];
let fireworks = [];

div.addEventListener("click",clickDiv);

function loop() {
    getSize();
    flashStar();
    flashFirework();

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
    let i;
    for (i = 0; i < olders.length; i++) {
        olders[i].remove();
    }
    olders = stars;
    stars = [];
    starCount = Math.floor(Math.random() * starCountValue + starCountMin);
    for (i = 0; i < starCount; i++) {
        stars.push(document.createElement("div"));
        stars[i].style.top = Math.floor(Math.random() * divSize.height) - 20 + "px";
        stars[i].style.left = Math.floor(Math.random() * divSize.width) - 20 + "px";
        stars[i].showTime = Math.floor(Math.random() * cycleCountValue)
        stars[i].classList.add("star");
        stars[i].style.visibility = "hidden";
        div.appendChild(stars[i]);
    }
}

function flashStar() {
    for (var i = 0; i < stars.length; i++) {
        if (stars[i].showTime === loopCount) {
            stars[i].classList.add("flash");
        }
    }
}

function clickDiv(event) {
    if (fireworks.length >= maxFireWorkCount) return;
    var firework = document.createElement("div");
    var fireTipCount = Math.floor(Math.random() * fireTipsValue) + fireTipsMin;

    firework.tips = [];
    var color = Math.floor(Math.random() * 360);

    for (var i = 0; i < fireTipCount; i++) {
        var tip = document.createElement("div");
        tip.classList.add("tip");
        tip.style.filter = "hue-rotate(" + (color + Math.floor(Math.random() * 80)) + "deg)";
        tip.vector = Math.floor(Math.random() * 360);
        tip.speed = Math.floor(Math.random() * fireTipsSpeedValue);
        tip.style.top = "0px";
        tip.style.left = "0px";

        firework.tips.push(tip);
        firework.appendChild(tip);
    }

    firework.style.top = event.pageY + "px";
    firework.style.left = event.pageX + "px";
    firework.classList.add("firework");

    div.appendChild(firework);
    fireworks.push(firework);
}

function flashFirework() {
    for (var i = 0; i < fireworks.length; i++) {
        var count = 0;
        for (var j = 0; j < fireworks[i].tips.length; j++) {
            var vector = fireworks[i].tips[j].vector;
            var speed = fireworks[i].tips[j].speed;
            var time = fireworks[i].tips[j].time;
            var top =  parseFloat(fireworks[i].tips[j].style.top.replace("px",""));
            var left = parseFloat(fireworks[i].tips[j].style.left.replace("px", ""));
            
            fireworks[i].tips[j].style.top = top + Math.sin(Math.PI / 180 * vector) * speed * 0.005 + "px";
            fireworks[i].tips[j].style.left = left + Math.cos(Math.PI / 180 * vector) * speed * 0.005 + "px";

            fireworks[i].tips[j].speed--;
            
            if (speed < 0) {
                fireworks[i].tips[j].style.display = "none";
                count ++;
            }
        }
        if (count === fireworks[i].tips.length) {
            fireworks[i].remove();
            fireworks.splice(i,1);
        }
    }
}

function settingChange() {
    cycleCountValue = parseInt(document.getElementById("cycle").value);
    starCountMin = parseInt(document.getElementById("starMin").value);
    starCountValue = parseInt(document.getElementById("starValue").value);
    maxFireWorkCount = parseInt(document.getElementById("fireworkCount").value);
    fireTipsMin = parseInt(document.getElementById("fireTipMin").value);
    fireTipsValue = parseInt(document.getElementById("fireTipValue").value);
    fireTipsSpeedValue = parseInt(document.getElementById("fireTipSpeedValue").value);
}



requestAnimationFrame(loop);