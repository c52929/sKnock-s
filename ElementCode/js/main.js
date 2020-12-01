'use strict';

{
	const elm=[''];
	elm.push('H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca');
	elm.push('Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr');
	elm.push('Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd');
	elm.push('Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg');
	elm.push('Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm');
	elm.push('Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds','Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og');
	for(let i=0; i<elm.length; i++){
		elm[i]=elm[i].toUpperCase();
	}

	document.getElementById('roman_text').focus();
	document.getElementById('roman_text').value='gensogasuki';
	document.getElementById('create_button').addEventListener('click',()=>{
		create();
	})
	document.addEventListener('keydown',(event)=>{
		if(event.key=='Enter'){
			let actives=[document.activeElement,document.getElementById('roman_text')];
			if(actives[0]==actives[1]){
				create();
			}
		}
	})

	function create(){
		let text=roman_text.value;
		let hozonban=[];
		let result=[];
		let couples=[];
		for(let i=0; i<text.length-1; i++){
			// console.log(`${text.charAt(i)}: ${elm.indexOf(text.charAt(i).toUpperCase())}`);
			// console.log(`${text.charAt(i)}${text.charAt(i+1)}: ${elm.indexOf((text.charAt(i)+text.charAt(i+1)).toUpperCase())}`);
			result.push(elm.indexOf(text.charAt(i).toUpperCase()),elm.indexOf((text.charAt(i)+text.charAt(i+1)).toUpperCase()));
			hozonban.push(`${text.charAt(i)}`,`${text.charAt(i)}${text.charAt(i+1)}`);
		}
		// console.log(`${text.charAt(text.length-1)}: ${elm.indexOf(text.charAt(text.length-1).toUpperCase())}`);
		result.push(elm.indexOf(text.charAt(text.length-1).toUpperCase()));
		hozonban.push(text.charAt(text.length-1));
		// console.log(hozonban);
		// console.log(result);

		for(let i=0; i<text.length-1; i++){
			// console.log();
			couples.push(result[2*i+1]>-1);
		}
		// console.log(couples);
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
		// console.log(tttt);

		for(let i=0; i<couples.length; i++){
			// console.log(i);
			if(couples[i]){
				// console.log(couples[i]);
				if(couples[i-1]!=true && couples[i+1] && couples[i+2]!=true){
					// false true true false
					// console.log(i);
					let test=[];
					for(let j=2*i; j<2*i+5; j++){
						test.push(elm.indexOf(hozonban[j].toUpperCase()));
					}
					// console.log(test);
					if(test.filter(function(x){return x==-1}).length==2){
						if(test[0]+test[4]>-2){
							// console.log('yaaaay!');
							if(test[0]<0){
								makeEmpty([2*i-1,2*i,2*i+2,2*i+3,2*i+5]);
							}else{
								makeEmpty([2*i-1,2*i+1,2*i+2,2*i+4,2*i+5]);
								// tttt[i]=hozonban[2*i];
							}
							// console.log(tttt);
							// console.log(hozonban);
						}else{
							// console.log(hozonban);
							let r=[];
							for(let i=0; i<test[1]; i++){
								r.push(1);
							}
							for(let i=0; i<test[3]; i++){
								r.push(3);
							}
							r=[r[Math.floor(Math.random()*r.length)]];
							if(r[0]==1){
								makeEmpty([2*i-1,2*i,2*i+2,2*i+3,2*i+5]);
							}else{
								makeEmpty([2*i-1,2*i+1,2*i+2,2*i+4,2*i+5]);
							}
							// console.log(r);
							// console.log(hozonban);
						}
					}else if(test.filter(function(x){return x==-1}).length==0 || (test.filter(function(x){return x==-1}).length==1 && test[2]<0)){
						// choose.push(2,i,i+1);
						// console.log(choose);
						let r=[];
						for(let j=0; j<test[1]; j++){
							r.push(1);
						}
						for(let j=0; j<test[3]; j++){
							r.push(3);
						}
						// console.log(r);
						r=[r[Math.floor(Math.random()*r.length)]];
						// console.log(r);
						if(r[0]==1){
							makeEmpty([2*i-1,2*i,2*i+2,2*i+3,2*i+5]);
						}else{
							makeEmpty([2*i-1,2*i+1,2*i+2,2*i+4,2*i+5]);
						}
						// console.log(hozonban);
					}else if(test.filter(function(x){return x==-1}).length==1){
						let r=[];
						if(test[2]<0){
							for(let j=0; j<test[1]; j++){
								r.push(1);
							}
							for(let j=0; j<test[3]; j++){
								r.push(3);
							}
							r=[r[Math.floor(Math.random()*r.length)]];
						}
						if(test[0]<0 || r[0]==1){
							makeEmpty([2*i-1,2*i,2*i+2,2*i+3,2*i+5]);
						}else{
							makeEmpty([2*i-1,2*i+1,2*i+2,2*i+4,2*i+5]);
						}
						// console.log(hozonban);
					}
					i+=2;
				}else if(couples[i-1]!=true && couples[i+1]!=true){
					// false true false
					// console.log('yaaay!');
					if(couples[i+2] && couples[i+3]!=true){
						makeEmpty([2*i-1,2*i,2*i+2,2*i+3,2*i+4,2*i+6,2*i+7]);
						// console.log(hozonban);
						i+=3;
					}else{
						makeEmpty([2*i-1,2*i,2*i+2,2*i+3]);
						// console.log(hozonban);
						i++;
					}
				}else if(couples[i-1]!=true && couples[i+1] && couples[i+2] && couples[i+3]!=true){
					// false true true true false
					// console.log('yaaay!');
					let test=[];
					for(let j=2*i; j<2*i+7; j++){
						test.push(elm.indexOf(hozonban[j].toUpperCase()));
					}
					// console.log(test);
					if(test.indexOf(-1)<0){
						let r=[];
						for(let i=0; i<test[1]+test[5]; i++){
							r.push(1);
						}
						for(let i=0; i<test[3]; i++){
							r.push(3);
						}
						r=[r[Math.floor(Math.random()*r.length)]];
						// console.log(r);
						if(r[0]==1){
							makeEmpty([2*i-1,2*i,2*i+2,2*i+3,2*i+4,2*i+6,2*i+7]);
						}else{
							makeEmpty([2*i-1,2*i+1,2*i+2,2*i+4,2*i+5,2*i+7]);
						}
					}else{
						makeEmpty([2*i-1,2*i,2*i+2,2*i+3,2*i+4,2*i+6,2*i+7]);
					}
					// console.log(hozonban);
					i+=3;
				}else if(couples[i-1]!=true){
					// console.log(couples);
					let end;
					for(let j=i; j<couples.length+1; j++){
						if(couples[j]!=true){
							end=j-1;
							break;
						}
					}
					// console.log(i,end);
					// console.log(end-i);
					if((end-i)%2==0){
						// console.log(hozonban);
						hozonban[2*i-1]='';
						for(let j=0; j<end-i+2; j++){
							hozonban[2*(i+j)]='';
						}
						for(let j=1; j<(end-i)/2+1; j++){
							hozonban[2*i-1+4*j]='';
						}
						// console.log(hozonban);
					}else{
						let r;
						// console.log(hozonban);
						// console.log(i,end,2*(i+end));
						// console.log(hozonban[2*i],hozonban[2*end+2]);
						if(elm.indexOf(hozonban[2*i].toUpperCase())+elm.indexOf(hozonban[2*end+2].toUpperCase())<-1){
							r=Math.floor(Math.random()*2);
						}
						if(elm.indexOf(hozonban[2*i].toUpperCase())>-1 || r==0){
							for(let j=1; j<end-i+2; j++){
								hozonban[2*(i+j)]='';
							}
							for(let j=0; j<(end-i+1)/2; j++){
								hozonban[2*i+1+4*j]='';
							}
						}else{
							for(let j=0; j<end-i+1; j++){
								hozonban[2*i+2*j]='';
							}
							for(let j=0; j<(end-i+1)/2; j++){
								hozonban[2*i+3+4*j]='';
							}
						}
						hozonban[2*i-1]='';
					}
					// console.log(hozonban);
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
		let check='';
		let code='';
		for(let i=0; i<hozonban.length; i++){
			if(hozonban[i].length==1){
				check+=hozonban[i];
				if(elm.indexOf(hozonban[i].toUpperCase())>-1){
					code+=elm.indexOf(hozonban[i].toUpperCase()).toString();
				}else{
					code+=hozonban[i];
				}
			}else if(hozonban[i].length==2){
				// console.log(hozonban[i+1],hozonban[i+1].length);
				if(hozonban[i+1].length>0){
					continue;
				}else{
					check+=hozonban[i];
					code+=elm.indexOf(hozonban[i].toUpperCase()).toString();
				}
			}
		}
		// console.log(check);
		if(check.toUpperCase()==roman_text.value.toUpperCase()){
			// console.log(code);
			document.getElementById('returned').textContent=code;
		}else{
			document.getElementById('returned').innerHTML=`<p>私の下手なプログラムにより、暗号化に失敗しました。</p><p>暗号化したかった単語をメアドかなんかで教えてください。</p><p>(参考)誤った暗号:${code}</p>`;
		}
	}
}