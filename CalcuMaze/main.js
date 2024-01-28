'use strict';
{

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
	

	// canvasですが、使わん
	// const can=document.getElementById('canvas');
	// const ctx=can.getContext('2d');
	
	// console.log(winSize[2], winSize[2]>=600);
	// if(winSize[2]>=540){
	// 	can.width=480;
	// 	can.height=480;
	// }else{
	// 	can.width=(Math.floor(winSize[2]/12)-2)*12;
	// 	can.height=(Math.floor(winSize[2]/12)-2)*12;
	// }
	// // console.log(winSize);
	// // console.log(can.width);

	// ctx.fillStyle='pink';
	// ctx.fillRect(0,0,winSize[0],winSize[1]);

	let maze=[], whites=[], r, result, history=[''], dHis, done=false, position, sum=0, time=[], code='', decision, phase=0;
	let alpha=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	// abcdefghij / klmnopqrst / uv / wxyz

	for(let i=0; i<10; i++){
		const addKeyEmpty=document.createElement('div');
		addKeyEmpty.classList.add('keyEmpty');
		if(i>3){
			addKeyEmpty.classList.add('landscape');
		}
		document.getElementById('keyboard').appendChild(addKeyEmpty);
	}
	const addKeyDel=document.createElement('div');
	addKeyDel.setAttribute('id','keyDel');
	addKeyDel.textContent='< x';
	document.getElementById('keyboard').appendChild(addKeyDel);
	for(let i=0; i<10; i++){
		const addKey=document.createElement('div');
		addKey.setAttribute('id',`key${[1,2,3,4,5,6,7,8,9,0][i]}`);
		addKey.textContent=[1,2,3,4,5,6,7,8,9,0][i];
		document.getElementById('keyboard').appendChild(addKey);
	}

	document.getElementById('askSize').focus();
	document.getElementById('returnSize').addEventListener('click',()=>{
		mazeSize=parseInt(document.getElementById('askSize').value,10);
		if([1,2,3,4,5,6,7,8,9,10].indexOf(mazeSize)>-1){
			prepareMaze();
		}else{
			document.getElementById('chui').innerHTML='迷路の大きさ<span style="color:#f00;font-weight:bold;">(半角1~10)</span>';
			document.getElementById('askSize').focus();
		}
	})

	document.getElementById('askSize').addEventListener('keyup',(e)=>{
		if(e.key=="Enter"){
			let active=[document.getElementById('askSize'), document.activeElement];
			if(active[0]==active[1]){
				mazeSize=parseInt(document.getElementById('askSize').value,10);
				prepareMaze();
			}
		}
	})
	document.getElementById('askSize').addEventListener('keyup',(e)=>{
		if(['1','2','3','4','5','6','7','8','9','10'].indexOf(askSize.value)>-1){
			document.getElementById('returnSize').classList.add('available');
			document.getElementById('chui').innerHTML='迷路の大きさ(半角1~10)';
		}else{
			document.getElementById('returnSize').classList.remove('available');
			if(askSize.value.length>0){
				document.getElementById('chui').innerHTML='迷路の大きさ<span style="color:#f00;font-weight:bold;">(半角1~10)</span>';
			}else{
				document.getElementById('chui').innerHTML='迷路の大きさ(半角1~10)';
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
		}else{
			document.getElementById('returnCode').classList.remove('available');
		}
	})

	document.getElementById('returnCode').addEventListener('click',()=>{
		if(document.getElementsByClassName('available').length>0){
			solveCode(codeHere.value);
		}
	})

	function prepareMaze(){
		code=alpha[10*Math.floor(Math.random()*2)+mazeSize-1];
		mazeSize=2*(mazeSize+2)+1;
		bitSize=canSize[0]/mazeSize;
		document.getElementById('starting').classList.add('none');
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
					code+=[alpha[j-1],''][[true,false].indexOf(maze[i*mazeSize+j])];
				}else{
					if(j%2==0){
						code+=['',alpha[10*Math.floor(Math.random()*2)]][[true,false].indexOf(maze[i*mazeSize+j])];
					}else if((i!=1 || j!=1) && (i!=mazeSize-2 || j!=mazeSize-2)){
						code+=alpha[10*Math.floor(Math.random()*2)+maze[i*mazeSize+j]];
					}
				}
			}
			code+=alpha[23+Math.floor(Math.random()*3)];
		}
		// drawOnConsole();
		position=mazeSize+1;
		findBranch(position);
		// console.log(dHis);
		position=mazeSize+1;
		for(let i=0; i<dHis.length-1; i++){
			position+=[(-2)*mazeSize,2,2*mazeSize,-2][dHis.charAt(i)];
			sum+=maze[position];
		}
		// console.log(sum);

		document.getElementById('table').classList.remove('none');
		document.getElementById('answering').classList.remove('none');
		document.getElementById('answerSum').value='';
		phase=1;
		time.push(Date.now());
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

	function draw(bool){
		// ctx.fillStyle="#282523";
		// for(let i=0; i<mazeSize**2; i++){
		// 	if(maze[i]==0){
		// 		ctx.fillRect((i%mazeSize)*bitSize,Math.floor(i/mazeSize)*bitSize,bitSize,bitSize);
		// 	}
		// }
		windowResize();
		for(let i=0; i<mazeSize; i++){
			const addTr=document.createElement('tr');
			addTr.setAttribute('id',`tr${i}`);
			document.getElementById('table').appendChild(addTr);
			for(let j=0; j<mazeSize; j++){
				const addTd=document.createElement('td');
				addTd.style=`width:${bitSize}px; height:${bitSize}px; font-size:${0.8*bitSize}px;`;
				if(maze[i*mazeSize+j]==false){
					addTd.classList.add('black');
				}else if(i%2+j%2==2){
					if(i==1 && j==1){
						addTd.innerHTML='<span style="color:#777;">|</span><span style="color:#0a5;">\></span>';
						addTd.classList.add('startCell');
					}else if(i==mazeSize-2 && j==mazeSize-2){
						addTd.textContent='G';
						addTd.classList.add('goalCell');
					}else{
						if(bool){
							maze[i*mazeSize+j]=Math.floor(Math.random()*9)+1;
						}
						addTd.textContent=maze[i*mazeSize+j];
					}
				}
				document.getElementById(`tr${i}`).appendChild(addTd);
			}
		}
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
							// console.log(`ただいま${result[i]}で実行中…${['','(これっぽいなあ)'][[false,true].indexOf(i==result.length-1)]}`);
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

	for(let i=0; i<10; i++){
		document.getElementById(`key${[1,2,3,4,5,6,7,8,9,0][i]}`).addEventListener('click',()=>{
			document.getElementById('answerSum').value+=`${[1,2,3,4,5,6,7,8,9,0][i]}`;
		})
	}
	document.getElementById('keyDel').addEventListener('click',()=>{
		let answer=[answerSum.value,''];
		for(let i=0; i<answer[0].length-1; i++){
			answer[1]+=answer[0].charAt(i);
		}
		answerSum.value=answer[1];
	})
	document.addEventListener('keydown',(e)=>{
		let active=[document.getElementById('answerSum'),document.activeElement];
		if(['1','2','3','4','5','6','7','8','9','0'].indexOf(e.key)>-1){
			if(active[0]!=active[1]){
				document.getElementById('answerSum').value+=e.key;
			}
		}else if(e.key=="Backspace"){
			if(active[0]!=active[1]){
				let answer=[answerSum.value,''];
				for(let i=0; i<answer[0].length-1; i++){
					answer[1]+=answer[0].charAt(i);
				}
				answerSum.value=answer[1];
			}
		}else if(e.key=="Enter"){
			returnSum();
		}
	})
	document.getElementById('returnSum').addEventListener('click',()=>{
		returnSum();
	})

	function returnSum(){
		position=mazeSize+1;
		if(document.getElementById('answerSum').value==sum){
			time.push(Date.now());
			document.getElementById('answering').classList.add('none');
			for(let i=0; i<dHis.length; i++){
				for(let j=0; j<2; j++){
					document.querySelectorAll('td')[position].classList.add('selected');
					position+=[-mazeSize,1,mazeSize,-1][dHis.charAt(i)];
				}
			}
			time.push(`${Math.round(time[1]-time[0])/1000}`);
			document.getElementById('resultTime').textContent=`Time: ${time[2]}s`;
			for(let i=0; i<time[2].length; i++){
				if(time[2].charAt(i)=='.'){
					code+=alpha[23+Math.floor(Math.random()*3)];
				}else{
					code+=alpha[10*Math.floor(Math.random()*2)+parseInt(time[2].charAt(i),10)];
				}
			}
			document.getElementById('code').textContent='abcdefg';
			document.getElementById('result').classList.remove('none');
			// console.log(code);
			document.getElementById('code').textContent=code;
		}else{
			if(phase==1){
				document.getElementById('answerSum').classList.add('incorrect');
				document.getElementById('answerSum').addEventListener('animationend',(e)=>{
					document.getElementById('answerSum').classList.remove('incorrect');
				})
			}
		}
	}

	function solveCode(code){
		document.getElementById('starting').classList.add('none');
		// console.log(code);
		mazeSize=2*(alpha.indexOf(code.charAt(0))%10+3)+1;
		bitSize=canSize[0]/mazeSize;
		// console.log(mazeSize);
		for(let i=0; i<mazeSize; i++){
			for(let j=0; j<mazeSize; j++){
				maze.push([false,true][i%2]);
				if(j==0 || j==mazeSize-1){
					maze[i*mazeSize+j]=false;
				}
			}
		}
		let codes=[code.charAt(0),''];
		for(let i=1; i<code.length; i++){
			if(alpha.indexOf(code.charAt(i))>=23){
				codes.push('');
				continue;
			}
			codes[codes.length-1]+=code.charAt(i);
		}
		// console.log(codes);
		let exp;
		for(let i=1; i<codes.length; i++){
			if(i%2==1 || i==codes.length-2){
				exp='';
				for(let j=0; j<codes[i].length; j++){
					exp+=alpha.indexOf(codes[i].charAt(j))%10;
				}
				codes.splice(i,1,exp);
			}
		}
		// console.log(codes);
		let poj;
		for(let i=1; i<mazeSize-1; i++){
			if(i%2==0){
				for(let j=0; j<codes[i].length; j++){
					maze[i*mazeSize+parseInt(alpha.indexOf(codes[i].charAt(j)),10)+1]=true;
				}
			}else{
				let j=0;
				poj=2;
				if(i!=1 && codes[i].charAt(0)!='0'){
					maze[i*mazeSize+1]=parseInt(codes[i].charAt(j),10);
					j=1;
				}
				for(; j<codes[i].length; j++){
					maze[i*mazeSize+poj+1]=codes[i].charAt(j);
					if(codes[i].charAt(j)==0){
						maze[i*mazeSize+poj]=false;
					}else{
						poj=poj+2;
					}
				}
			}
		}
		maze[mazeSize*(mazeSize-1)-2]='g';
		// console.log(maze);
		// drawOnConsole();
		document.getElementById('table').classList.remove('none');
		document.getElementById('result').classList.remove('none');
		document.getElementById('resultTime').textContent=`Time: ${codes[codes.length-2]}.${codes[codes.length-1]}s`;
		document.getElementById('code').textContent=code;
		draw(false);
	}
}