class EmailValidator extends CommonValidator {
    constructor(){
        super();
        var funcCheck = function (str) { 
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(str.toLowerCase()))
                return this.getErrorMessage();
            return ""; 
        }.bind(this);
        var mess = "Invalid Email ";
        this.setCheckFunction(funcCheck);
        this.setMessage(mess);
    }
}