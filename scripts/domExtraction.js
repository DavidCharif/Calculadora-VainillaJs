//Query selectors
let number = document.querySelectorAll(".number");
let btnGroup = document.querySelectorAll(".btn");
let operators = document.querySelectorAll(".operator");
let del = document.querySelector(".del");
let reset = document.querySelector(".reset");
let equal = document.querySelector(".equal");
let floatPoint = document.querySelector(".punto");
let input = document.querySelector("#input");
let clicked = false;
//Inicializacion Global variables
//string
let operador = "";
let string = "";
//int
let firstValue = 0;
/* let secondValue = 0; */
//bool
/* let resultPress = false; */

//Add event listener to numbers
number.forEach((element) => {
  element.addEventListener("click", (e) => {
    /* if ((resultPress)) {
      input.value = "";
      resultPress = false;
    } else { */
    let inputNumber = element.getAttribute("data-value");
    input.value += inputNumber;
  });
});
/* }) */ operators.forEach((signo) => {
  signo.addEventListener("click", (e) => {
    clicked = true;
    console.log(`clicked`, clicked);

    let data = signo.getAttribute("data-value");
    switch (data) {
      case "1":
        operador = " + ";
        break;
      case "2":
        operador = " - ";
        break;
      case "3":
        operador = " * ";
        break;
      case "4":
        operador = " / ";
        break;
    }
 /*    if (string.length == 0) {
      string += "0 " + operador;
    } else {
      string += operador;
    } */

    loadToString(clicked);
  });
});

const loadToString = (bool) => {
  let value = input.value;
  console.log("value", value);
  firstValue = parseFloat(value.replace(/[^0-9-.]/g, ""));
  /* parseFloat(value.replace(/[^0-9-.]/g, "")); */
  console.log("first value", firstValue);
  string += `${firstValue}`;
  if(bool){
    string += `${operador}`
  }
  
  console.log("string desde clicked", string);
  firstValue = 0;
  input.value = "";
  bool = false;
};

/* 
   if(secondValue !== 0){
      string = `${firstValue} ${operador} ${secondValue}`
   }
    console.log("firstVAlue", firstValue);
 */

const operacion = (str) => {
  x = eval(str);
  console.log("eval(str", eval(str));
  return x;
};

equal.addEventListener("click", (e) => {
  /*   console.log("clicked fuera de los operadores" ,  clicked); */
  /*   secondValue = parseFloat(input.value);
  console.log("secondValue", secondValue);
 
  let resultado = eval(`${firstValue} ${operador} ${secondValue}`); */
  loadToString(false)
  console.log("string", string);

  resultado = operacion(string);
  string = "";

  console.log("Resultado", resultado);

  resultado = resultado.toLocaleString();
  input.value = resultado;
});

del.addEventListener("click", (e) => {
  input.value = "";
});
reset.addEventListener("click", (e) => {
  firstValue = 0;
  /* secondValue = 0; */
  input.value = "";
  string = ""
});
floatPoint.addEventListener("click", (e) => {
  console.log("punto");
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
