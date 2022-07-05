


let equationArr = [];
const screen = document.getElementById("Calculator__display");


let containsOperator = false;

const screenWidth = 9;

let currLength = 0;

const operators = ["+","-","/","*","%"];


///// Palette cycle //////////////////////////////////////////////////////////////

const palettes = ["Calculator_red", "Calculator_blue"];
const buttonPalettes = ["Calculator__button_red", "Calculator__button_blue"];
const displayPalettes = ["Calculator__display_red", "Calculator__display_blue"];
const bodyPalettes = ["body_red", "body_blue"];

const switchPalette = () => {


    const calc = document.querySelector(".Calculator");
    const btn = document.querySelectorAll(".Calculator__button");
    const buttonsArray = Array.from(btn);
    const dis = document.querySelector(".Calculator__display");    
    const bod = document.querySelector("body");


    ///Background
    const activeBodPalette = bodyPalettes.findIndex((bp) => bod.classList.contains(bp));
    const nextBodPalette = (activeBodPalette + 1) % bodyPalettes.length;    

    bod.classList.remove(bodyPalettes[activeBodPalette]);
    bod.classList.add(bodyPalettes[nextBodPalette]);


    ////Calc background
    const activePalette = palettes.findIndex((p) => calc.classList.contains(p));
    const nextPalette = (activePalette + 1) % palettes.length;    

    calc.classList.remove(palettes[activePalette]);
    calc.classList.add(palettes[nextPalette]);


    ///Calc display
    const activeDisPalette = displayPalettes.findIndex((dp) => dis.classList.contains(dp));
    const nextDisPalette = (activeDisPalette + 1) % displayPalettes.length;    

    dis.classList.remove(displayPalettes[activeDisPalette]);
    dis.classList.add(displayPalettes[nextDisPalette]);

    
    ///Calc buttons
    for(i=0; i<buttonsArray.length; i++) {

        const activeBtnPalette = buttonPalettes.findIndex((bp) => buttonsArray[i].classList.contains(bp));
        const nextBtnPalette = (activeBtnPalette + 1) % buttonPalettes.length;

        buttonsArray[i].classList.remove(buttonPalettes[activeBtnPalette]);
        buttonsArray[i].classList.add(buttonPalettes[nextBtnPalette]);
        
    
    }
    


}

//// Operator boolean /////////////////////////////////////////////////////////////


const boolOperator = () => {

    containsOperator = true;
    
}

////Highlight operator button //////////////////////////////////////////////////////

const highlightOperator = (btn) => {

    

            console.log("operator");
            ////remove operator from display

            screen.innerHTML = equationArr.slice(0,equationArr.length-1).join("");

            ///Highlight button 
            btn.classList.add("current");
            console.log("highlight")
            return;
       
}

///// Reset operator buttons to inactive /////////////////////////////////////////////

const resetButtons = () => {

    const activeButtons = document.getElementsByClassName("current");
    
    for(i=0; i<activeButtons.length; i++) {

        console.log("removed");

        activeButtons[i].classList.remove("current");
        
    };

}

////Check for operator ///////////////////////////////////////////////////////////

const operatorCheck = (arr) => {

    ///Reset to result to allow further inputs
    
        for(i=0; i<arr.length; i++) {
            console.log("Operator check" + i);
            
            if(arr[i].classList.contains("Calculator__operator")) 
            
            {
                
                return highlightOperator(arr[i]);
                
                //return equals();
            }
            
        }

}



///Negate / Invert //////////////////////////////////////////////////////////////////


const invertNum = (num) => {

        return Number(num * -1);
    
}

const invertNumResult = () => {

    ///Reduce array to single number 
    equals();
    ////Get inversion
    let negNum = Number(invertNum(equationArr[equationArr.length-1]));
    ///Remove "+/-" from array
    buttonVal = null;
    ///Set recent number to inversion
    equationArr[equationArr.length-1] = negNum;
}


//////Total/literal array length/////////////////////////////////////////////////////

const totalArrLength = (arr, startIndex) => {


    let total = 0;

    for(i = startIndex; i<arr.length; i++) {

        total += arr[i].toString().length;
        //console.log("total:" + total);
    }

    return Number(total);
}

//////Check exponentials ////////////////////////////////////////////////////////////////


const checkNumLength = (num) => {

        return num.toExponential(2);
   
} 


////Avoid multiple decimals 

const containsDecimal = (arr) => {

    if(arr.includes(".")) {

        return true;
    }

    else return false;

}

///////////Get value of button ///////////////////////////////////////////////////

const getValue = (num) => { 

    //Get value of button
    let buttonVal = num.innerHTML;
    
    //Clear zero
    if(equationArr[0] == 0) { equationArr = [];}
    
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

    if(buttonVal == "." && containsDecimal(equationArr) == true){

        return;
    }

    ///Get operator index
    let opIndex = 0;

            for(i=0; i<equationArr.length; i++) {

                if(operators.includes(equationArr[i])) {
                    opIndex = i;
                }
            }
    ////Check length & return /do nothing if number too long   
    let totalLength = totalArrLength(equationArr, 0) - opIndex; 

    if((totalLength < screenWidth)
      && (buttonVal !== null)) {
        

            ///Pass value to equation array
            //buttonval = Number(checkNumLength(buttonVal));
            equationArr.push(buttonVal);
            console.log("array:" + equationArr); 

            ///Pass array to display

            opIndex = 0;

            for(i=0; i<equationArr.length; i++) {

                if(operators.includes(equationArr[i])) {
                    opIndex = i;
                }
            }

            screen.innerHTML = equationArr.slice(opIndex).join(""); 
                      
            return 
        
        
    }

    else if(totalLength >= screenWidth) {

        ///Pass value to equation array
            //buttonval = Number(checkNumLength(buttonVal));
            equationArr.push(buttonVal);
            console.log("array:" + equationArr); 

            equals();
            screen.innerHTML = equationArr.slice(equationArr.length-1).join(""); 

            return;

    }
    //else {return equals();}
    
            
};


///Clear current equation //////////////////////////////////////////////////////////

const clearEquation = () => {

    resetButtons();
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

    ///Clear if equation starts with operator 
    if(operators.includes(equationArr[0])) {

        resetButtons();
        return clearEquation();
    }

    else {
        if(!isNaN(equationArr[equationArr.length-1]))
            { resetButtons(); }

            ///Run equation array as mathematical function 
            let result = Function("return " + equationArr.join(""))();  ////Important to have () at the end as it executes it as a function (rather than printing the function)

            ///var for remaining space 
            let decimalSpace = 0;

            if(Number.isInteger(result) == false) {
                    
                    decimalSpace = Math.min(checkDecimal(result)+1, screenWidth - checkDecimal(result));
                    result = result.toFixed(decimalSpace)
                    //console.log(decimalSpace);
                }   
            if(result > 99999999)
                { result = checkNumLength(result); }
            ///Set equation array to result
            equationArr = [result];
            
            ///Pass result to screen
            screen.innerHTML = equationArr[equationArr.length-1];
            console.log(equationArr);

            //Reset operator bool
            containsOperator = false;
            //console.log(result);
    }
}



