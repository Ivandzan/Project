function createCellNull() {
    let cell = document.createElement("div");
    cell.classList.add("field__cell", "field__cell--null");
    return cell;
}

function setCellOffset(cell) {
    let left = 20 + (20 + 100) * cell.x;
    let top = 20 + (20 + 100) * cell.y;
    cell.style.left = left + "px";
    cell.style.top = top + "px";
}

function appendCell(cell) {
    let field = document.getElementById("field");
    field.appendChild(cell);
}

function createField() {
    for(let y = 0; y < 4; ++y) {
        for(let x = 0; x < 4; ++x) {
            let cell = createCellNull();
            cell.y = y;
            cell.x = x;
            setCellOffset(cell);
            appendCell(cell);
        }
    }
}

createField();



function createCellTile() {
    let tile = document.createElement("div");
    tile.classList.add("field__cell", "field__cell--tile");
    return tile;
}

function setTileOffset(tile) {
    let left = 20 + (20 + 100) * tile.x;
    let top = 20 + (20 + 100) * tile.y;
    tile.style.left = left + "px";
    tile.style.top = top + "px";
}

function appendTile(tile) {
    let field = document.getElementById("field");
    field.appendChild(tile);
}

function setTileNumber(tile) {
    let number = (tile.y) * 4 + tile.x + 1;
    $(tile).html(number);
}

let tiles = [];

function createTiles() {
    for(let y = 0; y < 4; ++y) {
        for(let x = 0; x < 4; ++x) {
            let tile = createCellTile();
            tile.y = y;
            tile.x = x;
            setTileOffset(tile);
            appendTile(tile);
            setTileNumber(tile);
            tiles.push(tile);
        }
    }
    $(".field__cell--tile:last-child").remove();
}

createTiles();



let freeCell = {
    y: 3,
    x: 3
};

function between(a, b, t) {
    return (a <= t && t <= b) || (b <= t && t <= a);
}

function animateTiles() {
    for(let i = 0; i < 15; ++i) {
        $(tiles[i]).on("click", function tileClick(event) {
            let bar = event.target;
            let oldBarX = bar.x;
            let oldBarY = bar.y;
            if(bar.y == freeCell.y) {
                for(let a = 0; a < 15; ++a) {
                    let tile = tiles[a];
                    if(tile.y == bar.y && between(bar.x, freeCell.x, tile.x)) {
                        if(bar.x < freeCell.x) {
                            tile.x = tile.x + 1;
                        }
                        else {
                            tile.x = tile.x - 1;
                        }
                        setTileOffset(tile);
                    }
                }
                freeCell.x = oldBarX;
                freeCell.y = oldBarY;
            }
            if(bar.x == freeCell.x) {
                for(let a = 0; a < 15; ++a) {
                    let tile = tiles[a];
                    if(tile.x == bar.x && between(bar.y, freeCell.y, tile.y)) {
                        if(bar.y < freeCell.y) {
                            tile.y = tile.y + 1;
                        }
                        else {
                            tile.y = tile.y - 1;
                        }
                        setTileOffset(tile);
                    }
                }
                freeCell.x = oldBarX;
                freeCell.y = oldBarY;
            }
            if(shuffled) {
                checkVictory();
            }
        });
    }
}

animateTiles();



function shuffleTiles() {
    for(let a = 0; a < 500; ++a) {
        let i = Math.floor(Math.random() * 16);
        tiles[i].click();
    }
    shuffled = true;
}

shuffleTiles();



function checkVictory() {
    for(let i = 0; i < 15; ++i) {
        let tile = tiles[i];
        let realNumber = $(tile).html();
        if(realNumber != ((tile.y) * 4 + tile.x + 1)) {
            return;
        }
    }
    let modal = document.getElementById("modal");
    modal.classList.add("modal--visible");
}