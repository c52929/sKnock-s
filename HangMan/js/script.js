'use strict';
{
	// let wordsdata=[];
	// console.log(wordsdata);

	let words=[];
	let deleted=[];
	getWordsData();
	function getWordsData(){
		for(let i=0; i<wordsdata.length; i++){
			let del=0;
			let theWord=wordsdata[i];
			let count=[0];
			for(let j=0; j<theWord.length; j++){
				if(count.indexOf(theWord.charAt(j).toUpperCase())<0){
					if(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].indexOf(theWord.charAt(j).toUpperCase())>=0){
						count[0]++;
						count.push(theWord.charAt(j).toUpperCase());
					}else{
						del=1;
						break;
					}
				}
			}
			if(count[0]>=3 && del==0 && words.indexOf(theWord.toUpperCase())<0){
				words.push(theWord.toUpperCase());
			}else{
				deleted.push(`[${i}]: ${theWord}`);
				continue;
			}
		}
	}

	// console.log(deleted);
	// console.log(words);

	let aliveKey;
	let r;
	let correct;
	let answer;

	newQuestion();

	function newQuestion(){
		aliveKey=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		r=Math.floor(Math.random()*words.length);
		correct=[];
		for(let i=0; i<words[r].length; i++){
			correct.push(words[r].charAt(i));
		}
		answer=[''];
		for(let i=0; i<words[r].length; i++){
			answer.push('*');
		}
		reloadAnswer();
		// console.log(answer);
	}

	let getKey=document.getElementsByClassName('alive');
	for(let i=0; i<getKey.length; i++){
		getKey[i].addEventListener('click',()=>{
			// console.log(`Hi! ${i}`);
			for(let j=0; j<correct.length; j++){
				if(correct[j]==aliveKey[i]){
					answer[j+1]=aliveKey[i];
				}
			}
			reloadAnswer();
			// console.log(answer);
			getKey[i].classList.add('guessed');
		})
	}

	function reloadAnswer(){
		let asterisks=0;
		answer[0]='';
		for(let i=1; i<answer.length; i++){
			answer[0]+=answer[i];
			if(answer[i]=='*'){
				asterisks++;
			}
		}
		document.getElementById('question').textContent=answer[0];
		if(asterisks==0){
			document.getElementById('alphabets').classList.add('none');
			document.getElementById('buttonNext').textContent='Try Again';
			document.getElementById('buttonNext').classList.remove('none');
		}
	}

	document.getElementById('buttonNext').addEventListener('click',()=>{
		let getGuessed=document.getElementsByClassName('guessed');
		while(getGuessed.length>0){
			// console.log(getGuessed);
			getGuessed[0].classList.remove('guessed');
		}
		document.getElementById('buttonNext').classList.add('none');
		document.getElementById('alphabets').classList.remove('none');
		words.splice(words.indexOf(answer[0]),1);
		if(words.length<1){
			getWordsData();
		}
		console.log(words);
		newQuestion();
	})
}