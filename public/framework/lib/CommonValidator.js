class CommonValidator{
    constructor(funcCheck, funGetMessage){
        this.setCheckFunction(funcCheck);
        this.setFuncGetMessage(funGetMessage);
    }

    setCheckFunction(funcCheck){
        this.check = funcCheck || function () {};
    }

    setFuncGetMessage(funGetMessage){
        this.getErrorMessage = funGetMessage || function () {};
    }
}