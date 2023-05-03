'use strict';
{
	const elm=[''];  // 原子番号0番;
	elm.push('H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca');
	elm.push('Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr');
	elm.push('Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd');
	elm.push('Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg');
	elm.push('Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm');
	elm.push('Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og');
	// for(let i=0; i<elm.length; i++){
	// 	elm[i]=elm[i].toUpperCase();
	// }
	let code, ddd;
	let suggestion;
	let decipher_i;
	let ccc;
	let threeDigitsCheck;
	let history;
	let isAvailable=[0,0,0,0];

	document.getElementById("code_copy").innerHTML="<span style=color:#a1a499;>[copy of the code]</span>";
	document.getElementById("returnedTxt").innerHTML="<span style=color:#a1a499;>[solution]</span>";

	document.getElementById('decrypt_button').addEventListener('click',()=>{
		solve();
	})
	document.addEventListener('keydown',(event)=>{
		if(event.key=='Enter'){
			let actives=[document.activeElement, document.getElementById('code_text')];
			if(actives[0]==actives[1]){
				solve();
			}
		}
	})

	function solve(){
		code=code_text.value;
		ddd=[];
		for(let i=0; i<code.length-1; i++){
			ddd.push(code[i],`${code[i]}${code[i+1]}`);
		}
		ddd.push(code[code.length-1]);
		// for(let i=0; i<(ddd.length-1)/2; i++){
		// 	if(['10','11'].indexOf(ddd[2*i-1])>-1 && ddd[2*i+2]<9){
		// 		ddd.splice(2*i+1,0,`${ddd[2*i-1]}${ddd[2*i+2]}`);
		// 	}
		// }
		// console.log(ddd);
		
		document.getElementById("code_copy").textContent=code;
		document.getElementById("returnedTxt").innerHTML="<span style=color:#a1a499;>[solution]</span>";
		toggleAvailable(0,false,0);

		history=[];
		decipher_i=0;

		ccc=['','',''];
		threeDigitsCheck=`${code.charAt(0)}${code.charAt(1)}${code.charAt(2)}`;
		if(100<=threeDigitsCheck && threeDigitsCheck<=118 && 2<code.length){
			ccc[1]=threeDigitsCheck;
		}else if(1<code.length){
			ccc[1]=`${code.charAt(decipher_i)}${code.charAt(decipher_i+1)}`;
		}else{
			ccc[1]=code.charAt(decipher_i);
		}
		for(let j=ccc[0].length+ccc[1].length; j<code.length; j++){
			ccc[2]+=code.charAt(j);
		}
		
		prepareSelection();
	}

	function prepareSelection(){
		if(decipher_i<code.length){
			if(['0','1','2','3','4','5','6','7','8','9'].indexOf(code.charAt(decipher_i))<0){
				toggleAvailable(1,true,`${code.charAt(decipher_i)}`);
				toggleAvailable(2,false,0);
				toggleAvailable(3,false,0);
			}else{
				toggleAvailable(1,true,`${[0,' ',''][elm[code.charAt(decipher_i)].length]}${elm[code.charAt(decipher_i)]}`);
				if(decipher_i+1<code.length && !isNaN(code.charAt(decipher_i)+code.charAt(decipher_i+1))){
					toggleAvailable(2,true,`${[0,' ',''][elm[code.charAt(decipher_i)+code.charAt(decipher_i+1)].length]}${elm[code.charAt(decipher_i)+code.charAt(decipher_i+1)]}`);
				}else{
					toggleAvailable(2,false,0);
				}
				// console.log(code.charAt(decipher_i+1), code.charAt(decipher_i)+code.charAt(decipher_i+1));
				threeDigitsCheck=`${code.charAt(decipher_i)}${code.charAt(decipher_i+1)}${code.charAt(decipher_i+2)}`;
				if(100<=threeDigitsCheck && threeDigitsCheck<=118 && decipher_i+2<code.length){
					toggleAvailable(3,true,`${[0,' ',''][elm[threeDigitsCheck].length]}${elm[threeDigitsCheck]}`);
				}else{
					toggleAvailable(3,false,0);
				}
			}
		}else{
			for(let i=1; i<=3; i++){
				toggleAvailable(i,false,0);
			}
			toggleAvailable(0,true,0);
		}
		// console.log(decipher_i);
		// console.log(ccc);

		let forCCC=`<span style=color:#a1a499;>${ccc[0]}</span>`;
		if(ccc[1].length==1){
			forCCC+=`<span style=color:red;>${ccc[1]}</span>`;
		}else if(ccc[1].length==2){
			forCCC+=`<span style=color:#f00;>${ccc[1].charAt(0)}</span><span style=color:#0a0;>${ccc[1].charAt(1)}</span>`;
		}else{
			forCCC+=`<span style=color:#f00;>${ccc[1].charAt(0)}</span><span style=color:#0a0;>${ccc[1].charAt(1)}</span><span style=color:#00f;>${ccc[1].charAt(2)}</span>`;
		}
		document.getElementById("code_copy").innerHTML=`${forCCC}${ccc[2]}`;

		let nextSelects=[0];
		let nextText='';
		// console.log(decipher_i);
		// console.log(isAvailable);
		for(let extra=0; extra<3; extra++){
			if(isAvailable[extra+1]){
				nextSelects.push([null,null,null]);
				if(!isNaN(code.charAt(decipher_i+extra+1))){
					if(decipher_i+extra+1>=code.length){
						nextSelects[nextSelects.length-1][0]="<span style=color:#a1a499;>end</span>";
					}else if(code.charAt(decipher_i+extra+1)>0){
						nextSelects[nextSelects.length-1][0]=elm[code.charAt(decipher_i+extra+1)];
						if(!isNaN(code.charAt(decipher_i+extra+2))){
							if(decipher_i+extra+2<code.length){
								nextSelects[nextSelects.length-1][1]=elm[code.charAt(decipher_i+extra+1)+code.charAt(decipher_i+extra+2)];
								if(!isNaN(code.charAt(decipher_i+extra+3))){
									if(decipher_i+extra+3<code.length){
										nextSelects[nextSelects.length-1][2]=elm[code.charAt(decipher_i+extra+1)+code.charAt(decipher_i+extra+2)+code.charAt(decipher_i+extra+3)];
									}
								}
							}
						}
						// else{
						// 	nextSelects[nextSelects.length-1][1]=code.charAt(decipher_i+extra+2);
						// }
					}
				}else{
					nextSelects[nextSelects.length-1][0]=code.charAt(decipher_i+extra+1);
				}
				// console.log(nextSelects[nextSelects.length-1]);
				for(let j=0; j<3; j++){
					if(nextSelects[nextSelects.length-1][2-j]==undefined || nextSelects[nextSelects.length-1][2-j]==nextSelects[nextSelects.length-1][1-j]){
						nextSelects[nextSelects.length-1].splice(2-j,1);
					}
				}
				// console.log(nextSelects[nextSelects.length-1]);
			}
		}
		for(let i=1; i<=3; i++){
			if(i<nextSelects.length){
				for(let j=1; j<3; j++){
					if(nextSelects[i][1]!=undefined){
						nextSelects[i][0]+=`${['','/'][[false,true].indexOf(nextSelects[i][0]!=undefined && nextSelects[i][0].length>0)]}${nextSelects[i][1]}`;
						nextSelects[i].splice(1,1);
					}
				}
				// console.log(nextSelects);
				if(nextSelects[i][0]!=undefined && nextSelects[i][0]!=''){
					nextText+=`${i}→[${nextSelects[i][0]}], `;
				}else{
					toggleAvailable(i,false,0);
				}
			}
		}
		let nextTextt='';
		for(let i=0; i<nextText.length-2; i++){
			nextTextt+=nextText.charAt(i);
		}
		// console.log(nextSelects);
		// console.log(nextText, nextTextt);
		if(nextTextt.length>0){
			document.getElementById("next").innerHTML=`Next: ${nextTextt}`;
		}else{
			document.getElementById("next").innerHTML=``;
		}
	}

	function toggleAvailable(select_i,boo,value){
		isAvailable[select_i]=boo;
		if(boo){
			if(select_i==0){
				document.getElementById("select_back").classList.remove("unavailable");
			}else{
				document.getElementById(`select${select_i}`).value=`${select_i}.${value}`;
				document.getElementById(`select${select_i}`).classList.remove("unavailable");
			}
		}else{
			if(select_i==0){
				document.getElementById("select_back").classList.add("unavailable");
			}else{
				document.getElementById(`select${select_i}`).value=`${select_i}.  `;
				document.getElementById(`select${select_i}`).classList.add("unavailable");
			}
		}
	}

	let anyOne;
	for(let i=1; i<=3; i++){
		document.getElementById(`select${i}`).addEventListener('click',()=>{
			anyOne=0;
			if(i==1 && isAvailable[1]){
				history.push(code.charAt(decipher_i));
				anyOne++;
			}else if(i==2 && isAvailable[2]){
				history.push(code.charAt(decipher_i)+code.charAt(decipher_i+1));
				anyOne++;
			}else if(i==3 && isAvailable[3]){
				history.push(code.charAt(decipher_i)+code.charAt(decipher_i+1)+code.charAt(decipher_i+2));
				anyOne++;
			}
			// console.log(history);
			if(anyOne>0){
				for(let j=0; j<i; j++){
					ccc[0]+=code.charAt(ccc[0].length);
				}
				toggleAvailable(0,true,0);
				
				reload();
				decipher_i+=history[history.length-1].length;
				updateCCC();
				prepareSelection();
			}
		});
	}

	function updateCCC(){
		if(decipher_i<code.length){
			threeDigitsCheck=`${code.charAt(decipher_i)}${code.charAt(decipher_i+1)}${code.charAt(decipher_i+2)}`;
			// console.log(threeDigitsCheck, 100<=threeDigitsCheck&&threeDigitsCheck<=118&&decipher_i+2<code.length);
			if(100<=threeDigitsCheck && threeDigitsCheck<=118 && decipher_i+2<code.length){
				ccc[1]=threeDigitsCheck;
			}else if(decipher_i+1<code.length){
				if(!isNaN(code.charAt(decipher_i)+code.charAt(decipher_i+1))){
					ccc[1]=`${code.charAt(decipher_i)}${code.charAt(decipher_i+1)}`;
				}else{
					ccc[1]=code.charAt(decipher_i);
				}
			}else{
				ccc[1]=code.charAt(decipher_i);
			}
			ccc[2]='';
			for(let j=ccc[0].length+ccc[1].length; j<code.length; j++){
				ccc[2]+=code.charAt(j);
			}
			// console.log(ccc);
		}else{
			ccc[1]='';
			ccc[2]='';
		}
	}

	document.getElementById("select_back").addEventListener('click',()=>{
		if(isAvailable[0]){
			decipher_i-=history[history.length-1].length;
			// なんか書くならここ(historyが残ってるうちに)
			history.splice(history.length-1,1);
			ccc[0]='';
			for(let i=0; i<history.length; i++){
				ccc[0]+=history[i];
			}
			reload();
			updateCCC();
			prepareSelection();
			if(suggestion==''){
				document.getElementById("returnedTxt").innerHTML="<span style=color:#a1a499;>[solution]</span>";
				toggleAvailable(0,false,0);
			}
			// console.log(history);
		}
	});

	function reload(){
		suggestion='';
		for(let i=0; i<history.length; i++){
			if(!isNaN(history[i])){
				suggestion+=elm[history[i]];
			}else{
				suggestion+=history[i];
			}
		}
		document.getElementById("returnedTxt").textContent=suggestion;
	}
}