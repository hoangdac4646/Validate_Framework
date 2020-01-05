class RegexValidator extends CommonValidator {
    constructor(){
        super();
    }
    
    createCheckFunc(){
        return function (str, value) { 
            var regex = new RegExp(value);
            return regex.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            return tagName + " is invalid";
        }
    }
}