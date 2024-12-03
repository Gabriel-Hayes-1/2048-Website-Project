/*
STRUCTURE OF GAME:
1  2  3  4 
5  6  7  8 
9  10 11 12
13 14 15 16

ROW STRUCTURE:
0
1
2
3


--------THINGS TO DO---------
Tiles merge though eachother
Win detection
Loss detection
Score
Format buttons & things above and below game, instead of on top

*/
var runGame = true

function addBgColor(value, id) {
    let num = null
    
    let outputname = "tile-"
    if (value === null) {
        num = "blank"
    } else {
        num = value.toString()
    }
    


    outputname = outputname.concat(num)

    console.log(outputname, id)
    let element = document.getElementById(id.toString())
    element.className = ""
    element.classList.add(outputname)

    return outputname
}

function printTable() {
    document.getElementById("table").innerHTML = JSON.stringify(occupiedTiles)
    console.log(`Table: ${JSON.stringify(occupiedTiles)}`);

}

function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function debug(text) {
    document.getElementById("debug").innerHTML = text
}



var occupiedTiles = []


function clearTile(id) { //relying on the fact that we remove only tiles that exsist
    document.getElementById(`${id}`).innerHTML = ""
    document.getElementById(`${id}`).className = ''
    addBgColor(0, id)



    occupiedTiles.splice(occupiedTiles.indexOf(id), 1)
    
}

function addTile(tileId, tileValue, index) {
    occupiedTiles.splice(index,0,tileId);
    document.getElementById(`${tileId}`).innerHTML = tileValue
    addBgColor(tileValue, tileId)
}


function removeFirstOccurrence(arr, value) {
    const index = arr.indexOf(value);  // Find the index of the first occurrence
    if (index !== -1) {  // Check if the value exists in the array
        arr.splice(index, 1);  // Remove the element at that index
    }
    return arr;
}

function spawnStartingBlocks() {
    let randomnum = RandomInt(1,16)
    let element = document.getElementById(`${randomnum}`)
    element.innerHTML = "2"
    addBgColor(2, randomnum)
    occupiedTiles.push(randomnum);



let randomnum2
do {
    randomnum2 = RandomInt(1,16)
    if (randomnum != randomnum2) {
        let element = document.getElementById(`${randomnum2}`)

        element.innerHTML = "2"
        addBgColor(2, randomnum2)
        occupiedTiles.push(randomnum2);

    }

} while (randomnum2 === randomnum) 

}


window.addEventListener('load', function() {
    
    spawnStartingBlocks()

});





function spawnBlock() {
    let randomnum = RandomInt(1,16);
    if (occupiedTiles.length != 16) { //need to check if its full, otherwise loop below never ends
        while (occupiedTiles.includes(randomnum)) { //checks if it exists already, if it does, generates a new location
            randomnum = RandomInt(1,16);
        }
    
    
    
        document.getElementById(`${randomnum}`).innerHTML = "2"
        addBgColor(2, randomnum)
    
        occupiedTiles.push(randomnum);
    } else {console.log("occupiedtiles is full, not spawning new tile.")}
   
}



/*
STRUCTURE OF GAME:
1  2  3  4 
5  6  7  8 
9  10 11 12
13 14 15 16
*/

function arrowRight(changeBoard) {
    let anyTileMoved = false;
    occupiedTiles.sort((a, b) => b - a); //sort greatest to least

    occupiedTiles.forEach((tileId,index) => {
        let newTileNum = parseInt(document.getElementById(tileId).innerText, 10);
        
        let newPosition = null;
        let row = Math.floor((tileId - 1) / 4);
        let rightmost = row * 4 + 4;
        

        for (let pos = tileId; ; pos++) {
             //start at the tile position, check right 
             if (pos == rightmost) {
                newPosition = rightmost;
                break;
            }
            
            if (occupiedTiles.includes(pos+1)) { //if next tile is full 
                newPosition = pos;
                if (document.getElementById(pos+1).innerText === document.getElementById(tileId).innerText) {
                    newPosition = pos+1;
                    newTileNum *=2
                }
            break;
            }
        }



        if (newPosition !== tileId) {
            anyTileMoved = true;  // Indicate that at least one tile moved
            if (occupiedTiles.indexOf(newPosition) != -1 && changeBoard == true) { //if next tile exsists and we're changing the board
                removeFirstOccurrence(occupiedTiles, newPosition)
            }
        }

        if (changeBoard == true) {
            clearTile(tileId);
            addTile(newPosition,newTileNum, index)
        }
    });


    return anyTileMoved;
}


function arrowUp(changeBoard) {
    let anyTileMoved = false;
    occupiedTiles.sort((a, b) => a - b);

    occupiedTiles.forEach((tileId, index) => {

        let newPosition = null
        let newTileNum = parseInt(document.getElementById(tileId).innerText, 10); //what to set the destination tile to
        let column = (tileId - 1) % 4 + 1;
        let topmost = column;

        for (let pos = tileId; ; pos -= 4) {

            if (pos === topmost) {
                newPosition = topmost;
                break;
            }
            
            if (occupiedTiles.includes(pos-4)) {
                newPosition = pos;
                if (document.getElementById(pos-4).innerText === document.getElementById(tileId).innerText) {
                    newPosition = pos-4;
                    newTileNum *=2
                }
                break;
            } 
        }

        if (newPosition !== tileId) {
            anyTileMoved = true; 
            if (occupiedTiles.indexOf(newPosition) != -1 && changeBoard == true) { //if next tile exsists and we're changing the board
                removeFirstOccurrence(occupiedTiles, newPosition)
            }
        }
        


        if (changeBoard == true) {
            clearTile(tileId);
            addTile(newPosition,newTileNum, index)
        }
    });

    return anyTileMoved;
}

function arrowDown(changeBoard) {
    let anyTileMoved = false;
    occupiedTiles.sort((a, b) => b - a);
    occupiedTiles.forEach((tileId, index) => {
        let newPosition = null
        let newTileNum = parseInt(document.getElementById(tileId).innerText, 10);


        let column = (tileId - 1) % 4 + 1;
        let bottommost = 12 + column;

        for (let pos = tileId; ; pos += 4) {

            if (pos === bottommost) {
                newPosition = bottommost;
                break;
            }
            if (occupiedTiles.includes(pos+4)) {
                newPosition = pos;
                if (document.getElementById(pos+4).innerText === document.getElementById(tileId).innerText) {
                    newPosition = pos+4;
                    newTileNum *=2
                }
                break;
            } 
        }
            


        if (newPosition !== tileId) {
            anyTileMoved = true; 
            if (occupiedTiles.indexOf(newPosition) != -1 && changeBoard == true) { //if next tile exsists and we're changing the board
                removeFirstOccurrence(occupiedTiles, newPosition)
            }
        }


        if (changeBoard == true) {
            clearTile(tileId);
            addTile(newPosition,newTileNum, index)
        }
    });

    return anyTileMoved;
}

function arrowLeft(changeBoard) {
    let anyTileMoved = false;
    occupiedTiles.sort((a, b) => a - b); //sort least to greatest

    occupiedTiles.forEach((tileId,index) => {
        let newPosition = null;
        let newTileNum = parseInt(document.getElementById(tileId).innerText, 10);


        let row = Math.floor((tileId-1) / 4);
        let leftmost = row * 4 + 1 ;

        for (let pos = tileId; ; pos--) {
            //start at the tile position, check left 
            if (pos == leftmost) {
               newPosition = leftmost;
               break;
           }
           
           if (occupiedTiles.includes(pos-1)) { //if next tile is full 
               newPosition = pos;
               if (document.getElementById(pos-1).innerText === document.getElementById(tileId).innerText) {
                   newPosition = pos-1;
                   newTileNum *=2
               }
           break;
           }
       }


        if (newPosition !== tileId) { //if tile is moving
            anyTileMoved = true; 
            if (occupiedTiles.indexOf(newPosition) != -1 && changeBoard == true) { //if next tile exsists and we're changing the board
                removeFirstOccurrence(occupiedTiles, newPosition)
            }
        }
        if (changeBoard == true) {
            clearTile(tileId);
            addTile(newPosition,newTileNum, index)
        }
        


    });

    return anyTileMoved;
}


document.addEventListener('keydown', function(event) {
    if (runGame == true) {
        switch(event.key) {
            case "ArrowUp":
                let tileMovedUp = arrowUp(true);
                if (tileMovedUp) {
                    spawnBlock();
                }
                checkLoss()
                break;
    
    
            case "ArrowDown":
            let tileMovedDown = arrowDown(true);
            if (tileMovedDown) {
                spawnBlock();
            }
            checkLoss()
            break;
    
    
            case "ArrowLeft":
                let tileMovedLeft = arrowLeft(true);
                   if (tileMovedLeft) {
                       spawnBlock();
                }
                checkLoss()
            break;
    
    
            case "ArrowRight":
            let tileMovedRight = arrowRight(true);
            if (tileMovedRight) {
                spawnBlock();
            }
            checkLoss()
            break;
    
            case "`":
            checkLoss
            
            break;
        }
    }
    


});

function refreshboard() {
    for (let i = 1; i <= 16; i++) {
        clearTile(i)
    }
    debug("")
    console.log("-------NEW GAME--------")
    spawnStartingBlocks()
    document.getElementById("death-warning").classList.remove("death-anim")
    runGame = true
}

function checkLoss() {

    if (occupiedTiles.length >= 16) {
        let left = arrowLeft(false)
        let up = arrowUp(false)
        let right = arrowRight(false)
        let down = arrowDown(false)

        if (down == false && left ==false&&up==false&&right==false) {
            document.getElementById("death-warning").classList.add("death-anim")
            runGame = false
        }
    
    }    

}

