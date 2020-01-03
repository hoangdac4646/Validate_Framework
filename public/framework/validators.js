var validators = {};

validators.minLength = {
    check(str, minValue){
        return str.length >= minValue;
    },

    getErrorMessage(){
        return "{tagName} is least {minValue} character";
    }
}

class StringLengthValidator {
    constructor() {

    }
    /**
     * 
     * @param {*} rule : {min: 10, max: 20}
     */
    check(stringNeedToBeValidated, rule) {
        var listKeyWord = Object.keys(rule);
        var childValidator = null;
        for (var i = 0; i < listKeyWord.length; i++) {
            console.log("[check with key option] " + listKeyWord[i]);
            switch (listKeyWord[i]) {
                case "min": childValidator = MinLenghtValidator;
                break;
                case "max": childValidator = MaxLenghtValadator;
                break;
            }
            if (childValidator){
                if (!childValidator.check(stringNeedToBeValidated, rule[listKeyWord[i]]))
                    return childValidator.getErrorMessage();
            }
        }
        return "";
    }
}

var MinLenghtValidator= {
    check(stringNeedToBeValidated, minValue){
        return stringNeedToBeValidated.length >= minValue;
    },

    getErrorMessage(){
        return "String too short";
    }
}

var MaxLenghtValadator = {

    check(stringNeedToBeValidated, maxValue){
        console.log("[MaxLenghtValadator] check", stringNeedToBeValidated);
        return stringNeedToBeValidated.length <= maxValue;
    },

    getErrorMessage(){
        return "String too long";
    }
}

class EmailValidator{
    constructor(){
        
    }

    check(stringNeedToBeValidated){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(stringNeedToBeValidated.toLowerCase()))
            return this.getErrorMessage();
        return "";
    }

    getErrorMessage(){
        return "Email invalid";
    }
}
// var EmailValidator = {
//     check(stringNeedToBeValidated){
//         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         return re.test(stringNeedToBeValidated.toLowerCase());
//     },
// }

class EqualValidator{
    constructor(){
    }

    check(stringNeedToBeValidated, target){
        if (!(stringNeedToBeValidated === target)){
            return this.getErrorMessage();
        }
        return "";
    }

    getErrorMessage(){
        return "xxxx invalid";
    }
}
