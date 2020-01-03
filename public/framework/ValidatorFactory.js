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
        }
    }

    getValidator(key){
        return this.listValidator[key];
    }

    addMethod(key, func, mess){
        var validator = new CommonValidator(func, mess);
        this.listValidator[key] = validator;
    }
}