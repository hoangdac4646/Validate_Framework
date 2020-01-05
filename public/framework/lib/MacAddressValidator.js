class MacAddressValidator extends CommonValidator{
    constructor(){
        super();
    }
    
    createCheckFunc(){
        return function (str) { 
            var re = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
            return re.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            return "MAC address is invalid! (Format: xx:xx:xx:xx:xx:xx)";
        }
    }
}
