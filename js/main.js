
let astroids = new Array();
let ships = new Array();
var backgroundStars = new Array();
var sizes = new Array();
var toggleStars = true;
var toggleFrame = false;
var togglePA = false;
var started = false;
var infoReady = false;
var mission;
let json = new Array;
function setup() {
    textFont(fontRegular);
    createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);

    background(51);
    mission = new Mission();


    var sun = new Star(width/2, height/2, 25, 10000, 274, "Sun",'#F0D400','#F07F00');
    
    var mercury = new Body(width/2, height/2-150, 8, 1000, 9.8, "Mercury",'#B3B3B3', '#696969', 7.9);
    mercury.info["Composition"] = "Solid";
    var venus   = new Body(width/2, height/2-200, 9, 1000, 9.8, "Venus",'#ED5D0C', '#E01001', 7.2);
    venus.info["Composition"] = "Solid";
    var earth   = new Body(width/2, height/2-250, 10, 1000, 9.8, "Earth",'#00A31B', '#001BA3', 6.5);
    earth.info["Composition"] = "Solid";
    var mars    = new Body(width/2, height/2-300, 9, 1500, 123, "Mars", '#BD3200','#D67E02', 6);
    mars.info["Composition"] = "Solid";
    var jupiter = new Body(width/2, height/2+500, 18.5, 6000, null, "Jupiter",'#BD5E46', '#D69651', -4.3);
    jupiter.info["Composition"] = "Gas";
    var saturn  = new Body(width/2, height/2+700, 16.5, 4000, null, "Saturn",'#FFBC5E', '#BD8333', -3.8);
    saturn.info["Composition"] = "Gas";
    var uranus  = new Body(width/2, height/2+1000, 11, 3000, null, "Uranus",'#21A1CC', '#009DA6', -3.16);
    uranus.info["Composition"] = "Gas";
    var neptune  = new Body(width/2, height/2+1300, 11, 3000, null, "Neptune",'#0062D4', '#2100C4', -2.78);
    neptune.info["Composition"] = "Gas";

    entities.push(mercury);
    entities.push(venus);
    entities.push(earth);
    entities.push(mars);
    entities.push(jupiter);
    entities.push(saturn);
    entities.push(uranus);
    entities.push(neptune);
    stars.push(sun);
    preload();
    for (var i = 0; i<width; i++){
        backgroundStars.push(createVector(random(-width*2,width*2),random(-height*2,height*2)));
        sizes.push(random(1,3));
    } 

    // Create Astroid Belt
    var astNum = 20;
    for (var i = 0;i<astNum;i++){
        // Finds points along the orbit's circumference
        // then find the rotated velocity of the astroid so that they each have circular orbits
        var x = sun.pos.x + random(-100,100) + 400  * Math.cos(360*(i/astNum)*(Math.PI/180));
        var y = sun.pos.y + random(-100,100) + 400  * Math.sin(360*(i/astNum)*(Math.PI/180));
        var velX = -Math.sin(360*(i/astNum)*(Math.PI/180)) * 5;
        /* Matrix Multiplication
           __             __   _ _
           | cos(θ)  -sin(θ)| | 0 |
           | sin(θ)   cos(θ)| | 5 |
           __              __  _ _
        */
        var velY = Math.cos(360*(i/astNum)*(Math.PI/180)) * 5;  
        // Thank you Linear Algebra!!!
        var astroid = new Astroid(x, y, velX, velY, i);

        astroids.push(astroid);
    };
    // var ast = new Astroid();
    // astroids.push(ast);
    // console.log(ast.pos.x, ast.pos.y);
    (jQuery.getJSON("resources/planetInfo.json", function( data ){
        json.push(data);
        infoReady = true;
    }));

}


var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
var entities = new Array();
var stars = new Array();
var firstPassThrough = true;
var transX = width/2;
var transY = height/4;
var paused = false;
var selPlanet = 2;
let frames = new Array();

function draw() {
    background(51);
    ellipseMode(CENTER);
    stroke(0);
    fill(255);
    
    // PLANET SELECT Menu
    if (!started){
        textAlign(LEFT);
        textSize(height/30);
        textAlign(CENTER);
        stroke(255);
        fill(0);
        strokeWeight(1);
        rect(width*.75, height*.05, width*.2, height*.1);
        fill(255);
        strokeWeight(0);
        text('Starting Planet', width*.85, height*.12);
        strokeWeight(1);
        
        fill(entities[selPlanet].fll);
        stroke(255);
        strokeWeight(1);        

        //Planet Info

        fill(entities[selPlanet].fll);
        rect(width*.75, height*.15, width*.2, height*.85);
        
        
        fill(255);
        strokeWeight(0);
        textSize(height/20);
        text(entities[selPlanet].bodyName, width*.85, height*.2 );
        strokeWeight(1);
        line(width*.78, height*.22, width*.92, height*.22);
        image(entities[selPlanet].img, width*.751, height*.23, width*.199, width*.199);
        textSize(height/40);
        strokeWeight(0);
        //text("Composition: " + entities[selPlanet].info['Composition'], width*.825, (height*.25)+(width*.199) );
        if(infoReady){ 
            var count = 0;
            textSize(height/50);
            
            for (i in json[0][entities[selPlanet].bodyName]){
                textAlign(LEFT);
                if (i=="Description"){
                    
                }else{
                    text(i,width*.76, (height*.25)+(width*.199)+((height/40)*count));
                }
                textAlign(RIGHT);
                if (i=="Description"){
                    textAlign(LEFT);
                    
                    text(json[0][entities[selPlanet].bodyName][i],width*.76,(height*.25)+(width*.199)+((height/40)*(count)),width*.185, height-(height*.5)-(height*.25)+(width*.199));
                }else{
                    if (json[0][entities[selPlanet].bodyName][i] == "Yes"){
                        fill(0,255,0);
                    }else if (json[0][entities[selPlanet].bodyName][i] == "Possibly"){
                        fill(255,255,0);
                    }else if (json[0][entities[selPlanet].bodyName][i] == "No"){
                        fill(255,0,0);
                    }
                    text(json[0][entities[selPlanet].bodyName][i],width*.94,(height*.25)+(width*.199)+((height/40)*count));
                    fill(255);
                }
                count+=1;
                //text(json[0][entities[selPlanet].bodyName][i],width*.75, (height*.25)+(width*.199));
            }
        }
       

        translate(width/2-entities[selPlanet].pos.x, height/2 - entities[selPlanet].pos.y);
        if(toggleStars){
            for (star in backgroundStars){
                fill(255);
                strokeWeight(0);
                stroke(255);
                circle(backgroundStars[star].x,backgroundStars[star].y, sizes[star] );

            }
            while(backgroundStars.length != width){
                if (backgroundStars.length > width){
                    backgroundStars.pop();
                }else{
                backgroundStars.push(createVector(random(-width*2,width*2),random(-height*2,height*2)));
                sizes.push(random(1,3));
                }
            }
        }
        // astroid
        for (var i = 0; i<astroids.length; i++){
            astroids[i].applyForce(stars[0].orbit(astroids[i]));
            astroids[i].update();
            astroids[i].drawBody();
            astroids[i].drawTrail();
        }

        stars[0].drawBody();
        for (var i = 0; i<entities.length; i++){
            entities[i].applyForce(stars[0].orbit(entities[i]));
            entities[i].update();
            entities[i].drawTrail();
            entities[i].drawBody(entities[i].pos.x, entities[i].pos.y,entities[i].diam);
        }
        translate(-(width/2-entities[selPlanet].pos.x), -(height/2 - entities[selPlanet].pos.y));

        //line(width/2+entities[selPlanet].diam*2, height/2, width*.7, height/2);
       
    }else{
    
        if (paused){
            textAlign(CENTER);
            textSize(50);
            fill(255);
            text("PAUSED",width/2, height/2.5);
        }
       
        //console.log(astroids[0].pos.x + " " +astroids[0].pos.y + " " + ships[0].pos.x+ " " + ships[0].pos.y );


        // FUEL READOUT
        textSize(height/40);
        textAlign(LEFT);
        text("Fuel Remaining: " + ships[0].fuel, 20,40);
        if(ships[0].fuel <= 20){
            fill('#F4590E');
            text("FUEL LOW", 20, 80);
        }

        // Currency Readout
        textSize(height/40);
        textAlign(LEFT);
        text("Money: "+ships[0].money, 20, 80);
        

        // Planet Names if Off Screen
        for (p in entities){
            
                if (Math.abs(entities[p].pos.x-ships[0].pos.x) > width/2 || Math.abs(entities[p].pos.y-ships[0].pos.y) > height/2){ 
                textSize(height/70);
                stroke(entities[p].strk);
                strokeWeight(0);
                fill(entities[p].strk);
                var textX;
                var textY;
                if (Math.round(entities[p].pos.x-ships[0].pos.x)>0){
                    textAlign(LEFT);
                }else{
                    textAlign(LEFT);
                }
                
                if (entities[p].pos.x+30 < ships[0].pos.x + width/2 && entities[p].pos.x-30 > ships[0].pos.x - width/2){
                    textX = ((entities[p].pos.x) - ships[0].pos.x + width/2)
                }else if(entities[p].pos.x > ships[0].pos.x + width/2) {
                    textX = width-30;
                }else{
                    textX = 30;
                }
                
                if (entities[p].pos.y+30 < ships[0].pos.y + height/2 && entities[p].pos.y-30 > ships[0].pos.y - height/2){
                    textY = ((entities[p].pos.y) - ships[0].pos.y + height/2)
                }else if(entities[p].pos.y > ships[0].pos.y + height/2) {
                    textY = height-30;
                }else{
                    textY = 30;
                }
                text(entities[p].bodyName, textX, textY );
                entities[p].drawBody(textX - 15,textY-5,entities[p].diam);
            }       
        }
        strokeWeight(0);
        fill(200);


        // Planetary Fuel Readout
        textSize(height/40);
        textAlign(RIGHT);
        text("Fuel Stations",width-10, 30);
        textSize(height/70);
        textAlign(RIGHT);
        for (i in entities){
            text(entities[i].bodyName + ": " + entities[i].fuelStation,width-10, (i*height/70)+50);
        }

        // draw Mission
        
        mission.drawMission();
        
        // FRAMERATE

        if (toggleFrame) {
            textAlign(LEFT);
            textSize(height*.04);
            fill(255);

            if (frames.length > 1){
                let sum = frames.reduce((previous, current) => current += previous);
                let avg = sum / frames.length;
                text("FPS: "+ Math.round(avg) ,20, 120);
            }
            if (frames.length > 50){
                frames.shift();
            }
            frames.push(frameRate())
            
        }
            
        //CENTER AROUND SHIP
        translate(width/2-ships[0].pos.x, height/2 - ships[0].pos.y);

        for (var i = 0; i<astroids.length; i++){
            astroids[i].applyForce(stars[0].orbit(astroids[i]));
            astroids[i].update();
            astroids[i].drawBody();
            astroids[i].drawTrail();
        }


        // DRAW STARS 
        if(toggleStars){
            for (star in backgroundStars){
                fill(255);
                circle(backgroundStars[star].x,backgroundStars[star].y, sizes[star] );

            }
            while(backgroundStars.length != width){
                if (backgroundStars.length > width){
                    backgroundStars.pop();
                }else{
                backgroundStars.push(createVector(random(-width*2,width*2),random(-height*2,height*2)));
                sizes.push(random(1,3));
                }
            }
        }

        stars[0].drawBody();

        //Motion

        for (var i = 0; i<entities.length; i++){

            entities[i].applyForce(stars[0].orbit(entities[i]));
            entities[i].update();
            entities[i].drawTrail();
            entities[i].drawBody(entities[i].pos.x, entities[i].pos.y,entities[i].diam);

        }
        
        for(var i = 0; i<entities.length; i++){
            if (ships[0].undocking == 0 || ships[0].docked){
                ships[0].applyForce((entities[i].orbit(ships[0])).div(10));
            }else if(!ships[0].docked){
                if (ships[0].dockedTo.bodyName != entities[i].bodyName){
                    ships[0].applyForce((entities[i].orbit(ships[0])).div(10));
                    ships[0].undocking -= 1;
                }
                
            }
        }
        if (!ships[0].docked){
            ships[0].applyForce((stars[0].orbit(ships[0])).div(5));
            ships[0].update();
        }
        if (!ships[0].docked) {
            ships[0].drawTrail()
        }
        ships[0].drawShip();
    }
    
    
    
    
}
//  Work In Progress...
// function mouseWheel(event) {
//     console.log(event.delta);
//     for (var i = 0; i<entities.length;i++){
//         entities[i].diam -= event.delta;
//         if (entities[i].pos.x <width/2){
//             entities[i].pos.x += event.delta/3;
//         }else {
//             entities[i].pos.x -= event.delta/3;
//         }
//         if (entities[i].pos.y < height/2){
//             entities[i].pos.y += event.delta/3;
//         }else{
//             entities[i].pos.y -= event.delta/3;
//         }
//     }
//     for (var i = 0; i<stars.length; i++){
//         stars[i].diam -= event.delta;
//     }

// }


//          Movement

function keyPressed() {

    //TO PAUSE
    if (keyCode == 80){
        if(!paused){
            paused = true;
            
            noLoop();
            
        }else{
            paused = false;
            loop();
        }
    }
    // MENU CONTROLS
    if(!started){
        if (keyCode == 38){ // up Arrow
            selPlanet += 1;   
            if (selPlanet > entities.length-1){
                selPlanet = 0;
            }
        }else if(keyCode == 40){ // Down arrow
            selPlanet -= 1;
            if (selPlanet < 0){
                selPlanet = entities.length-1;
            }
        }else if(keyCode == 13 || keyCode == 32){ // ENTER
            var ship = new spaceShip(entities[selPlanet].pos.x, entities[selPlanet].pos.y);
            ships.push(ship);
            ship.mission = mission;
            
            started  = true;   
        }
    }
    //PAUSED
    if(paused){
        if (keyCode == 83){ // S
            toggleStars = !toggleStars;
        }else if(keyCode == 70){ // F
            toggleFrame = !toggleFrame;
        }else if(keyCode == 71){ // G
            ships[0].fuel = 1000;
        }else if(keyCode == 189){ // -
            scaleUI -= 1;
            if (scaleUI < 1){scaleUI = 1;}
        }else if(keyCode == 187){ // +
            scaleUI += 1;
        }else if (keyCode == 72){ // H
            togglePA = !togglePA;
        }
    }


    // Movement
    if (started && !ships[0].docked && !paused) {
        if (keyCode == 37 && ships[0].fuel > 0){
            force  = createVector(-1, 0);
            ships[0].applyForce(force);
            ships[0].fuel -= 1;
        }else if( keyCode == 38 && ships[0].fuel > 0){
            force = createVector(0,-1);
            ships[0].applyForce(force);
            ships[0].fuel -= 1;

        }else if( keyCode == 39 && ships[0].fuel > 0){
            force = createVector(1,0);
            ships[0].applyForce(force);
            ships[0].fuel -= 1;

        }else if( keyCode == 40 && ships[0].fuel > 0){
            force = createVector(0,1);
            ships[0].applyForce(force);
            ships[0].fuel -= 1;

        }
    }else{
        if (keyCode == 32) { //  SPACEBAR
           //ships[0].pos.add(30,30);
            ships[0].docked = false;
            ships[0].dockedTo.docked = false;
            ships[0].undocking = 500;
            
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;

  }
let fontRegular;
function preload(){
    for (i in entities){
        entities[i].img = loadImage('resources\\images\\'+ entities[i].bodyName+'.png');
    }
    fontRegular = loadFont('resources\\RobotoMono-Regular.ttf');
}