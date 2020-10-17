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
	let missed;

	newQuestion();

	function newQuestion(){
		missed=0;
		document.getElementById('hangImage').removeAttribute('src');
		document.getElementById('hangImage').setAttribute('src','img/miss0.svg');
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

	let getKey=document.getElementsByClassName('alphabet');
	for(let i=0; i<26; i++){
		getKey[i].addEventListener('click',()=>{
			if(aliveKey[i].length>0){
				// console.log(`Hi! ${aliveKey[i]}`);
				if(correct.indexOf(aliveKey[i])>-1){
					for(let j=0; j<correct.length; j++){
						if(correct[j]==aliveKey[i]){
							answer[j+1]=aliveKey[i];
						}
					}
					reloadAnswer();
				}else{
					missed++;
					let lives='[';
					for(let i=0; i<6-missed; i++){
						lives+=' ♡';
					}
					lives+=' ]';
					document.getElementById('hangImage').removeAttribute('src');
					document.getElementById('hangImage').setAttribute('src',`img/miss${missed}.svg`);
					document.getElementById('hangImage').removeAttribute('alt');
					document.getElementById('hangImage').setAttribute('alt',`Lives ${lives}`);
					if(missed==6){
						document.getElementById('continueBlack').classList.add('show');
						document.getElementById('alphabets').classList.add('none');
						document.getElementById('buttonContinue').classList.remove('none');
					}
				}
				// console.log(answer);
				aliveKey[i]='';
				getKey[i].classList.add('guessed');
				// getKey[i].classList.remove('alive');
			}
		})
	}

	document.getElementById('buttonContinue').addEventListener('click',()=>{
		missed=0;
		document.getElementById('hangImage').removeAttribute('src');
		document.getElementById('hangImage').setAttribute('src',`img/miss0.svg`);
		document.getElementById('hangImage').removeAttribute('alt');
		document.getElementById('hangImage').setAttribute('alt',`Lives [ ♡ ♡ ♡ ♡ ♡ ♡ ]`);
		document.getElementById('buttonContinue').classList.add('none');
		document.getElementById('alphabets').classList.remove('none');
		document.getElementById('continueBlack').classList.remove('show');
	})

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
			document.getElementById('correctCircle').classList.add('show');
			document.getElementById('alphabets').classList.add('none');
			document.getElementById('buttonSearch').classList.remove('none');
			document.getElementById('buttonAgain').classList.remove('none');
			document.getElementById('searchTitle').innerHTML=`Search <b>"${answer[0]}"</b>`;
			document.getElementsByClassName('site')[0].setAttribute('href',`https://ejje.weblio.jp/content/${answer[0].toLowerCase()}`,'_blank');
			document.getElementsByClassName('site')[1].setAttribute('href',`https://eow.alc.co.jp/search?q=${answer[0].toLowerCase()}`,'_blank');
			document.getElementsByClassName('site')[2].setAttribute('href',`https://translate.google.co.jp/?hl=ja#view=home&op=translate&sl=en&tl=ja&text=${answer[0].toLowerCase()}`,'_blank');
			document.getElementById('correctCircle').addEventListener('animationend',()=>{
				document.getElementById('correctCircle').classList.remove('show');
			})
		}
	}

	document.getElementById('buttonSearch').addEventListener('click',()=>{
		document.getElementById('hider').classList.remove('none');
		document.getElementById('searchMenu').classList.remove('none');
	})
	document.getElementById('closeMenu').addEventListener('click',()=>{
		document.getElementById('hider').classList.add('none');
		document.getElementById('searchMenu').classList.add('none');
	})
	document.getElementById('hider').addEventListener('click',()=>{
		document.getElementById('hider').classList.add('none');
		document.getElementById('searchMenu').classList.add('none');
	})
	document.getElementById('buttonAgain').addEventListener('click',()=>{
		let getGuessed=document.getElementsByClassName('guessed');
		while(getGuessed.length>0){
			// console.log(getGuessed);
			getGuessed[0].classList.remove('guessed');
		}
		document.getElementById('buttonSearch').classList.add('none');
		document.getElementById('buttonAgain').classList.add('none');
		document.getElementById('alphabets').classList.remove('none');
		words.splice(words.indexOf(answer[0]),1);
		if(words.length<1){
			getWordsData();
		}
		// console.log(words);
		newQuestion();
	})
}