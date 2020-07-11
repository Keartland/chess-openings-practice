var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.textBaseline = "middle"; 
ctx.textAlign = "center";
const scl = c.width/8

class Piece{
    constructor(name, colour){
        this.name=name;
        this.colour=colour;
    }
    draw(x,y){
        ctx.fillStyle = this.colour == "b"?"black":"white";
        ctx.fillText(this.name, (x+0.5)*scl,(y+0.5)*scl); 
    }
}

class Board{
    constructor(){
        this.b =[[],[],[],[],[],[],[],[]]
        for(let i=0;i<8;i++){
            this.b[1][i] = new Piece("p","b");
            for(let j=0;j<4;j++){
                this.b[j+2][i] = new Piece("","");
            }
            this.b[6][i] = new Piece("p","w");
        }
        this.b[0][0] = new Piece("r","b");
        this.b[7][0] = new Piece("r","w");
        this.b[0][7] = new Piece("r","b");
        this.b[7][7] = new Piece("r","w");
        this.b[0][1] = new Piece("n","b");
        this.b[7][1] = new Piece("n","w");
        this.b[0][6] = new Piece("n","b");
        this.b[7][6] = new Piece("n","w");
        this.b[0][2] = new Piece("b","b");
        this.b[7][2] = new Piece("b","w");
        this.b[0][5] = new Piece("b","b");
        this.b[7][5] = new Piece("b","w");
        this.b[0][3] = new Piece("q","b");
        this.b[7][3] = new Piece("q","w");
        this.b[0][4] = new Piece("k","b");
        this.b[7][4] = new Piece("k","w");
        console.log(this.b)
    }
    draw(x,y){
        for(let i=0;i<this.b.length;i++){
            for(let j=0;j<this.b.length;j++){

                ctx.fillStyle = (i+j)%2 == 1 ?"#c19875":"#f2e3bc" ;
                if(x==j && y==i){ ctx.fillStyle = "red"}
                ctx.fillRect(j*scl, i*scl, scl, scl); 
                this.b[i][j].draw(j,i);
            }
        }
    }
}
canvas.onmousemove = function(e){
    board.draw(Math.floor(e.x/scl),Math.floor(e.y/scl));
};
let board = new Board();
board.draw();
canvas.onclick = function(e){
    console.log(board.b[Math.floor(e.y/scl)][Math.floor(e.x/scl)])
};
