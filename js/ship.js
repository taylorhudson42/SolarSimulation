

class spaceShip {
    constructor(x, y){
        this.mass = 1;
        this.trail = new Array();
        this.fuel = 100;
        //this.img = loadImage('resources/ship.png');
        this.pos = createVector(x, y);
        this.vel = createVector(5,0);
        this.acc = createVector(0,0);
        this.force = createVector(0,0);
        this.orient = TWO_PI;
        this.diam = 10
        this.docked = false;
        this.dockedTo;
        this.undocking = 0;
        this.money = 0;
        this.mission;
    }

    drawShip(){
        // rotate(this.orient);
        // imageMode(CENTER);
       // image(this.img, this.pos.x, this.pos.y, 20,20);
        strokeWeight(3);
        stroke(100);
        fill(150);
        if (!this.docked){
            circle(this.pos.x, this.pos.y, 10);
        }    
        //console.log(this.pos);
        if (this.docked) {
            textSize(15);
            textAlign(CENTER);
            strokeWeight(0);
            fill(255);
            text("Docked on " +this.dockedTo.bodyName, this.pos.x, this.pos.y-40);
            text("Press Space to undock", this.pos.x, this.pos.y-20);
            strokeWeight(3);
            stroke(100);
            fill(150);
            circle(this.pos.x, this.pos.y, this.dockedTo.diam/2);
            
        }
        
        
    }
    drawTrail(){
        strokeWeight(2);
        for (var i =4; i<this.trail.length;i++){
            stroke(255,117,32, i*10);
            var negPos = 1;
            //point(this.trail[i].x, this.trail[i].y);
            if (i%2 != 0){
                negPos *= -1;
            }
            point(this.trail[i].x+random(-2,2), this.trail[i].y+random(-2,2));
            //line(this.trail[i].x, this.trail[i].y, this.trail[i-1].x, this.trail[i-1].y);
        }
    }
    applyForce(force1){
        var f = force1.div(this.mass);
        this.acc.add(f);
    }
    update(){
        this.vel.add(this.acc);
        this.trail.push(createVector(this.pos.x, this.pos.y));
        
        if (this.trail.length > 20){
            this.trail.shift();
        }
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    deepSpace() {
        if (!this.docked){
            alert("You've Fallen Into Deep Space, loser");
            noLoop();}
    }
    collide() {
        // See Planet.js  .orbit()
    }

}