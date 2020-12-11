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
	let code, ddd;

	document.getElementById('code_text').value="3271611833921953";
	document.getElementById('code_text').focus();
	solve();
	document.getElementById('decipher_button').addEventListener('click',()=>{
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
		code=code_text.value
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
		console.log(ddd);

		suspectJa();

		document.getElementById('returnedTxt').textContent='うぇーい';
	}

	function suspectJa(){
		for(let i=0; i<(code.length-1)/2; i++){
			console.log(`${elm[ddd[2*i]]}${elm[ddd[2*i+2]]}`, elm[ddd[2*i+1]]);
		}
	}
}