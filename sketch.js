var ball;
var database;
var position;

function setup(){
    //creating canvas
    createCanvas(500,500);
    
    //creating database from firebase
    database= firebase.database();

    //ball sprite
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //.ref is used to refer to a particular location in the database
    var ballPosition = database.ref('ball2/position');
    //.on is a listener, it listens to the changes in the values happening in the referred location
    //if there is a change in the value of referred location the command written after "value", are executed
    ballPosition.on("value", readPosition, showError);
}

function draw(){
    //clears the background and set the background to white
    background("white");

    if(position!==undefined)
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

//write part of the database
function writePosition(x,y){
    //.set is used to set a value in the database and will update the referred child and remove the other child
    //.update is used to update a value in the database and will update the referred child and will not affect the other child
    database.ref('ball2/position').set({
        'x': position.x+x,
        'y': position.y+y
    })
}
//read part of the database
function readPosition(data){
    //storing the change in data in position var
    position= data.val();
    ball.x= position.x;
    ball.y = position.y;
}

//dummy function to show how database errors looks
function showError(){
    console.log("this is how a database error will look")
}

//sdk = software development kit
//it links the code and the database