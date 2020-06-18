class Form{
    constructor(){
         this.input = createInput("Name");
         this.button1 = createButton('Play');
         this.greeting = createElement('h3');
    }

    hide(){
        this.greeting.hide();
        this.button1.hide();
        this.input.hide();
    }

    display(){
        var title = createElement('h3');
        title.html("Car Racing Game");
        title.position(displayWidth/2,5);
        
        
        this.input.position(displayWidth/2,displayHeight/2);
        this.button1.position(displayWidth/2,displayHeight/2 + 50);

        this.button1.mousePressed(()=>{
            this.input.hide();
            this.button1.hide();
           gameState = PLAY;

        });


    }
}
