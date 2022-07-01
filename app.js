


let equationArr = [];
const screen = document.getElementById("Calculator__display");


let containsOperator = false;

const screenWidth = 9;

let operators = ["+","-","/","*","%"];

//// Operator boolean /////////////////////////////////////////////////////////////


const boolOperator = () => {

    containsOperator = true;
    
}

////Highlight operator button /////////////////

const highlightOperator = (btn) => {

    ///Check if most recent press is an operator 
    if(isNaN(Number(equationArr[equationArr.length-1]))) {

            console.log("operator");
            ////remove operator from display

            screen.innerHTML = equationArr.slice(0,equationArr.length-1).join("");

            ///Highlight button 
            return btn.classList.add("current");
        }
    else return;
}

///// Reset operator buttons to inactive ////

const resetButtons = () => {

    const activeButtons = document.getElementsByClassName("current");
    

    console.log(activeButtons);
    for(i=0; i<activeButtons.length; i++) {

        console.log("removed");

        activeButtons[i].classList.remove("current");
        
    };

}

////Check for operator //////////////////////////////////////////////

const operatorCheck = (num) => {

    ///Reset to result to allow further inputs

    if((num.classList.contains("Calculator__operator")) 
    
    ){
        highlightOperator(num);
        
        return equals();
    }
    else {return;}

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

//////Check exponentials ////////////////////////////////////////////////////////////////


const checkNumLength = (num) => {

    if(num.toString.length > (screenWidth-1)) {

        return num = num.toExponential(4);
    }

    else {return;}
} 

///////////Get value of button ///////////////////////////////////////////////////

const getValue = (num) => { 

    //Get value of button
    let buttonVal = num.innerHTML;
    //Clear zero
    if(equationArr[0] == 0) { equationArr = [];}

    

        checkNumLength(buttonVal);
    
    

    if(buttonVal == "+/-") {

        ///Reduce array to single number 
        equals();
        ////Get inversion
        let negNum = Number(invertNum(equationArr[equationArr.length-1]));
        ///Remove "+/-" from array
        buttonVal = null;
        ///Set recent number to inversion
        equationArr[equationArr.length-1] = negNum;
        
    }

    ////Check length & return /do nothing if number too long   
    let totalLength = totalArrLength(equationArr); 

    if((equationArr.length < screenWidth)
      && (totalLength < screenWidth)) {
        

            ///Pass value to equation array
            equationArr.push(buttonVal);
            console.log("array:" + equationArr); 

            

            ///Pass array to display

            let opIndex = 0;

            
            for(i=0; i<equationArr.length; i++) {

                if(operators.includes(equationArr[i])) {
                    opIndex = i;
                }
            }
            

            screen.innerHTML = equationArr.slice(opIndex).join(""); 
            //Operators
            return operatorCheck(num);
        
        
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





////Run users equation ////////////////////////////////////////////////////////////////////

const equals = () => {

    ///Clear if equation starts with operator other than + or -
    if((equationArr[0] == "/")
    || (equationArr[0] == "*") 
    || (equationArr[0] == "%")) {

        resetButtons();
        return clearEquation();
    }

    else {
        if(!isNaN(equationArr[equationArr.length-1]))
            { resetButtons(); }

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





