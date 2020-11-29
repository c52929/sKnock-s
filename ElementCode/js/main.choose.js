'use strict';

{
	const elm=[''];
	elm.push('H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca');
	elm.push('Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr');
	elm.push('Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd');
	elm.push('Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg');
	elm.push('Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm');
	elm.push('Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og');
	const relm=Array.from(elm);
	for(let i=0; i<elm.length; i++){
		elm[i]=elm[i].toUpperCase();
	}

	let text;
	let returned=[];

	let status;

	document.getElementById('create_button').addEventListener('click',()=>{
		// text=roman_text.value;
		// status=[''];
		// for(let i=0; i<text.length; i++){
		// 	// こっからいらない
		// 	// if(elm.indexOf(text.charAt(i).toUpperCase()+text.charAt(i+1).toUpperCase())>-1){
		// 	// 	console.log(`${text.charAt(i).toUpperCase()+text.charAt(i+1).toUpperCase()}: ${elm.indexOf(text.charAt(i).toUpperCase()+text.charAt(i+1).toUpperCase())>-1}: ${elm.indexOf(text.charAt(i).toUpperCase()+text.charAt(i+1).toUpperCase())}`);
		// 	// }else{
		// 	// 	console.log(`${text.charAt(i)}: ${elm.indexOf(text.charAt(i).toUpperCase())>-1}: ${elm.indexOf(text.charAt(i).toUpperCase())}`);
		// 	// }
		// 	// ここまでいらない
		// 	if(elm.indexOf(text.charAt(i).toUpperCase()+text.charAt(i+1).toUpperCase())>-1){
		// 		status[status.length-1]+=elm.indexOf((text.charAt(i)+text.charAt(i+1)).toUpperCase());
		// 		// console.log(status[status.length-1]);
		// 		i++;
		// 		continue;
		// 	}else if(elm.indexOf(text.charAt(i).toUpperCase())>-1){
		// 		status[status.length-1]+=elm.indexOf(text.charAt(i).toUpperCase());
		// 		// console.log(status[status.length-1]);
		// 		continue;
		// 	}else{
		// 		status[status.length-1]+=text.charAt(i);
		// 	}
		// }
		// // console.log(status);
		// document.getElementById('returned').textContent=status[status.length-1];

		// create(roman_text.value);
		create2(roman_text.value);
	})
	// create(roman_text.value);
	create2(roman_text.value);

	function create2(text){
		let hozonban=[];
		let result=[];
		let couples=[];
		let choose=[];
		let winners=[];
		let finalists='';
		document.getElementById('choose').innerHTML='<h1 id="chooseTitle" class="none"></h1>';
		for(let i=0; i<text.length-1; i++){
			// console.log(`${text.charAt(i)}: ${elm.indexOf(text.charAt(i).toUpperCase())}`);
			// console.log(`${text.charAt(i)}${text.charAt(i+1)}: ${elm.indexOf((text.charAt(i)+text.charAt(i+1)).toUpperCase())}`);
			result.push(elm.indexOf(text.charAt(i).toUpperCase()),elm.indexOf((text.charAt(i)+text.charAt(i+1)).toUpperCase()));
			hozonban.push(`${text.charAt(i)}`,`${text.charAt(i)}${text.charAt(i+1)}`);
		}
		// console.log(`${text.charAt(text.length-1)}: ${elm.indexOf(text.charAt(text.length-1).toUpperCase())}`);
		result.push(elm.indexOf(text.charAt(text.length-1).toUpperCase()));
		hozonban.push(text.charAt(text.length-1));
		console.log(hozonban);
		console.log(result);

		for(let i=0; i<text.length-1; i++){
			console.log();
			couples.push(result[2*i+1]>-1);
		}
		console.log(couples);
		// 気付いたこと: true のとこからやった方がいい
		// console.log('#trueから始めよう');
		let tttt=[];
		for(let i=0; i<couples.length; i++){
			if(couples[i]){
				tttt.push(hozonban[2*i+1]);
			}else{
				tttt.push(false);
			}
		}
		console.log(tttt);

		for(let i=0; i<couples.length; i++){
			// console.log(i);
			if(couples[i]){
				if(couples[i-1]!=true && couples[i+1] && couples[i+2]!=true){
					// console.log(i);
					let test=[];
					for(let j=i*2; j<i*2+5; j++){
						test.push(elm.indexOf(hozonban[j].toUpperCase()));
					}
					console.log(test);
					if(test.filter(function(x){return x==-1}).length==2 && test[0]+test[4]>-2){
						// console.log('yaaaay!');
						if(test[0]<0){
							makeEmpty([i*2-1,i*2,i*2+2,i*2+3,i*2+5]);
						}else{
							makeEmpty([i*2-1,i*2+1,i*2+2,i*2+4,i*2+5,i*2+7]);
							// tttt[i]=hozonban[i*2];
						}
						// console.log(tttt);
						console.log(hozonban);
					}else if(test.filter(function(x){return x==-1}).length==0){
						choose.push(2,i,i+1);
						// console.log(choose);
					}
					i+=2;
				}
				if(couples[i-1]!=true && couples[i+1]!=true){
					// console.log('yaaay!');
					if(couples[i+2] && couples[i+3]!=true){
						makeEmpty([i*2-1,i*2,i*2+2,i*2+3,i*2+4,i*2+6,i*2+7]);
						console.log(hozonban);
						i+=3;
					}else{
						makeEmpty([i*2-1,i*2,i*2+2,i*2+3]);
						console.log(hozonban);
						i++;
					}
				}
				function makeEmpty(array){
					for(let i=0; i<array.length; i++){
						if(hozonban[array[i]]!=undefined){
							hozonban[array[i]]='';
						}
					}
				}
			}
		}
		for(let i=0; i<choose.length; i++){
			document.getElementById('chooseTitle').classList.remove('none');
			for(let j=0; j<choose[i]; j++){
				console.log(j);
				const addChoose=document.createElement('div');
				addChoose.setAttribute('id',`choose${j}`);
				addChoose.value=tttt[choose[i+j+1]];
				addChoose.textContent=relm[elm.indexOf(tttt[choose[i+j+1]].toUpperCase())];
				document.getElementById('choose').appendChild(addChoose);
			}
			for(let j=0; j<choose[i]; j++){
				document.getElementById(`choose${j}`).addEventListener('click',()=>{
					// console.log(tttt[choose[i+j+1]]);
					// console.log(document.getElementById(`choose${j}`).value);
					winners.push(document.getElementById(`choose${j}`).value);
					document.getElementById('chooseTitle').classList.add('none');
					document.getElementById(`choose${1-j}`).remove();
					document.getElementById(`choose${j}`).remove();
					if(choose[i]+j>=choose.length){
						winWinners();
					}
				})
			}
			i+=choose[i];
		}
		function winWinners(){
			for(let i=0; i<couples.length; i++){
				if(couples[i-1]!=true && couples[i+1] && couples[i+2]!=true){
					// console.log(i);
					let test=[];
					for(let j=i*2; j<i*2+5; j++){
						test.push(elm.indexOf(hozonban[j].toUpperCase()));
					}
					console.log(test);
					if(test.filter(function(x){return x==-1}).length==0){
						// choose.push(2,i,i+1);
						// console.log(choose);
						if(hozonban[i*2+1]==winners[0]){
							makeEmpty([i*2,i*2+2,i*2+3,i*2+5]);
						}else{
							makeEmpty([i*2+1,i*2+2,i*2+4,i*2+5]);
						}
					}
					i+=2;
					console.log(hozonban);
				}
				function makeEmpty(array){
					for(let i=0; i<array.length; i++){
						if(hozonban[array[i]]!=undefined){
							hozonban[array[i]]='';
						}
					}
				}
			}
		}

		console.log('');
	}

	document.addEventListener('keydown',(event)=>{
		if(event.key==' '){
			document.getElementById('roman_text').value='nanpun';
			create2('nanpun');
		}
	})

	/**/
	/**/
	/**/
	
	function create(text){
		let hozonban=[];
		let result=[];
		let couples=[];
		let finalists='';
		for(let i=0; i<text.length-1; i++){
			// console.log(`${text.charAt(i)}: ${elm.indexOf(text.charAt(i).toUpperCase())}`);
			// console.log(`${text.charAt(i)}${text.charAt(i+1)}: ${elm.indexOf((text.charAt(i)+text.charAt(i+1)).toUpperCase())}`);
			result.push(elm.indexOf(text.charAt(i).toUpperCase()),elm.indexOf((text.charAt(i)+text.charAt(i+1)).toUpperCase()));
			hozonban.push(`${text.charAt(i)}`,`${text.charAt(i)}${text.charAt(i+1)}`);
		}
		// console.log(`${text.charAt(text.length-1)}: ${elm.indexOf(text.charAt(text.length-1).toUpperCase())}`);
		result.push(elm.indexOf(text.charAt(text.length-1).toUpperCase()));
		hozonban.push(text.charAt(text.length-1));
		console.log(hozonban);
		console.log(result);

		for(let i=0; i<text.length-1; i++){
			console.log();
			couples.push(result[2*i+1]>-1);
		}
		console.log(couples);

		for(let i=0; i<couples.length-1; i++){
			console.log(i);
			if(couples[i]!=couples[i+1]){
				if(couples[i]==true){
					console.log(result[2*i+1]);
					console.log(hozonban[2*i+4]);
					finalists+=`${result[2*i+1]}`;
					if(couples[i+2]==false && couples[i+3]==false){
						finalists+=hozonban[2*i+4];
					}
				}else{
					console.log(hozonban[2*i]);
					console.log(result[2*i+3]);
					finalists+=`${hozonban[2*i]}${result[2*i+3]}`;
				}
				i++;
			}else{
				if(couples[i]==true && couples[i+1]==true){
					if(couples[i+2]==false){
						let test=[elm.indexOf((hozonban[2*i]).toUpperCase()),elm.indexOf((hozonban[2*i+2]).toUpperCase()),elm.indexOf((hozonban[2*i+4]).toUpperCase())];
						if(test[0]>-1 && test[1]>-1 && test[2]>-1){
							let choose=[hozonban[2*i+1],hozonban[2*i+3]];
							console.log(choose);
						}else{
							if(elm.indexOf((hozonban[2*i+1]).toUpperCase())>-1 && test[2]>-1){
								// 今は早い者勝ちで。すまん。
								finalists+=`${elm.indexOf((hozonban[2*i+1]).toUpperCase())}${test[2]}`;
							}else if(test[0]>-1 && elm.indexOf((hozonban[2*i+2]).toUpperCase())){
								finalists+=`${test[0]}${elm.indexOf((hozonban[2*i+3]).toUpperCase())}`;
							}
						}
						i++;
					}
				}
				finalists+='';
			}
			console.log('∴ '+finalists);
		}
	}
}