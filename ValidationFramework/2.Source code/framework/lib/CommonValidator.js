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