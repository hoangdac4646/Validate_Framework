class MinValidator extends CommonValidator{
    constructor(){
        super();
    }
    
    createCheckFunc(){
        return function (str, minValue) { 
            var input = parseInt(str);
            if (!Number.isNaN(input))
                return input >= minValue;
            return false;
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            return tagName + " must be greater than " + value;
        }
    }
}

class MaxValidator extends CommonValidator{
    constructor(){
        super();
    }
    
    createCheckFunc(){
        return function (str, maxValue) { 
            var input = parseInt(str);
            if (!Number.isNaN(input))
                return input <= maxValue;
            return false;
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            return tagName + " must be less than " + value;
        }
    }
}