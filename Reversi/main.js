"use strict";

let board,pN,pC,opC,turn,code;
let pass=[0,0];
let alph=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','0','1','2','3','4','5','6','7'];
prepareBoard();

let howManyPlayer;
document.getElementById("onePlayer").addEventListener("click",()=>{
	howManyPlayer=1;
	document.getElementById("howManyPlayers").classList.add("none");
	document.getElementById("buttons").classList.remove("none");
})
document.getElementById("twoPlayers").addEventListener("click",()=>{
	howManyPlayer=2;
	document.getElementById("howManyPlayers").classList.add("none");
	document.querySelector('h1').classList.add('none');
	document.getElementById('codeTeam').classList.add('none');
	document.getElementById('gaming').classList.remove('none');
	pN=0;
	pC='b';
	opC='w';
	code=`${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*10)}z`;
	myTurn();
})

for(let i=0; i<2; i++){
	document.getElementById(`start${i}`).addEventListener('click',()=>{
		pN=i;
		pC=['b','w'][pN];
		opC=['b','w'][1-pN];
		secretCode();
		document.querySelector('h1').classList.add('none');
		document.getElementById('buttons').classList.add('none');
		document.getElementById('codeTeam').classList.add('none');
		document.getElementById('gaming').classList.remove('none');
		if(pN==1){
			comsTurn();
		}else{
			myTurn();
		}
	})
}
document.getElementById('putCode').addEventListener('paste',()=>{
	setTimeout(() => {
		if(putCode.value.length>0){
			document.getElementById('returnCode').classList.add('available');
		}else{
			document.getElementById('returnCode').classList.remove('available');
		}
	}, 50);
})
document.getElementById('putCode').addEventListener('keyup',(e)=>{
	if(putCode.value.length>0){
		document.getElementById('returnCode').classList.add('available');
	}else{
		document.getElementById('returnCode').classList.remove('available');
	}
})

document.getElementById('returnCode').addEventListener('click',()=>{
	if(document.getElementsByClassName('available').length>0){
		code=putCode.value;
		document.getElementById('moverCode').textContent=code;
		solveCode();
		document.getElementById('mover').classList.remove('none');
		document.querySelector('h1').classList.add('none');
		document.getElementById('howManyPlayers').classList.add('none');
		document.getElementById('buttons').classList.add('none');
		document.getElementById('gaming').classList.remove('none');
		document.getElementById('codeTeam').classList.add('none');
	}
})

function prepareBoard(){
	board=[];
	for(let i=0; i<8; i++){
		const addTr=document.createElement('tr');
		addTr.classList.add('boardTr');
		document.getElementById('board').appendChild(addTr);
		board.push(['','','','','','','','']);
		for(let j=0; j<8; j++){
			const addTd=document.createElement('td');
			addTd.setAttribute('id',`td${i}-${j}`);
			addTd.innerHTML=`<div class="c" id="c${i}-${j}"></div>`;
			document.getElementsByClassName('boardTr')[i].appendChild(addTd);
		}
	}
	change(3,3,'w',true);
	change(3,4,'b',true);
	change(4,3,'b',true);
	change(4,4,'w',true);
	turn=0;
	// drawOnconsole(board);
}

let possiposi;

function myTurn(){
	// let r=Math.floor(Math.random()*65536);
	if(howManyPlayer==1){
		document.getElementById('comment').textContent="Your turn!";
	}else{
		document.getElementById('comment').textContent=`${["Black","White"][turn]}'s turn`;
	}
	possiposi=[];
	for(let i=0; i<8; i++){
		for(let j=0; j<8; j++){
			if(board[i][j]==''){
				if(check(i,j,pC,opC)){
					possiposi.push([i,j]);
					document.getElementById(`td${i}-${j}`).addEventListener('click',()=>{
						if(turn==pN){
							if(board[i][j]==''){
								if(check(i,j,pC,opC)){
									// console.log(i,j);
									add(i,j,pC,true);
									code+=`${alph[8*Math.floor(Math.random()*4)+i]}${alph[8*Math.floor(Math.random()*4)+j]}`;
									pass[turn]=0;
									turn=1-turn;
									if(howManyPlayer==1){
										comsTurn();
									}else{
										pN=1-pN;
										pC=['b','w'][pN];
										opC=['b','w'][1-pN];
										myTurn();
									}
								}
							}
						}
					})
				}
			}
		}
	}
	// console.log(/*r,*/possiposi);
	if(possiposi.length==0){
		pass[turn]=1;
		if(pass[1-turn]==1){
			// console.log(code);
			if(`${code.charAt(code.length-2)}${code.charAt(code.length-1)}`=="yz"){
				let backpack=code;
				code="";
				// console.log(backpack);
				for(let i=0; i<backpack.length-2; i++){
					code+=backpack.charAt(i);
				}
				// console.log(code);
			}
			result(true);
		}else{
			code+="yz";
			// console.log(r,pass);
			// console.log(r,'you: pass');
			turn=1-turn;
			if(howManyPlayer==1){
				comsTurn();
			}else{
				pN=1-pN;
				pC=['b','w'][pN];
				opC=['b','w'][1-pN];
				myTurn();
			}
		}
		return;
	}
}

function comsTurn(){
	// drawOnconsole(board);
	if(howManyPlayer){
		document.getElementById('comment').textContent="COM's turn...";
	}else{
		document.getElementById('comment').textContent="White's turn";
	}
	setTimeout(() => {
		// console.log('Hi!');
		possiposi=[];
		for(let i=0; i<8; i++){
			for(let j=0; j<8; j++){
				if(board[i][j]==''){
					if(check(i,j,opC,pC)){
						possiposi.push([i,j]);
					}
				}
			}
		}
		// console.log(possiposi);
		if(possiposi.length>0){
			cornerCheck();
			// getEdge();
			let r=Math.floor(Math.random()*possiposi.length);
			add(possiposi[r][0],possiposi[r][1],opC,true);
			code+=`${alph[8*Math.floor(Math.random()*4)+possiposi[r][0]]}${alph[8*Math.floor(Math.random()*4)+possiposi[r][1]]}`;
			pass[turn]=0;
			turn=1-turn;
			myTurn();
		}else{
			pass[turn]=1;
			if(pass[1-turn]==1){
				// console.log(code);
				if(`${code.charAt(code.length-2)}${code.charAt(code.length-1)}`=="yz"){
					let backpack=code;
					code="";
					// console.log(backpack);
					for(let i=0; i<backpack.length-2; i++){
						code+=backpack.charAt(i);
					}
					// console.log(code);
				}
				result(true);
				return;
			}else{
				code+="yz";
				// console.log('com: pass');
				turn=1-turn;
				myTurn();
			}
		}
		// drawOnconsole(board);
	}, 10);
}

function cornerCheck(){
	let copy=copy2dArray(possiposi);
	for(let i=0; i<copy.length; i++){
		if([0,7].indexOf(copy[i][0])<0 || [0,7].indexOf(copy[i][1])<0){
			copy.splice(i,1);
			i--;
		}
	}
	if(copy.length>0){
		possiposi=copy2dArray(copy);
	}else{
		attentionYellow();
		preCornerCheck();
		redX();
	}
}

function preCornerCheck(){
	let copyPosi=copy2dArray(possiposi);
	let copyBoard=copy2dArray(board);
	let bbool,bool;
	for(let i=0; i<possiposi.length; i++){
		bbool=[check(0,0,pC,opC),check(0,7,pC,opC),check(7,0,pC,opC),check(7,7,pC,opC)];
		bbool.push([true].indexOf(bbool[0])+[true].indexOf(bbool[1])+[true].indexOf(bbool[2])+[true].indexOf(bbool[3]));
	}
	// console.log(`[${bbool}]`);
	for(let i=0; i<copyPosi.length; i++){
		board=copy2dArray(copyBoard);
		add(copyPosi[i][0],copyPosi[i][1],opC,false);
		bool=[check(0,0,pC,opC),check(0,7,pC,opC),check(7,0,pC,opC),check(7,7,pC,opC)];
		if(!equalArray(bbool,bool)){
			bool.push([true].indexOf(bool[0])+[true].indexOf(bool[1])+[true].indexOf(bool[2])+[true].indexOf(bool[3]));
			// console.log(`[${copyPosi[i]}]:\n[${bool}]`);
			if(bbool[4]<bool[4]){
				copyPosi.splice(i,1);
				i--;
			}
		}
		board=copy2dArray(copyBoard);
	}
	board=copy2dArray(copyBoard);
	if(copyPosi.length>0){
		possiposi=copy2dArray(copyPosi);
	}
}

function redX(){
	let copy=copy2dArray(possiposi);
	for(let i=0; i<copy.length; i++){
		if([1,6].indexOf(copy[i][0])>-1 && [1,6].indexOf(copy[i][1])>-1){
			if(board[[0,7][[1,6].indexOf(copy[i][0])]][[0,7][[1,6].indexOf(copy[i][1])]]!=opC){
				copy.splice(i,1);
				i--;
			}
		}
	}
	if(copy.length>0){
		possiposi=copy2dArray(copy);
	}
}

function attentionYellow(){
	let suggestion=[];
	// (0,1), (0,6), (1,0), (1,7), (6,0), (6,7), (7,1), (7,6)
	// ↑ preCornerCheck() もあるし保留;

	let i;
	if(board[0][0]==''){
		if(board[0][1]==opC && board[0][7]!=pC){
			i=2;
			while(board[0][i]==opC && i<6){
				i++;
			}
			while(board[0][i]==pC && i<7){
				i++;
			}
			if(board[0][i-1]==pC && board[0][i]==''){
				suggestion.push([0,i]);
			}
		}
		if(board[1][0]==opC && board[7][0]!=pC){
			i=2;
			while(board[i][0]==opC && i<6){
				i++;
			}
			while(board[i][0]==pC && i<7){
				i++;
			}
			if(board[i-1][0]==pC && board[i][0]==''){
				suggestion.push([i,0]);
			}
		}
	}
	if(board[0][7]==''){
		if(board[0][6]==opC && board[0][0]!=pC){
			i=5;
			while(board[0][i]==opC && i>1){
				i--;
			}
			while(board[0][i]==pC && i>0){
				i--;
			}
			if(board[0][i]=='' && board[0][i+1]==pC){
				suggestion.push([0,i]);
			}
		}
		if(board[1][7]==opC && board[7][7]!=pC){
			i=2;
			while(board[i][7]==opC && i<6){
				i++;
			}
			while(board[i][7]==pC && i<7){
				i++;
			}
			if(board[i][7]=='' && board[i-1][7]==pC){
				suggestion.push([i,7]);
			}
		}
	}
	if(board[7][0]==''){
		if(board[6][0]==opC && board[0][0]!=pC){
			i=5;
			while(board[i][0]==opC && i>1){
				i--;
			}
			while(board[i][0]==pC && i>0){
				i--;
			}
			if(board[i][0]=='' && board[i+1][0]==pC){
				suggestion.push([i,0]);
			}
		}
		if(board[7,1]==opC && board[7][7]!=pC){
			i=2;
			while(board[7][i]==opC && i<6){
				i++;
			}
			while(board[7][i]==pC && i<7){
				i++;
			}
			if(board[7][i-1]==pC && board[7][i]==''){
				suggestion.push([7,i]);
			}
		}
	}
	if(board[7][7]==''){
		if(board[7][6]==opC && board[7][0]!=pC){
			i=5;
			while(board[7][i]==opC && i>1){
				i--;
			}
			while(board[7][i]==pC && i>0){
				i--;
			}
			if(board[7][i]=='' && board[7][i+1]==pC){
				suggestion.push([7,i]);
			}
		}
		if(board[6][7]==opC && board[0][7]!=pC){
			i=5;
			while(board[i][7]==opC && i>1){
				i--;
			}
			while(board[i][7]==pC && i>0){
				i--;
			}
			if(board[7][i]=='' && board[7][i+1]==pC){
				suggestion.push([7,i]);
			}
		}
	}
	if(suggestion.length>0){
		// console.log('角ふせぎ発動！！');
		// console.log(possiposi);
		possiposi=copy2dArray(suggestion);
		// console.log(possiposi);
	}
}

function equalArray(arr1,arr2){
	let bool=true;
	for(let i=0; i<Math.min(arr1.length,arr2.length); i++){
		if(arr1[i]!=arr2[i]){
			bool=false;
			break;
		}
	}
	return bool;
}

function copy2dArray(arr){
	let rs=[];
	for(let i=0; i<arr.length; i++){
		rs.push([]);
		for(let j=0; j<arr[i].length; j++){
			rs[i].push(arr[i][j]);
		}
	}
	return rs;
}

function getEdge(){
	let copy=copy2dArray(possiposi);
	for(let i=0; i<copy.length; i++){
		if([0,7].indexOf(copy[i][0])<0 && [0,7].indexOf(copy[i][1])<0){
			copy.splice(i,1);
			i--;
		}
	}
	if(copy.length>0){
		let corners=[board[0][0],board[7][0],board[7][7],board[0][7]];
		// console.log(corners);
		// possiposi=copy2dArray(copy);
		// for(let i=0; i<copy.length; i++){
		// 	if([0,7].indexOf(copy[i][0])>-1){

		// 	}else{

		// 	}
		// }
	}
}

function check(i,j,me,sanded){
	// console.log(i,j);
	if(board[i][j].length>0){
		return false;
	}
	let k;
	if(board[i].indexOf(me)>-1){
		if(board[i][j-1]==sanded || board[i][j+1]==sanded){
			if(board[i][j-1]==sanded){
				k=j-1
				while(k>0 && board[i][k]==sanded){
					k--;
				}
				if(board[i][k]==me){
					// console.log(`here: ${me}`);
					return true;
				}
			}
			if(board[i][j+1]==sanded){
				k=j+1;
				while(k<7 && board[i][k]==sanded){
					k++;
				}
				if(board[i][k]==me){
					// console.log(`here: ${me}`);
					return true;
				}
			}
		}
	}
	if(i>0 && board[i-1][j]==sanded){
		// if(board[i-1][j]==sanded){
			k=i-1;
			while(k>0 && board[k][j]==sanded){
				k--;
			}
			if(board[k][j]==me){
				// console.log(`here: ${me}`);
				return true;
			}
		// }
	}
	if(i<7 && board[i+1][j]==sanded){
		// if(board[i+1][j]==sanded){
			k=i+1;
			while(k<7 && board[k][j]==sanded){
				k++;
			}
			if(board[k][j]==me){
				// console.log(`here: ${me}`);
				return true;
			}
		// }
	}
	if(i>0 && j>0 && board[i-1][j-1]==sanded){
		k=1;
		while(i-k>0 && j-k>0 && board[i-k][j-k]==sanded){
			k++;
		}
		if(board[i-k][j-k]==me){
			// console.log(`here: ${me}`);
			return true;
		}
	}
	if(i<7 && j<7 && board[i+1][j+1]==sanded){
		k=1;
		while(i+k<7 && j+k<7 && board[i+k][j+k]==sanded){
			k++;
		}
		if(board[i+k][j+k]==me){
			// console.log(`here: ${me}`);
			return true;
		}
	}
	if(i>0 && j<7 && board[i-1][j+1]==sanded){
		k=1;
		while(i-k>0 && j+k<7 && board[i-k][j+k]==sanded){
			k++;
		}
		if(board[i-k][j+k]==me){
			// console.log(`here: ${me}`);
			return true;
		}
	}
	if(i<7 && j>0 && board[i+1][j-1]==sanded){
		k=1;
		while(i+k<7 && j-k>0 && board[i+k][j-k]==sanded){
			k++;
		}
		if(board[i+k][j-k]==me){
			// console.log(`here: ${me}`);
			return true;
		}
	}
	return false;
}

function add(i,j,c,real){
	change(i,j,c,real);
	let opC=['w','b'][['b','w'].indexOf(c)];
	let k;
	if(j>0){
		if(board[i][j-1]==opC){
			k=j-1;
			while(k>0 && board[i][k]==opC){
				k--;
			}
			if(board[i][k]==c){
				for(k=k+1; k<=j; k++){
					change(i,k,c,real);
				}
			}
		}
	}
	if(j<7){
		if(board[i][j+1]==opC){
			k=j+1;
			while(k<7 && board[i][k]==opC){
				k++;
			}
			if(board[i][k]==c){
				for(k=k-1; k>=j; k--){
					change(i,k,c,real);
				}
			}
		}
	}
	if(i>0){
		if(board[i-1][j]==opC){
			k=i-1;
			while(k>0 && board[k][j]==opC){
				k--;
			}
			if(board[k][j]==c){
				for(k=k+1; k<=i; k++){
					change(k,j,c,real);
				}
			}
		}
	}
	if(i<7){
		if(board[i+1][j]==opC){
			k=i+1;
			while(k<7 && board[k][j]==opC){
				k++;
			}
			if(board[k][j]==c){
				for(k=k-1; k>=i; k--){
					change(k,j,c,real);
				}
			}
		}
	}
	if(i>0 && j>0){
		if(board[i-1][j-1]==opC){
			k=1;
			while(i-k>0 && j-k>0 && board[i-k][j-k]==opC){
				k++;
			}
			if(board[i-k][j-k]==c){
				for(k=k-1; board[i-k][j-k]==opC; k--){
					change(i-k,j-k,c,real);
				}
			}
		}
	}
	if(i<7 && j<7){
		if(board[i+1][j+1]==opC){
			k=1;
			while(i+k<7 && j+k<7 && board[i+k][j+k]==opC){
				k++;
			}
			if(board[i+k][j+k]==c){
				for(k=k-1; board[i+k][j+k]==opC; k--){
					change(i+k,j+k,c,real);
				}
			}
		}
	}
	if(i>0 && j<7){
		if(board[i-1][j+1]==opC){
			k=1;
			while(i-k>0 && j+k<7 && board[i-k][j+k]==opC){
				k++;
			}
			if(board[i-k][j+k]==c){
				for(k=k-1; board[i-k][j+k]==opC; k--){
					change(i-k,j+k,c,real);
				}
			}
		}
	}
	if(i<7 && j>0){
		if(board[i+1][j-1]==opC){
			k=1;
			while(i+k<7 && j-k>0 && board[i+k][j-k]==opC){
				k++;
			}
			if(board[i+k][j-k]==c){
				for(k=k-1; board[i+k][j-k]==opC; k--){
					change(i+k,j-k,c,real);
				}
			}
		}
	}
	// drawOnconsole(board);
}

function change(i,j,c,real){
	if(c==null){
		board[i][j]=['w','b'][['b','w'].indexOf(board[i][j])];
	}else{
		board[i][j]=c;
	}
	if(real){
		document.getElementById(`c${i}-${j}`).classList.add(board[i][j]);
		document.getElementById(`c${i}-${j}`).classList.remove(['w','b'][['b','w'].indexOf(board[i][j])]);
	}
}

function result(real){
	let nums=[0,0,0];
	for(let i=0; i<8; i++){
		for(let j=0; j<8; j++){
			nums[['b','w',''].indexOf(board[i][j])]++;
		}
	}
	// console.log(nums);
	if(nums[0]==nums[1]){
		document.getElementById('comment').innerHTML=`Black:${nums[0]} - White:${nums[1]}<br>DRAW${['!!',''][[true,false].indexOf(real)]}${[`<br><p class="codeInComment" id="landscapeCode">Game code:<code id="landscapeTellCode">${code}</code></p>`,''][[true,false].indexOf(real)]}`;
	}else{
		if(howManyPlayer==1){
			if(real){
				document.getElementById('comment').innerHTML=`Black:${nums[0]} - White:${nums[1]}<br>YOU ${['WIN!','LOSE...'][[true,false].indexOf(nums.indexOf(Math.max(nums[0],nums[1]))==pN)]}<br><p class="codeInComment" id="landscapeCode">Game code:<code id="landscapeTellCode">${code}</code></p>`;
			}else{
				document.getElementById('comment').innerHTML=`Black:${nums[0]} - White:${nums[1]}<br>YOU ${['WON','LOST'][[true,false].indexOf(nums.indexOf(Math.max(nums[0],nums[1]))==pN)]}`;
			}
		}else{
			if(real){
				document.getElementById('comment').innerHTML=`Black:${nums[0]} - White:${nums[1]}<br>${['BLACK','WHITE'][[true,false].indexOf(nums[0]>nums[1])]} WINS<br><p class="codeInComment" id="landscapeCode">Game code:<code id="landscapeTellCode">${code}</code></p>`;
			}else{
				document.getElementById('comment').innerHTML=`Black:${nums[0]} - White:${nums[1]}<br>${['BLACK','WHITE'][[true,false].indexOf(nums[0]>nums[1])]} WON`;
			}
		}
	}
	if(real){
		document.getElementById('normalCode').innerHTML=`Game code:<code id="normalTellCode">${code}</code>`;
	}
	return;
}

function drawOnconsole(board){
	let conBo='';
	for(let i=0; i<8; i++){
		conBo+=board[i][0];
		if(board[i][0]==''){
			conBo+='-';
		}
		for(let j=1; j<8; j++){
			conBo+=` ${board[i][j]}`;
			if(board[i][j]==''){
				conBo+='-';
			}
		}
		conBo+='\n';
	}
	// console.log(conBo);
}

// alph=[a,b,c,d,e,f,g,h/i,j,k,l,m,n,o,p/q,r,s,t,u,v,w,x/0,1,2,3,4,5,6,7];
// 345tkksuvlnsvnf5mndnkekwdhd7cjvpevrf0c3k4g5iobuh5c61ht6lh05iukhboax4gfgo4uhkb31lqadbtcaba6c4ri2rkmqw1iqn77qoq6pwo7hxgjbajpr
// 405efndoc6tgmxtvcg5n4o1p060ctrlhb41mkuolamqdjcapex2vrnqlvhvrckujirrhg22vnogl7u77h2pa0kbq3qkq1tclwcvjmier50nf71oqpcwj7foiowx

let changeHistory=[];

let moves=[];

function solveCode(){
	if(code.charAt(2)=='z'){
		howManyPlayer=2;
		document.getElementById('comment').textContent="(2 players)";
	}else{
		howManyPlayer=1;
		pN=(parseInt(code.charAt(0),10)+parseInt(code.charAt(1),10)+parseInt(code.charAt(2),10))%2;
		pC=['b','w'][pN];
		opC=['b','w'][1-pN];
		document.getElementById('comment').textContent=`YOU:${['Black','White'][pN]} - COM:${['Black','White'][1-pN]}`;
	}
	moves=[];
	for(let i=2; i<2+(code.length-3)/2; i++){
		if(`${code.charAt(2*i-1)}${code.charAt(2*i)}`=="yz"){
			passed.push(i-2);
			moves.push("passed");
		}else{
			moves.push([alph.indexOf(code.charAt(2*i-1))%8,alph.indexOf(code.charAt(2*i))%8]);
		}
	}
	// console.log(moves);
}

let move_num=0;
let copy;
let passed=[];
document.getElementById('mover1').addEventListener('click',()=>{
	moveBack();
})
document.getElementById('mover2').addEventListener('click',()=>{
	moveForward();
})

document.addEventListener('keydown',(e)=>{
	if(moves.length>0){
		if(e.key=='ArrowLeft'){
			moveBack();
		}
		if(e.key=='ArrowRight'){
			moveForward();
		}
	}
})

function moveBack(){
	if(move_num>0){
		move_num--;
		if(passed.indexOf(move_num)>-1){
			move_num--;
		}
		document.getElementById('mover2').classList.remove('unavailable');
		if(howManyPlayer==1){
			document.getElementById('comment').textContent=`YOU:${['Black','White'][pN]} - COM:${['Black','White'][1-pN]}`;
		}else{
			document.getElementById('comment').textContent="(2 players)";
		}
		// console.log(changeHistory);
		board[changeHistory[move_num].charAt(0)][changeHistory[move_num].charAt(1)]='';
		document.getElementById(`c${changeHistory[move_num].charAt(0)}-${changeHistory[move_num].charAt(1)}`).classList.remove(['b','w'][move_num%2]);
		for(let i=1; i<changeHistory[move_num].length/2; i++){
			change(changeHistory[move_num].charAt(2*i),changeHistory[move_num].charAt(2*i+1),['w','b'][move_num%2],true);
		}
		if(move_num==0){
			document.getElementById('mover1').classList.add('unavailable');
		}
	}
}
function moveForward(){
	if(move_num<moves.length){
		document.getElementById('mover1').classList.remove('unavailable');
		// console.log(move_num,changeHistory.length,move_num==changeHistory.length);
		if(passed.indexOf(move_num)>-1){
			move_num++;
			changeHistory.push("passed");
			moveForward();
		}else{
			// console.log(move_num);
			// console.log(changeHistory);
			// console.log(move_num==changeHistory.length);
			if(move_num==changeHistory.length){
				copy=copy2dArray(board);
				// drawOnconsole(copy);
				// console.log(moves[move_num]);
				add(moves[move_num][0],moves[move_num][1],['b','w'][move_num%2],true);
				// drawOnconsole(board);
				let diff=difference(copy,board,moves[move_num]);
				// console.log(diff);
				changeHistory.push(`${moves[move_num][0]}${moves[move_num][1]}${diff}`);
			}else{
				add(moves[move_num][0],moves[move_num][1],['b','w'][move_num%2],true);
				// board[moves[move_num][0]][moves[move_num][1]]=['b','w'][move_num%2];
				// document.getElementById(`c${changeHistory[move_num].charAt(0)}-${changeHistory[move_num].charAt(1)}`).classList.add(['b','w'][move_num%2]);
				// for(let i=1; i<changeHistory[move_num].length/2; i++){
				// 	change(changeHistory[move_num].charAt(2*i),changeHistory[move_num].charAt(2*i+1),['b','w'][move_num%2],true);
				// }
				// console.log(move_num,moves.length,move_num==moves.length);
			}
			move_num++;
			if(move_num==moves.length){
				document.getElementById('mover2').classList.add('unavailable');
				result(false);
			}
		}
	}
}

function difference(b,a,move){
	let diff='';
	for(let i=0; i<8; i++){
		for(let j=0; j<8; j++){
			if(b[i][j]!=a[i][j] && (move[0]!=i || move[1]!=j)){
				diff+=`${i}${j}`;
			}
		}
	}
	// console.log(moveNum,`${move[0]}${move[1]}${diff}`);
	return diff;
}

function secretCode(){
	let r=[Math.floor(Math.random()*9)+1,Math.floor(Math.random()*10)];
	r.push(1-((pN-(r[0]+r[1])%2)**2));
	let nums=[0,1,2,3,4,5,6,7,8,9];
	for(let i=r[2]; i<10; i++){
		nums.splice(i,1);
	}
	r[2]=nums[Math.floor(Math.random()*5)];
	code=`${r[0]}${r[1]}${r[2]}`;
}