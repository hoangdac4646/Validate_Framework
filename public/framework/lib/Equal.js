class EqualValidator extends CommonValidator{
    constructor(){
        super();
    }
    
    createCheckFunc(){
        return function (str, value) { 
            var otherValue = $(value).val();
            return str == otherValue;
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            return tagName + " must be equal to" + value;
        }
    }
}