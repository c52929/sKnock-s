'use strict';
{
	const selAll=document.getElementById('sellectAll');
	const rangeForm=document.sellectRange.range;
	const selCha=[document.getElementById('sellectChapter1'),document.getElementById('sellectChapter2')];
	const selSec=[document.getElementById('sellectSection1-2'),document.getElementById('sellectSection2-1'),document.getElementById('sellectSection2-2')];
	let checkCondition=[false,false,false,false,false,false];
	let r, info;
	let qNum=[], hint=[], againSentences=[], againChoices=[];
	selAll.addEventListener('click',()=>{
		for(let i=1; i<rangeForm.length; i++){
			changeCheck(i,selAll.checked);
			// checkCondition[i]=selAll.checked;
			// rangeForm[i].checked=selAll.checked;
		}
	})
	selCha[0].addEventListener('click',()=>{
		changeCheck(2,selCha[0].checked);
		// checkCondition[2]=selCha[0].checked;
		// rangeForm[2].checked=selCha[0].checked;
	})
	selCha[1].addEventListener('click',()=>{
		for(let i=4; i<6; i++){
			changeCheck(i,selCha[1].checked);
			// checkCondition[i]=selCha[1].checked;
			// rangeForm[i].checked=selCha[1].checked;
		}
	})
	selSec[0].addEventListener('click',()=>{
		changeCheck(1,selSec[0].checked);
		// checkCondition[1]=selSec[0].checked;
		// rangeForm[1].checked=selSec[0].checked;
	})
	for(let i=1; i<3; i++){
		selSec[i].addEventListener('click',()=>{
			changeCheck(3,selSec[1].checked && selSec[2].checked);
			// checkCondition[3]=selSec[1].checked && selSec[2].checked;
			// rangeForm[3].checked=selSec[1].checked && selSec[2].checked;
		})
	}
	for(let i=0; i<rangeForm.length; i++){
		rangeForm[i].addEventListener('click',()=>{
			checkCondition[i]=rangeForm[i].checked;
			if(rangeForm[i].checked==false){
				// checkCondition[i]=false; // 不要だよね？笑
				rangeForm[0].checked=false;
			}
			// console.log(checkCondition);
			if(checkCondition.indexOf(true)>-1){
				document.getElementById('startButton').classList.add('enable');
			}else{
				document.getElementById('startButton').classList.remove('enable');
			}
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
			checkCondition.splice(0,2);
			checkCondition.splice(1,1);
			// console.log(checkCondition);
			QandA(checkCondition);
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
			if(info[0].charAt(0)+info[0].charAt(1)+info[0].charAt(2)+info[0].charAt(3)=='<tr>'){
				document.getElementById('question').innerHTML='';
				document.getElementById('question').classList.add('none');
				document.getElementById('table').innerHTML=info[0];
				document.getElementById('table').classList.remove('none');
			}else{
				document.getElementById('table').innerHTML='';
				document.getElementById('table').classList.add('none');
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
			document.getElementById('text1').focus();
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
		let junfudo=[];
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
			if(sentence.charAt(i)=='…' && sentence.charAt(i)!='%'){
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

	document.getElementById('question').onkeyup=function changeLength(){
		for(let i=1; i<info.length; i++){
			let now=document.getElementById(`text${i}`);
			now.addEventListener('keyup',(event)=>{
				if(now.value.length>6){
					now.style=`width:${now.value.length}em;`;
				}else{
					now.style=`width:6em;`;
				}
			})
		}
	}

	let active;

	document.addEventListener('keydown',(event)=>{
		if(event.key=='Enter'){
			active=[document.activeElement.id,''];
			if(active[0].charAt(0)+active[0].charAt(1)+active[0].charAt(2)+active[0].charAt(3)=='text'){
				for(let i=4; i<active[0].length; i++){
					active[1]+=active[0].charAt(i);
				}
				// console.log(active);
				active[1]=document.getElementById(`text${Number(active[1])+1}`);
				if(active[1]!=null){
					active[1].focus();
				}else{
					document.getElementById('text1').focus();
				}
			}
		}
	})

	document.getElementById('answerButton').addEventListener('click',()=>{
		let ans;
		let correct;
		let jfCorrect;
		for(let i=1; i<info.length; i++){
			ans=document.getElementById(`text${i}`);
			correct=[''];
			jfCorrect=[];
			for(let j=0; j<info[i].length; j++){
				if(info[i].charAt(j)=='/'){
					correct.push('');
					continue;
				}
				correct[correct.length-1]+=info[i].charAt(j);
			}
			// console.log(correct);
			if(correct.indexOf(ans.value)>-1){
				// console.log('correct');
				ans.classList.add('correct');
				if(info[0].charAt(0)+info[0].charAt(1)+info[0].charAt(2)+info[0].charAt(3)!='<tr>'){
					if(correct[correct.indexOf(ans.value)].length>6){
						ans.style=`width:${correct[correct.indexOf(ans.value)].length}em;`;
					}else{
						ans.style=`width:6em;`;
					}
				}
			}else{
				// console.log(incorrect);
				if(againSentences[againSentences.length-1]!=sentences[r]){
					againSentences.push(sentences[r]);
					againChoices.push(choices[r]);
				}
				ans.classList.add('incorrect');
				ans.value=correct[0];
				if(info[0].charAt(0)+info[0].charAt(1)+info[0].charAt(2)+info[0].charAt(3)!='<tr>'){
					if(correct[0].length>6){
						ans.style=`width:${correct[0].length}em;`;
					}else{
						ans.style=`width:6em;`;
					}
				}
			}
		}
		sentences.splice(r,1);
		choices.splice(r,1);
		document.getElementById('answerButton').classList.add('none');
		document.getElementById('nextButton').classList.remove('none');
		document.getElementById('nextButton').focus();
	})
	
	document.getElementById('nextButton').addEventListener('click',()=>{
		document.getElementById('answerButton').classList.remove('none');
		document.getElementById('nextButton').classList.add('none');
		newQ();
	})
}