class Message {

    constructor(factory) {
        this.factory = factory;
        this.messElement = [];
        this.add(this.factory.createText());
        this.add(this.factory.createIcon());
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

class ConsoleFactory extends MessageFactory{
    createText(info)
    {
        return new ConsoleText(info);
    }
}

class UIFactory extends MessageFactory{
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
        console.log("constructor MessageElement");
        // initValidatorFactory();
    }

    show()
    {

    }
}

class Icon extends MessageElement{
    constructor(info) {
        super(info);
        this.path = info.path;
        this.width = info.width;
        this.height = info.height;
    }

    show()
    {

    }
}

class Text extends MessageElement{
    constructor(info) {
        super(info);
        this.content = info.content;
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
        console.log(this.content);
    }
}

class UIText extends Text{
    constructor(info) {
        super(info);
    }

    show()
    {
        console.log(this.content);
    }
}

class UIIcon extends Icon{
    constructor(info) {
        super(info);
    }

    show()
    {
        console.log(this.content);
    }
}