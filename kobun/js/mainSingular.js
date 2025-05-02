'use strict';

{
	let questions, answers, qNum=[0], r;
	let sentences, meanings;

	document.getElementById('honoWri').addEventListener('click',()=>{
		document.getElementById('selects').classList.add('none');
		QandA();
	})

	function QandA(){
		document.getElementById('buttons').classList.add('none');
		questions=[];
		sentences=['その{郎等}らうどう;を[召す]に、{跡}あと;をくらみて{失}う;せぬ'];
		meanings=['その家来を[お{呼}よ;び{寄}よ;せになる]と、(その家来は)行方をくらませて消えてしまった'];
		reformQs();
		qNum.push(sentences.length);
		while(sentences.length>0){
			answers=[];
			newQ();
			sentences.splice(r,1);
			meanings.splice(r,1);
		}
	}

	function reformQs(){
		let cp;
		for(let i=0; i<sentences.length; i++){
			cp=`${sentences[i]}。`;
			sentences[i]='';
			meanings[i]='';
			answers.push('');
			for(let j=0; j<cp.length; j++){
				if(cp.charAt(j)=='{'){
					sentences[i]+="<ruby><rb>";
					for(let k=j+1; k<cp.length; k++){
						if(cp.charAt(k)=='}'){
							sentences[i]+="</rb><rt>";
							k++;
						}else if(cp.charAt(k)==';'){
							sentences[i]+="</rt></ruby>";
							j=k+1;
							break;
						}
						sentences[i]+=cp.charAt(k);
					}
				}else if(cp.charAt(j)=='['){
					sentences[i]+='<span class="qPoint">';
					for(let k=j+1; k<cp.length; k++){
						if(cp.charAt(k)==']'){
							sentences[i]+='</span>';
							j=k+1;
							break;
						}
						sentences[i]+=cp.charAt(k);
					}
				}
				sentences[i]+=cp.charAt(j);
			}
		}

	}

	function newQ(){
		qNum[0]++;
		r=Math.floor(Math.random()*sentences.length);
		// questions.push(sentences[r]);
		// answers.push(meanings[r]);
		document.getElementById('qNum').textContent=`Q.${qNum[0]}/${qNum[1]}`;
		document.getElementById('question').innerHTML=sentences[r];
	}

}