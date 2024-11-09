'use strict';

let winSize, canSize=[0,0];
let mazeSize, bitSize;

function windowResize(){
	winSize=[window.innerWidth,window.innerHeight];
	winSize.push(Math.min(winSize[0],winSize[1]));
	// console.log(winSize);
	if(winSize[2]>=540){
		canSize[0]=480;
		canSize[1]=480;
	}else{
		canSize[0]=(Math.floor(winSize[2]/12)-2)*12;
		canSize[1]=(Math.floor(winSize[2]/12)-2)*12;
	}
}

windowResize();
window.onresize = windowResize;

let maze=[], whites=[], r, result, history=[''], dHis, done=false, position, time=[], code='', decision;
let alpha=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

let recTime;
let started=0, direction, rotatingPosition=[];

document.getElementById('askSize').focus();
document.getElementById('returnSize').addEventListener('click',()=>{
	mazeSize=document.getElementById('askSize').value;
	if(['1','2','3','4','5',"１","２","３","４","５"].indexOf(mazeSize)>-1){
		if(['1','2','3','4','5'].indexOf(mazeSize)>-1){
			mazeSize=Number(mazeSize);
		}else{
			mazeSize=[1,2,3,4,5][["１","２","３","４","５"].indexOf(mazeSize)];
		}
		prepareMaze();
		startGame();
	}else{
		document.getElementById('chui').innerHTML='迷路の大きさ<span style="color:#f00;font-weight:bold;">(1~5)</span>';
		document.getElementById('askSize').focus();
	}
})
document.getElementById('askSize').addEventListener('keyup',(e)=>{
	if(['1','2','3','4','5',"１","２","３","４","５"].indexOf(askSize.value)>-1){
		document.getElementById('returnSize').classList.add('available');
		document.getElementById('chui').innerHTML='迷路の大きさ(1~5)';
	}else{
		document.getElementById('returnSize').classList.remove('available');
		if(askSize.value.length>0){
			document.getElementById('chui').innerHTML='迷路の大きさ<span style="color:#f00;font-weight:bold;">(1~5)</span>';
		}else{
			document.getElementById('chui').innerHTML='迷路の大きさ(1~5)';
		}
	}
	if(e.key=="Enter"){
		if(document.activeElement==document.getElementById('askSize')){
			mazeSize=document.getElementById('askSize').value;
			if(['1','2','3','4','5',"１","２","３","４","５"].indexOf(mazeSize)>-1){
				if(['1','2','3','4','5'].indexOf(mazeSize)>-1){
					mazeSize=Number(mazeSize);
				}else{
					mazeSize=[1,2,3,4,5][["１","２","３","４","５"].indexOf(mazeSize)];
				}
				prepareMaze();
				startGame();
			}
		}
	}
})

document.getElementById('codeHere').addEventListener('paste',()=>{
	setTimeout(() => {
		if(codeHere.value.length>0){
			document.getElementById('returnCode').classList.add('available');
		}else{
			document.getElementById('returnCode').classList.remove('available');
		}
	}, 50);
})
document.getElementById('codeHere').addEventListener('keyup',(e)=>{
	if(codeHere.value.length>0){
		document.getElementById('returnCode').classList.add('available');
		if(e.key=="Enter"){
			solveCode(codeHere.value);
			draw(false);
			startGame();
		}
	}else{
		document.getElementById('returnCode').classList.remove('available');
	}
})

document.getElementById('returnCode').addEventListener('click',()=>{
	if(document.getElementsByClassName('available').length>0){
		solveCode(codeHere.value);
		draw(false);
		startGame();
	}
})

function startGame(){
	document.getElementById('starting').classList.add('none');
	document.getElementById('gaming').classList.remove('none');
	position=mazeSize+1;
	document.getElementById("td1_1").textContent=":)";
	started=1;
	direction=0;
	time.push(Date.now());
}

function prepareMaze(){
	// abcde / fghij / klmno / pqrst / uvwxy / z
	code=alpha[5*Math.floor(Math.random()*5)+mazeSize-1];
	mazeSize=4*mazeSize+3;
	bitSize=canSize[0]/mazeSize;
	for(let i=0; i<mazeSize**2; i++){
		maze.push(false);
	}
	whites=[(2*Math.floor(Math.random()*Math.floor(mazeSize/2))+1)*mazeSize+2*Math.floor(Math.random()*Math.floor(mazeSize/2))+1];
	maze[whites[0]]=true;
	// maze[whites[0]]=1;
	// console.log(whites, Math.floor(whites[0]/mazeSize), whites[0]%mazeSize);
	repeat(null);
	// console.log(maze);
	for(let i=1; i<mazeSize-1; i++){
		for(let j=1; j<mazeSize-1; j++){
			if(i%2==0){
				// 白いとこを記録する(最大11個): 検証するjは奇数
				// abcdefghijk / lmnopqrstuv / wxyz
				if(maze[i*mazeSize+j]){
					code+=alpha[(j-1)/2+11*Math.floor(Math.random()*2)];
				}
				j++;
			}else if(i%4==1){
				// !(3個)と黒いとこ(最大10個)を記録する
				// abcdefghij / klmnopqrst / uvw / xyz
				if(j%2==1){
					// !
					if(i%8==(j+4)%8){
						code+=alpha[20+maze[i*mazeSize+j]-1];
					}
				}else{
					// 黒いとこ
					if(!maze[i*mazeSize+j]){
						code+=alpha[(j-2)/2+10*Math.floor(Math.random()*2)];
					}
				}
			}else{
				// i%4==3
				// 黒いとこを記録する(最大10個): 検証するjは偶数
				// abcdefghij / klmnopqrst / uvwxyz
				if(!maze[i*mazeSize+j]){
					code+=alpha[(j-2)/2+10*Math.floor(Math.random()*2)];
				}
			}
		}
		// 改行
		code+=alpha[23+Math.floor(Math.random()*3)]; // xyzのどれか
	}
}


function repeat(condition){
	if(condition==null){
		r=whites[Math.floor(Math.random()*whites.length)];
	}else{
		r=condition;
	}
	// console.log(Math.floor(r/mazeSize),r%mazeSize);
	result=check(r);
	// console.log(result);
	if(result.length>0){
		decision=result[Math.floor(Math.random()*result.length)];
		switch(decision){
			case 0:
				maze[r-mazeSize]=true;
				maze[r-2*mazeSize]=true;
				whites.push(r-2*mazeSize);
				break;
			
			case 1:
				maze[r+1]=true;
				maze[r+2]=true;
				whites.push(r+2);
				break;
			
			case 2:
				maze[r+mazeSize]=true;
				maze[r+2*mazeSize]=true;
				whites.push(r+2*mazeSize);
				break;
			
			default:
				maze[r-1]=true;
				maze[r-2]=true;
				whites.push(r-2);
				break;
		}
		// console.log(whites);
		repeat(whites[whites.length-1]);
	}else{
		whites.splice(whites.indexOf(r),1);
		// console.log(whites);
		if(whites.length>0){
			repeat(whites[Math.floor(Math.random()*whites.length)]);
		}else{
			draw(true);
		}
	}
}

function check(num){
	let result=[maze[num-2*mazeSize]==false, num%mazeSize<mazeSize-3 && maze[num+2]==false, maze[num+2*mazeSize]==false, 2<num%mazeSize && maze[num-2]==false]
	for(let i=0; i<4; i++){
		if(result[i]){
			result[i]=i;
		}
	}
	while(result.indexOf(false)>-1){
		result.splice(result.indexOf(false),1);
	}
	return result;
}

function draw(random){
	windowResize();
	bitSize=canSize[0]/mazeSize;
	for(let i=0; i<mazeSize; i++){
		const addTr=document.createElement('tr');
		addTr.setAttribute('id',`tr${i}`);
		document.getElementById('table').appendChild(addTr);
		for(let j=0; j<mazeSize; j++){
			const addTd=document.createElement('td');
			addTd.setAttribute("id",`td${i}_${j}`);
			addTd.style=`width:${bitSize}px; height:${bitSize}px; font-size:${0.8*bitSize}px;`;
			if(maze[i*mazeSize+j]==false){
				addTd.classList.add('black');
			}if(i==1 && j==1){
				addTd.innerHTML='<span style="color:#777;">|</span><span style="color:#0a5;">&gt;</span>';
				addTd.classList.add('startCell');
			}else if(i==mazeSize-2 && j==mazeSize-2){
				addTd.textContent='G';
				addTd.classList.add('goalCell');
			// }else if(i%8==(j+[4,0][Number(mazeSize==19)])%8 && (i%8)%4==1){
			}else if(i%8==(j+4)%8 && (i%8)%4==1){
				if(random){
					maze[i*mazeSize+j]=Math.floor(Math.random()*3)+1;  // 1,2,3
				}
				rotatingPosition.push(i*mazeSize+j);
				addTd.textContent="!";
			}
			document.getElementById(`tr${i}`).appendChild(addTd);
		}
	}
	// console.log(maze);
}

function findBranch(position){
	if(done){
		return;
	}else{
		if(position==mazeSize*(mazeSize-1)-2){
			done=true;
			// console.log('Finished!');
			// console.log(history);
			dHis='';
			for(let i=0; i<history.length; i++){
				dHis+=history[i];
			}
			return;
		}else{
			let result=[position>2*mazeSize && maze[position-mazeSize]!=false, position%mazeSize<mazeSize-1 && maze[position+1], position<mazeSize**2-3*mazeSize && maze[position+mazeSize]!=false, 1<position%mazeSize && maze[position-1]];
			// console.log(result);
			if(history[history.length-1].length>0){
					// console.log([2,3,0,1][history[history.length-1].charAt(history[history.length-1].length-1)]);
					result[[2,3,0,1][history[history.length-1].charAt(history[history.length-1].length-1)]]=false;
				// }else{
				// 	result[[2,3,0,1][history[history.length-2].charAt(history[history.length-2].length-1)]]=false;
				// }
			}
			// if(history.length>1 && history[history.length-1].length==1){
			// 	result[[2,3,0,1][history[history.length-1].charAt(history[history.length-1].length-1)]]=false;
			// }
			// console.log(result);
			for(let i=0; i<4; i++){
				if(result[i]){
					result[i]=i;
				}
			}
			while(result.indexOf(false)>-1){
				result.splice(result.indexOf(false),1);
			}
			// console.log(position, result);
			// console.log(result);
			switch(result.length){
				case 1:
					history[history.length-1]+=result[0];
					findBranch([position-2*mazeSize,position+2,position+2*mazeSize,position-2][result[0]]);
					break;
				case 2:
				case 3:
					// history.push(`${result[0]}`);
					// console.log(position, Math.floor(position/mazeSize), position%mazeSize);
					for(let i=0; i<result.length; i++){
						// console.log(`ただい!${result[i]}で実行中…${['','(これっぽいなあ)'][[false,true].indexOf(i==result.length-1)]}`);
						history.push(`${result[i]}`);
						findBranch([position-2*mazeSize,position+2,position+2*mazeSize,position-2][result[i]]);
						// result.splice(0,1);
					}
					history.splice(history.length-1,1);
					break;
				case 0:
					// console.log(history);
					// console.log(position);
					history.splice(history.length-1,1);
					// console.log(history);
					// findBranch(position);
					break;
				default:
					break;
			}
		}
	}
}

function drawOnConsole(){
	let pile='\n';
	for(let i=0; i<mazeSize; i++){
		for(let j=0; j<mazeSize; j++){
			if(!maze[i*mazeSize+j]){
				pile+='|||';
			}else if(i%2+j%2==1){
				pile+='   ';
			}else if(i==1 && j==1){
				pile+=' S ';
			}else if(i==mazeSize-2 && j==mazeSize-2){
				pile+=' G ';
			}else{
				pile+=` ${maze[i*mazeSize+j]} `;
			}
		}
		pile+='\n';
	}
	console.log(pile);
}


document.addEventListener("keydown",(e)=>{
	let arrowArr=["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"];
	if(arrowArr.indexOf(e.key)>=0){
		move(arrowArr.indexOf(e.key));
	}
})
for(let i=0; i<4; i++){
	let elm=document.getElementsByClassName("button")[i];
	elm.addEventListener("touchstart",(e)=>{
		e.preventDefault();
		move([0,3,1,2][i]);
		elm.classList.add("clicked");
	})
	elm.addEventListener("touchend",(e)=>{
		e.preventDefault();
		elm.classList.remove("clicked");
	})
}

function move(forwarDirection){
	let forwardPosition;
	if(started==1){
		forwarDirection=(forwarDirection+direction)%4;
		switch(forwarDirection){
			case 0:
				forwardPosition=position-mazeSize;
				break;
				
			case 1:
				forwardPosition=position+1;
				break;
				
			case 2:
				forwardPosition=position+mazeSize;
				break;
				
			case 3:
				forwardPosition=position-1;
				break;
		}
		if(0<Math.floor(forwardPosition/mazeSize) && Math.floor(forwardPosition/mazeSize)<mazeSize-1 && 0<forwardPosition%mazeSize && forwardPosition%mazeSize<mazeSize-1){
			if(maze[forwardPosition]!=false){
				if(position==mazeSize+1){
					document.getElementById(`td${Math.floor(position/mazeSize)}_${position%mazeSize}`).innerHTML='<span style="color:#777;">|</span><span style="color:#0a5;">&gt;</span>';
				}else if([1,2,3].indexOf(maze[position])>-1){
					document.getElementById(`td${Math.floor(position/mazeSize)}_${position%mazeSize}`).innerHTML="<span style='color:#ddd;'>!</span>";
				}else{
					document.getElementById(`td${Math.floor(position/mazeSize)}_${position%mazeSize}`).textContent="";
				}
				position=forwardPosition;
				document.getElementById(`td${Math.floor(forwardPosition/mazeSize)}_${forwardPosition%mazeSize}`).innerHTML="<span style='color:#0a5;'>:)</span>";
				if(position==mazeSize*(mazeSize-1)-2){
					time.push(Date.now());
					time.push(`${Math.round(time[1]-time[0])/1000}`);
					if(recTime==null){
						document.getElementById("resultTime").textContent=`Time: ${time[2]}s`;
					}else{
						document.getElementById("resultTime").innerHTML=`<span style="font-weight:bold;">Your Time: ${time[2]}s</span><br>Recorded Time: ${recTime}s`;
					}
					started=2;
					for(let i=0; i<time[2].length; i++){
						if(time[2].charAt(i)=='.'){
							code+=alpha[23+Math.floor(Math.random()*3)];
						}else{
							code+=alpha[10*Math.floor(Math.random()*2)+parseInt(time[2].charAt(i),10)];
						}
					}
					document.getElementById("code").textContent=code;
					if(recTime!=null){
						document.getElementById("codename").textContent="Pasted code:";
						document.getElementById("code").textContent=codeHere.value;
					}
					document.getElementById("navigation").classList.add("none");
					document.getElementById("result").classList.remove("none");
				}else if(rotatingPosition.indexOf(position)>-1){
					direction=(direction+maze[position])%4;
					rotatingPosition.splice(rotatingPosition.indexOf(position),1);
				}
			}	
		}
	}
}


function solveCode(code){
	mazeSize=alpha.indexOf(code.charAt(0))%5+1;
	mazeSize=4*mazeSize+3;
	maze=[];
	for(let j=0; j<mazeSize; j++){
		maze.push(false);
	}
	for(let i=0; i<(mazeSize-1)/2; i++){
		maze.push(false);
		for(let j=1; j<mazeSize-1; j++){
			maze.push(true);
		}
		maze.push(false);
		for(let j=0; j<mazeSize; j++){
			maze.push(false);
		}
	}
	// console.log(maze);
	let i=1;
	let cindex;
	let exNum=0;
	recTime="";
	for(let k=1; k<code.length; k++){
		cindex=alpha.indexOf(code.charAt(k));
		if(i<mazeSize-1){
			if(cindex>=23){
				i++;
				exNum=0;
				continue;
			}
			if(i%4==1){
				// abcdefghij / klmnopqrst / uvw / xyz
				if(cindex<20){
					// 黒いとこが記録されている
					maze[i*mazeSize+2*(cindex%10+1)]=false;
				}else{
					maze[i*mazeSize+8*exNum+6-i%8]=cindex-20+1;
					exNum++;
				}
			}else if(i%2==0){
				// 白いとこが記録されている
				// abcdefghijk / lmnopqrstuv / wxyz
				maze[i*mazeSize+2*(cindex%11)+1]=true;
			}else{
				// i%4==3
				// abcdefghij / klmnopqrst / uvwxyz
				maze[i*mazeSize+2*(cindex%10+1)]=false;
			}
		}else{
			// タイム
			if(cindex>22){
				recTime+='.';
			}
			recTime+=cindex%10;
		}
	}
	// console.log(maze);
}