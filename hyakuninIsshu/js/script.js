"use strict";

let kaminoku=kuData(0);
let shimonoku=kuData(1);

let cardOrder=[];
let qNum;

let phase;
let tooRead=1;

let allCards=[];

document.getElementById("howMany").addEventListener("input",()=>{
	let currentValue=howMany.value;
	let appropriate=(10<=currentValue && currentValue<=100 && Math.floor(currentValue)==currentValue);
	document.getElementById("startBtn").classList.toggle("enabled",appropriate);
	document.getElementById("error").classList.toggle("none",appropriate);
});

document.getElementById("tooRead").addEventListener("click",()=>{
	document.getElementById("tooRead").classList.toggle("on");
	document.getElementById("tooRead").classList.toggle("off");
	tooRead=1-tooRead;
});

// 正誤判定のマルの動きを設定しておく
document.getElementById("circle").addEventListener("animationend",()=>{
	document.getElementById("circle").classList.remove("appeal");
	newQuestion();
});

document.getElementById("startBtn").addEventListener("click",()=>{
	startGame();
});

function startGame(){
	let currentValue=howMany.value;
	let appropriate=(10<=currentValue && currentValue<=100 && Math.floor(currentValue)==currentValue);
	if(!appropriate){
		document.getElementById("howMany").value=Math.floor(currentValue);
		document.getElementById("howMany").value=Math.max(howMany.value,10);
		document.getElementById("howMany").value=Math.min(howMany.value,100);
		document.getElementById("startBtn").classList.toggle("enabled",appropriate);
		document.getElementById("error").classList.toggle("none",appropriate);
		return;
	}
	document.getElementById("settings").classList.add("none");
	document.getElementById("opening").classList.add("none");
	document.getElementById("startBtn").classList.add("none");
	document.getElementById("tellEnd").classList.add("none");
	document.getElementById("again").classList.add("none");
	document.getElementById("game").classList.remove("none");
	if(currentValue>allCards.length){
		allCards=[];
		for(let i=0; i<100; i++){
			allCards.push(i);
		}
	}
	let cardsHtml="";
	for(let i=0; i<currentValue; i++){
		let r=Math.floor(Math.random()*allCards.length);
		let cardNum=allCards[r];
		cardOrder.push(cardNum);
		let cardContent="";
		for(let j=0; j<shimonoku[cardNum].length; j++){
			let c=shimonoku[cardNum].charAt(j);
			if(c!=' '){
				if(dakuonToSeion[c]){
					cardContent+=dakuonToSeion[c];
				}else{
					cardContent+=c;
				}
			}
		}
		cardsHtml+=`<div class="card" id="card${cardNum}">${cardContent}</div>`;
		allCards.splice(r,1);
	}
	document.getElementById("cards").innerHTML=cardsHtml;

	for(let i=0; i<cardOrder.length; i++){
		let cardId=`card${cardOrder[i]}`;
		let eachCard=document.getElementById(cardId);
		// console.log(cardId);

		// 正誤判定のバツの動きを設定しておく
		eachCard.addEventListener("animationend",()=>{
			eachCard.classList.remove("wrong");
		});

		eachCard.addEventListener("click",()=>{
			// console.log(cardId.match("^card(.+)$"));
			let cardNum=parseInt(cardId.match("^card(.+)$")[1]);
			if(cardNum==cardOrder[qNum]){
				eachCard.classList.add("excard");
				eachCard.classList.remove("card");
				cardOrder.splice(qNum,1);
				document.getElementById("circle").classList.add("appeal");
				document.getElementById("kamihider").classList.add("none");
				document.getElementById("shimohider").classList.add("none");
				document.getElementById("stop").classList.add("skipped");
				document.getElementById("skip").classList.add("skipped");
			}else{
				eachCard.classList.add("wrong");
			}
		});
	}

	newQuestion();
}

function newQuestion(){
	if(cardOrder.length>0){
		// console.log(cardOrder);
		qNum=Math.floor(Math.random()*cardOrder.length);
		// console.log(qNum);
		phase=0;
		document.getElementById("kami_q").innerHTML=`${kaminoku[cardOrder[qNum]]}<div class="hider" id="kamihider"></div>`;
		document.getElementById("shimo_q").innerHTML=`${shimonoku[cardOrder[qNum]]}<div class="hider" id="shimohider"></div>`;
		document.getElementById("skip").classList.remove("skipped");
		document.getElementById("stop").classList.remove("skipped");
		document.getElementById("playStateSign").classList.remove("fa-play");
		document.getElementById("playStateSign").classList.add("fa-pause");
		document.getElementById("kamihider").classList.add("reveal");
		// kamihider, shimohiderの動作を設定しておく
		document.getElementById("kamihider").addEventListener("animationend",()=>{
			phase++;
			if(tooRead==1){
				document.getElementById("shimohider").classList.add("reveal");
				phase++;
			}else{
				document.getElementById("playStateSign").classList.remove("fa-pause");
				document.getElementById("playStateSign").classList.add("fa-play");
			}
		});
		document.getElementById("shimohider").addEventListener("animationend",()=>{
			document.getElementById("skip").classList.add("skipped");
			document.getElementById("stop").classList.add("skipped");
			phase++;
		});
	}else{
		document.getElementById("tellEnd").classList.remove("none");
		document.getElementById("shimo_q").innerHTML="";
		document.getElementById("cards").innerHTML="";
		document.getElementById("game").classList.add("none");
		document.getElementById("again").classList.remove("none");
		document.getElementById("settings").classList.remove("none");
	}
}

document.getElementById("again").addEventListener("click",()=>{
	cardOrder=[];
	startGame();
});

document.getElementById("skip").addEventListener("click",()=>{
	if(tooRead==0){
		// 上の句で止める場合
		if(phase==0){
			// 上の句を読んでる途中
			document.getElementById("kamihider").classList.add("none");
			document.getElementById("playStateSign").classList.add("fa-play");
			document.getElementById("playStateSign").classList.remove("fa-pause");
			phase=1;
		}else if(phase==1 || phase==2){
			// 上の句を読み終わった状態、もしくは下の句を読んでいる途中
			document.getElementById("shimohider").classList.add("none");
			document.getElementById("skip").classList.add("skipped");
			document.getElementById("stop").classList.add("skipped");
			phase=3;
		}
	}else{
		// 上の句で止めずに読み続ける場合: すべてスキップして最後まで表示
		document.getElementById("kamihider").classList.add("none");
		document.getElementById("shimohider").classList.add("none");
		document.getElementById("skip").classList.add("skipped");
		document.getElementById("stop").classList.add("skipped");
		document.getElementById("playStateSign").classList.remove("fa-pause");
		document.getElementById("playStateSign").classList.add("fa-play");
		phase=3;
	}
});

document.getElementById("stop").addEventListener("click",()=>{
	if(tooRead==0 && phase==1){
		// 上の句で止める設定で、かつ上の句を読み終わった状態
		document.getElementById("shimohider").classList.add("reveal");
		document.getElementById("shimohider").classList.remove("stopped");
		document.getElementById("playStateSign").classList.toggle("fa-pause");
		document.getElementById("playStateSign").classList.toggle("fa-play");
		phase++;
	}else if(phase!=3){
		// 最後まで読み終わったわけではない状態
		document.getElementById("kamihider").classList.toggle("stopped");
		document.getElementById("shimohider").classList.toggle("stopped");
		document.getElementById("playStateSign").classList.toggle("fa-pause");
		document.getElementById("playStateSign").classList.toggle("fa-play");
	}
});
