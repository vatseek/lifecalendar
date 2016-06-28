var element = document.getElementById('canvas');
var width = element.offsetWidth;
var height = window.innerHeight;
var renderer = PIXI.autoDetectRenderer(width, height);
renderer.backgroundColor = 0xFFFFFF;
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var graphics = new PIXI.Graphics();
var startOffset = 30;
var endOffset = 30;
var offsetX = startOffset;
var offsetY = startOffset;
var incX = 13;
var incY = 15;
var xSize = 10;
var ySize = 12;

function drawRect(x, y, color, newYear) {
    graphics.beginFill(color);
    graphics.lineStyle(1, 0x99aa99);
    if (newYear) {
        graphics.lineStyle(1, 0x666666  );
    }
    graphics.drawRect(x, y, xSize, ySize);
    stage.addChild(graphics);
}

function getCurrentWeekColor(dayOfWeek) {
    switch (dayOfWeek) {
        case 1:
            return 0xaa33aa;
        case 2:
            return 0xaa99aa;
        case 3:
            return 0xbb33bb;
        case 4:
            return 0xbb99bb;
        case 5:
            return 0xcc33cc;
        case 6:
            return 0xcc99cc;
        default:
            return 0xdd33dd;
    }
}

function drawCalendar(date, long) {
    var birthday = date;
    var current = moment();
    for (var i = 0; i < (53 * long); i++) {
        var week = date.week();
        var isNewYear = false;
        if (week == 1) {
            isNewYear = true;
        }
        if (birthday.isSame(current, 'week')) {
            drawRect(offsetX, offsetY, getCurrentWeekColor(date.weekday()), isNewYear);
        } else if (date.isBefore(current)) {
            drawRect(offsetX, offsetY, 0x99cc99, isNewYear);
        } else {
            drawRect(offsetX, offsetY, 0xdddddd, isNewYear);
        }

        offsetX += incX;
        if ((offsetX + endOffset) > width) {
            offsetX = startOffset;
            offsetY += incY;
        }
        date.add(7, 'day');
    }
}

var init = function (settings) {
    drawCalendar(settings.birthday, settings.age_long);
    renderer.render(stage);
};

//window.addEventListener('resize', resizeCanvas, false);
//function resizeCanvas() {
//    width = window.innerWidth;
//    height = window.innerHeight;



window.onload = function() {
    init({
        birthday: moment({y:1985, M:5, d:26}),
        age_long: 80,
        health_life_style: true,
        country: 'Ukraine'
    });
};

//
//chrome.storage.sync.get({
//    age_timestamp: 0,
//    age_long: 80,
//    health_life_style: true,
//    country: 'Ukraine'
//}, function(settings) {
//    init(settings);
//});