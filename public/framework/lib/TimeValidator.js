class TimeValidator extends CommonValidator{
    constructor(){
        super();
    }
    
    createCheckFunc(){
        return function (str) { 
            var re = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9]):([0-5][0-9])(:[0-5][0-9])?$/;
            return re.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            return "Time is invalid! (require 00:00:00 - 23:59:59)";
        }
    }
}
