class Astroid {
    constructor(x, y, vel){
        this.x = x;
        this.y = y;
        var ranx = random(-1,0);
        var rany = random(-1,0);
        this.pos   = createVector(width*-((2*rany)+1), height*-((2*ranx)+1));
        this.vel   = createVector(0,0);
        this.acc   = createVector(0,0);
        this.force = createVector(0,0);
    }

    drawBody() {
        stroke(0,255,0);
        fill(0,0,255);
        ellipse(this.pos.x, this.pos.y, random(3,6),random(3,6));
    }
    applyForce(force1){
        var f = force1.div(this.mass);
        this.acc.add(f);
    }
    update(){
        this.vel.add(this.acc);
        // this.trail.push(createVector(this.pos.x, this.pos.y));
        
        // if (this.trail.length > 20){
        //     this.trail.shift();
        // }
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
}