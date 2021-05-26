'use strict';

{
	let words, meanings, rew, rem, allMeanings, hideMeanings;
	let rs, selects, qNum, selected, jokyo, mode, showRuby, getRuby;

	function reset(){
		// words=['領:し;る','あくがる','休らふ','うち出づ','やつす','音なふ','側:そば;む','語らふ','住む','障:さわ;る'];
		// meanings=['(土地を)領有する','さまよい出る/(魂が)宙にさまよう/(心が)うわの空になる','立ち止まる、とどまる/ためらう','口に出して言う','地味な格好にする','音を立てる/手紙を出す、訪れる','横を向く','交際する','(男が女のもとに)通う','妨げられる'];
		// words.push('饗:あるじ;す','もてなす','興:きよう;ず','およぐす','時めく','避:さ;る','困:こう;ず','掻き暗す','憂ふ・愁ふ','託:かこ;つ');
		// meanings.push('客にごちそうする','振る舞う/取り扱う/もてはやす','おもしろがる','成長する/大人びる','寵愛を受ける','避ける/断る','疲れる','悲しみが心を暗くする','訴える','不平を言う');
		// words.push('労:いたは;る','ためらふ','怠る','悩む','後る・遅る','したたむ');
		// meanings.push('病気になる/骨を折る/世話をする','静養する/気を静める','病気がよくなる','病気で苦しむ','先立たれる','処理する/用意する/取り締まる');
		words=['惜:あたら;し','かたじけなし','痴:をこ;がまし','心:こころ;憎:にく;し','賢:さか;し','好:す;き好:ず;きし','なまめかし','今:いま;めかし','しどけなし','つきづきし'];
		meanings=['もったいない','おそれ多い/ありがたい','愚かしい','奥ゆかしい','かしこい/気が利いている/気がしっかりしている/こざかしい','好色めいている/風流だ','優美だ','現代風だ/華やかだ','無造作だ/乱れている','似つかわしい'];
		words.push('なつかし','目:め;安:やす;し','心:こころ;安:やす;し','後:うし;ろめたし','心:こころ;苦:ぐる;し','まばゆし','恥:は;づかし','拙:つたな;し','こちたし','左:さ;右:う;無:な;し');
		meanings.push('好ましい','見苦しくない','安心だ/気楽だ','心配だ','つらい/気の毒だ','見ていられない/恥ずかしい','(こちらが気後れするほど)立派だ','下手だ/劣っている/下品だ/不運だ','仰々しい','ためらわない、無造作だ');
		words.push('所:ところ;狭:せ;し','慎:つつ;まし','まさなし','妬:ねた;し','まだし');
		meanings.push('いっぱいだ/窮屈だ/おおげさだ','気がひける','よくない/見苦しい','しゃくにさわる','まだ時期が早い/不十分だ');
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
		showRuby=false;
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
		getRuby=ruby(words[rs[0]],showRuby);
		document.getElementById('question').innerHTML=getRuby[0];
		if(getRuby[1]){
			document.getElementById('wall').classList.add('changeRubyAvailable');
		}else{
			document.getElementById('wall').classList.remove('changeRubyAvailable');
		}
		for(let i=0; i<4; i++){
			document.getElementsByClassName('select')[i].textContent=selects[i];
		}
	}

	function ruby(q,bool){
		// bool=true;
		if(q.indexOf(':')>-1){
			let fq='';
			for(let i=0; i<q.length; i++){
				if(q.charAt(i+1)==':'){
					fq+=[`<ruby><rb>${q.charAt(i)}</rb><rt>`,''][[true,false].indexOf(bool)];
					for(let j=i+2; j<q.length; j++){
						if(q.charAt(j)==';'){
							fq+=["</rt></ruby>",''][[true,false].indexOf(bool)];
							i=j;
							break;
						}
						fq+=q.charAt(j);
					}
				}else{
					fq+=q.charAt(i);
				}
			}
			return [fq,true];
		}else{
			return [q,false];
		}
	}

	document.getElementById('wall').addEventListener('click',()=>{
		if(mode==1){
			showRuby=[false,true][[true,false].indexOf(showRuby)];
			document.getElementById('question').innerHTML=ruby(words[rs[0]],showRuby)[0];
		}
	})

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
					document.getElementById('selects').classList.add('none');
					document.getElementById('return').classList.add('none');
					document.getElementById('buttons').classList.remove('none');
				}
			}
		}
	})

	// for(let i=0; i<2; i++){
	// 	if(document.getElementsByClassName('startButton')[i]!=null){
	// 		document.getElementsByClassName('startButton')[i].addEventListener('click',()=>{
	// 			document.getElementById('buttons').classList.add('none');
	// 			document.getElementById('selects').classList.remove('none');
	// 			document.getElementById('return').classList.remove('none');
	// 			reset();
	// 			newQuestion();
	// 		})
	// 	}
	// }

	// for(let i=0; i<2; i++){
		// if(document.getElementsByClassName('startButton')[i]!=null){
			document.getElementById('honoSel').addEventListener('click',()=>{
				mode=1;
				document.getElementById('buttons').classList.add('none');
				document.getElementById('selects').classList.remove('none');
				document.getElementById('return').classList.remove('none');
				reset();
				newQuestion();
			})
		// }
	// }
}
