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

	let text;
	let returned=[];

	let status;

	document.getElementById('create_button').addEventListener('click',()=>{
		text=roman_text.value;
		status=[''];
		for(let i=0; i<text.length; i++){
			// こっからいらない
			// if(elm.indexOf(text.charAt(i).toUpperCase()+text.charAt(i+1).toUpperCase())>-1){
			// 	// console.log(`${text.charAt(i).toUpperCase()+text.charAt(i+1).toUpperCase()}: ${elm.indexOf(text.charAt(i).toUpperCase()+text.charAt(i+1).toUpperCase())>-1}: ${elm.indexOf(text.charAt(i).toUpperCase()+text.charAt(i+1).toUpperCase())}`);
			// }else{
			// 	// console.log(`${text.charAt(i)}: ${elm.indexOf(text.charAt(i).toUpperCase())>-1}: ${elm.indexOf(text.charAt(i).toUpperCase())}`);
			// }
			// ここまでいらない
			if(elm.indexOf(text.charAt(i).toUpperCase()+text.charAt(i+1).toUpperCase())>-1){
				status[status.length-1]+=elm.indexOf((text.charAt(i)+text.charAt(i+1)).toUpperCase());
				// console.log(status[status.length-1]);
				i++;
				continue;
			}else if(elm.indexOf(text.charAt(i).toUpperCase())>-1){
				status[status.length-1]+=elm.indexOf(text.charAt(i).toUpperCase());
				// console.log(status[status.length-1]);
				continue;
			}else{
				status[status.length-1]+=text.charAt(i);
			}
		}
		console.log(status);
		document.getElementById('returned').textContent=status[status.length-1];
	})
}