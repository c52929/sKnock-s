'use strict';
{
	let hintAns=1
	
	newQuestion();

	document.addEventListener('keydown',(event)=>{
		if(event.key=='Enter'){
			if(hintAns==1){
				newQuestion();
			}else{
				showAnswer();
			}
		}else if(event.key==' '){
			if(hintAns!=1){
				showHint();
			}
		}
	})

	document.getElementById('nextQ').addEventListener('click',()=>{
		newQuestion();
	})
	document.getElementById('seeHint').addEventListener('click',()=>{
		showHint();
	})
	document.getElementById('seeAns').addEventListener('click',()=>{
		showAnswer();
	})

	function showHint(){
		if(hintAns==0){
			hintAns=2;
			document.getElementById('hider').classList.add('hint2');
		}else if(hintAns<6){
			hintAns++;
			document.getElementById('hider').classList.add(`hint${hintAns}`);
		}else{
			showAnswer();
		}
		document.activeElement.blur();
	}
	
	function showAnswer(){
		document.getElementById('hider').classList.add('none');
		document.getElementById('nextQ').classList.remove('disable');
		document.getElementById('seeHint').classList.add('disable');
		document.getElementById('seeAns').classList.add('disable');
		hintAns=1;
		document.activeElement.blur();
	}

	function newQuestion(){
		if(hintAns>0){
			for(let i=2; i<=6; i++){
				document.getElementById('hider').classList.remove(`hint${i}`);
			}
			document.getElementById('seeHint').classList.remove('disable');
			document.getElementById('seeAns').classList.remove('disable');
			document.getElementById('nextQ').classList.add('disable');
			document.getElementById('hider').classList.remove('none');
			document.getElementById('kanji').textContent=kanji[Math.floor(Math.random()*kanji.length)];
			hintAns=0;
		}
		document.activeElement.blur();
	}
}