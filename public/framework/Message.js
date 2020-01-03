class Message {

    constructor(factory) {
        this.factory = factory;
        this.messElement = [];
    }

    show()
    {
            this.messElement.forEach(function (element) {
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
        return new Icon(info);
    }

    createText(info)
    {
        return new Text(info);
    }
}

class ConsoleMessFactory extends MessageFactory{
    createText(info)
    {
        return new ConsoleText(info);
    }
}

class UIMessFactory extends MessageFactory{

    constructor()
    {
        super();
    }

    createIcon(info)
    {
        return new UIIcon(info);
    }

    createText(info)
    {
        return new UIText(info);
    }
}


class AlertMessFactory extends MessageFactory{

    constructor()
    {
        super();
    }


    createText(info)
    {
        return new AlertText(info);
    }
}


class MessageElement{
    constructor(info) {
        // initValidatorFactory();
        this.inputSelector = info.inputSelector;
    }

    show()
    {
        return "";
    }
}

class Icon extends MessageElement{
    constructor(info) {
        super(info);
        this.path = info.icon.path;
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
        if (this.inputSelector) {
            console.error("Input name: " + this.inputSelector.attr('name') + " - Error: " + this.content);
        } else
        {
            console.log("Invalid selector");
        }
    }
}

class UIText extends Text{
    constructor(info) {
        super(info);
    }

    show()
    {
        var actualSelector = this.inputSelector.parent();
        if (actualSelector) {
            var messBlock = "<div class='message'>";
            var mess = '<strong class="message-content">' + this.content + '</strong>';

            if (actualSelector.find('.message')[0]) {
                $(actualSelector.find('.message')[0]).append(mess);
            }
            else {
                var outputMess = messBlock;
                outputMess += mess + "</div>";
                actualSelector.append(outputMess);
            }
        } else
        {
            console.log("Invalid selector");
        }
    }
}

class UIIcon extends Icon{
    constructor(info) {
        super(info);
    }

    show()
    {
        var actualSelector = this.inputSelector.parent();
        if (actualSelector) {
            var messBlock = "<div class='message'>";
            var icon;
            if (this.path)
            {
                icon = "<img class='message-icon' src=" + this.path + ">";
            }
            else
            {
                icon = "<img class='message-icon' src='../framework/img/cancel.png'>";
            }

            if (actualSelector.find('.message')[0]) {
                $(actualSelector.find('.message')[0]).append(icon);
            }
            else {
                var outputMess = messBlock;
                outputMess += icon + "</div>";
                actualSelector.prepend(outputMess);
            }
        } else
        {
            console.log("Invalid selector");
        }
    }
}

class AlertText extends Text{
    constructor(info) {
        super(info);
    }

    show()
    {
        if (this.inputSelector) {
            alert("Input name: " + this.inputSelector.attr('name') + " - Error: " + this.content)
        } else
        {
            console.log("Invalid selector");
        }
    }

}
