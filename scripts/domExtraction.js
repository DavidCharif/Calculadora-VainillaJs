let number = document.querySelectorAll(".number");
let del = document.querySelector(".del")
let reset = document.querySelector(".reset")
let equal = document.querySelector(".equal")
let operators = document.querySelectorAll(".operator");
let operador = "";
let input = document.querySelector("#input")
let firstValue = 0;
let secondValue = 0;
let btnGroup = document.querySelectorAll(".btn")

number.forEach((element ) =>{
    
    element.addEventListener("click",e => {      
           
        let inputNumber =   element.getAttribute("data-value")
            input.value +=  inputNumber     
            
            
        })
    })

operators.forEach((signo) => {
    signo.addEventListener("click", e=> {
        let data = signo.getAttribute("data-value")
        switch(data){
            case "1" : 
                operador = "+"; 
                break;
            case "2" : 
                operador = "-";
                break;
            case "3" :
                operador = "*"
                break;
            case "4" :
                operador = "/"
                break;
            
        }
        console.log(operador);
        if (firstValue == 0){
            firstValue = parseInt(input.value)
            input.value = "";
        }          
                   
    })
})

equal.addEventListener("click",(e) => {
   secondValue = parseInt(input.value)
    let resultado = eval(`${firstValue} ${operador} ${secondValue}`)
    console.log("Resultado", resultado)
    resultado = resultado.toLocaleString()
    input.value = resultado;
    firstValue = 0;
    secondValue = 0;
})

del.addEventListener("click" , (e) => {
    input.value = "";
    
})
reset.addEventListener("click" , (e) => {
    firstValue = 0;
    secondValue = 0;
    input.value = "";
})

const setBackground = () => {
    console.log(localStorage)
    if(localStorage.getItem("config") === null){
        setTheme("theme-one", 1) 
    } else {
        
       let config = localStorage.getItem('config');
       config = JSON.parse(config)
       console.log('config', config);
       let {theme,id} = config;
       console.log('themeName,id', theme,id);
       setTheme(theme,id)
    }
}

function setTheme(themeName,id) {
    
    let config = {
        "theme": themeName,
        "id":id,
    }
    let option1 = document.getElementById("option1")
    let option2 = document.getElementById("option2")
    let option3 = document.getElementById("option3")
    switch(id){
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
    console.log('localStorage', localStorage);
    localStorage.setItem('config', JSON.stringify(config));
    document.documentElement.className = themeName;
}

btnGroup.forEach((ele) => {
    ele.addEventListener("click" , e => {
        let num = e.target.value;
        
        switch(num){
            case "0":
                setTheme("theme-one",1);
                break;
            case "1":
                setTheme("theme-two",2);
                break;
            case "2":
                setTheme("theme-three",3);
                break;
        }
    })
})





document.onload = setBackground();