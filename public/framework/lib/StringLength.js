class MinLenghtValidator  extends CommonValidator{
    constructor(){
        super();
        var funcCheck = function (str, minValue) { 
            console.log("[MinLenghtValidator] " + str + " " + minValue);
            return str.length >= minValue;
        }
        var funcGetMessage = function (tagName, value) {  
            var mess = tagName + " must be at least "+ value +" character(s)";
            return mess;
        }
        this.setCheckFunction(funcCheck);
        this.setFuncGetMessage(funcGetMessage);  
    }
}

class MaxLenghtValidator  extends CommonValidator{
    constructor(){
        super();
        var funcCheck = function (str, maxValue) { 
            console.log("[MaxLenghtValidator] " + str + " " + maxValue);
            return str.length <= maxValue;
        }
        var funcGetMessage = function (tagName, value) {  
            var mess = tagName + " must be at most "+ value +" character(s)";
            return mess;
        }
        this.setCheckFunction(funcCheck);
        this.setFuncGetMessage(funcGetMessage);  
    }
}