'use strict';
{
	const selAll=document.getElementById('sellectAll');
	const rangeForm=document.sellectRange.range;
	let checkCondition=[false,false,false,false,false,false,false,false,false,false];
	let active, ans, correct, info, r, supplement;
	let qNum=[], hint=[], againSentences=[], againChoices=[];
	selAll.addEventListener('click',()=>{
		for(let i=1; i<rangeForm.length; i++){
			changeCheck(i,selAll.checked);
		}
	})
	for(let i=0; i<rangeForm.length; i++){
		rangeForm[i].addEventListener('click',()=>{
			checkCondition[i]=rangeForm[i].checked;
			if(checkCondition.indexOf(true)>-1){
				document.getElementById('startButton').classList.add('enable');
			}else{
				document.getElementById('startButton').classList.remove('enable');
			}
			checkCondition.splice(0,1);
			checkCondition.splice(0,0,checkCondition.indexOf(false)<0);
			rangeForm[0].ked=checkCondition.indexOf(false)<0;
		})
	}
	function changeCheck(index,TorF){
		checkCondition[index]=TorF
		rangeForm[index].checked=TorF;
	}

	document.getElementById('startButton').addEventListener('click',()=>{
		if(checkCondition.indexOf(true)>-1){
			document.sellectRange.classList.add('none');
			document.getElementById('startButton').classList.add('none');
			document.getElementById('title').classList.add('none');
			document.getElementById('QandA').classList.remove('none');
			QandA0(checkCondition);
			QandA1(checkCondition);
			QandA2(checkCondition);
			qNum=[sentences.length,0];
			newQ();
		}
	})

	function newQ(){
		// console.log(sentences);
		// console.log(againSentences);
		if(sentences.length>0){
			qNum[1]++;
			document.getElementById('qNum').textContent=`Q.${qNum[1]}/${qNum[0]}`;
			r=Math.floor(Math.random()*sentences.length);
			info=review(sentences[r]);
			if(info[0].charAt(0)+info[0].charAt(1)+info[0].charAt(2)+info[0].charAt(3)+info[0].charAt(4)+info[0].charAt(5)=='<table'){
				document.getElementById('question').innerHTML='';
				document.getElementById('question').classList.add('none');
				document.getElementById('tableWrapper').innerHTML=info[0];
				document.getElementById('tableWrapper').classList.remove('none');
			}else{
				document.getElementById('tableWrapper').innerHTML='';
				document.getElementById('tableWrapper').classList.add('none');
				document.getElementById('question').innerHTML=info[0];
				document.getElementById('question').classList.remove('none');
			}
			// console.log(choices[r].length);
			document.getElementById('hints').innerHTML='';
			if(choices[r].length>0){
				hint=[''];
				for(let i=0; i<choices[r].length; i++){
					if(choices[r].charAt(i)==','){
						hint.push('');
						continue;
					}
					hint[hint.length-1]+=choices[r].charAt(i);
				}
				for(let i=0; i<sentences[r].length; i++){
					if(sentences[r].charAt(i)=='['){
					hint.push('');
						for(let j=i+1; j<sentences[r].length; j++){
							if(sentences[r].charAt(j)=='/' || sentences[r].charAt(j)==']'){
								break;
							}
							hint[hint.length-1]+=sentences[r].charAt(j);
						}
					}
				}
				let r2;
				for(let i=0; i<hint.length;){
					r2=Math.floor(Math.random()*(hint.length-i));
					const addHint=document.createElement('span');
					addHint.classList.add('hint');
					addHint.textContent=hint[r2];
					document.getElementById('hints').appendChild(addHint);
					hint.splice(r2,1);
				}
				document.getElementById('hint').classList.remove('none');
			}else{
				document.getElementById('hint').classList.add('none');
			}
			document.getElementById('modal').innerHTML='';
			if(document.getElementById('text1')!=null){
				document.getElementById('text1').focus();
			}
		}else{
			if(againSentences.length>0){
				sentences=Array.from(againSentences);
				choices=Array.from(againChoices);
				againSentences=[];
				againChoices=[];
				qNum=[sentences.length,0];
				newQ();
			}else{
				document.getElementById('QandA').classList.add('none');
				document.getElementById('qNum').textContent='あなた賢いですねぇ';
				document.getElementById('title').textContent='さぁ第二ラウンドだ';
				document.getElementById('title').classList.remove('none');
				for(let i=0; i<6; i++){
					changeCheck(i,false);
				}
				document.getElementById('sellectRange').classList.remove('none');
				document.getElementById('startButton').classList.remove('none','enable');
			}
		}
	}

	document.getElementById('showHint').addEventListener('click',()=>{
		document.getElementById('hints').classList.toggle('none');
		document.getElementById('showHint').classList.toggle('off');
	})

	function review(sentence){
		let info=[''];
		for(let i=0; i<sentence.length; i++){
			if(sentence.charAt(i)=='[' || sentence.charAt(i)=='{'){
				info[0]+=`<input type="text" id="text${info.length}" class="input-text">`;
				info.push('');
				for(let j=i+1; j<sentence.length; j++){
					if(sentence.charAt(j)==']' || sentence.charAt(j)=='}'){
						// if(sentence.charAt(j)=='}'){
						// 	info[info.length-1]+='|';
						// }
						i=j;
						break;
					}
					info[info.length-1]+=sentence.charAt(j);
				}
				continue;
			}
			// if(sentence.charAt(i)=='{'){
			// 	info[0]+=`<input type="text" id="text${info.length}" class="input-text">`;
			// 	info.push('%junfudo');
			// 	junfudo.push('');
			// 	for(let j=i+1; j<sentence.length; j++){
			// 		if(sentence.charAt(j)=='}'){
			// 			i=j;
			// 			break;
			// 		}
			// 		junfudo[junfudo.length-1]+=sentence.charAt(j);
			// 	}
			// 	continue;
			// }
			if(sentence.charAt(i)=='%'){
				continue;
			}
			if(sentence.charAt(i)=='…' && sentence.charAt(i-1)!='%'){
				info[0]+=`<span style="font-family:'Meiryo','Hiragino Mincho ProN';">…</span>`;
				continue;
			}
			if(sentence.charAt(i)+sentence.charAt(i+1)=='li'){
				info[0]+='<span style="background:linear-gradient(transparent 60%, #faa 60%)">';
				for(let j=i+2; j<sentence.length; j++){
					if(sentence.charAt(j)+sentence.charAt(j+1)=='ne'){
						info[0]+='</span>';
						i=j+1;
						break;
					}
					info[0]+=sentence.charAt(j);
				}
				continue;
			}
			if(sentence.charAt(i)+sentence.charAt(i+1)+sentence.charAt(i+2)=='coj'){
				info[0]+='憲法第';
				for(let j=i+3; j<sentence.length; j++){
					if(sentence.charAt(j)=='-'){
						info[0]+='条第';
						for(let k=j+1; k<sentence.length; k++){
							if(sentence.charAt(k)==';'){
								info[0]+='項';
								i=k;
								break;
							}
							info[0]+=sentence.charAt(k);
						}
						break;
					}
					if(sentence.charAt(j)==';'){
						info[0]+='条';
						i=j;
						break;
					}
					info[0]+=sentence.charAt(j);
				}
				continue;
			}
			if(sentence.charAt(i)+sentence.charAt(i+1)=='cj'){
				for(let j=i+2; j<sentence.length; j++){
					if(sentence.charAt(j)=='-'){
						info[0]+='条';
						for(let k=j+1; k<sentence.length; k++){
							if(sentence.charAt(k)==';'){
								info[0]+='項';
								i=k;
								break;
							}
							info[0]+=sentence.charAt(k);
							break;
						}
					}
					if(sentence.charAt(j)==';'){
						info[0]+='条';
						i=j;
						break;
					}
					info[0]+=sentence.charAt(j);
				}
				continue;
			}
			info[0]+=sentence.charAt(i);
		}
		// console.log(info);
		// console.log(junfudo);
		return info;
	}

	document.addEventListener('keyup',(event)=>{
		active=[document.activeElement,''];
		if(active[0].id.charAt(0)+active[0].id.charAt(1)+active[0].id.charAt(2)+active[0].id.charAt(3)=='text'){
			if(event.key=="Enter"){
				if(info[0].charAt(0)+info[0].charAt(1)+info[0].charAt(2)+info[0].charAt(3)+info[0].charAt(4)+info[0].charAt(5)!='<table'){
					if(active[0].value.length>1){
						active[0].style=`width:${active[0].value.length}em;`;
					}else if(active[0].value.length<1){
						active[0].style=`width:6em;`;
						active[1]='わーいわーい';
					}else{
						active[0].style=`width:2em;`;
					}
				}
				// console.log(active);
				if(active[1]!='わーいわーい'){
					if(document.getElementById('text2')==null){
						clickAnswerButton();
					}else{
						active[1]='';
						for(let i=4; i<active[0].id.length; i++){
							active[1]+=active[0].id.charAt(i);
						}
						active.push(document.getElementById(`text${Number(active[1])+1}`));
						// console.log(active);
						if(active[2]!=null){
							active[2].focus();
						}else{
							if(document.getElementById('text1')!=null){
								document.getElementById('text1').focus();
							}
						}
					}
				}
			}else{
				if(info[0].charAt(0)+info[0].charAt(1)+info[0].charAt(2)+info[0].charAt(3)+info[0].charAt(4)+info[0].charAt(5)!='<table'){
					if(active[0].value.length>5){
						active[0].style=`width:${active[0].value.length}em;`;
					}else{
						active[0].style=`width:6em;`;
					}
				}
			}
		}
	})

	document.getElementById('answerButton').addEventListener('click',()=>{
		clickAnswerButton();
	})

	function clickAnswerButton(){
		supplement=[];
		for(let i=1; i<info.length; i++){
			supplement.push(null,null);
			correct=[''];
			for(let j=0; j<info[i].length; j++){
				if(info[i].charAt(j)=='/'){
					correct.push('');
					continue;
				}
				correct[correct.length-1]+=info[i].charAt(j);
			}
			// console.log(correct);
			ans=[document.getElementById(`text${i}`),document.getElementById(`text${i}`).value];
			// console.log(ans);
			if(ans[1].charAt(0)==' ' || ans[1].charAt(0)=='　'){
				ans.push('');
				for(let j=1; j<ans[1].length; j++){
					if(ans[1].charAt(j)==' ' || ans[1].charAt(j)=='　'){
						break;
					}
					ans[2]+=ans[1].charAt(j);
				}
				ans.splice(1,1);
			}
			if(ans[1].charAt(ans[1].length-1)==' ' || ans[1].charAt(ans[1].length-1)=='　'){
				ans.push('');
				for(let j=ans[1].length-2; j>0; j--){
					if(ans[1].charAt(j)==' ' || ans[1].charAt(j)=='　'){
						break;
					}
					ans[2]=ans[1].charAt(j)+ans[2];
				}
				ans.splice(1,1);
			}
			// console.log(ans);
			ans[0].value=ans[1];
			if(correct.indexOf(ans[1])>-1){
				// correct;
				ans[0].classList.add('correct');
				if(info[0].charAt(0)+info[0].charAt(1)+info[0].charAt(2)+info[0].charAt(3)!='<tr>'){
					ans[0].style=`width:${ans[1].length}em;`;
				}
			}else{
				// incorrect;
				if(againSentences[againSentences.length-1]!=sentences[r]){
					againSentences.push(sentences[r]);
					againChoices.push(choices[r]);
				}
				ans[0].classList.add('incorrect');
				ans[0].value=correct[0];
				if(info[0].charAt(0)+info[0].charAt(1)+info[0].charAt(2)+info[0].charAt(3)!='<tr>'){
					ans[0].style=`width:${correct[0].length}em;`;
				}
				// console.log(ans);
				supplement[supplement.length-2]=ans[1];
			}
			if(correct.length>1 || supplement[supplement.length-2]!=null){
				for(let i=1; i<correct.length;){
					correct[0]+=`/${correct[1]}`;
					correct.splice(1,1);
				}
				supplement[supplement.length-1]=correct[0];
			}
		}
		// console.log(supplement);
		for(let i=0; i<supplement.length/2; i++){
			if(supplement[2*i]!=null || supplement[2*i+1]!=null){
				const addTitle=document.createElement('h3');
				addTitle.textContent=`(${i+1})`;
				document.getElementById('modal').appendChild(addTitle);
				if(supplement[2*i]!=null){
					const addMiss=document.createElement('p');
					addMiss.classList.add('miss');
					if(supplement[2*i]==''){
						addMiss.innerHTML='<i class="fas fa-times" ></i>(無回答)';
					}else{
						addMiss.innerHTML=`<i class="fas fa-times" ></i>${supplement[2*i]}`;
					}
					document.getElementById('modal').appendChild(addMiss);
				}
				if(supplement[2*i+1]!=null){
					correct=[''];
					for(let j=0; j<supplement[2*i+1].length; j++){
						if(supplement[2*i+1].charAt(j)=='/'){
							correct.push('');
							continue;
						}
						correct[correct.length-1]+=supplement[2*i+1].charAt(j);
					}
					for(let j=0; j<correct.length; j++){
						const addAno=document.createElement('p');
						addAno.classList.add('solution');
						addAno.innerHTML=`<i class="far fa-circle" ></i>${correct[j]}`;
						document.getElementById('modal').appendChild(addAno);
					}
				}
			}
		}
		for(let i=0; i<supplement.length; i++){
			if(supplement[i]==null){
				supplement.splice(i,1);
				i--;
			}
		}
		if(supplement.length>0){
			document.getElementById('info').classList.remove('none');
		}
		sentences.splice(r,1);
		choices.splice(r,1);
		document.getElementById('answerButton').classList.add('none');
		document.getElementById('nextButton').classList.remove('none');
		document.getElementById('nextButton').focus();
	}

	document.getElementById('info').addEventListener('click',()=>{
		modal(true);
	})
	document.getElementById('black').addEventListener('click',()=>{
		modal(false);
	})
	
	function modal(bool){
		if(bool){
			document.getElementById('black').classList.toggle('blackNone');
			document.getElementById('modal').classList.toggle('modalNone');
			document.getElementById('info').classList.toggle('fa-info-circle');
			document.getElementById('info').classList.toggle('fa-times-circle');
		}else{
			document.getElementById('black').classList.add('blackNone');
			document.getElementById('modal').classList.add('modalNone');
			document.getElementById('info').classList.add('fa-info-circle');
			document.getElementById('info').classList.remove('fa-times-circle');
		}
	}
	
	document.getElementById('nextButton').addEventListener('click',()=>{
		document.getElementById('info').classList.add('none');
		document.getElementById('answerButton').classList.remove('none');
		document.getElementById('nextButton').classList.add('none');
		newQ();
	})
}