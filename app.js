

let index, currDisplay;
let equationArr = [];
const screen = document.getElementById("Calculator__display");
//const operators = ["+", "-", "*", "/", "%"];

let containsOperator = false;

const screenWidth = 9;

//// Operator boolean /////////////////////////////////////////////////////////////



const boolOperator = () => {

    containsOperator = true;
    
}


////Check for operator //////////////////////////////////////////////

const operatorCheck = (num) => {

    ///Reset to result to allow further inputs

    if((num.classList.contains("Calculator__operator")) 
    //&& (containsOperator == true)) 
    ){

        return equals();
    }
    else {return;}

}

////Highlight operator button /////////////////

const highlightOperator = (btn) => {

    ///Check if most recent press is an operator 
    if(boolOperator == true 
        && Number(equationArr[equationArr.length-1]) == NaN) {

            ////remove operator from display

            screen.innerHTML = equationArr[equationArr.length-2];

            ///Highlight button 
            btn.classList.add("current")
        }
    else return;
}

///Negate / Invert //////////////////////////////////////////////////////////////////


const invertNum = (num) => {

        return Number(num * -1);
    
}



//////Total/literal array length/////////////////////////////////////////////////////

const totalArrLength = (arr) => {


    let total = 0;
    arr.forEach((item) => {

        total += item.toString().length;

    })

    return Number(total);
}

///////////Get value of button ///////////////////////////////////////////////////

const getValue = (num) => {

    //Get value of button
    let buttonVal = num.innerHTML;
    //Clear zero
    if(equationArr[0] == 0) { equationArr = [];}

////////////////////////////
    operatorCheck(num);
    highlightOperator(num);
////////////////////////////////////
///////////////////////////////////
    if(buttonVal == "+/-") {

        equals();
        console.log(Number(equationArr[equationArr.length-1]));
        let negNum = Number(invertNum(equationArr[equationArr.length-1]));
        
        ///Remove "+/-" from array
        buttonVal = null;
        ///Set recent number to inversion
        equationArr[equationArr.length-1] = negNum;
        
    }
    ///////////////////////////////////////

    let totalLength = totalArrLength(equationArr);

    ////Check length & return /do nothing if number too long    
    if((equationArr.length < screenWidth)
      && (totalLength < screenWidth)) {
        ///Pass value to equation array
        equationArr.push(buttonVal);
        console.log("array:" + equationArr); 

        ///Pass array to display
        
        return screen.innerHTML = equationArr.join(""); 
        
        
    }
    else {return equals();}
    
            
};



///Clear current equation //////////////////////////////////////////////////////////

const clearEquation = () => {

    equationArr = [];
    screen.innerHTML = equationArr;
}




////Check decimals function///////////////////////////////////////////////////////////////

const checkDecimal = (num) => {

    if(Number.isInteger(num)) {

        return 1;
    }
    else {


        return num.toString().split(".")[0].length;
    }
}



//////Check exponentials ////////////////////////////////////////////////////////////////


const checkNumLength = (num) => {

    if(num.toString.length() > (screenWidth-1)) {

        return num = num.toExponential(4);
    }

    else {return;}
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

            //checkNumLength(result);


            ///var for remaining space 
            let decimalSpace = 0;

            if(Number.isInteger(result) == false) {
                    
                    decimalSpace = screenWidth - checkDecimal(result);
                    //console.log(decimalSpace);
                }   

            
            ///Set equation array to result
            equationArr = [result.toFixed(decimalSpace)];
            
            ///Pass result to screen
            screen.innerHTML = equationArr[equationArr.length-1];

            
            //Reset operator bool
            containsOperator = false;
            //console.log(result);
    }
}





