'use strict';

let n,nInv;
let seg=[6,2,5,5,4,5,6,3,7,6];
let elm=["該当なし","H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca"];
let elmName=["NULL","Hydrogen","Helium","Lithium","Beryllium","Boron","Carbon","Nitrogen","Oxygen","Fluorine","Neon","Sodium","Magnesium","Aluminum","Silicon","Phosphorus","Sulfur","Chlorine","Argon","Potassium","Calcium"];
let notes=[0,"A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];

let p=[2,3];
let pMax=3;

document.getElementById("ans_button").addEventListener("click",()=>{
	if(num1.value>0 && num2.value>0){
		n=Number(num1.value)+Number(num2.value);
		document.getElementById("ans_output").innerHTML=fushitarazu(n,1,1);
	}else{
		document.getElementById("ans_output").innerHTML='<p class="red">Invalid Number</p>';
	}
})

let max,min;
let from;
let one,satisfy;
let txt;
let needsNote;
document.getElementById("q_button").addEventListener("click",()=>{
	max=Number(numMax.value);
	min=Number(numMin.value);
	if(onlyPrime.checked){
		isPrime(max);
		from=[];
		for(let i=0; i<p.length; i++){
			if(min<=p[i] && p[i]<max){
				from.push(p[i]);
			}else if(p[i]>max){
				break;
			}
		}
		if(from.length>0){
			nInv=from[Math.floor(Math.random()*from.length)];
		}else{
			nInv=-1;
		}
	}else{
		if(max>=min){
			nInv=Math.floor(Math.random()*(max-min+1))+min;
		}else{
			nInv=-1;
		}
	}
	if(nInv==-1){
		document.getElementById("q_output").innerHTML='<p class="red">Invalid Number Range</p>';
		document.getElementById("reveal_button").classList.add("none");
		document.getElementById("reveal_output").classList.add("none");
	}else{
		needsNote=addNotes.checked;
		txt=fushitarazu(nInv,0,needsNote);
		one=fushitarazu_simple(nInv,needsNote);
		satisfy=[];
		if(onlyPrime.checked){
			if(min<=2 && equivalentArr(one,fushitarazu_simple(2,needsNote))){
				satisfy.push(2);
			}
			for(let i=Math.max(min,5); i<=max; i++){
				if(equivalentArr(one,fushitarazu_simple(i,needsNote))){
					satisfy.push(i);
				}
				i+=i%2;
			}
		}else{
			for(let i=min; i<=max; i++){
				if(equivalentArr(one,fushitarazu_simple(i,needsNote))){
					satisfy.push(i);
				}
			}
		}
		if(moreThan.checked && satisfy.length>1){
			txt+='<p class="blue">[複数解注意報]</p>';
		}
		document.getElementById("q_output").innerHTML=txt;
		document.getElementById("reveal_button").classList.remove("none");
		document.getElementById("reveal_output").classList.add("none");
	}
})

document.getElementById("reveal_button").addEventListener("click",()=>{
	document.getElementById("reveal_output").classList.remove("none");
	document.getElementById("reveal_output").innerHTML=`${satisfy}`;
})

function fushitarazu(n,showBin,needsNote){
	// 3の倍数
	let txt=["","<p>あやまりなさい</p>","<p>あやまりなさい</p>"][n%3];
	
	// 素数判定
	txt+=["","<p>ありがとう</p>"][isPrime(n)];
	
	// mod 6
	txt+=`<p>完全に${n%6}</p>`;

	// 7 segment
	let s=n.toString();
	let sum=0;
	for(let i=0; i<s.length; i++){
		sum+=seg[Number(s.charAt(i))];
	}
	txt+=`<p>${sum}本</p>`;

	// mod 21の元素(0->該当なし)
	txt+=`<p>${elm[n%21]}: ${elmName[n%21]}</p>`;

	if(showBin){
		// binary
		let m=n;
		let bin="";
		while(m>1){
			bin=`${m%2}${bin}`;
			m=Math.floor(m/2);
		}
		if(m==1){
			bin=`1${bin}`;
		}
		txt+=`<p>0b${bin}</p>`;
	}

	// 音階
	if(needsNote){
		let l;
		let s=n;
		while(s==0 || s>12){
			l=s.toString();
			s=0;
			for(let i=0; i<l.length; i++){
				s+=Number(l.charAt(i));
			}
		}
		txt+=`<p>note: ${notes[s]}</p>`;
	}

	return txt;
}

function isPrime(n){
	// 素数リスト更新
	let isP;
	while(pMax<=n){
		pMax+=2;
		isP=1;
		for(let i=0; p[i]**2<=pMax; i++){
			if(pMax%p[i]==0){
				isP=0;
				break;
			}
		}
		if(isP){
			p.push(pMax);
		}
	}

	// 素数判定
	return Number(p.indexOf(n)>=0);
}

function fushitarazu_simple(n,needsNote){
	// 3の倍数、素数判定、mod 6
	let r=[Number(n%3>0),isPrime(n),n%6];

	// 7 segment
	let s=n.toString();
	let sum=0;
	for(let i=0; i<s.length; i++){
		sum+=seg[Number(s.charAt(i))];
	}
	r.push(sum);

	// mod 21
	r.push(n%21);

	// mod 12
	if(needsNote){
		let l;
		let s=n;
		while(s==0 || s>12){
			l=s.toString();
			s=0;
			for(let i=0; i<l.length; i++){
				s+=Number(l.charAt(i));
			}
		}
		r.push(s);
	}

	return r;
}

function equivalentArr(a,b){
	if(a.length!=b.length){
		return 0;
	}
	let e=1;
	for(let i=0; i<a.length; i++){
		if(a[i]!=b[i]){
			e=0;
			break;
		}
	}
	return e;
}