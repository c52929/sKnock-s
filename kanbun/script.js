'use strict';

{
	let questions, corrects, meanings, req, rec, rem;
	let qNums, r, correct, miss, jokyo, show;
	
	function reset(){
		questions=['中','何如','幾何','些','徒','所謂','道','逾々','以為','凡','如此','且','嘗','易','蓋','於是','是以','対','悉','不者','数々','寡','已','乃','夫','唯','忽','偶々','事','毎','遂','具','与','汝','悪','俄','耳','私','為人','肆','方','亦','宣','固','之','故','所以','自','因','少','而','而','説','古','若','如','若','如'];
		corrects=['あ/つ','いかん','いくばく','いささ/か','いたづ/ら/に','いはゆる','い/ふ','いよいよ','おも/へ/ら/く','およ/そ','か/く/のご/と/し','か/つ','かつ/て','か/ふ','けだ/し','ここ/にお/い/て','ここ/をもっ/て','こた/ふ','ことごと/く','しからずんば','しばしば','すくな/し','すで/に','すなは/ち','そ/れ','た/だ','たちま/ち','たまたま','つか/ふ','つね/に','つひ/に','つぶさ/に','と','なんぢ','にく/む','には/か/に','のみ','ひそか/に','ひと/とな/り','ほしいまま','まさ/に','また','むべ/な/り','もと/よ/り','ゆ/く','ゆゑ/に','ゆゑん','よ/り','よ/り/て','わか/し','しか/し/て','しか/れ/ど/も','よろこば/し','いにしへ','も/し','も/し','ごと/し','ごと/し'];
		meanings=['','どうであるか','どれくらい','','','','','','思ったことには','','このようである','','','','思うに、考えるに、おそらく','','','','','そうでなければ','','','','','そもそも','','','','','','','くわしく','','','','','','','人柄','かって気まま','','','もっともだ、当然だ','','','','理由・わけ、方法・手段、～ためのもの','','','','そして','けれども','','','もし','もし','～のようだ','～のようだ'];
		// console.log(questions.length);
		// console.log(corrects.length);
		qNums=[0,questions.length,''];
		req=[];
		rec=[];
		rem=[];
		miss=0;
		document.getElementById('againButton').classList.add('none');
		document.getElementById('meaning').classList.remove('none');
		document.getElementById('ruby').innerHTML='<ruby><rb id="question"></rb><rt id="correctAnswer"></rt></ruby>';
		document.getElementsByClassName('answering')[0].classList.remove('none');
	}
	reset();

	function newQuestion(){
		qNums[0]++;
		r=Math.floor(Math.random()*questions.length);
		miss=0;
		jokyo=[''];
		correct='';
		show=corrects[r];
		// console.log(corrects,corrects[r]);
		for(let i=0; i<corrects[r].length; i++){
			if(corrects[r].charAt(i)!='/'){
				jokyo.push('*');
				jokyo[0]+=jokyo[jokyo.length-1];
				correct+=corrects[r].charAt(i);
			}
		}
		document.getElementById('qNum').textContent=`${qNums[2]} Q. ${qNums[0]}/${qNums[1]}`;
		document.getElementById('question').textContent=questions[r];
		document.getElementById('correctAnswer').textContent=`( )`;
		document.getElementById('meaning').innerHTML=`${['','意味: '][Number(meanings[r].length>0)]}<span>${meanings[r]}</span>`;
		document.getElementById('answerText').value='';
		document.getElementById('answerText').focus();
	}

	document.getElementById('returnButton').addEventListener('click',()=>{
		responseReturn();
	})
	document.addEventListener('keydown',(event)=>{
		// console.log(event.key);
		if(event.key=='Enter'){
			// console.log('Enter!');
			responseReturn();
		}
	})

	function responseReturn(){
		// console.log(answerText.value, correct);
		// console.log(answerText.value==correct);
		if(answerText.value==correct){
			if(questions.length>1){
				questions.splice(r,1);
				corrects.splice(r,1);
				meanings.splice(r,1);
				newQuestion();
			}else{
				if(req.length>0){
					questions=Array.from(req);
					corrects=Array.from(rec);
					meanings=Array.from(rem);
					req=[];
					rec=[];
					rem=[];
					qNums=[0,questions.length,'Retry'];
					newQuestion();
				}else{
					document.getElementById('qNum').textContent='Congratulations!';
					document.getElementById('ruby').textContent='Mission Complete!';
					document.getElementById('meaning').classList.add('none');
					document.getElementsByClassName('answering')[0].classList.add('none');
					document.getElementById('againButton').classList.remove('none');
					document.activeElement.blur();
				}
			}
		}else{
			miss++;
			// console.log(miss);
			if(req[req.length-1]!=questions[r]){
				req.push(questions[r]);
				rec.push(corrects[r]);
				rem.push(meanings[r]);
			}
			if(miss>1){
				let hokanI;
				if(show.indexOf('/')>-1){
					for(let i=0; i<show.length; i++){
						if(show.charAt(i)=='/'){
							jokyo[i+1]=show.charAt(i+1);
							jokyo[0]=[''];
							for(let i=1; i<jokyo.length; i++){
								jokyo[0]+=jokyo[i];
							}
							hokanI=i;
							break;
						}
					}
				}else{
					for(let j=0; j<jokyo[0].length; j++){
						if(jokyo[0].charAt(j)=='*'){
							hokanI=j;
							break;
						}
					}
				}
				// console.log(`hokanI = ${hokanI}`);
				// show=show.slice(0,hokanI)+show.slice(hokanI-show.length);
				let hokan='';
				if(show.indexOf('/')>-1){
					for(let j=0; j<hokanI; j++){
						hokan+=show.charAt(j);
					}
					for(let j=hokanI+1; j<show.length; j++){
						hokan+=show.charAt(j);
					}
					show=hokan;
				}else{
					for(let j=1; j<jokyo.length; j++){
						if(jokyo[j]=='*'){
							jokyo[j]=show.charAt(j-1);
							jokyo[0]=[''];
							for(let i=1; i<jokyo.length; i++){
								jokyo[0]+=jokyo[i];
							}
							break;
						}
					}
				}
				// console.log(jokyo);
				// console.log(show);
			}
			document.getElementById('correctAnswer').textContent=`(${jokyo[0]})`;
		}
		// console.log(questions);
	}

	document.getElementById('againButton').addEventListener('click',()=>{
		reset();
		newQuestion();
	})

	newQuestion();
}