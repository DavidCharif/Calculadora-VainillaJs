//Query selectors
let number = document.querySelectorAll(".number");
let btnGroup = document.querySelectorAll(".btn");
let operators = document.querySelectorAll(".operator");
let del = document.querySelector(".del");
let reset = document.querySelector(".reset");
let equal = document.querySelector(".equal");
let floatPoint = document.querySelector(".punto");
let input = document.querySelector("#input");

//Inicializacion Global variables
//string
let operador = "";
//int
let firstValue = 0;
let secondValue = 0;
//bool
let resultPress = false;




//Add event listener to numbers
number.forEach((element) => {
  element.addEventListener("click", (e) => {
    if ((resultPress)) {
      input.value = "";
      resultPress = false;
    } else {
      let inputNumber = element.getAttribute("data-value");
      input.value += inputNumber;
    }
  });
});

operators.forEach((signo) => {
  signo.addEventListener("click", (e) => {
    let data = signo.getAttribute("data-value");
    switch (data) {
      case "1":
        operador = "+";
        break;
      case "2":
        operador = "-";
        break;
      case "3":
        operador = "*";
        break;
      case "4":
        operador = "/";
        break;
    }
    
    if (firstValue == 0) {
      let value = input.value;
      firstValue = parseFloat(value.replace(/[^0-9-.]/g, ""));
      input.value = "";
    }
    console.log("firstVAlue", firstValue);
    
  });
});

equal.addEventListener("click", (e) => {
  secondValue = parseFloat(input.value);
  console.log("secondValue", secondValue);

  let resultado = eval(`${firstValue} ${operador} ${secondValue}`);

  console.log("Resultado", resultado);

  resultado = resultado.toLocaleString();
  input.value = resultado;
  firstValue = 0;
  resultPress = true;
});

del.addEventListener("click", (e) => {
  input.value = "";
});
reset.addEventListener("click", (e) => {
  firstValue = 0;
  secondValue = 0;
  input.value = "";
});
floatPoint.addEventListener("click", (e) => {
  if (!input.value.includes(".")) {
    input.value += ".";
  }
});

const setBackground = () => {
 
  if (localStorage.getItem("config") === null) {
    setTheme("theme-one", 1);
  } else {
    let config = localStorage.getItem("config");
    config = JSON.parse(config);
    /* console.log("config", config); */
    let { theme, id } = config;
    /* console.log("themeName,id", theme, id); */
    setTheme(theme, id);
  }
};

function setTheme(themeName, id) {
  let config = {
    theme: themeName,
    id: id,
  };
  let option1 = document.getElementById("option1");
  let option2 = document.getElementById("option2");
  let option3 = document.getElementById("option3");
  switch (id) {
    case 1:
      option1.checked = true;
      break;
    case 2:
      option2.checked = true;
      break;
    case 3:
      option3.checked = true;
      break;
  }
  /* console.log("localStorage", localStorage); */
  localStorage.setItem("config", JSON.stringify(config));
  document.documentElement.className = themeName;
}

btnGroup.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    let num = e.target.value;

    switch (num) {
      case "0":
        setTheme("theme-one", 1);
        break;
      case "1":
        setTheme("theme-two", 2);
        break;
      case "2":
        setTheme("theme-three", 3);
        break;
    }
  });
});

document.onload = setBackground();
