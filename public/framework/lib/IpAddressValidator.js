class IpAddressValidator extends CommonValidator{
    constructor(){
        super();
    }
    
    createCheckFunc(){
        return function (str) { 
            var re = /^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/;
            return re.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            return "Ip address is invalid!";
        }
    }
}
