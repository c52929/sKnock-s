'use strict';
{
	let board,pN,pC,opC,turn;
	let pass=[0,0];
	prepareBoard();
	for(let i=0; i<2; i++){
		document.getElementById(`start${i}`).addEventListener('click',()=>{
			pN=i;
			pC=['b','w'][pN];
			opC=['b','w'][1-pN];
			document.querySelector('h1').classList.add('none',true);
			document.getElementById('comment').classList.remove('none');
			document.getElementById('buttons').classList.add('none',true);
			document.getElementById('board').classList.remove('none');
			if(pN==1){
				comsTurn();
			}else{
				myTurn();
			}
		})
	}

	function prepareBoard(){
		board=[];
		for(let i=0; i<8; i++){
			const addTr=document.createElement('tr');
			addTr.classList.add('boardTr',true);
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
		// change(3,3,'b',true);
		// change(3,4,'w',true);
		// change(4,3,'w',true);
		// change(4,4,'b',true);
		turn=0;
		// drawOnconsole();
	}

	function myTurn(){
		// let r=Math.floor(Math.random()*65536);
		document.getElementById('comment').textContent="Your turn!";
		let possiposi=[];
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
										pass[0]=0;
										turn=1-turn;
										comsTurn();
									}
								}
							}
						})
					}
				}
			}
		}
		// console.log(r,possiposi);
		if(possiposi.length==0){
			pass[0]=1;
			if(pass[1]==1){
				result();
			}else{
				// console.log(r,pass);
				// console.log(r,'you: pass');
				turn=1-turn;
				comsTurn();
			}
			return;
		}
	}

	let possiposi;

	function comsTurn(){
		// drawOnconsole();
		document.getElementById('comment').textContent="COM's turn...";
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
				pass[1]=0;
				turn=1-turn;
				myTurn();
			}else{
				pass[1]=1;
				if(pass[0]==1){
					result();
					return;
				}else{
					// console.log('com: pass');
					turn=1-turn;
					myTurn();
				}
			}
			// drawOnconsole();
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
		// drawOnconsole();
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

	function result(){
		let nums=[0,0,0];
		for(let i=0; i<8; i++){
			for(let j=0; j<8; j++){
				nums[['b','w',''].indexOf(board[i][j])]++;
			}
		}
		// console.log(nums);
		if(nums[0]==nums[1]){
			document.getElementById('comment').innerHTML=`Black:${nums[0]} - White:${nums[1]}<br>DRAW!!`;
		}else{
			document.getElementById('comment').innerHTML=`Black:${nums[0]} - White:${nums[1]}<br>YOU ${['WIN!','LOSE...'][[true,false].indexOf(nums.indexOf(Math.max(nums[0],nums[1]))==pN)]}`;
		}
		return;
	}

	function drawOnconsole(){
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
}