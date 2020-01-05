class UrlValidator extends CommonValidator{
    constructor(){
        super();
    }
    
    createCheckFunc(){
        return function (str) { 
            var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
            return re.test(str);
        }
    }

    createMessageFunc(){
        return function (tagName, value) {  
            return "Url is invalid!";
        }
    }
}