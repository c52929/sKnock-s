'use strict';
{
	let shiki;
	let parts;

	document.querySelector('button').addEventListener('click',()=>{
		shiki=shiki_field.value;
		solve();
	})
	document.addEventListener('keydown',(event)=>{
		if(`${event.key}`=='Enter'){
			shiki=shiki_field.value;
			solve();
		}
	})

	function solve(){
		const check=document.getElementsByClassName('dont-solve');
		if(check.length<1){
			judge_type();
			// console.log(shiki);
			// console.log(parts);
			document.getElementById('x-equals').innerHTML='x<span style="font-style:normal;">=</span>';
			document.getElementById('comma').textContent=',';
			show_hide(['x-equals','answer','numer','comma','answer_2','numer_2'],['denom','denom_2','error']);
			if(parts[0]==0){
				if(parts[1]==0){
					// エラー: すべての数 or 解なし
					if(parts[2]==0){
						document.getElementById('error').textContent='Error: xはすべての数';
					}else{
						document.getElementById('error').textContent='Error: 解なし';
					}
					show_hide(['error'],['x-equals','answer','comma','answer_2'])
				}else{
					// 1次方程式
					if(Math.abs(parts[2]%parts[1])==0){
						parts=[0,1,parts[2]/parts[1]];
						// console.log(parts);
						document.getElementById('numer').innerHTML=parts[2]*-1;
					}else{
						parts.splice(0,1);
						parts=common_divisors(parts);
						parts.splice(0,0,0);
						// console.log(parts);
						if(parts[1]*parts[2]*-1>0){
							document.getElementById('x-equals').innerHTML='x<span style="font-style:normal;">=</span>';
						}else{
							document.getElementById('x-equals').innerHTML='x<span style="font-style:normal;">=-</span>';
						}
						document.getElementById('numer').innerHTML=Math.abs(parts[2]);
						document.getElementById('denom').innerHTML=Math.abs(parts[1]);
						document.getElementById('denom').classList.remove('none');
					}
					show_hide([],['comma','answer_2']);
				}
			}else{
				// 2次方程式
				if(parts[0]<0){
					for(let i=0; i<parts.length; i++){
						parts[i]*=-1;
					}
				}
				if(parts[1]==0){
					if(parts[2]>0){
						// エラー: 実数解なし
						document.getElementById('error').textContent='Error: 実数解なし';
						show_hide(['error'],['x-equals','answer','comma','answer_2'])
					}else if(parts[2]==0){
						document.getElementById('numer').textContent=0;
					}else{
						parts.push(common_divisors([parts[0],parts[2]])[0]);
						parts.push(0);
						parts.push(common_divisors([parts[0],parts[2]])[1]);
						parts.splice(0,3);
						// console.log(parts);
						let sqrts;
						if(parts[0]>1){
							sqrts=really_sqrt(parts[2]*-1*parts[0]);
							let frac=[sqrts[0],parts[0]];
							frac=common_divisors(frac);
							if(frac[1]==1){
								document.getElementById('numer').innerHTML=`&plusmn;${frac[0]}`;
							}else{
								document.getElementById('x-equals').innerHTML='x=&plusmn;';
								document.getElementById('numer').innerHTML=`${frac[0]}&Sqrt;<span class="sqrt">${sqrts[1]}</span>`;
								document.getElementById('denom').innerHTML=frac[1];
								show_hide(['denom'],[]);
							}
						}else{
							sqrts=really_sqrt(parts[2]*-1);
							// console.log(sqrts);
							if(sqrts[1]==1){
								if(sqrts[0]==''){
									document.getElementById('numer').innerHTML='&plusmn;1';
								}else{
									document.getElementById('numer').innerHTML=`&plusmn;${sqrts[0]}`;
								}
							}else{
								document.getElementById('numer').innerHTML=`&plusmn;${sqrts[0]}&Sqrt;<span class="sqrt">${sqrts[1]}</span>`;
							}
						}
					}
					show_hide([],['comma','answer_2']);
				}else if(parts[2]==0){
					parts.push(common_divisors([parts[0],parts[1]])[0]);
					parts.push(common_divisors([parts[0],parts[1]])[1]);
					parts.push(0);
					parts.splice(0,3);
					// console.log(parts);
					if(parts[1]%parts[0]==0){
						document.getElementById('numer').textContent=0;
						document.getElementById('numer_2').textContent=parts[1]/parts[0]*-1;
						show_hide([],['denom_2']);
					}else{
						if(parts[1]>=0){
							document.getElementById('comma').textContent=',-';
						}else{
							document.getElementById('comma').textContent=',';
						}
						document.getElementById('x-equals').innerHTML='x<span style="font-style:normal;">=0</span>';
						document.getElementById('numer').textContent='';
						document.getElementById('numer_2').textContent=Math.abs(parts[1]);
						document.getElementById('denom_2').textContent=parts[0];
						document.getElementById('denom_2').classList.remove('none');
					}
					show_hide(['comma','answer_2'],[]);
				}else{
					// // 判別式
					discriminant();
					// // → 因数分解チェック
					// // → → 因数分解
					// // → → b'の公式チェック
					// // → → → b'の公式
					// // → → → 解の公式
				}
			}
		}
	}

	function judge_type(){
		parts=[0,0,0];
		let fee=1;
		let hokan='';
		for(let i=0; i<shiki.length; i++){
			switch (shiki.charAt(i)) {
				case '^':
				case 'x':
					if(hokan.length<1 || hokan.charAt(hokan.length-1)=='-'){
						hokan+='1';
					}
					parts[['^','x'].indexOf(shiki.charAt(i))]+=Number(hokan*fee);
					hokan='';
					break;
				
				case '+':
				case '-':
				case '=':
					if(['0','1','2','3','4','5','6','7','8','9'].indexOf(hokan.charAt(hokan.length-1))>-1){
						parts[2]+=Number(hokan*fee);
						hokan='';
					}
					if(shiki.charAt(i)=='='){
						fee*=-1;
						hokan='';
					}else if(shiki.charAt(i)=='-'){
						hokan='-';
					}
					break;
			
				default:
					hokan+=shiki.charAt(i);
					break;
			}
		}
		if(hokan.length>0){
			parts[2]+=Number(hokan*fee);
		}
	}

	function common_divisors(array){
		let chanse;
		let end=0;
		for(let i=2; i<Math.abs(array[0])+1; i++){
			if(end==0){
				chanse=1;
				// console.log('i: '+i);
				for(let j=0; j<array.length; j++){
					// console.log('mod: '+Math.abs(array[j]%i));
					if(Math.abs(array[j]%i)!=0){
						chanse=0;
						break;
					}
				}
				if(chanse==1){
					for(let j=0; j<array.length; j++){
						array[j]/=i;
					}
					i--;
				}
				for(let j=0; j<array.length; j++){
					if(i>Math.abs(array[j])){
						// console.log(i+' > '+Math.abs(array[j]));
						// console.log('∴end');
						end=1;
						break;
					}
				}
			}else{
				break;
			}
		}
		return(array);
	}

	function discriminant(){
		let D=parts[1]*parts[1]-4*parts[0]*parts[2];
		if(D<0){
			// console.log(D);
			// エラー: 実数解なし
			document.getElementById('error').textContent='Error: 実数解なし';
			show_hide(['error'],['x-equals','answer','comma','answer_2'])
		}else{
			parts=common_divisors(parts);
			if(D>0){
				// 異なる2つの解をもつ
				let relay=try_factorization();
				if(relay.length>0){
					console.log(relay);
					// 因数分解
					if(relay[0]*relay[2]==parts[0] && relay[1]*relay[3]==parts[2] && relay[0]*relay[3]+relay[1]*relay[2]==parts[1]){
						solve_factorization(relay);
					}else{
						quadratic_formula();
					}
				}else{
					// 解の公式
					quadratic_formula();
				}
			}else{
				// 重解をもつ
				parts=common_divisors([parts[0],parts[1]]);
				if(parts[0]*parts[1]*-1>0){
					document.getElementById('x-equals').innerHTML='x<span style="font-style:normal;">=</span>';
				}else{
					document.getElementById('x-equals').innerHTML='x<span style="font-style:normal;">=-</span>';
				}
				document.getElementById('denom').classList.remove('none');
				if(Math.abs(parts[1]%2)==0){
					document.getElementById('numer').innerHTML=Math.abs(parts[1]/2);
					document.getElementById('denom').innerHTML=Math.abs(parts[0]);
					if(Math.abs(parts[0])==1){
						document.getElementById('denom').classList.add('none');
					}
				}else{
					document.getElementById('numer').innerHTML=Math.abs(parts[1]);
					document.getElementById('denom').innerHTML=Math.abs(parts[0]*2);
				}
				show_hide([],['comma','answer_2']);
			}
		}
	}

	function try_factorization(){
		let divisors_a=[];
		let divisors_c=[];
		let relay=[];
		for(let i=1; i<Math.floor(Math.sqrt(parts[0]))+1; i++){
			if(parts[0]%i==0){
				divisors_a.push(i);
			}
		}
		for(let i=1; i<=Math.abs(parts[2]); i++){
			if(parts[2]%i==0){
				divisors_c.push(i);
			}
		}
		// console.log(divisors_a);
		// console.log(divisors_c);
		for(let i=0; i<divisors_a.length; i++){
			for(let j=0; j<divisors_c.length; j++){
				if(divisors_a[i]*Math.abs(parts[2]/divisors_c[j])+(parts[0]/divisors_a[i])*Math.abs(divisors_c[j])==Math.abs(parts[1])){
					relay=[divisors_a[i],Math.abs(divisors_c[j]),parts[0]/divisors_a[i],Math.abs(parts[2]/divisors_c[j])];
					if(parts[1]<0){
						relay[1]*=-1;
						relay[3]*=-1;
					}
					break;
				}else if(Math.abs(divisors_a[i]*Math.abs(parts[2]/divisors_c[j])-(parts[0]/divisors_a[i])*Math.abs(divisors_c[j]))==Math.abs(parts[1])){
					relay=[divisors_a[i],Math.abs(divisors_c[j]),parts[0]/divisors_a[i],Math.abs(parts[2]/divisors_c[j])];
					if(parts[1]<0){
						if(relay[0]*relay[3]<relay[1]*relay[2]){
							relay[1]*=-1;
						}else{
							relay[3]*=-1;
						}
					}else{
						if(relay[0]*relay[3]<relay[1]*relay[2]){
							relay[3]*=-1;
						}else{
							relay[1]*=-1;
						}
					}
					break;
				}
			}
		}
		// console.log(relay);
		return(relay);
	}

	function quadratic_formula(){
		document.getElementById('x-equals').innerHTML='x<span style="font-style:normal;">=</span>';
		// console.log(parts);
		let sqrts=[];
		if(parts[1]%2==0){
			sqrts=really_sqrt(parts[1]*parts[1]/4-parts[0]*parts[2]);
			document.getElementById('numer').innerHTML=`${parts[1]/-2}&plusmn;${sqrts[0]}&Sqrt;<span class="sqrt">${sqrts[1]}</span>`;
			if(parts[0]==1){
				document.getElementById('denom').classList.add('none');
			}else{
				document.getElementById('denom').innerHTML=parts[0];
				document.getElementById('denom').classList.remove('none');
			}
		}else{
			sqrts=really_sqrt(parts[1]*parts[1]-4*parts[0]*parts[2]);
			document.getElementById('numer').innerHTML=`${parts[1]*-1}&plusmn;${sqrts[0]}&Sqrt;<span class="sqrt">${sqrts[1]}</span>`;
			document.getElementById('denom').innerHTML=2*parts[0];
			document.getElementById('denom').classList.remove('none');
		}
		show_hide(['numer'],['comma','answer_2']);
	}

	function solve_factorization(relay){
		let x=[];
		let type=[];
		for(let i=0; i<2; i++){
			if(relay[i*2+1]%relay[i*2]==0){
				x.push(relay[i*2+1]/relay[i*2]*-1);
				type.push(1);
			}else{
				relay.push(common_divisors([relay[i*2],relay[i*2+1]])[0],common_divisors([relay[i*2],relay[i*2+1]])[1]);
				relay.splice(2,2);
				// console.log(relay);
				x.push(`${relay[i*2+1]*-1}/${relay[i*2]}`);
				type.push(0);
			}
		}
		console.log(x);
		document.getElementById('x-equals').innerHTML='x<span style="font-style:normal;">=</span>';
		document.getElementById('comma').textContent=',';
		for(let i=0; i<2; i++){
			if(type[i]==1){
				if(type[1-i]==0){
					document.getElementById(`${['x-equals','comma'][i]}`).innerHTML=`${['x<span style="font-style:normal;">=',','][i]}${x[i]}${['</span>',''][i]}`;
					document.getElementById(`numer${['','_2'][i]}`).classList.add('none');
				}else{
					document.getElementById(`numer${['','_2'][i]}`).innerHTML=x[i];
				}
				document.getElementById(`denom${['','_2'][i]}`).classList.add('none');
			}else{
				let frac=['',''];
				let mode=0;
				for(let j=0; j<x[i].length; j++){
					if(x[i].charAt(j)=='/'){
						mode++;
						continue;
					}
					if(x[i].charAt(j)!='-'){
						frac[mode]+=x[i].charAt(j);
					}
				}
				// console.log(frac);
				if(x[i].charAt(0)=='-'){
					document.getElementById(`${['x-equals','comma'][i]}`).innerHTML=`${['x<span style="font-style:normal;">=</span>',','][i]}-`;
				}
				document.getElementById(`numer${['','_2'][i]}`).innerHTML=frac[0];
				document.getElementById(`denom${['','_2'][i]}`).innerHTML=frac[1];
				document.getElementById(`denom${['','_2'][i]}`).classList.remove('none');
			}
		}
		show_hide(['comma','answer_2'],[]);
	}

	function really_sqrt(sqrt){
		let divisors=[sqrt];
		let commons=[1];
		let i=2;
		while(divisors[0]>1){
			if(divisors[0]%i==0){
				divisors.push(i);
				divisors[0]/=i;
			}else{
				i++;
			}
		}
		// console.log(divisors);
		while(divisors.length>1){
			if(divisors[1]==divisors[2]){
				commons[0]*=divisors[1];
				divisors.splice(1,2);
			}else{
				divisors[0]*=divisors[1];
				divisors.splice(1,1);
			}
		}
		if(commons[0]==1){
			commons[0]='';
		}
		// console.log([commons[0],divisors[0]]);
		return([commons[0],divisors[0]]);
	}

	function show_hide(array_s,array_h){
		for(let i=0; i<array_s.length; i++){
			document.getElementById(array_s[i]).classList.remove('none');
		}
		for(let i=0; i<array_h.length; i++){
			document.getElementById(array_h[i]).classList.add('none');
		}
	}
}