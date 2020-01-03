class MinLenghtValidator  extends CommonValidator{
    constructor(){
        super();
        var funcCheck = function (str, minValue) { 
            console.log("[MinLenghtValidator] " + str + " " + minValue);
            if (!str.length >= minValue) 
                return this.getErrorMessage();
            return "";
        }.bind(this);
        var mess = "String is too short";
        this.setCheckFunction(funcCheck);
        this.setMessage(mess);
    }
}

class MaxLenghtValidator  extends CommonValidator{
    constructor(){
        super();
        var funcCheck = function (str, maxValue) { 
            console.log("[MaxLenghtValidator] " + str + " " + maxValue);
            if (!str.length <= maxValue) 
                return this.getErrorMessage();
            return "";
        }.bind(this);
        var mess = "String is too long";
        this.setCheckFunction(funcCheck);
        this.setMessage(mess);  
    }
}