"use strict";

let number = Math.trunc(Math.random() * 20) + 1;
//console.log(number);
let score = 20;
let highscore = 0;

const $ = function (value) {
  return document.querySelector(value);
};

const set = function (selector, property, value) {
  return ($(selector)[property] = value);
};

const updateScore = function () {
  return set(".score", "textContent", score);
};
const updateHighScore = function () {
  if (score > highscore) highscore = score;
  return set(".highscore", "textContent", highscore);
};

updateScore();

$(".check").addEventListener("click", function () {
  const guess = Number($(".guess").value);

  if (!guess) {
    set(".message", "textContent", "🚫 No number!");
    $("body").style.backgroundColor = "#ff0000";
    set(".number", "textContent", "X");
    return;
  }

  if (score > 1) {
    $("body").style.backgroundColor = "#222";
    if (guess === number) {
      set(".message", "textContent", "🎉 Correct Number!");
      $("body").style.backgroundColor = "#60b347";
      $(".number").style.width = "30rem";
      set(".number", "textContent", number);
      set(".check", "disabled", true);
      $(".check").style.opacity = "0.5";
      updateHighScore();
    } else {
      score--;
      updateScore();
      set(
        ".message",
        "textContent",
        guess > number ? "📈 Too high!" : "📉 Too low!"
      );
      $("body").style.backgroundColor = "#ff0000";
    }
  } else {
    set(".message", "textContent", "😢 You lose");
    set(".score", "textContent", 0);
    $(".check").style.opacity = "0.5";
    set(".check", "disabled", true);
    $("body").style.backgroundColor = "#ff0000";
    set(".guess", "disabled", true);
  }
});

$(".guess").addEventListener("input", function () {
  let number = $(".guess").value;
  number = number.replace(/\D/g, "");

  if (number.length > 2) {
    number = number.slice(0, 2);
  }

  if (number !== "" && (number < 1 || number > 20)) {
    number = number.slice(0, -1);
  }

  set(".guess", "value", number);
});

$(".again").addEventListener("click", function () {
  number = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  updateScore();
  set(".message", "textContent", "Start guessing...");
  $("body").style.backgroundColor = "#222";
  $(".number").style.width = "15rem";
  set(".number", "textContent", "?");
  set(".guess", "value", "");
  set(".guess", "disabled", false);
  set(".check", "disabled", false);
  $(".check").style.opacity = "1";
  $(".btn").style.backgroundColor = "#eee";
});
