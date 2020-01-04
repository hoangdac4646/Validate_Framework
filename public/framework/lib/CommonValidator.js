class CommonValidator{
    constructor(checkFunc, messageFunc){
        if (!checkFunc)
            checkFunc = this.createCheckFunc();
        if (!messageFunc)
            messageFunc = this.createMessageFunc();
        this.check = checkFunc;
        this.getErrorMessage = messageFunc;
    }

    //derive class should override this function
    createCheckFunc(){
        return function () {};
    }

    //derive class should override this function
    createMessageFunc(){
        return function () {};
    }
}