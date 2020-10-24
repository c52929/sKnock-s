'use strict';

{
	let words, meanings, rew, rem, allMeanings, hideMeanings;
	let rs, selects, qNum, selected, jokyo, mode;

	function reset(){
		if(mode=='d'){
			words=['匂ふ','移ろふ','往ぬ・去ぬ','遊ぶ','愛づ','慣らふ・馴らふ','かしづく','頼む','守る','聞こゆ','おこす','設く','<ruby><rb>答</rb><rt>いら</rt></ruby>ふ','渡る','具す','訪ふ・弔ふ','物す','わななく','わづらふ','惑ふ','<ruby><rb>被</rb><rt>かづ</rt></ruby>く','失す','行ふ'];
			meanings=['美しく照り映える','色が変わる/(心が)移る','行く・去る/(時が)過ぎ去る','管弦を楽しむ','感嘆する/愛する','慣れる/親しむ','大切に養育する/大切に世話をする','あてにする/あてにさせる','見つめる','聞こえる/世間に知られる/理解できる','よこす','準備する','答える','行く・来る・通る/ずっと(～する)・一面に(～する)','(引き)連れる/つき従う/添える','訪ねる/見舞う/弔問する・供養する','いる/行く・来る','ふるえる','思い悩む/苦労する/～するのに困る','心が乱れる・途方に暮れる/ひどく(～する)','(ほうびを)いただく/(ほうびを)与える','消える/亡くなる','仏道の修行をする'];
		}else if(mode=='k'){
			words=['おもしろし','あらまほし','やむごとなし','ゆゆし','<ruby><rb>畏</rb><rt>かしこ</rt></ruby>し・<ruby><rb>恐</rb><rt>かしこ</rt></ruby>し','<ruby><rb>賢</rb><rt>かしこ</rt></ruby>し','うるはし','はかなし','はかばかし','やさし','いはけなし','かたはらいたし','心もとなし','いとほし','あさまし','いたし','つれなし','あいなし','あぢきなし','さがなし','すさまじ','言ふ甲斐無し','よしなし','<ruby><rb>便</rb><rt>びん</rt></ruby>無し','さうざうし','むつかし'];
			meanings=['すばらしい/興趣がある','理想的だ','高貴だ/この上ない','不吉だ/すばらしい/はなはだしい','おそれ多い/非常に','すばらしい/非常に','端正だ/親しい','頼りない/ちょっとした','しっかりしている/はっきりしている','優雅だ/けなげだ','幼い','見苦しい/気の毒だ/恥ずかしい/ばかばかしい','待ち遠しい/不安だ/はっきりしない','かわいそうだ/かわいい','驚きあきれるほどだ/あきれるほどひどい/情けない','とても/たいして(～ない)/すばらしい','平然としている/冷淡だ/何の変化もない','筋違いだ/つまらない/むやみに','どうにもならない/つまらない','性質がよくない/いたずらだ','興ざめだ/殺風景だ','どうしようもない/取るに足りない/ひどい','関係がない/方法がない/つまらない','都合が悪い/困ったことだ','物足りない','うっとうしい/わずらわしい/むさくるしい'];
		}
		rew=[];
		rem=[];
		qNum=[0,words.length,''];
		allMeanings=Array.from(meanings);
		// console.log(allMeanings);
	}

	function newQuestion(){
		// console.log(words);
		qNum[0]++;
		jokyo=0;
		selects=[];
		selected=[false,false,false,false];
		rs=[Math.floor(Math.random()*words.length),''];
		rs[1]=Math.floor(Math.random()*(selects.length+1));
		// console.log(rs[1]);
		selects.splice(rs[1],0,'');
		// let hokan;
		for(let i=0; i<meanings[rs[0]].length; i++){
			if(meanings[rs[0]].charAt(i)=='/'){
				rs[1]=Math.floor(Math.random()*(selects.length+1));
				// console.log(rs[1]);
				selects.splice(rs[1],0,'');
			}else{
				selects[rs[1]]+=meanings[rs[0]].charAt(i);
			}
		}
		// console.log(selects);
		// console.log(allMeanings);
		hideMeanings=[meanings[rs[0]]];
		allMeanings.splice(allMeanings.indexOf(meanings[rs[0]]),1);
		// console.log(allMeanings);
		rs.push();
		while(selects.length<4){
			rs[1]=Math.floor(Math.random()*(selects.length+1));
			// console.log(rs[1]);
			selects.splice(rs[1],0,'');
			rs[2]=Math.floor(Math.random()*allMeanings.length);
			// console.log(rs);
			for(let i=0; i<allMeanings[rs[2]].length; i++){
				if(allMeanings[rs[2]].charAt(i)=='/'){
					if(selects.indexOf('')>-1){
					}else{
						break;
					}
				}else{
					selects[rs[1]]+=allMeanings[rs[2]].charAt(i);
				}
			}
			hideMeanings.push(allMeanings[rs[2]]);
			allMeanings.splice(rs[2],1);
		}
		// console.log(selects.indexOf(''));
		// console.log(selects);
		document.getElementById('qNum').textContent=`${qNum[2]} Q.${qNum[0]}/${qNum[1]}`;
		document.getElementById('question').innerHTML=words[rs[0]];
		for(let i=0; i<4; i++){
			document.getElementsByClassName('select')[i].textContent=selects[i];
		}
	}

	for(let i=0; i<4; i++){
		document.getElementsByClassName('select')[i].addEventListener('click',()=>{
			if(jokyo==0){
				document.getElementsByClassName('select')[i].classList.toggle('selected');
				selected[i]=selected[i]==false;
			}
		})
	}
	document.getElementById('return').addEventListener('click',()=>{
		if(jokyo==0){
			jokyo++;
			let correct=[''];
			for(let i=0; i<meanings[rs[0]].length; i++){
				if(meanings[rs[0]].charAt(i)=='/'){
					correct.push('');
				}else{
					correct[correct.length-1]+=meanings[rs[0]].charAt(i);
				}
			}
			let score=0;
			for(let i=0; i<4; i++){
				// console.log(selected[i],selects[i],correct.indexOf(selects[i]));
				document.getElementsByClassName('select')[i].classList.remove('selected');
				if(selected[i]==correct.indexOf(selects[i])>=0){
					score++;
					if(selected[i]){
						document.getElementsByClassName('select')[i].classList.add('correct');
					}else{
						document.getElementsByClassName('select')[i].classList.add('nothing');
					}
				}else{
					if(correct.indexOf(selects[i])>=0){
						document.getElementsByClassName('select')[i].classList.add('wascorrect');
					}else{
						document.getElementsByClassName('select')[i].classList.add('incorrect');
					}
				}
			}
			if(score<4){
				rew.push(words[rs[0]]);
				rem.push(meanings[rs[0]]);
			}
			// console.log(hideMeanings);
			for(let i=0; i<hideMeanings.length; i++){
				allMeanings.push(hideMeanings[i]);
			}
			// console.log(meanings[rs[0]]);
			// console.log(allMeanings);
			words.splice(rs[0],1);
			meanings.splice(rs[0],1);
			document.getElementById('return').classList.add('next');
			document.getElementById('return').textContent='Next';
		}else{
			document.getElementById('return').classList.remove('next');
			document.getElementById('return').textContent='Return';
			for(let i=0; i<4; i++){
				document.getElementsByClassName('select')[i].classList.remove('correct','incorrect','nothing','wascorrect');
			}
			if(words.length>0){
				newQuestion();
			}else{
				if(rew.length>0){
					words=Array.from(rew);
					meanings=Array.from(rem);
					rew=[];
					rem=[];
					qNum=[0,words.length,'Retry '];
					newQuestion();
				}else{
					document.getElementById('qNum').textContent='Congratulations!';
					document.getElementById('question').textContent='天晴';
					document.getElementsByClassName('selects')[0].classList.add('none');
					document.getElementById('return').classList.add('none');
					document.getElementsByClassName('buttons')[0].classList.remove('none');
				}
			}
		}
	})

	for(let i=0; i<2; i++){
		document.getElementsByClassName('startButton')[i].addEventListener('click',()=>{
			mode=['d','k'][i];
			document.getElementsByClassName('buttons')[0].classList.add('none');
			document.getElementsByClassName('selects')[0].classList.remove('none');
			document.getElementById('return').classList.remove('none');
			reset();
			newQuestion();
		})
	}
}