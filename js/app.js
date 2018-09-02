let cardList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
// Shuffle function from http://stackoverflow.com/a/2450976
$(".endgame").hide();
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
cardList = shuffle(cardList);
let cards = document.getElementsByClassName("icon");
let openCardsId = [];
let openCards = [];
let clicked = [];//array of card id's that matched
let t;//points to previously clicked card
let g;//points to currently clicked card
let countmoves = 0;
let flag = 0;
let iD;
let timetaken;
for (let i = 0; i < cards.length; i++) {
    $(cards[i]).addClass(cardList[i]);
}
var startTime = new Date().getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = now - startTime;

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    $(document.getElementsByClassName("timer")).html(hours + ": " + minutes + ": " + seconds);
    timetaken = hours + ": " + minutes + ": " + seconds;
}, 1000);
function checkIfOpen(card) {
    if (openCards.length === 0) {
        const fontType = document.getElementById($(card).attr("id")).getElementsByClassName("icon");
        openCards.push($(fontType).attr("class"));
        openCardsId.push(($(card).attr("id")));
        return 1;
    }
    return 0;
}

function updateStar() {
    if (countmoves >= 20 && flag == 0) {
        flag = 1;
        const h = document.getElementById("third");
        $(h).toggleClass("fa fa-star");
        $(h).toggleClass("fa fa-star-o");
    }
    else if (countmoves >= 30 && flag == 1) {
        flag = 2;
        const h = document.getElementById("second");
        $(h).toggleClass("fa fa-star");
        $(h).toggleClass("fa fa-star-o");
    }
}

function checkIfEqual(card) {
    const fontType = document.getElementById($(card).attr("id")).getElementsByClassName("icon");
    if ($(fontType).attr("class") === openCards[0])
        return 1;
    return 0;
}

function gameover() {
    $(".container").hide();
    $("#score").html("score " + countmoves);
    $("#Time").html("Time Taken " + timetaken);
    $(".endgame").show();
}

function restart() {
    startTime = new Date().getTime();
    for (let i = 0; i < clicked.length; i++) {
        let card = document.getElementById(clicked[i]);
        $(card).toggleClass("match");
        $(card).toggleClass("shake");
        $(card).toggleClass("show");
        $(card).toggleClass("open");
    }
    let open = (document.getElementById(iD));
    if (!clicked.includes(iD) && !(open === null) && $(open).attr("class").includes("open")) {
        $(open).toggleClass("show");
        $(open).toggleClass("open");
    }
    clicked = [];
    openCards = [];
    openCardsId = [];
    flag = 0;
    countmoves = 0;
    let list = [];
    let s1 = $("#third");
    let s2 = $("#second")
    $(".moves").html(countmoves);
    if (s1.attr("class").includes("fa fa-star-o")) {
        s1.toggleClass("fa fa-star-o fa fa-star");
    }
    if (s2.attr("class").includes("fa fa-star-o")) {
        s2.toggleClass("fa fa-star-o fa fa-star");
    }

}

function newgame() {
    $(".endgame").hide();
    restart();
    cards = document.getElementsByClassName("icon");
    for (let i = 0; i < cards.length; i++) {
        $(cards[i]).removeClass(cardList[i]);
    }
    cards = document.getElementsByClassName("icon");
    cardList = shuffle(cardList);
    for (let i = 0; i < cards.length; i++) {
        $(cards[i]).addClass(cardList[i]);
    }
    $(".container").show();
}
function updateMoves() {
    countmoves++;
}
$(".card").on("click", function () {
    iD = $(this).attr("id");

    if (openCardsId[0] != iD && (clicked.length == 0 || !(clicked.includes(iD)))) {
        updateMoves();
        updateStar();
        $(".moves").html(countmoves);
        const check = checkIfOpen(this);
        g = this;
        $(this).toggleClass("open");
        $(this).toggleClass("show");
        if (check === 0) {
            let x = checkIfEqual(this);
            if (iD == openCardsId[0])
                x = 0;
            if (x === 0) {
                t = document.getElementById(openCardsId[0]);
                setTimeout(function () {
                    $(g).toggleClass("open");
                    $(t).toggleClass("open");
                    $(g).toggleClass("mismatch");
                    $(t).toggleClass("mismatch");
                    $(g).toggleClass("shake");
                    $(t).toggleClass("shake");
                }, 5);
                setTimeout(function () {
                    $(g).toggleClass("show");
                    $(t).toggleClass("show");
                    $(g).toggleClass("mismatch");
                    $(t).toggleClass("mismatch");
                    $(g).toggleClass("shake");
                    $(t).toggleClass("shake");
                }, 200);
                openCards.pop();
                openCardsId.pop();
            }
            else {
                clicked.push(openCardsId[0]);
                clicked.push(iD);
                t = document.getElementById(openCardsId[0]);
                $(t).toggleClass("match");
                $(this).toggleClass("match");
                $(g).toggleClass("shake");
                $(t).toggleClass("shake");
                openCards.pop();
                openCardsId.pop();
            }
        }
    }
    if (clicked.length == 16) {
        setTimeout(function () {
            gameover();
        }, 200);
    }
});

$(".restart").on("click", function () {
    restart();

});

$(".newGame").on("click", function () {
    newgame();
});
