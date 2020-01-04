class MinLenghtValidator  extends CommonValidator{
    constructor(){
        super();
    }
    
    createCheckFunc(){
        return function (str, minValue) { 
            console.log("[MinLenghtValidator] " + str + " " + minValue);
            return str.length >= minValue;
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            var mess = tagName + " must be at least "+ value +" character(s)";
            return mess;
        }
    }
}

class MaxLenghtValidator  extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str, maxValue) { 
            return str.length <= maxValue;
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            return tagName + " must be at most "+ value +" character(s)";
        }
    }
}