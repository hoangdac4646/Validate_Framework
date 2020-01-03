class MinLenghtValidator  extends CommonValidator{
    constructor(){
        super();
        var funcCheck = function (str, minValue) { 
            console.log("[MinLenghtValidator] " + str + " " + minValue);
            return str.length >= minValue;
        }
        var mess = "{tagName} must be at least {0} character(s)";
        this.setCheckFunction(funcCheck);
        this.setMessage(mess);
    }

    getErrorMessage(){
        return function (tagName, value) {
            var res = this.message.replace("{tagName}", tagName);
            res = res.replace("{0}", value);
            return res;
        }.bind(this);
    }
}

class MaxLenghtValidator  extends CommonValidator{
    constructor(){
        super();
        var funcCheck = function (str, maxValue) { 
            console.log("[MaxLenghtValidator] " + str + " " + maxValue);
            return str.length <= maxValue;
        }
        var mess = "{tagName} must be at most {0} character(s)";
        this.setCheckFunction(funcCheck);
        this.setMessage(mess);  
    }

    getErrorMessage(){
        return function (tagName, value) {  
            var res = this.message.replace("{tagName}", tagName);
            res = res.replace("{0}", value);
            return res;
        }.bind(this);
    }
}