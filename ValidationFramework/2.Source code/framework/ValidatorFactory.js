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
            "regex": new RegexValidator(),
            "number": new IsNumberValidator(),
            "minLength": new MinLenghtValidator(),
            "maxLength": new MaxLenghtValidator(),
            "time": new TimeValidator(),
            "url": new UrlValidator(),
            'date': new DateValidator(),
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