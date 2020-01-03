class CommonValidator{
    constructor(func, mess){
        this.setCheckFunction(func);
        this.setMessage(mess);
    }

    setCheckFunction(func){
        this.check = func || function () {};
    }

    setMessage(mess){
        this.message = mess || "";
    }

    getErrorMessage(){
        return this.message;
    }
}