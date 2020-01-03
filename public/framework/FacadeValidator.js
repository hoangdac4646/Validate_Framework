var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

class FacadeValidator {
    constructor() {
        console.log("constructor FacadeValidator");
        this.listValidator = {};
        this.initValidatorFactory();
        this.messFactory = new UIMessFactory();
        this.message = new Message(this.messFactory);
    }
    /**
     * @param {*} rules: objects 
     */
    validate(rules) {
        this.arrInvalid = [];
        $.each(rules, function (tagName, value) {
            var result = this.validateInputWithRule(tagName, value);
            console.log("[validate] result " + result);
            if (result != null) {
                this.arrInvalid.push(result);
                console.log("Result = " + JSON.stringify(this.arrInvalid));
                this.addMessage(result);
            }
        }.bind(this));
        // console.log("Result = " + JSON.stringify(this.arrInvalid));
        this.showMessage();
    }

    addMethod(name, func, errorMessage){
        if (!this.listValidator[name]){
            this.listValidator[name] = {};
        }
        this.listValidator[name].check = func;
        this.listValidator[name].getErrorMessage = function(){
            return errorMessage;
        }
    }

    showMessage(){
        //TODO: Hao code
        this.message.show();
        console.log("mess showed");
    }

    addMessage(info) {
        this.message.add(this.messFactory.createText(
            {
                inputSelector: $("input[name=" + info.tagName + "]"),
                text: {content: info.message}
            }))
        // this.message.add(this.messFactory.createText(
        //     {
        //         inputSelector: $("input[name=" + info.tagName + "]"),
        //         icon: {path: info.path}
        //     }))
    }

    initValidatorFactory() {
       //TODO: Hao code
       this.listValidator = ValidatorFactory.getDefaultValidator();
    }

    /**
     * @param {*} strType : "len"
     */
    getValidatorByType(strType) {
        return this.listValidator[strType];
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

FacadeValidator._instance = null;
FacadeValidator.getInstance = function () {  
    console.log("xxxx get instance");
    if (FacadeValidator._instance == null)
        FacadeValidator._instance = new FacadeValidator();
    return FacadeValidator._instance;
}


var ValidatorFactory = {
    getDefaultValidator : function(){
        var factory = null;
        var list = {};
        factory = new StringLengthFactory();
        list.len = factory.getValidator();
        factory = new EmailFactory();
        list.email = factory.getValidator();
        factory = new EqualFactory();
        list.equal = factory.getValidator();
        return list;
    }
}

class IValidatorFactory{
    constructor(){

    }
    getValidator(){

    }
}
// ------- StringLengthFactory-----------
class StringLengthFactory extends IValidatorFactory
{
    getValidator(){
        return StringLengthValidator;
    }
}

var StringLengthValidator = {
     /**
     * 
     * @param {*} rule : {min: 10, max: 20}
     */
    check : function(stringNeedToBeValidated, rule){
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

// ------- EmailFactory-----------
class EmailFactory extends IValidatorFactory{
    getValidator(){
        return EmailValidator;
    }
}

var EmailValidator = {
    check : function(stringNeedToBeValidated){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(stringNeedToBeValidated.toLowerCase()))
            return this.getErrorMessage();
        return "";
    },

    getErrorMessage : function(){
        return "Email invalid";
    }
}

// ------- EqualFactory-----------
class EqualFactory{
    getValidator(){
        return EqualValidator;
    }
}
var EqualValidator = {
    check : function(stringNeedToBeValidated, target){
        if (!(stringNeedToBeValidated === target)){
            return this.getErrorMessage();
        }
        return "";
    },
    getErrorMessage : function(){
        return "xxxx invalid";
    },
}

