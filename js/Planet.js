var gravConst = 1;
class Body {
    constructor(x, y, diam, mass, grav, name, strk, fll, startingVelx, startingVely) {
        this.bodyName = name;
        this.pos   = createVector(x, y);
        this.vel   = createVector(startingVelx,startingVely);
        this.acc   = createVector(0,0);
        this.force = createVector(0,0);
        this.diam  = diam;
        this.origDiam = diam;
        this.mass  = mass;
        this.grav  = grav;
        this.strk  = strk;
        this.fll   = fll;
        this.trail = new Array();
        this.fuelStation = 10;
        this.orb = true;
        this.docked = false;
        this.perihelion = 10000;
        this.aphelion = 0;
        this.perihelionPos = createVector(0,0);
        this.aphelionPos = createVector(0,0);
        this.img;
        this.info = {};
    };
    drawBody(x,y, diam){
        if (this.bodyName == "Saturn"){
            strokeWeight(diam/20);
            stroke(255);
            fill(51);
            ellipse(x, y, diam+diam*.9, diam/2);
        }
        // if (this.diam < this.origDiam/10){
        //     this.diam = this.origDiam/10;
        // }
        strokeWeight(2);
        stroke(this.strk);
        fill(this.fll);
        circle(x, y, diam);
      
    }
    drawTrail(){
        strokeWeight(2);
        for (var i =4; i<this.trail.length;i++){
            stroke(255, i);
            line(this.trail[i].x, this.trail[i].y, this.trail[i-1].x, this.trail[i-1].y)
        }
    }
    applyForce(force1){
        var f = force1.div(this.mass);
        this.acc.add(f);
    }
    update(){
        this.vel.add(this.acc);
        this.trail.push(createVector(this.pos.x, this.pos.y));
        if (this.trail.length > 30){
            this.trail.shift();
        }
        this.pos.add(this.vel);
        this.acc.mult(0);
    }


    orbit(body) {     
        //direction
        var direction = createVector();
        var temp = createVector(this.pos.x, this.pos.y);

        direction = temp.sub(body.pos);
        var distance = direction.mag();
        direction.normalize();
        var mag = gravConst*((this.mass*body.mass)/(distance*distance));

    
        direction.mult(mag);
        // Check Collision
        if (distance <= ((this.diam)+ (body.diam))) {
            
            body.pos = this.pos.copy();
            body.vel = this.vel.copy();
            body.acc = this.acc.copy();

            body.dockedTo = this;
            body.dockedTo = this;
            body.docked = true;     

            if (body.mission.sP == this.bodyName){
                body.mission.retrieve();
            };
            if (body.mission.retrieved && body.mission.eP == this.bodyName){
                body.money += body.mission.reward;
                body.mission.delivered();
            }
             
        }   
        

        if (body.docked){
            if(body.dockedTo.bodyName == this.bodyName) {  
                this.docked = true;
                while (this.fuelStation > 0){
                    
                    body.fuel += this.fuelStation;
                    if (body.fuel > 100){
                        body.fuel = 100;
                    }
                    this.fuelStation = 0;
                }
                
                return createVector(0,0);

            }
        }
        
        return direction;
            
    }
};