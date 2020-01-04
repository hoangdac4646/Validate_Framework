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
            "minLength": new MinLenghtValidator(),
            "maxLength": new MaxLenghtValidator(),
            "min": new MinValidator(),
            "equal": new EqualValidator(),
            "url": new UrlValidator(),
            "time": new TimeValidator(),
            "macAddress": new MacAddressValidator(),
            "ipAddress": new IpAddressValidator()
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