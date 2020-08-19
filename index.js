var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.font = "bold 50px Arial";
ctx.textBaseline = "middle"; 
ctx.textAlign = "center";
const scl = c.width/8

class Piece{
    constructor(name, colour){
        this.name=name;
        this.colour=colour;
    }
    isNull(){
        return this.name=="";
    }
    draw(x,y){
        this.img = new Image(scl/2,scl/2);
        this.img.src = "http://images.chesscomfiles.com/chess-themes/pieces/neo/150/"+this.colour+this.name+".png"
        ctx.drawImage(this.img, x-0.5*scl,y-0.5*scl,scl,scl);
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
        this.currentPiece = new Piece("","");
    }
    clicked(x,y){
        if (this.currentPiece.isNull()){
            this.currentPiece = this.b[y][x]
            this.b[y][x] = new Piece("","");
        } else{
            this.b[y][x] = this.currentPiece
            this.currentPiece = new Piece("","");
        }
        this.draw(x,y)
    }

    draw(x,y){
        for(let i=0;i<this.b.length;i++){
            for(let j=0;j<this.b.length;j++){
                ctx.fillStyle = (i+j)%2 == 1 ?"#c19875":"#f2e3bc" ;
                if(x==j && y==i){ ctx.fillStyle = "red"}
                ctx.fillRect(j*scl, i*scl, scl, scl); 
                this.b[i][j].draw((j+0.5)*scl,(i+0.5)*scl);
            }
        }
    }

    flip(){
        this.b.reverse();
        for (let i=0; i<this.b.length;i++) {
            this.b[i].reverse();
        }
        this.draw()
    }
}
let board = new Board();
board.draw();
canvas.onmousemove = function(e){
    board.draw(Math.floor(e.x/scl),Math.floor(e.y/scl));
    if (!board.currentPiece.isNull()){
        board.currentPiece.draw(e.x,e.y);
    }
};
canvas.onmousedown = function(e){
    if (e.button == 2) return;
    board.clicked(Math.floor(e.x/scl),Math.floor(e.y/scl))
    board.currentPiece.draw(e.x,e.y);
};
canvas.onmouseup = function(e){
    if (e.button == 2) return;
    board.clicked(Math.floor(e.x/scl),Math.floor(e.y/scl))
    board.currentPiece.draw(e.x,e.y);
};
canvas.oncontextmenu = function(e){
    e.preventDefault();
    board.flip();
};
document.onkeydown = function(e){
    if (e.key == 'l'){
        console.log(board.b)
    }
    if (e.key == 'r'){
        board = new Board();
        board.draw();
    }
};
