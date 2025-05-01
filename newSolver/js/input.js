'use strict';

let fieldElm=[[],[]];
let cursorPosition=[0,0];

let elmEditDisabled=1;

reloadField(0);
reloadField(1);


document.getElementById("deleteKey").addEventListener("click",()=>{
	if(cursorPosition[1]<fieldElm[cursorPosition[0]].length){
		fieldElm[cursorPosition[0]].splice(cursorPosition[1],1);
		reloadField(cursorPosition[0]);
		disableKeys();
	}
})

function reloadField(LorR){
	let fieldHTML;
	if(fieldElm[LorR].length>0){
		fieldHTML="";
		for(let i=0; i<fieldElm[LorR].length; i++){
			fieldHTML+=`<span${['',' class="focus"'][Number(i==cursorPosition[1])]}>${['','+'][Number(i>0 && fieldElm[LorR][i].charAt(0)!='−')]}${fieldElm[LorR][i]}</span>`;
		}
		elmEditDisabled=0;
		if(cursorPosition[1]==fieldElm[LorR].length){
			fieldHTML+='<span class="focus">&nbsp;&nbsp;</span>';
			elmEditDisabled=1;
		}
	}else{
		if(LorR==0){
			fieldHTML='<span class="gray focus">x</span>';
		}else{
			fieldHTML='<span class="gray focus">0</span>';
		}
		elmEditDisabled=1;
	}
	document.getElementsByClassName("shikiField")[LorR].innerHTML=fieldHTML;
}

const getField=document.getElementsByClassName("shikiField");
for(let i=0; i<2; i++){
	getField[i].addEventListener("click",()=>{
		cursorPosition[1]=fieldElm[i].length;
		if(i!=cursorPosition[0]){
			cursorPosition[0]=i;
			getField[i].classList.add("selected");
			getField[1-i].classList.remove("selected");
		}
		reloadField(cursorPosition[0]);
		disableKeys();
	})
}

// カーソル移動
const getMove=document.getElementsByClassName("move");
for(let i=0; i<2; i++){
	getMove[i].addEventListener("click",()=>{
		if(i==0 && cursorPosition[1]>0){
			cursorPosition[1]--;
		}else if(i==1 && cursorPosition[1]<fieldElm[cursorPosition[0]].length){
			cursorPosition[1]++;
		}
		reloadField(cursorPosition[0]);
		disableKeys();
	})
}
document.addEventListener("keydown",(e)=>{
	if(Array.from(document.getElementsByClassName("inputCoef")).indexOf(document.activeElement)<0){
		if(e.key=="ArrowLeft" && cursorPosition[1]>0){
			cursorPosition[1]--;
		}else if(e.key=="ArrowRight" && cursorPosition[1]<fieldElm[cursorPosition[0]].length){
			cursorPosition[1]++;
		}else if(e.key=="Backspace" && cursorPosition[1]<fieldElm[cursorPosition[0]].length){
			fieldElm[cursorPosition[0]].splice(cursorPosition[1],1);
		}
		reloadField(cursorPosition[0]);
		disableKeys();
	}
})

function disableKeys(){
	// そもそもreloadField()が実行される度にこれが実行されるというのがおかしかったのでは
	const getMove=document.getElementsByClassName("move");
	getMove[0].classList.toggle("disabled",cursorPosition[1]==0);
	getMove[1].classList.toggle("disabled",cursorPosition[1]==fieldElm[cursorPosition[0]].length);
	document.getElementById("deleteKey").classList.toggle("dont-click",cursorPosition[1]==fieldElm[cursorPosition[0]].length);

	// ついでにelmEditDisabledのこともやっちゃう
	if(elmEditDisabled){
		document.getElementById("elmEdit").classList.add("disabled");
	}else{
		document.getElementById("elmEdit").classList.remove("disabled");
		// ついでにeditのとこもやっちゃう
		reloadElmEdit();
	}
}

function reloadElmEdit(){
	if(cursorPosition[1]<fieldElm[cursorPosition[0]].length){
		let selected=fieldElm[cursorPosition[0]][cursorPosition[1]];
		let i=0;
		if(selected.charAt(0)=='−'){
			checkedList[2]=1;
			i=1;
		}else{
			checkedList[2]=0;
		}
		let selectedCoef="";
		if(selected.charAt(i)=='('){
			selectedCoef='-';
			i+=2;
		}
		checkedList[3]=0;
		for(i=i; i<selected.length; i++){
			if(selected.charAt(i)=='<'){
				checkedList[3]=1;
				i+=32;
				break;
			}
			if(selected.charAt(i)!=')'){
				selectedCoef+=selected.charAt(i);
			}
		}
		if(selectedCoef.length==0){
			selectedCoef=1;
		}
		document.getElementById("elmEditCoef").value=selectedCoef;
		if(i<selected.length){
			checkedList[3]=2;
		}
		editSelects();
	}
}

function editSelects(){
	document.getElementById("elmEditPmP").classList.remove("checked");
	document.getElementById("elmEditPmM").classList.remove("checked");
	if(checkedList[2]==0){
		document.getElementById("elmEditPmP").classList.add("checked");
	}else{
		document.getElementById("elmEditPmM").classList.add("checked");
	}
	document.getElementById("elmEditDim0").classList.remove("checked");
	document.getElementById("elmEditDim1").classList.remove("checked");
	document.getElementById("elmEditDim2").classList.remove("checked");
	if(checkedList[3]==0){
		document.getElementById("elmEditDim0").classList.add("checked");
	}else if(checkedList[3]==1){
		document.getElementById("elmEditDim1").classList.add("checked");
	}else{
		document.getElementById("elmEditDim2").classList.add("checked");
	}
}


let idSets=[["elmAddPmP","elmAddPmM"],["elmAddDim0","elmAddDim1","elmAddDim2"],["elmEditPmP","elmEditPmM"],["elmEditDim0","elmEditDim1","elmEditDim2"]];
let checkedList=[0,1,0,1];
const getElmEdit=document.getElementsByClassName("clickable");
for(let i=0; i<getElmEdit.length; i++){
	getElmEdit[i].addEventListener("click",()=>{
		let id=getElmEdit[i].getAttribute("id");
		let idx;
		for(let j=0; j<idSets.length; j++){
			if(idSets[j].indexOf(id)>=0){
				if(j>=2 && elmEditDisabled){
					break;
				}
				idx=idSets[j].indexOf(id);
				for(let k=0; k<idSets[j].length; k++){
					document.getElementById(idSets[j][k]).classList.remove("checked");
				}
				document.getElementById(idSets[j][idx]).classList.add("checked");
				checkedList[j]=idx;
				if(j<2){
					document.getElementById("elmAddCandidate").innerHTML=reloadCandidate(0);
				}else{
					fieldElm[cursorPosition[0]].splice(cursorPosition[1],1,reloadCandidate(1));
					reloadField(cursorPosition[0]);
				}
				break;
			}
		}
	})
}
document.addEventListener("keyup",(e)=>{
	if(document.getElementById("elmEditCoef")==document.activeElement){
		if(reloadCandidate(1)!="NaN"){
			fieldElm[cursorPosition[0]].splice(cursorPosition[1],1,reloadCandidate(1));
			reloadField(cursorPosition[0]);
		}
	}else{
		document.getElementById("elmAddCandidate").innerHTML=reloadCandidate(0);
	}
})

document.getElementById("elmEditCoef").addEventListener("focusout",()=>{
	// console.log("focusout");
	if(reloadCandidate(1)=="NaN"){
		reloadElmEdit();
	}else{
		fieldElm[cursorPosition[0]].splice(cursorPosition[1],1,reloadCandidate(1));
		reloadField(cursorPosition[0]);
	}
})

// initial load時
document.getElementById("elmAddCandidate").innerHTML=reloadCandidate(0);
disableKeys();

function reloadCandidate(addOrEdit){
	let candidate=["","−"][checkedList[2*addOrEdit]];
	let coef;
	if(addOrEdit==0){
		let mismatch=elmAddCoef.validity.patternMismatch;
		document.getElementById("elmAddButton").classList.toggle("disabled",mismatch);
		coef=[elmAddCoef.value,0][Number(mismatch)];
	}else{
		if(elmEditCoef.validity.patternMismatch){
			return "NaN";
		}
		coef=elmEditCoef.value;
	}
	if(coef.length==0){
		coef=1;
	}else if(coef=='-'){
		coef=-1;
	}
	if(Math.abs(coef)==0){
		return candidate+'0';
	}
	if(candidate.length>0 && coef<0){
		candidate+=`(−${Math.abs(coef)})`;
	}else{
		if(Math.abs(coef)==1 && checkedList[2*addOrEdit+1]>=1){
			candidate+=["","−"][Number(coef<0)];
		}else{
			candidate+=`${["","−"][Number(coef<0)]}${Math.abs(coef)}`;
		}
	}
	if(checkedList[2*addOrEdit+1]==1){
		candidate+='<span class="italic">x</span>';
	}else if(checkedList[2*addOrEdit+1]==2){
		candidate+='<span class="italic">x</span><sup>2</sup>';
	}
	return candidate;
}

document.getElementById("elmAddButton").addEventListener("click",()=>{
	if(!elmAddCoef.validity.patternMismatch){
		fieldElm[cursorPosition[0]].splice(cursorPosition[1],0,reloadCandidate(0));
		cursorPosition[1]++;
		reloadField(cursorPosition[0]);
	}
})