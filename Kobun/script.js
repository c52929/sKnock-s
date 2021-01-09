'use strict';

{
	let words, meanings, rew, rem, allMeanings, hideMeanings;
	let rs, selects, qNum, selected, jokyo, mode;

	function reset(){
		if(mode=='kd'){
			words=['<ruby><rb>顕</rb><rt>あら</rt></ruby>はなり','あからさまなり','<ruby><rb>頑</rb><rt>かたく</rt></ruby>ななり','<ruby><rb>徒</rb><rt>あだ</rt></ruby>なり','<ruby><rb>漫</rb><rt>すず</rt></ruby>ろなり','無下なり'];
			meanings=['まる見えだ/明らかだ','ちょっとの間だ','情趣を解さない/見苦しい','はかない/不誠実だ','あてもない/思いがけない/むやみに','まったくひどい/むやみに/まったく(～ない)'];
		}else if(mode=='n'){
			words=['公','<ruby><rb>際</rb><rt>きは</rt></ruby>','<ruby><rb>験</rb><rt>しるし</rt></ruby>・<ruby><rb>徴</rb><rt>しるし</rt></ruby>','<ruby><rb>理</rb><rt>ことわり</rt></ruby>','<ruby><rb>例</rb><rt>ためし</rt></ruby>','業','覚え','心地','<ruby><rb>現</rb><rt>うつつ</rt></ruby>','つとめて','<ruby><rb>晦</rb><rt>つごもり</rt></ruby>・<ruby><rb>晦日</rb><rt>つごもり</rt></ruby>','ついで','頼り・便り','志','<ruby><rb>由</rb><rt>よし</rt></ruby>','万','手','<ruby><rb>才</rb><rt>ざえ</rt></万>'];
			meanings=['朝廷/天皇','身分/程度','御利益/効果/前兆','道理','例/語り草','仏事/こと','評判/寵愛(を受けること)','気持ち/病気','現実/正気','早朝/翌朝','月末','順序/機会','頼れるもの/縁故/便宜/機会','愛情/贈り物','縁/方法/由緒・風情/事情/そぶり','さまざまなこと/すべて','筆跡/演奏法','学問'];
		}else{
			words=['<ruby><rb>自</rb><rt>おのづか</rt></ruby>ら','即ち・則ち','<ruby><rb>疾</rb><rt>と</rt></ruby>く','いつしか','なべて','いとど','かく','とかく','しか','さ','さばかり','さながら','つゆ～打消','よも～じ','なかなか','さすがに','かつ','など・などか','なでふ・なんでふ','ありし・ありつる','例の','音に聞く','いかがせむ・いかがはせむ','さるべき','いざ給へ'];
			meanings=['自然に/偶然に/万一','すぐに','早く/すでに','早く(～したい・～してほしい)/早くも','総じて/普通','いっそう','このように','あれこれと','そのように','そう','その程度・それほど/非常に','そのまま/全部','少しも～ない','まさか～ないだろう','かえって','そうはいってもやはり','一方では/すぐに','どうして(～か)/どうして(～か。いや、～ない)','どうして(～か)/どうして(～か。いや、～ない)','かつての/さっきの','いつものように/いつもの','うわさに聞く/評判が高い','どうしようか/どうしようもない','適当な/そうなるはずの/立派な','さあ、(一緒に)いらっしゃい'];
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
		document.getElementById('qNum').textContent=`${qNum[2]}Q.${qNum[0]}/${qNum[1]}`;
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

	for(let i=0; i<3; i++){
		document.getElementsByClassName('startButton')[i].addEventListener('click',()=>{
			mode=['kd','n','f'][i];
			document.getElementsByClassName('buttons')[0].classList.add('none');
			document.getElementsByClassName('selects')[0].classList.remove('none');
			document.getElementById('return').classList.remove('none');
			reset();
			newQuestion();
		})
	}
}
