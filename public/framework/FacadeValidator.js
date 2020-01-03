var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

class FacadeValidator {
    constructor() {
        console.log("constructor FacadeValidator");
        // initValidatorFactory();
    }
    /**
     * @param {*} rules: objects 
     */
    validate(rules) {
        this.arrInvalid = [];
        $.each(rules, function (tagName, value) {
            var result = this.validateInputWithRule(tagName, value);
            console.log("[validate] result " + result);
            if (result != null)
                {
                    this.arrInvalid.push(result);
                    console.log("Result = " + JSON.stringify(this.arrInvalid));            
                }
        }.bind(this));
        // console.log("Result = " + JSON.stringify(this.arrInvalid));
    }

    showMessage(){
        //TODO: Hao code
    }

    initValidatorFactory() {
       //TODO: Hao code
    }

    /**
     * @param {*} strType : "len"
     */
    getValidatorByType(strType) {
        return new StringLengthValidator();
        return this.validatorFactory.create(strType);
    }

    getInputByName(name) {  
        var res = $("input[name=\'" + name + "\']").val();
        console.log("[getInputByName] tagName, res: " + name + " " + res);
        return res;
    }

    /**
     * 
     * @param {*} tagName: username
     * @param {*} rules: {len: {min: 10, max: 20}, isEmail: true};
     */
    validateInputWithRule(tagName, rules) {
        var mess = "";
        $.each(rules, function (strTag, subRule) {
            var validator = this.getValidatorByType(strTag);
            if (validator) {
                var stringNeedToBeValidated = this.getInputByName(tagName); //"SetName"
                mess = validator.check(stringNeedToBeValidated, subRule);
                console.log("[validateInputWithRule] mess return " + mess);
                if (mess != "")
                    return false;
            }
        }.bind(this));
        if (mess != "")
            return { tagName: tagName, message: mess };
        return null;
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
                case "min": childValidator = MinLenghtValadator;
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

var MinLenghtValadator= {
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

var EmailValidator = {
    check(stringNeedToBeValidated){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(stringNeedToBeValidated.toLowerCase());
    },
}

FacadeValidator._instance = null;
FacadeValidator.getInstance = function () {  
    console.log("xxxx get instance");
    if (FacadeValidator._instance == null)
        FacadeValidator._instance = new FacadeValidator();
    return FacadeValidator._instance;
}