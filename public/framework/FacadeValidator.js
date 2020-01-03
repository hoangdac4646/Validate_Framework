var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

class FacadeValidator {
    constructor() {
        console.log("constructor FacadeValidator");
        this.messFactory = new UIMessFactory();
        this.message = new Message(this.messFactory);
        this.validatorFactory = new PrototypeValidatorFactory();
    }

    /**
     * @param {*} rules: objects
     * @param options: objects
     */
    validate(rules, options) {
        this.getMessFactory(options.errorDisplay);
        this.arrInvalid = [];
        $.each(rules, function (tagName, value) {
            var result = this.validateInputWithRule(tagName, value);
            console.log("[validate] result " + result);
            if (result != null) {
                this.arrInvalid.push(result);
                this.addMessage(result);
            }
        }.bind(this));
        console.log("Result = " + JSON.stringify(this.arrInvalid));
        this.showMessage();
    }

    getMessFactory(messFactory)
    {
        if (messFactory) {
            switch (messFactory) {
                case "console":
                    this.messFactory = new ConsoleMessFactory();
                    break;
                case "alert":
                    this.messFactory = new AlertMessFactory();
                    break;
                case "default":
                    this.messFactory = new UIMessFactory();
                    break;
                default:
                    this.messFactory = new UIMessFactory();
                    break;
            }
        }
        else
        {
            this.messFactory = new UIMessFactory();
        }
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
        this.message.show();
        console.log("mess showed");
    }

    addMessage(info) {
        var util = {
            inputSelector: $("input[name=" + info.tagName + "]"),
            icon: {path: info.path},
            text: {content: info.message},
        };

        this.message.add(this.messFactory.createIcon(util));

        this.message.add(this.messFactory.createText(util));
    }

    initValidatorFactory() {
       
    }

    /**
     * @param {*} strType : "len"
     */
    getValidatorByType(strType) {
        return this.validatorFactory.getValidator(strType);
    }

    getInputByName(name) {  
        var res = $("input[name=\'" + name + "\']").val();
        return res;
    }

    /**
     * 
     * @param {*} tagName: username
     * @param {*} rules: {minLength: 10, maxLength: 20, email: true};
     */
    validateInputWithRule(tagName, rules) {
        var res = true;
        var mess = "";
        $.each(rules, function (validatorType, value) {
            var validator = this.getValidatorByType(validatorType);
            if (validator) {
                var stringNeedToBeValidated = this.getInputByName(tagName); //"SetName"
                res = validator.check(stringNeedToBeValidated, value);
                if (!res)
                    {
                        mess = validator.getErrorMessage();
                        if (typeof mess == "function")
                            mess = mess(tagName, value);
                        return false;
                    }
            }
        }.bind(this));
        if (!res)
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
