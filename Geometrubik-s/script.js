'use strict';
{
	let colors;
	reset(0);

	let moratorium=0;
	let counting=0;

	function reset(mode){
		colors=[];
		for(let i=0; i<12; i++){
			if(3<=i && i<=5){
				for(let j=0; j<3; j++){
					for(let k=0; k<3; k++){
						if(mode==0){
							const newColor=document.createElement('td');
							newColor.classList.add('color');
							newColor.classList.add(['w','r','y'][(j)%3]);
							document.getElementById(`colorsHere${i}`).appendChild(newColor);
						}
						colors.push(['w','r','y'][(j)%3]);
					}
				}
			}else{
				for(let j=0; j<3; j++){
					if(mode==0){
						const newColor=document.createElement('td');
						newColor.classList.add('color');
						newColor.classList.add(['b','','g','o'][Math.floor(i/3)]);
						document.getElementById(`colorsHere${i}`).appendChild(newColor);
					}
					colors.push(['b','','g','o'][Math.floor(i/3)]);
				}
			}
		}
	}

	// ここから今だけ
	// const getColor=document.getElementsByClassName('color');
	// for(let i=0; i<getColor.length; i++){
	// 	getColor[i].textContent=i;
	// 	getColor[i].style='text-align:center; padding:6px;';
	// }
	// ここまで今だけ

	// console.log(colors);

	// const spots=[1,3,5,7,10,13,16,18,20,21,23,24,26,28,31,34,37,39,41,43,46,48,50,52];
	// const m_lr=[1,7,10,13,16,28,31,34,37,43,46,52];
	// const points=document.getElementsByClassName('color');
	// for(let i=0; i<54; i++){
	// 	document.getElementsByClassName('color')[i].classList.add('point');
	// }
	// for(let i=0; i<spots.length; i++){
	// document.getElementsByClassName('color')[spots[i]].addEventListener('click',()=>{
	// 	rmActive();
	// 	document.getElementsByClassName('color')[spots[i]].classList.add('active');
	// })
	// }

	function rmActive(){
		const activer=document.getElementsByClassName('active');
		for(let i=0; i<activer.length; i++){
			activer[0].classList.remove('active');
		}
	}

	// 縦
	const pL=[0,3,6,12,21,30,36,39,42,45,48,51];
	const pM=[1,4,7,13,22,31,37,40,43,46,49,52];
	const pR=[2,5,8,14,23,32,38,41,44,47,50,53];
	// 横
	const pU=[9,10,11,12,13,14,15,16,17,53,52,51];
	const pE=[18,19,20,21,22,23,24,25,26,50,49,48];
	const pD=[27,28,29,30,31,32,33,34,35,47,46,45];
	// 反抗期
	const pB=[0,1,2,17,26,35,44,43,42,27,18,9];
	const pS=[3,4,5,16,25,34,41,40,39,28,19,10];
	const pF=[6,7,8,15,24,33,38,37,36,29,20,11];

	let sPosition=[];
	let ePosition=[];
	const distance=30;
	let direction;

	let winSize;
	windowLoad();
	window.onresize=windowLoad;
	function windowLoad(){
		winSize=[window.innerWidth,window.innerHeight];
	}

	let oneSpot=document.getElementsByClassName('color');
	for(let i=0; i<54; i++){
		oneSpot[i].addEventListener('touchstart',(event) =>{
			event.preventDefault();
			sPosition=[Math.round(event.touches[0].pageX),Math.round(event.touches[0].pageY)];
		})
		// oneSpot[i].addEventListener("touchmove",(event)=>{
		// event.preventDefault();
		// ePosition=[event.changedTouches[0].pageX, event.changedTouches[0].pageY];
		// })
		oneSpot[i].addEventListener("touchend",(event) =>{
			ePosition=[Math.round(event.changedTouches[0].pageX),Math.round(event.changedTouches[0].pageY)];
			positionCheck(ePosition);
			// console.log(`(${sPosition}) => (${ePosition})`);
			// console.log(`(${sPosition}) => (${ePosition})`);
			// document.getElementById('output').textContent=`(${sPosition}) => (${ePosition})`;
			if(Math.abs(sPosition[0]-ePosition[0])>Math.abs(sPosition[1]-ePosition[1])){
				if(ePosition[0]<sPosition[0] && ePosition[0]+distance<sPosition[0]){
					// 右から左にスワイプ (←)
					direction='toLeft';
					// console.log(`(${sPosition}) => (${ePosition}), ←`);
				}else if(sPosition[0]<ePosition[0] && sPosition[0]+distance<ePosition[0]){
					// 左から右にスワイプ (→)
					direction='toRight';
					// console.log(`(${sPosition}) => (${ePosition}), →`);
				}else{
					direction='/(^0^)/';
				}
				if(direction!='/(^0^)/'){
					if(pU.indexOf(i)>-1){
						pattern(pU,direction,i);
					}else if(pE.indexOf(i)>-1){
						pattern(pE,direction,i);
					}else if(pD.indexOf(i)>-1){
						pattern(pD,direction,i);
					}else if(pB.indexOf(i)>-1){
						pattern(pB,direction,i);
					}else if(pS.indexOf(i)>-1){
						pattern(pS,direction,i);
					}else{
						pattern(pF,direction,i);
					}
				}
			}else if(Math.abs(sPosition[0]-ePosition[0])<Math.abs(sPosition[1]-ePosition[1])){
				if(sPosition[1]>ePosition[1] && sPosition[1]>ePosition[1]+distance){
					// 下から上にスワイプ (↑)
					// console.log(`(${sPosition}) => (${ePosition}), ↑`);
					direction='toUp';
				}else if(sPosition[1]<ePosition[1] && sPosition[1]+distance<ePosition[1]){
					// 上から下にスワイプ (↓)
					// console.log(`(${sPosition}) => (${ePosition}), ↓`);
					direction='toDown';
				}else{
					direction='/(^0^)/';
				}
				if(direction!='/(^0^)/'){
					// pL, pM, pR にあればうれしいな
					if(pL.indexOf(i)>-1){
						pattern(pL,direction,i);
					}else if(pM.indexOf(i)>-1){
						pattern(pM,direction,i);
					}else if(pR.indexOf(i)>-1){
						pattern(pR,direction,i);
					}else if(pB.indexOf(i)>-1){
						pattern(pB,direction,i);
					}else if(pS.indexOf(i)>-1){
						pattern(pS,direction,i);
					}else{
						pattern(pF,direction,i);
					}
				}
			}
			// console.log(colors);
		})
	}

	function positionCheck(position){
		if(position[0]<0){
			position[0]=0;
		}else{
			position[0]=Math.min(position[0],winSize[0]);
		}
		if(position[1]<0){
			position[1]=0;
		}else{
			position[1]=Math.min(position[1],winSize[1]);
		}
	}

	function pattern(cmd,dir,spotNum){
		let hokan;
		if(moratorium==0){
			// console.log(cmd);
			if(cmd==pL || cmd==pM || cmd==pR){
				if(dir=='toUp'){
					hokan=[colors[cmd[0]],colors[cmd[1]],colors[cmd[2]]];
					for(let i=0; i<9; i++){
						colors[cmd[i]]=colors[cmd[i+3]];
					}
					for(let i=0; i<3; i++){
						colors[cmd[i+9]]=hokan[i];
					}
					if(cmd==pL){
						hokan=[colors[9],colors[10]];
						colors[9]=colors[11];
						colors[10]=colors[20];
						colors[11]=colors[29];
						colors[20]=colors[28];
						colors[29]=colors[27];
						colors[28]=colors[18];
						colors[27]=hokan[0];
						colors[18]=hokan[1];
					}else if(cmd==pR){
						hokan=[colors[17],colors[16]];
						colors[17]=colors[15];
						colors[16]=colors[24];
						colors[15]=colors[33];
						colors[24]=colors[34];
						colors[33]=colors[35];
						colors[34]=colors[26];
						colors[35]=hokan[0];
						colors[26]=hokan[1];
					}
				}else{
					hokan=[colors[cmd[9]],colors[cmd[10]],colors[cmd[11]]];
					for(let i=0; i<3; i++){
						for(let j=0; j<3; j++){
							colors[cmd[3*(3-i)+j]]=colors[cmd[3*(2-i)+j]];
						}
					}
					for(let i=0; i<3; i++){
						colors[cmd[i]]=hokan[i];
					}
					if(cmd==pL){
						hokan=[colors[11],colors[10]];
						colors[11]=colors[9];
						colors[10]=colors[18];
						colors[9]=colors[27];
						colors[18]=colors[28];
						colors[27]=colors[29];
						colors[28]=colors[20];
						colors[29]=hokan[0];
						colors[20]=hokan[1];
					}else if(cmd==pR){
						hokan=[colors[15],colors[16]];
						colors[15]=colors[17];
						colors[16]=colors[26];
						colors[17]=colors[35];
						colors[26]=colors[34];
						colors[35]=colors[33];
						colors[34]=colors[24];
						colors[33]=hokan[0];
						colors[24]=hokan[1];
					}
				}
			}else if(cmd==pU || cmd==pE || cmd==pD){
				// console.log(dir=='toRight');
				if(cmd==pU){
					if((dir=='toLeft' && [51,52,53].indexOf(spotNum)<0) || (dir=='toRight' && [51,52,53].indexOf(spotNum)>-1)){
						hokan=[colors[pU[0]],colors[pU[1]],colors[pU[2]]];
						for(let i=0; i<9; i++){
							colors[pU[i]]=colors[pU[i+3]];
						}
						for(let i=0; i<3; i++){
							colors[pU[i+9]]=hokan[i];
						}
						hokan=[colors[2],colors[1]];
						colors[2]=colors[0];
						colors[1]=colors[3];
						colors[0]=colors[6];
						colors[3]=colors[7];
						colors[6]=colors[8];
						colors[7]=colors[5];
						colors[8]=hokan[0];
						colors[5]=hokan[1];
					}else{
						hokan=[colors[pU[9]],colors[pU[10]],colors[pU[11]]];
						for(let i=0; i<9; i++){
							colors[pU[11-i]]=colors[pU[8-i]];
						}
						for(let i=0; i<3; i++){
							colors[pU[i]]=hokan[i];
						}
						hokan=[colors[0],colors[1]];
						colors[0]=colors[2];
						colors[1]=colors[5];
						colors[2]=colors[8];
						colors[5]=colors[7];
						colors[8]=colors[6];
						colors[7]=colors[3];
						colors[6]=hokan[0];
						colors[3]=hokan[1];
					}
				}else if(cmd==pD){
					if((dir=='toLeft' && [45,46,47].indexOf(spotNum)<0) || (dir=='toRight' && [45,46,47].indexOf(spotNum)>-1)){
						hokan=[colors[pD[0]],colors[pD[1]],colors[pD[2]]];
						for(let i=0; i<9; i++){
							colors[pD[i]]=colors[pD[i+3]];
						}
						for(let i=0; i<3; i++){
							colors[pD[i+9]]=hokan[i];
						}
						hokan=[colors[36],colors[37]];
						colors[36]=colors[38];
						colors[37]=colors[41];
						colors[38]=colors[44];
						colors[41]=colors[43];
						colors[44]=colors[42];
						colors[43]=colors[39];
						colors[42]=hokan[0];
						colors[39]=hokan[1];
					}else{
						hokan=[colors[pD[9]],colors[pD[10]],colors[pD[11]]];
						for(let i=0; i<9; i++){
							colors[pD[11-i]]=colors[pD[8-i]];
						}
						for(let i=0; i<3; i++){
							colors[pD[i]]=hokan[i];
						}
						hokan=[colors[38],colors[37]];
						colors[38]=colors[36];
						colors[37]=colors[39];
						colors[36]=colors[42];
						colors[39]=colors[43];
						colors[42]=colors[44];
						colors[43]=colors[41];
						colors[44]=hokan[0];
						colors[41]=hokan[1];
					}
				}else{
					if((dir=='toLeft' && [48,49,50].indexOf(spotNum)<0) || (dir=='toRight' && [48,49,50].indexOf(spotNum)>-1)){
						hokan=[colors[pE[0]],colors[pE[1]],colors[pE[2]]];
						for(let i=0; i<9; i++){
							colors[pE[i]]=colors[pE[i+3]];
						}
						for(let i=0; i<3; i++){
							colors[pE[i+9]]=hokan[i];
						}
					}else{
						hokan=[colors[pE[9]],colors[pE[10]],colors[pE[11]]];
						for(let i=0; i<9; i++){
							colors[pE[11-i]]=colors[pE[8-i]];
						}
						for(let i=0; i<3; i++){
							colors[pE[i]]=hokan[i];
						}
					}
				}
			}else if(cmd==pB || cmd==pS || cmd==pF){
				if(cmd==pB){
					if(([0,1,2].indexOf(spotNum)>-1 && direction=='toLeft') || ([9,18,27].indexOf(spotNum)>-1 && direction=='toDown') || ([42,43,44].indexOf(spotNum)>-1 && direction=='toRight') || ([17,26,35].indexOf(spotNum)>-1 && direction=='toUp')){
						hokan=[colors[pB[0]],colors[pB[1]],colors[pB[2]]];
						for(let i=0; i<9; i++){
							colors[pB[i]]=colors[pB[i+3]];
						}
						for(let i=0; i<3; i++){
							colors[pB[i+9]]=hokan[i];
						}
						hokan=[colors[47],colors[46]];
						colors[47]=colors[45];
						colors[46]=colors[48];
						colors[45]=colors[51];
						colors[48]=colors[52];
						colors[51]=colors[53];
						colors[52]=colors[50];
						colors[53]=hokan[0];
						colors[50]=hokan[1];
					}else{
						hokan=[colors[pB[9]],colors[pB[10]],colors[pB[11]]];
						for(let i=0; i<9; i++){
							colors[pB[11-i]]=colors[pB[8-i]];
						}
						for(let i=0; i<3; i++){
							colors[pB[i]]=hokan[i];
						}
						hokan=[colors[45],colors[46]];
						colors[45]=colors[47];
						colors[46]=colors[50];
						colors[47]=colors[53];
						colors[50]=colors[52];
						colors[53]=colors[51];
						colors[52]=colors[48];
						colors[51]=hokan[0];
						colors[48]=hokan[1];
					}
				}else if(cmd==pF){
					if(([6,7,8].indexOf(spotNum)>-1 && direction=='toLeft') || ([11,20,29].indexOf(spotNum)>-1 && direction=='toDown') || ([36,37,38].indexOf(spotNum)>-1 && direction=='toRight') || ([15,24,33].indexOf(spotNum)>-1 && direction=='toUp')){
						hokan=[colors[pF[0]],colors[pF[1]],colors[pF[2]]];
						for(let i=0; i<9; i++){
							colors[pF[i]]=colors[pF[i+3]];
						}
						for(let i=0; i<3; i++){
							colors[pF[i+9]]=hokan[i];
						}
						hokan=[colors[12],colors[13]];
						colors[12]=colors[14];
						colors[13]=colors[23];
						colors[14]=colors[32];
						colors[23]=colors[31];
						colors[32]=colors[30];
						colors[31]=colors[21];
						colors[30]=hokan[0];
						colors[21]=hokan[1];
					}else{
						hokan=[colors[pF[9]],colors[pF[10]],colors[pF[11]]];
						for(let i=0; i<9; i++){
							colors[pF[11-i]]=colors[pF[8-i]];
						}
						for(let i=0; i<3; i++){
							colors[pF[i]]=hokan[i];
						}
						hokan=[colors[14],colors[13]];
						colors[14]=colors[12];
						colors[13]=colors[21];
						colors[12]=colors[30];
						colors[21]=colors[31];
						colors[30]=colors[32];
						colors[31]=colors[23];
						colors[32]=hokan[0];
						colors[23]=hokan[1];
					}
				}else{
					if(([3,4,5].indexOf(spotNum)>-1 && direction=='toLeft') || ([10,19,28].indexOf(spotNum)>-1 && direction=='toDown') || ([39,40,41].indexOf(spotNum)>-1 && direction=='toRight') || ([16,25,34].indexOf(spotNum)>-1 && direction=='toUp')){
						hokan=[colors[pS[0]],colors[pS[1]],colors[pS[2]]];
						for(let i=0; i<9; i++){
							colors[pS[i]]=colors[pS[i+3]];
						}
						for(let i=0; i<3; i++){
							colors[pS[i+9]]=hokan[i];
						}
					}else{
						hokan=[colors[pS[9]],colors[pS[10]],colors[pS[11]]];
						for(let i=0; i<9; i++){
							colors[pS[11-i]]=colors[pS[8-i]];
						}
						for(let i=0; i<3; i++){
							colors[pS[i]]=hokan[i];
						}
					}
				}
			}
			// console.log(colors);
			$('.color').removeClass().addClass('color');
			for(let i=0; i<54; i++){
				document.getElementsByClassName('color')[i].classList.add(colors[i]);
			}
		}
	}

	// document.addEventListener('keydown',(event)=>{
	// 	if(`${event.key}`=='s' || `${event.key}`=='LeftArrow'){
	// 		// ←
	// 		// const jq=jQuery(":hover")[jQuery(":hover").length-1];
	// 		// if(jq==points[13]){
	// 		// 	// console.log('おぉぉっけぇぇぇぇ');
	// 		// }
	// 	}else if( `${event.key}`=='f' || `${event.key}`=='RightArrow'){
	// 		// →
	// 	}else if(`${event.key}`=='e' || `${event.key}`=='UpArrow'){
	// 		// ↑
	// 	}else if(`${event.key}`=='d' || `${event.key}`=='DownArrow'){
	// 		// ↓
	// 	}
	// })

	document.getElementById('hamburger').addEventListener('click',()=>{
		menu_toggle();
	})
	document.getElementById('hider').addEventListener('click',()=>{
		menu_toggle();
	})
	function menu_toggle(){
		document.getElementById('hamburger').classList.toggle('fa-bars');
		document.getElementById('hamburger').classList.toggle('fa-times');
		document.getElementById('hider').classList.toggle('none');
		document.getElementById('hamburger_menu').classList.toggle('none');
	}

	function randomScramble(){
		moratorium=0;
		let rs;
		for(let i=0; i<25; i++){
			rs=[[pR,pM,pL,pU,pE,pD,pF,pS,pB][Math.floor(Math.random()*9)], Math.floor(Math.random()*3)+1];
			rs.push(Math.floor(Math.random()*rs[0].length));
			rs.push(rs[0][rs[2]]);
			for(let j=0; j<rs[1]; j++){
				if(rs[0]<3){
					pattern(rs[0],'toUp',rs[3]);
				}else if(rs[0]<6){
					pattern(rs[0],'toLeft',rs[3]);
				}else{
					pattern(rs[0],`to${['Left','Up'][Math.floor(rs[2]/3)%3]}`,rs[3]);
				}
			}
		}
		// console.log(colors);
	}
	
	document.getElementById('menuScramble').addEventListener('click',()=>{
		counting=0;
		document.getElementById('timer').classList.add('none');
		document.getElementById('title').classList.remove('none');
		randomScramble();
		menu_toggle();
	})
	document.getElementById('menuReset').addEventListener('click',()=>{
		counting=0;
		moratorium=0;
		document.getElementById('timer').classList.add('none');
		document.getElementById('title').classList.remove('none');
		$('.color').removeClass().addClass('color');
		reset(1);
		for(let i=0; i<54; i++){
			document.getElementsByClassName('color')[i].classList.add(colors[i]);
		}
		menu_toggle();
	})
	let startTime;
	let stopTimer=0;
	document.getElementById('menuTimer').addEventListener('click',()=>{
		stopTimer=1;
		counting=0; // !important
		randomScramble();
		menu_toggle();
		document.getElementById('title').classList.add('none');
		document.getElementById('timer').innerHTML='15.<span id="timer_small">00</span>';
		document.getElementById('timer').classList.remove('none');
		document.getElementById('timer').classList.remove('solved');
		document.getElementById('wallpaper').classList.add('none');
		moratorium=1;
		document.getElementById('wallpaper').textContent='Inspection Time';
		document.getElementById('wallpaper').classList.remove('none');
		setTimeout(() => {
			document.getElementById('wallpaper').classList.add('none');
			counting=1; // !important
			startTime=Date.now();
			timer_moratorium();
		}, 2000);
	})

	function timer_moratorium(){
		if(counting==1){
			// let nowTime=new Date();
			// let timeData=[nowTime.getHours(),nowTime.getMinutes(),nowTime.getSeconds(),nowTime.getMilliseconds()];
			// console.log(nowTime);
			// console.log(nowTime + 15);
			let millitime=15000-Date.now()+startTime;
			document.getElementById('timer').innerHTML=`${Math.floor(millitime/1000)}.<span id="timer_small">${('00'+Math.floor(((millitime/1000)-Math.floor(millitime/1000))*100)).slice(-2)}</span>`;
			if(counting==1 && startTime+15000>Date.now()){
				setTimeout(() => {
					timer_moratorium();
				}, 18);
			}else{
				moratorium=0;
				document.getElementById('timer').innerHTML='0.<span id="timer_small">00</span>';
				document.getElementById('wallpaper').textContent='Start!';
				document.getElementById('wallpaper').classList.remove('none');
				setTimeout(() => {
					document.getElementById('wallpaper').classList.add('none');
					startTime=Date.now();
					timer_count();
				}, 1000);
			}
		}
	}

	function timer_count(){
		let millitime=Date.now()-startTime;
		document.getElementById('timer').innerHTML=`${Math.floor(millitime/1000)}.<span id="timer_small">${('00'+Math.floor(((millitime/1000)-Math.floor(millitime/1000))*100)).slice(-2)}</span>`;
		let solvedCheck=0;
		for(let i=0; i<5; i++){
			if(i==0 || i==4){
				// console.log(9*i);
				for(let j=1; j<9; j++){
					if(colors[9*i]==colors[9*i+j]){
						solvedCheck++;
						// console.log(`${colors[9*i]==colors[9*i+j]} (i,j)=(${i},${j}) ${9*i+j} ${solvedCheck}`);
					}else{
						// console.log(`${colors[9*i]==colors[9*i+j]} (i,j)=(${i},${j}) ${9*i+j} ${solvedCheck}`);
						break;
					}
				}
				// console.log('--- END ---');
				if(solvedCheck%8>0){
					break;
				}
			}else if(i==1){
				// console.log(9*i);
				for(let j=0; j<3; j++){
					for(let k=0; k<3; k++){
						for(let l=0; l<3; l++){
							if(colors[3*j+9*i]==colors[3*j+9*i+9*k+l]){
								solvedCheck++;
								// console.log(`${colors[3*j+9*i]==colors[3*j+9*i+9*k+l]} (i,j,k,l)=(${i},${j},${k},${l}) ${3*j+9*i+9*k+l} ${solvedCheck}`);
							}else{
								// console.log(`${colors[3*j+9*i]==colors[3*j+9*i+9*k+l]} (i,j,k,l)=(${i},${j},${k},${l}) ${3*j+9*i+9*k+l} ${solvedCheck}`);
								break;
							}
						}
						// console.log(solvedCheck);
						// console.log(11+8*j+3*k);
						if(solvedCheck!=11+8*j+3*k){
							break;
						}
					}
					if(solvedCheck%8==1 && solvedCheck==17+8*j){
						solvedCheck--;
						// console.log(solvedCheck);
					}else{
						break;
					}
				}
			}
		}
		// console.log(solvedCheck);
		if(counting==1 && solvedCheck<40){
			stopTimer=0;
			setTimeout(() => {
				timer_count();
			}, 16);
		}else{
			if(stopTimer==0){
				document.getElementById('timer').classList.add('solved');
			}else{
				stopTimer=0;
				document.getElementById('timer').innerHTML='15.<span id="timer_small">00</span>';
				document.getElementById('timer').classList.remove('none');
				document.getElementById('timer').classList.remove('solved');
			}
		}
	}

	// document.addEventListener('keydown',(event)=>{
	// 	// console.log(`${event.key}`,`${event.key}`=='Enter');
	// 	if(`${event.key}`=='Enter'){
	// 		reset(1);
	// 		$('.color').removeClass().addClass('color');
	// 		for(let i=0; i<54; i++){
	// 			document.getElementsByClassName('color')[i].classList.add(colors[i]);
	// 		}
	// 		// console.log(colors);
	// 		// timer_count();
	// 	}
	// })

}