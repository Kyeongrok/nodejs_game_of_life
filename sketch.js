const make2DArray = (cols, rows)=>{
	let arr = new Array(cols)
	for(let i = 0; i <arr.length; i++){
		arr[i] = new Array(rows)
	}
	return arr
}

let grid
let cols = 10
let rows = 10
let resolution = 10

function setup(){
	createCanvas(600, 400)
	console.log(width, height)
	cols = width / resolution
	rows = height / resolution

	grid = make2DArray(cols, rows)
	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){

			// grid[i][j] = Math.floor(Math.random()*2)
			grid[i][j] = 0
		}
	}
	// grid[19][19] = 1
	// grid[20][18] = 1
	// grid[20][19] = 1
	// grid[20][20] = 1
	// grid[21][19] = 1

	grid[1][2] = 1
	grid[2][3] = 1
	grid[3][1] = 1
	grid[3][2] = 1
	grid[3][3] = 1

	console.log(grid)
	console.table(grid)
}



function draw(){
	background(0)
	// random하게 채운 사각형 그리기
	for(let i = 0; i < cols; i++){
		for(let j = 0; j < rows; j++){
			let x = i * resolution
			let y = j * resolution
			if(grid[i][j] == 1){
				fill(255)
				stroke(0)
				rect(x, y, resolution-1, resolution-2)
			}
		}
	}

	// state결정하기
	let next = make2DArray(cols, width)
	
	for(let i = 0; i<cols; i++){
		for(let j = 0; j<rows; j++){
			let state = grid[i][j]

			if(i == 0 || i == cols - 1 || j == 0 || j == rows - 1){
				next[i][j] = state
			}else{
				let neighbors = countNeighbors(grid, i, j)

				if(state == 0 && neighbors ==3){
					next[i][j] = 1
				}else if(state == 1 && (neighbors < 2 || neighbors > 3)){
					next[i][j] = 0
				}else {
					next[i][j] = state
				}
			}
		}
	}
	grid = next
}

const countNeighbors = (grid, x, y) =>{
	let sum = 0
	for(let i = -1; i < 2; i++){
		for(let j = -1; j < 2; j++){
			sum += grid[x + i][y + j]
		}
	}
	sum -= grid[x][y];
	return sum
}



