$(document).ready(init);

let operation = "";

function init() {
  $("#js-btn-add").on("click", clickAdd);
  $("#js-btn-sub").on("click", clickSub);
  $("#js-btn-mul").on("click", clickMul);
  $("#js-btn-div").on("click", clickDiv);
  $("#js-btn-equals").on("click", clickEquals);
  $("#js-btn-clear").on("click", clickClear);

  getEquations();
}

function clickAdd() {
  operation = "add";
}

function clickSub() {
  operation = "sub";
}

function clickMul() {
  operation = "mul";
}

function clickDiv() {
  operation = "div";
}

function clickEquals() {
  const dataForServer = {
    num1: $("#js-input-num1").val(),
    num2: $("#js-input-num2").val(),
    operation: operation,
  };
  postEquation(dataForServer);
}

function postEquation(dataForServer) {
  $.ajax({
    type: "POST",
    url: "/math",
    data: dataForServer,
  })
    .then(response => {
      console.log(response);
      getEquations();
    })
    .catch(err => {
      console.warn(err);
    });
}

function getEquations() {
  $.ajax({
    type: "GET",
    url: "/math",
  })
    .then(response => {
      console.log(response);
      render(response);
    })
    .catch(err => {
      console.warn(err);
    });
}

function render(equationArray) {
  $(".js-answer").empty();
  $(".js-answer").append(`
        <h4>${equationArray[equationArray.length - 1].answer}</h4>
    `);

  let equationSymbol = "";

  $(".js-history").empty();
  for (let equation of equationArray) {
    if (equation.operation === "add") {
      equationSymbol = "+";
    } else if (equation.operation === "sub") {
      equationSymbol = "-";
    } else if (equation.operation === "mul") {
      equationSymbol = "*";
    } else if (equation.operation === "div") {
      equationSymbol = "/";
    }

    $(".js-history").append(`
        <p>${equation.num1} ${equationSymbol} ${equation.num2} = ${equation.answer}</p>
    `);
  }
}

function clickClear() {
  $("#js-input-num1").val("");
  $("#js-input-num2").val("");
  operation = "";
}
