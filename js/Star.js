


class Star {
   
    constructor(x, y, diam, mass, grav, name, strk, fll) {
        this.bodyName = name;
        this.pos   = createVector(document.documentElement.clientWidth/2, document.documentElement.clientHeight/2);
        this.diam  = diam;
        this.origDiam = diam;
        this.mass  = mass;
        this.grav  = grav;
        this.strk  = strk;
        this.fll   = fll;
        this.rays = [];
        for (var a = 0; a <360; a++){
            this.rays.push(new lightRay(this.pos, radians(a)))
        }

        
    }

    drawBody(){
        strokeWeight(2);
        stroke(this.strk);
        fill(this.fll);
        // if (this.diam < this.origDiam/10){
        //     this.diam = this.origDiam/10;
        // }
        circle(this.pos.x, this.pos.y, this.diam);
    }
    orbit(body) {
        //direction
        var direction = createVector();
        var temp = createVector(this.pos.x, this.pos.y);

        direction = temp.sub(body.pos);
        var distance = direction.mag();

        // Perihelion and Aphelion
        if (body.mass != 1 ){
            if (distance < body.perihelion){
                body.perihelionPos = body.pos.copy();
                 body.perihelion = distance;
                
            }
            if (distance > body.aphelion  ){
                body.aphelionPos = body.pos.copy();
                body.aphelion   = distance;
            }
            if (togglePA){
                fill(255);
                stroke('#E01001');
                strokeWeight(5);
                point(body.aphelionPos.x, body.aphelionPos.y);
                strokeWeight(1);
                text(body.bodyName +" A " + body.aphelion, body.aphelionPos.x, body.aphelionPos.y);
                stroke('#00E01D');
                strokeWeight(5);
                point(body.perihelionPos.x, body.perihelionPos.y);
                strokeWeight(1);
                text(body.bodyName + " P " + body.perihelion, body.perihelionPos.x, body.perihelionPos.y);
            }
            }

        
        


        direction.normalize();
        var mag = gravConst*((this.mass*body.mass)/(distance*distance));
        // Check Collision
        if (distance <= ((this.diam/2)+ (body.diam))) {
            alert("Crashed Into the Sun!!!");
            noLoop();
            
        }
        
        // Refuel on Orbit
        if (body.pos.x < width/2){
            body.orb = true;
        }
        if (body.orb && body.pos.x > width/2){
            body.orb = false;
            if (body.fuelStation < 20 && !body.docked){
                body.fuelStation += 1;}
        }
        direction.mult(mag);


        return direction;
            
    }
}