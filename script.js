const grid = document.querySelector(".grid")
let currentShooterIndex = 202
let width = 15
let direction = 1
let invaderId
let score
const resultDisplay = document.querySelector("#result")
const scoreDisplay = document.querySelector("#score")
for (let i = 0; i<225; i++){
    const square = document.createElement("div")
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll(".grid div"))
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for (let i=0;i<alienInvaders.lenght;i++)
    squares[alienInvaders[i]].classList.add("invader")
}
draw()
function remove(){
    for (let i=0;i<alienInvaders.lenght;i++)
    squares[alienInvaders[i]].classList.remove("invader")
}

squares[currentShooterIndex].classList.add("shooter")

function moveShooter(e){
    squares[currentShooterIndex].classList.remove("shooter")
    switch(e.key){
        case "ArrowLeft":
            if(currentShooterIndex%width !== 0){
                currentShooterIndex--
            }
            break
        case "ArrowRight":
            if(currentShooterIndex%width < width-1){
                currentShooterIndex++
            }
            break
    }
    squares[currentShooterIndex].classList.add("shooter")
}
document.addEventListener("keydown",moveShooter)

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length-1] % width === width-1
    remove()
    if (rightEdge && direction === 1){
        for(let i = 0; i<alienInvaders.length;i++){
            alienInvaders[i] += width-1
            direction = -1
        }
    }
    else if (leftEdge && direction === -1){
        for(let i = 0; i<alienInvaders.length;i++){
            alienInvaders[i] += width-1
            direction = 1
        }
    }
    for (let i = 0;i<alienInvaders.length;i++){
        alienInvaders[i]+=direction
    }
    draw()
    if (squares[currentShooterIndex].classList.contains("invader","shooter")){
    //alert("GAME OVER")
    resultDisplay.innerHTML= "GAME OVER"
    clearInterval(invaderId)}
        // TO DO 
    if(alienInvaders[alienInvaders.length-1] > squares.length){
        resultDisplay.innerHTML= "GAME OVER"
        clearInterval(invaderId)
    }

    if(alienInvaders.length===0){
        resultDisplay.textContent="YOU WIN"
        clearInterval(invaderId)
    }
}


invaderId = setInterval(moveInvaders,2000) 

function shoot(e){
    let laserId 
    let currentLaserIndex = currentShooterIndex
    function moveLaser(){
        squares[currentLaserIndex].classList.remove("laser")
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add("laser")

        if (squares[currentLaserIndex].classList.contains("invader")){
            squares[currentLaserIndex].classList.remove("laser")
            squares[currentLaserIndex].classList.remove("invader")
            squares[currentLaserIndex].classList.add("boom")

            setTimeout(()=> squares[currentLaserIndex].classList.remove("boom"),300)
            clearInterval(laserId)

            const alienRemoval = alienInvaders.indexOf(currentLaserIndex)
            score++
            scoreDisplay.textContent=score
            alienInvaders[alienRemoval].classList.remove("invader")
            alienInvaders.splice(alienRemoval, 1);
        }

        
    }
    switch (e.key){
        case "ArrowUp":
            laserId = setInterval(moveLaser, 100)
    }
}

document.addEventListener("keyup",shoot)