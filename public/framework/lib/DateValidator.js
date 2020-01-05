class DateValidator extends CommonValidator{
    constructor(){
        super();
    }
    
    createCheckFunc(){
        return function (str) {
            var re = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
            return re.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            return "Date is invalid! (require format dd/mm/yyyy)";
        }
    }
}
