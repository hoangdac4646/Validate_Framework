var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// #region FacadeValidator

class FacadeValidator {
    constructor() {
        console.log("constructor FacadeValidator");
        this.validatorFactory = new PrototypeValidatorFactory();
    }

    /**
     * @param {*} rules: objects
     * @param options: objects
     */
    validate(rules, options) {
        this.resetMessageNotify();
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
        this.message = new Message(this.messFactory);
    }

    addMethod(name, func, errorMessage){
        this.validatorFactory.addMethod(name, func, errorMessage);
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

    resetMessageNotify()
    {
        $('.message').remove();
        this.message = new Message(this.messFactory);
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
                if (!res){
                    mess = validator.getErrorMessage(tagName, value);
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
    if (FacadeValidator._instance == null)
        FacadeValidator._instance = new FacadeValidator();
    return FacadeValidator._instance;
}

// #endregion FacadeValidator


// #region IValidatorFactory

class IValidatorFactory{
    constructor(){}
    addMethod(){}
    getValidator(){}
}

class PrototypeValidatorFactory extends IValidatorFactory{
    constructor(){
        super();
        this.listValidator = {
            "email": new EmailValidator(),
            "equal": new EqualValidator(),
            "ipAddress": new IpAddressValidator(),
            "macAddress": new MacAddressValidator(),
            "min": new MinValidator(),
            "max": new MaxValidator(),
            "number": new IsNumberValidator(),
            "minLength": new MinLenghtValidator(),
            "maxLength": new MaxLenghtValidator(),
            "time": new TimeValidator(),
            "url": new UrlValidator(),
        }
    }

    getValidator(key){
        return this.listValidator[key];
    }

    addMethod(key, funcCheck, funcGetMess){
        var validator = new CommonValidator(funcCheck, funcGetMess);
        this.listValidator[key] = validator;
    }
}

// #endregion IValidatorFactory

// #region Validator
class CommonValidator{
    constructor(checkFunc, messageFunc){
        if (!checkFunc)
            checkFunc = this.createCheckFunc();
        if (!messageFunc)
            messageFunc = this.createMessageFunc();
        this.check = checkFunc;
        this.getErrorMessage = messageFunc;
    }

    createCheckFunc(){
        throw new Error('Derived class must override method createCheckFunc!');
    }

    createMessageFunc(){
        throw new Error('Derived class must override method createMessageFunc!');
    }
}

class EmailValidator extends CommonValidator {
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(str.toLowerCase())
        };
    }

    createMessageFunc(){
        return function (tagName, value) {
            return "Email is invalid";
        }
    }
}

class EqualValidator extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str, value) {
            var otherValue = $(value).val();
            return str === otherValue;
        }
    }

    createMessageFunc(){
        return function (tagName, value) {
            return tagName + " must be equal to" + value;
        }
    }
}

class IpAddressValidator extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str) {
            var re = /^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/;
            return re.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {
            return "Ip address is invalid!";
        }
    }
}

class MacAddressValidator extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str) {
            var re = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
            return re.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {
            return "MAC address is invalid! (Format: xx:xx:xx:xx:xx:xx)";
        }
    }
}

class MinValidator extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str, minValue) {
            var input = parseInt(str);
            if (!Number.isNaN(input))
                return input >= minValue;
            return false;
        }
    }

    createMessageFunc(){
        return function (tagName, value) {
            return tagName + " must be greater than " + value;
        }
    }
}

class MaxValidator extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str, maxValue) {
            var input = parseInt(str);
            if (!Number.isNaN(input))
                return input <= maxValue;
            return false;
        }
    }

    createMessageFunc(){
        return function (tagName, value) {
            return tagName + " must be less than " + value;
        }
    }
}

class IsNumberValidator extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str, value) {
            return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {
            return tagName + " must be a number";
        }
    }
}

class MinLenghtValidator  extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str, minValue) {
            console.log("[MinLenghtValidator] " + str + " " + minValue);
            return str.length >= minValue;
        }
    }

    createMessageFunc(){
        return function (tagName, value) {
            var mess = tagName + " must be at least "+ value +" character(s)";
            return mess;
        }
    }
}

class MaxLenghtValidator  extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str, maxValue) {
            return str.length <= maxValue;
        }
    }

    createMessageFunc(){
        return function (tagName, value) {
            return tagName + " must be at most "+ value +" character(s)";
        }
    }
}

class TimeValidator extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str) {
            var re = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
            return re.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {
            return "Time is invalid! (require 00:00 - 23:59)";
        }
    }
}

class UrlValidator extends CommonValidator{
    constructor(){
        super();
    }

    createCheckFunc(){
        return function (str) {
            var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
            return re.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {
            return "Url is invalid!";
        }
    }
}
// #endregion Validator

// #region Message

class Message {

    constructor(factory) {
        this.factory = factory;
        this.messElement = [];
    }

    show()
    {
        this.messElement.forEach(function (element) {
            element.show();
        })
    }

    add(element)
    {
        this.messElement.push(element);
    }
}


class MessageFactory{
    constructor() {
        console.log("constructor MessageFactory");
    }

    createIcon(info)
    {
        return new Icon(info);
    }

    createText(info)
    {
        return new Text(info);
    }
}

class ConsoleMessFactory extends MessageFactory{
    createText(info)
    {
        return new ConsoleText(info);
    }
}

class UIMessFactory extends MessageFactory{

    constructor()
    {
        super();
    }

    createIcon(info)
    {
        return new UIIcon(info);
    }

    createText(info)
    {
        return new UIText(info);
    }
}


class AlertMessFactory extends MessageFactory{

    constructor()
    {
        super();
    }


    createText(info)
    {
        return new AlertText(info);
    }
}


class MessageElement{
    constructor(info) {
        this.inputSelector = info.inputSelector;
    }

    show()
    {
        return "";
    }
}

class Icon extends MessageElement{
    constructor(info) {
        super(info);
        this.path = info.icon.path;
    }

    show()
    {

    }
}

class Text extends MessageElement{
    constructor(info) {
        super(info);
        this.content = info.text.content;
    }

    show()
    {

    }
}

class ConsoleText extends Text{
    constructor(info) {
        super(info);
    }

    show()
    {
        if (this.inputSelector) {
            console.error("Input name: " + this.inputSelector.attr('name') + " - Error: " + this.content);
        } else
        {
            console.log("Invalid selector");
        }
    }
}

class UIText extends Text{
    constructor(info) {
        super(info);
    }

    show()
    {
        var actualSelector = this.inputSelector.parent();
        if (actualSelector) {
            var messBlock = "<div class='message'>";
            var mess = '<strong class="message-content">' + this.content + '</strong>';

            if (actualSelector.find('.message')[0]) {
                $(actualSelector.find('.message')[0]).append(mess);
            }
            else {
                var outputMess = messBlock;
                outputMess += mess + "</div>";
                actualSelector.append(outputMess);
            }
        } else
        {
            console.log("Invalid selector");
        }
    }
}

class UIIcon extends Icon{
    constructor(info) {
        super(info);
    }

    show()
    {
        var actualSelector = this.inputSelector.parent();
        if (actualSelector) {
            var messBlock = "<div class='message'>";
            var icon;
            if (this.path)
            {
                icon = "<img class='message-icon' src=" + this.path + ">";
            }
            else
            {
                icon = "<img class='message-icon' src='../framework/img/cancel.png'>";
            }

            if (actualSelector.find('.message')[0]) {
                $(actualSelector.find('.message')[0]).append(icon);
            }
            else {
                var outputMess = messBlock;
                outputMess += icon + "</div>";
                actualSelector.prepend(outputMess);
            }
        } else
        {
            console.log("Invalid selector");
        }
    }
}

class AlertText extends Text{
    constructor(info) {
        super(info);
    }

    show()
    {
        if (this.inputSelector) {
            alert("Input name: " + this.inputSelector.attr('name') + " - Error: " + this.content)
        } else
        {
            console.log("Invalid selector");
        }
    }

}

// #endregion Message
