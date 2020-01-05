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
            "number": new EqualValidator(),
            "required": new EqualValidator(),
            "date": new EqualValidator(),
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