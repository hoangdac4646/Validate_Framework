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