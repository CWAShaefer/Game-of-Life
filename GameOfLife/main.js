//Made by Cam, 2024
//Parameters
const size = 30;
let play = 0;
let cells = [];
let tickrate = 200;
let mouseIsDown = false;

//Events
window.addEventListener('mousedown', function() {
    mouseIsDown = true;
});
  
window.addEventListener('mouseup', function() {
    mouseIsDown = false;
});

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        togglePlay();
    }
})

//Functions
function tableCreate() {
  const body = document.body, tbl = document.createElement('table');
  tbl.style.border = '1px solid black';

  for (let i = 0; i < size; i++) {
        const tr = tbl.insertRow();        
        for (let j = 0; j < size; j++) {
            if (i === size && j === 1) {
                break;
            } else {
                const td = tr.insertCell();
                td.style.background = 'black';
                td.onmouseover = function () { if(mouseIsDown) Click(td) };
                td.onmousedown = function () { Click(td) };
                td.id = `${i},${j}`
                td.className = "Cell"
                td.textContent = "0"
            }
        }
    }
  body.appendChild(tbl);

  document.getElementById("tickrateCount").value = tickrate;

  cells = document.getElementsByClassName("Cell");

  //Start clock
  setTimeout(() => {
    clock();
  }, 1000);
}

function Click(cell) {    
    //Change cell on Click
    if(cell.style.background == "black"){
        cell.style.background = "white"
        cell.textContent = 1;
    } else{
        cell.style.background = "black"
        cell.textContent = 0;
    }
}

function getNeighbors(x,y){
    //Determine neighbor values
    let output = []
    x = parseInt(x)
    y = parseInt(y)
    output.push(`${x-1},${y+1}`)
    output.push(`${x+0},${y+1}`)
    output.push(`${x+1},${y+1}`)
    output.push(`${x-1},${y+0}`)
    output.push(`${x+1},${y+0}`)
    output.push(`${x-1},${y-1}`)
    output.push(`${x+0},${y-1}`)
    output.push(`${x+1},${y-1}`)
    //Filter out invalid cord pairs
    output = output.filter((c) => !c.includes("-1") && !c.includes(size))
    return output;
}

function Life(cell) {

    //Get cords and split. Feed to neighvor function
    cord = cell.id.split(",")
    neighbors = getNeighbors(cord[0],cord[1])

    //Count adjacent living cells
    Lives = 0
    neighbors.forEach(element => {
        if(document.getElementById(element).style.background == "white"){
            Lives++;
        }
        else{
        }
    });


    //Conway's Game of Life rules https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
    if(cell.textContent == 1 && Lives < 2){
        //Any live cell with fewer than two live neighbors dies, as if by underpopulation.
        cell.textContent = 0;
    }
    else if(cell.textContent == 1 && Lives >= 2 && Lives <= 3){
        //Any live cell with two or three live neighbors lives on to the next generation.
        cell.textContent = 1;
    } else if(cell.textContent == 1 && Lives > 3){
        //Any live cell with more than three live neighbors dies, as if by overpopulation.
        cell.textContent = 0;
    } else if(cell.textContent == 0 && Lives == 3){
        //Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        cell.textContent = 1;
    }
}

function clock(){
    
    //Clock pauses if not in use
    if(play == 1){
        for (let i = 0; i < cells.length; i++) {
            Life(cells[i]);
          }
        
        for (let i = 0; i < cells.length; i++) {
            c = cells[i];
            if(c.textContent == 1){
                c.style.background = "white"
            }else{
                c.style.background = "black"
            }
    }

    setTimeout(() => {
        clock();
      }, tickrate);
    }
}

function togglePlay(){
    play = play ? 0:1
    document.getElementById("toggle").textContent = play == 1 ? ">":"="
    if(play == 1){
        clock()
    }
}

function TickrateChange(){
    t = document.getElementById("tickrateCount").value; 
    if(t >= 10 && t <= 1000){
        tickrate = t;
    }
    console.log(tickrate);
}