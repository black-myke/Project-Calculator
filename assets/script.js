document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = Array.from(document.getElementsByClassName("btn"));
  let currentInput = "";
  let operator = null;
  let previousInput = "";
  let lastActionWasEval = false;

  buttons.map((button) => {
    button.addEventListener("click", function (e) {
      const value = e.target.getAttribute("data-num");
      const op = e.target.getAttribute("data-op");

      if (lastActionWasEval && value) {
        currentInput = "";
        lastActionWasEval = false;
      }

      if (value) {
        currentInput += value;
        display.value = currentInput;
      } else if (op) {
        if (op === "." && !currentInput.includes(".")) {
          currentInput += ".";
        } else if (["+", "-", "*", "/", "%"].includes(op)) {
          if (currentInput === "") return;
          operator = op;
          previousInput = currentInput;
          currentInput = "";
        }
        display.value = currentInput;
      }
    });
  });

  document.getElementById("clear").addEventListener("click", function () {
    currentInput = "";
    previousInput = "";
    operator = null;
    display.value = "";
    lastActionWasEval = false;
  });

  document.getElementById("clear-entry").addEventListener("click", function () {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  });

  document.getElementById("equals").addEventListener("click", function () {
    if (operator && previousInput !== "" && currentInput !== "") {
      currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
      display.value = currentInput;
      previousInput = "";
      operator = null;
      lastActionWasEval = true;
    }
  });
});
