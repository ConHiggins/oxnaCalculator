

let index, currDisplay;
let equationArr = [];
const screen = document.getElementById("Calculator__display");
//const operators = ["+", "-", "*", "/", "%"];

let containsOperator = false;

const screenWidth = 9;

////Get button inputs /////////////////////////////////////////////////////////////



const boolOperator = () => {

    containsOperator = true;
}

const operatorCheck = (num) => {

    ///Reset to result to allow further inputs

    if((num.classList.contains("Calculator__operator")) 
    //&& (containsOperator == true)) 
    ){

        return equals();
    }
    else {return;}

}


const getValue = (num) => {

    //Get value of button
    let buttonVal = num.innerHTML;
    //Clear zero
    if(equationArr[0] == 0) { equationArr = [];}

    operatorCheck(num);

    ////Check length & return /do nothing if number too long    
    if(equationArr.length < screenWidth) {

        
        

        ///Pass value to equation array
        equationArr.push(buttonVal);
        
        console.log("array:" + equationArr); 

        ///Pass array to display
        return screen.innerHTML = equationArr.join("");
    }
    else {return;}
            
};



///Clear current equation //////////////////////////////////////////////////////////

const clearEquation = () => {

    equationArr = [];
    screen.innerHTML = equationArr;
}


///Negate / Invert //////////////////////////////////////////////////////////////////


// const invertNum = (num) => {

//     ///Check for operators 

//     //const reg = /((+)|(-)|(\/)|(*))/ ;
//     //let containsOperator = reg.test(equationArr);

//     let reg1 = /+/;
//     let reg2 = /-/;
//     let reg3 = /\//;
//     let reg4 = /\*/;

//     let fullCheck = (reg1 && reg2 && reg3 && reg4);

//     ///Get value on screen

//     if(!fullCheck) {

//         return num *= -1;
//     }
//     else {return;}
// }

////Check decimals function

const checkDecimal = (num) => {

    if(Number.isInteger(num)) {

        return 1;
    }
    else {


        return num.toString().split(".")[0].length;
    }
}


////Run users equation ////////////////////////////////////////////////////////////////////

const equals = () => {

    ///Clear if equation starts with operator other than + or -
    if((equationArr[0] == "/")
    || (equationArr[0] == "*") 
    || (equationArr[0] == "%")) {

        return clearEquation();
    }

    else {

            ///Run equation array as mathematical function 
            let result = Function("return " + equationArr.join(""))();  ////Important to have () at the end as it executes it as a function (rather than printing the function)

            ///var for remaining space 
            let decimalSpace = 0;

            if(Number.isInteger(result) == false) {
                    
                    decimalSpace = screenWidth - checkDecimal(result);
                    console.log(decimalSpace);
                }   

            ///Set equation array to result
            equationArr = [result.toFixed(decimalSpace)];
            
            ///Pass result to screen
            screen.innerHTML = equationArr[equationArr.length-1];

            
            //Reset operator bool
            containsOperator = false;
            console.log(result);
    }
}






