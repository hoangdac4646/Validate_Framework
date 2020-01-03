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
            if (result != null)
                this.arrInvalid.push(result);
        });
        console.log("Result = " + JSON.stringify(this.arrInvalid));
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
        return this.validatorFactory.create(strType);
    }

    getInputByName(name) {
        return Document.getElementByName(name).text;
    }

    /**
     * 
     * @param {*} tagName: username
     * @param {*} rules: {len: {min: 10, max: 20}, isEmail: true};
     */
    validateInputWithRule(tagName, rules) {
        console.log("[validateInputWithRule]" + tagName);
        return  null;
        $.each(rules, function (strTag, subRule) {
            var arrInvalid = []; // {tagName, message}
            var validator = getValidatorByType(strTag);
            if (validator) {
                var mess = "";
                var stringNeedToBeValidated = this.getInputByName(tagName); //"SetName"
                mess = validator.check(stringNeedToBeValidated, subRule);
                return { tagName: tagName, message: mess };
            }
        });
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
            switch (listKeyWord[i]) {
                case "min": childValidator = new MinLenghtValadator();
                case "max": childValidator = new MaxLenghtValadator();
            }
            if (childValidator){
                if (!childValidator.check(stringNeedToBeValidated, rule[listKeyWord[i]]));
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
        return "";
    }
}

var MaxLenghtValadator = {

    check(stringNeedToBeValidated, maxValue){
        return stringNeedToBeValidated.length <= maxValue;
    },

    getErrorMessage(){
        return "";
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