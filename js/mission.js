var yellow = [255,255,0];
var white  = [255,255,255];
var gray   = [200,200,200];


class Mission {
        
        constructor(){

                this.planets = [
                        "Mercury",
                        "Venus",
                        "Earth",
                        "Mars",
                        "Jupiter",
                        "Saturn", 
                        "Uranus",
                        "Neptune"
                ];
                //starting planet
                this.sP = this.planets[int(random(0,8))];
                //ending planet
                this.eP = this.planets[int(random(0,8))];

                while (this.eP == this.sP){
                        this.eP = this.planets[int(random(0,8))];
                }
                this.reward = int(random(10,50));
                this.items   = [
                        "Helium",
                        "Hydrogen",
                        "Titanium",
                        "some Water",
                        "The Emperor",
                        "100 Passengers", 
                        "The Emperor's Wife",
                        "Ice",
                        "the Unlabeled Boxes", 
                        "an Illegal Substance", 
                        "Nuclear Waste",
                        "Elon Musk's Car"
                ];
                this.retrieved = false;
                this.completed = false;
                this.item = int(random(0, this.items.length));
                this.message1 =[["Mission: ", yellow],
                                ["Retrieve ", [0,255,0]],
                                [this.items[this.item], white],
                                [" from ", [0,255,0]],
                                [this.sP, white]];
                this.message2 = [["Deliever the ", gray],
                                [this.items[this.item], gray],
                                [" to ", gray],
                                [this.eP, gray]];
                
        }
        drawMission(){
                if (!this.completed){
                        fill(255,255,255);
                        textSize(20);
                        drawtext(width/4, (height/10)+10, this.message1);
                        drawtext(width/4, (height/10)+30, this.message2)
                }
        }
        retrieve(){
                this.retrieved = true;
                this.message1 = [["Mission: ", gray],
                                ["Retrieve ", gray],
                                [this.items[this.item], gray],
                                [" from ", gray],
                                [this.sP, gray]];
                this.message2 = [["Deliever the ", [0,255,0]],
                                [this.items[this.item], white],
                                [" to ", [0,255,0]],
                                [this.eP, white]];
        }
        delivered(){
                // Create new mission
                this.sP = this.planets[int(random(0,8))];
                this.eP = this.planets[int(random(0,8))];
                while (this.eP == this.sP){
                        this.eP = this.planets[int(random(0,8))];
                }
                this.reward = int(random(10,50));
                this.retrieved = false;
                this.item = int(random(0, this.items.length));
                this.message1 =[["Mission: ", yellow],
                                ["Retrieve ", [0,255,0]],
                                [this.items[this.item], white],
                                [" from ", [0,255,0]],
                                [this.sP, white]];
                this.message2 = [["Deliever the ", gray],
                                [this.items[this.item], gray],
                                [" to ", gray],
                                [this.eP, gray]];
        }
}

function drawtext( x, y, text_array ) {
        textAlign(LEFT);
        var pos_x = x;
        for ( var i = 0; i < text_array.length; ++ i ) {
            var part = text_array[i];
            var t = part[0];
            var c = part[1];
            var w = textWidth( t );
            fill( c );
            text( t, pos_x, y);
            pos_x += w;
        }
    }