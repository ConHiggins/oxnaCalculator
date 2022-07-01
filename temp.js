///Negate / Invert //////////////////////////////////////////////////////////////////


const invertNum = (num) => {

    ///Check for operators 


        let test = Number(num * -1);
        console.log(test);
        return;
    
}


invertNum("10");

//////Total/literal array length

const totalArLength = (arr) => {


    let total = 0;
    arr.forEach((item) => {

        total += item.toString().length;

    })
    console.log(Number(total))
;    return Number(total);
}

const arr = [1, 4567, 456, 3, 4];

totalArLength(arr);