'use strict';

{
	let questions, answers;

	document.getElementById('honoSel').addEventListener('click',()=>{
		document.getElementsByClassName('sellects')[0].classList.remove('none');
		QandA();
	})

	function QandA(){
		document.getElementsByClassName('buttons')[0].classList.add('none');
		questions=[];
		answers=[];
		let sentence=['その<ruby><rb>郎等</rb><rt>らうどう</rt></ruby>を[召す]に、<ruby><rb>跡</rb><rt>あと</rt></ruby>をくらみて<ruby><rb>失</rb><rt>う</rt></ruby>せぬ'];
		let mean=['その家来を[お{呼}(よ)び{寄}(よ)せになる]と、(その家来は)行方をくらませて消えてしまった'];
		let r;
		while(sentence.length>0){
			r=Math.floor(Math.random()*sentence.length);
			questions.push(sentence[r]);
			answers.push(mean[r]);
			sentence.splice(r,1);
			mean.splice(r,1);
		}
	}

}