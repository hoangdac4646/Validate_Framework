class Message {

    constructor(factory) {
        this.factory = factory;
        this.messElement = [];
    }

    show()
    {
        this.messElement.forEach(function(element)
        {
            element.show();
        })
    }

    add(element)
    {
        this.messElement.push(element);
    }
}

class MessageFactory{
    constructor() {
        console.log("constructor MessageFactory");
        // initValidatorFactory();
    }

    createIcon(info)
    {

    }

    createText(info)
    {

    }
}

class ConsoleMessFactory extends MessageFactory{
    createText(info)
    {
        return new ConsoleText(info);
    }
}

class UIMessFactory extends MessageFactory{

    createIcon(info)
    {
        return new UIIcon(info);

    }

    createText(info)
    {
        return new UIText(info);
    }
}


class MessageElement{
    constructor(info) {
        // initValidatorFactory();
        this.inputSelector = info.inputSelector;
    }

    show()
    {

    }
}

class Icon extends MessageElement{
    constructor(info) {
        super(info);
        this.path = info.icon.path;
        this.width = info.icon.width;
        this.height = info.icon.height;
    }

    show()
    {

    }
}

class Text extends MessageElement{
    constructor(info) {
        super(info);
        this.content = info.text.content;
    }

    show()
    {

    }
}

class ConsoleText extends Text{
    constructor(info) {
        super(info);
    }

    show()
    {
        console.log("Input name=" + this.inputSelector.attr('id') + " - Error: " + this.content);
    }
}

class UIText extends Text{
    constructor(info) {
        super(info);
        this.messBlock = "<div class='message' style='display: inline-block; background-color: lightgoldenrodyellow; padding: 5px'>"
    }

    show()
    {
        var mess = "<strong class='message-content' style='color: red'>" + this.content +
            "</strong>";
        var actualSelector = this.inputSelector.parent();
        if (actualSelector) {
            if (actualSelector.find('.message')[0]) {
                actualSelector.find('.message')[0].remove();
            }
            else {
                var outputMess = this.messBlock;
                outputMess += mess + "</div>";
                console.log(outputMess);
                actualSelector.prepend(outputMess);
            }
        } else
        {
            console.log("Unvalid selector");
        }
    }
}

class UIIcon extends Icon{
    constructor(info) {
        super(info);
    }

    show()
    {

    }
}