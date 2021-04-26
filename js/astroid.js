class Astroid {
    constructor(x, y, velx,vely,i=0){
        this.x = x;
        this.y = y;
        var ranx = random(-1,0);
        var rany = random(-1,0);
        this.pos   = createVector(x, y);
        this.vel   = createVector(velx,vely);
        this.acc   = createVector(0,0);
        this.force = createVector(0,0);
        this.mass = 1;
        this.num = i;
        this.angle = 360/this.num;
        this.trail = new Array();
    }

    drawBody() {
        // stroke(0,255,0);
        fill(200,200,200);
        ellipse(this.pos.x, this.pos.y, 3,3);
        //text((this.vel.x) + " " + (this.vel.y) + " " + this.num, this.pos.x+30, this.pos.y);
    }
    applyForce(force1){
        var f = force1.div(this.mass);
        this.acc.add(f);
    }
    update(){
        this.vel.add(this.acc);
        this.trail.push(createVector(this.pos.x, this.pos.y));
        
        if (this.trail.length > 10){
            this.trail.shift();
        }
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    drawTrail(){
        strokeWeight(2);
        for (var i =4; i<this.trail.length;i++){
            stroke(255, i);
            line(this.trail[i].x, this.trail[i].y, this.trail[i-1].x, this.trail[i-1].y);
        }
    }
}