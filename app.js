

let index, currDisplay;
let equationArr = [];
const screen = document.getElementById("Calculator__display");


////Get button inputs


const getValue = (num) => {

    //Get value of button
    let buttonVal = num.innerHTML;
    ///Pass value to equation array
    equationArr.push(buttonVal);
    
    console.log("array:" + equationArr); 

    ///Pass array to display
    screen.innerHTML = equationArr.join("");
    
};



///Clear current equation 

const clearEquation = () => {

    equationArr = [];
    screen.innerHTML = equationArr;
}


///Negate / Invert

/*
const invertNum = () => {

    if()
}*/


////Run users equation 

const equals = () => {

    ///Run equation array as mathematical function 
    let result = Function("return " + equationArr.join(""))();  ////Important to have () at the end as it executes it as a function (rather than printing the function)
    ///Set equation array to result
    equationArr = [result];
    ///Pass result to screen
    screen.innerHTML = result;
    console.log(result);
}






