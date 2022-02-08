'use strict';
{
	let words, meanings, rew, rem, allMeanings, hideMeanings;
	let rs=[], selects, qNum, selected, ideal, jokyo, mode, showRuby, getRuby;
	let bengiW,bengiM;

	function newQuestion(){
		// console.log(words);
		qNum[0]++;
		jokyo=0;
		showRuby=false;
		selects=[];
		selected=[false,false,false,false];
		ideal=[];
		mode=1;
		if(rs[0]!=undefined){
			// console.log(rs[0], words[rs[0]]);
			words.splice(rs[0],1);
			meanings.splice(rs[0],1);
			// console.log(words);
			if(words.length<1){
				if(rew.length>0){
					words=Array.from(rew);
					meanings=Array.from(rem);
					rew=[];
					rem=[];
					qNum=[1,words.length,'Retry '];
				}else{
					mode=0;
					document.getElementById('qNum').textContent='Congratulations!';
					document.getElementById('question').textContent='天晴';
					document.getElementById('selects').classList.add('none');
					document.getElementById('return').classList.add('none');
					document.getElementById('qSelect').classList.remove('none');
					document.getElementById('sb').classList.remove('none');
					document.getElementById('wall').classList.remove('changeRubyAvailable');
					rs=[];
					return;
				}
			}
		}
		rs=[Math.floor(Math.random()*words.length)];
		let hokan="";
		// console.log(words.length, meanings.length);
		// console.log(words[rs[0]],meanings[rs[0]]);
		for(let i=0; i<meanings[rs[0]].length; i++){
			if(meanings[rs[0]].charAt(i)=='/'){
				selects.push(hokan);
				ideal.push(true);
				hokan="";
			}else{
				hokan+=meanings[rs[0]].charAt(i);
			}
		}
		selects.push(hokan);
		ideal.push(true);
		// console.log(bengiW[0],bengiM[0]);
		// console.log(bengiW[7],bengiM[7]);
		for(let i=0; i<8; i++){
			if(bengiW[i].indexOf(words[rs[0]])>-1){
				rs[1]=i;
				break;
			}
		}
		// console.log(rs);
		hokan=[];
		for(let i=selects.length; i<4; i++){
			hokan=[""];
			// console.log(i,selects[i],selects[i]==undefined,selects.indexOf(selects[i]),selects.indexOf(selects[i])>-1);
			if(selects[i]==undefined || selects[i]==selects[i-1] || selects[i]==selects[i-2] || selects[i]==selects[i-3]){
				rs[2]=Math.floor(Math.random()*(bengiM[rs[1]].length));
				// console.log(rs);
				for(let j=0; j<bengiM[rs[1]][rs[2]].length; j++){
					if(bengiM[rs[1]][rs[2]].charAt(j)=='/'){
						hokan.push("");
						// console.log(hokan);
					}else{
						hokan[hokan.length-1]+=bengiM[rs[1]][rs[2]].charAt(j);
					}
				}
				selects[i]=hokan[hokan.length-1];
				ideal[i]=false;
				i--;
			}
		}
		// console.log(selects,ideal,rs);
		for(let i=0; i<Math.floor(Math.random()*7)+4; i++){
			rs.push(Math.floor(Math.random()*4),Math.floor(Math.random()*4));
			// console.log(rs);
			hokan.push(selects[rs[rs.length-2]],ideal[rs[rs.length-2]]);
			selects.splice(rs[rs.length-2],1);
			selects.splice(rs[rs.length-1],0,hokan[hokan.length-2]);
			if(ideal.indexOf(false)>-1){
				ideal.splice(rs[rs.length-2],1);
				ideal.splice(rs[rs.length-1],0,hokan[hokan.length-1])
			}
		}
		// console.log(selects);
		/*
		rs=[Math.floor(Math.random()*words.length), Math.floor(Math.random()*(selects.length+1))];
		// rs[1]=();
		// console.log(rs[1]);
		// console.log(selects);
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
			while(selects.indexOf(rs[2]) > -1){
				rs[2]=Math.floor(Math.random()*allMeanings.length);
			}
			// console.log(rs);
			for(let i=0; i<allMeanings[rs[2]].length; i++){
				if(allMeanings[rs[2]].charAt(i)=='/'){
					if(selects.indexOf('') > -1){

					}else{
						break;
					}
				}else{
					selects[rs[1]]+=allMeanings[rs[2]].charAt(i);
				}
			}
			hideMeanings.push(allMeanings[rs[2]]);
			// console.log(selects.indexOf(''));
			allMeanings.splice(rs[2],1);
		}
		// console.log(selects);
		*/
		document.getElementById('qNum').textContent=`${qNum[2]}Q.${qNum[0]}/${qNum[1]}`;
		if(words[rs[0]].charAt(2)+words[rs[0]].charAt(3)=="あや" || words[rs[0]].charAt(2)+words[rs[0]].charAt(3)=="しる"){
			showRuby=true;
		}
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
		if(q.indexOf(':')>-1 || q.indexOf('{')>-1){
			let fq='';
			for(let i=0; i<q.length; i++){
				if(q.charAt(i)=='{'){
					fq+=["<ruby><rb>",''][[true,false].indexOf(bool)];
					for(let j=i+1; j<q.length; j++){
						if(q.charAt(j)=='}'){
							fq+=[`</rb><rt>`,''][[true,false].indexOf(bool)];
							for(let k=j+2; k<q.length; k++){
								if(q.charAt(k)=='}'){
									fq+=[`</rt><ruby>`,''][[true,false].indexOf(bool)];
									i=k;
									break;
								}else{
									fq+=q.charAt(k);
								}
							}
							break;
						}else{
							fq+=[q.charAt(j),''][[true,false].indexOf(bool)];
						}
					}
				}else if(q.charAt(i+1)==':'){
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
			let score=0;
			for(let i=0; i<4; i++){
				document.getElementsByClassName('select')[i].classList.remove('selected');
				if(ideal[i]==selected[i]){
					score++;
					if(ideal[i]){
						document.getElementsByClassName('select')[i].classList.add('correct');
					}else{
						document.getElementsByClassName('select')[i].classList.add('nothing');
					}
				}else{
					if(ideal[i]){
						document.getElementsByClassName('select')[i].classList.add('wascorrect');
					}else{
						document.getElementsByClassName('select')[i].classList.add('incorrect');
					}
				}
			}
			/*
			let correct=[''];
			for(let i=0; i<meanings[rs[0]].length; i++){
				if(meanings[rs[0]].charAt(i)=='/'){
					correct.push('');
				}else{
					correct[correct.length-1]+=meanings[rs[0]].charAt(i);
				}
			}
			// console.log(correct);
			// console.log(selects);
			for(let i=0; i<4; i++){
				// console.log(selected[i],selects[i],correct.indexOf(selects[i]));
				document.getElementsByClassName('select')[i].classList.remove('selected');
				if(selected[i]==(correct.indexOf(selects[i])>=0)){
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
			*/
			if(score<4){
				rew.push(words[rs[0]]);
				rem.push(meanings[rs[0]]);
			}
			// console.log(hideMeanings);
			// for(let i=0; i<hideMeanings.length; i++){
			// 	allMeanings.push(hideMeanings[i]);
			// 	// console.log(allMeanings);
			// }
			// console.log(meanings[rs[0]]);
			// words.splice(rs[0],1);
			// meanings.splice(rs[0],1);
			document.getElementById('return').classList.add('next');
			document.getElementById('return').textContent='Next';
		}else{
			document.getElementById('return').classList.remove('next');
			document.getElementById('return').textContent='Return';
			for(let i=0; i<4; i++){
				document.getElementsByClassName('select')[i].classList.remove('correct','incorrect','nothing','wascorrect');
			}
			newQuestion();
		}
	})

	document.getElementById('sb').addEventListener('click',()=>{
		if(sedQ.indexOf(true)>-1){
			document.getElementById('qSelect').classList.add('none');
			document.getElementById('sb').classList.add('none');
			document.getElementById('selects').classList.remove('none');
			document.getElementById('return').classList.remove('none');
			reset(sedQ,"(^0^)/ { ﾑｽﾞｶｯﾀﾖ!!)");
			reset(1,1);
			newQuestion();
		}
	})

	let boolMemo, sedQ=[];
	for(let i=0; i<25; i++){
		sedQ.push(false);
	}
	document.getElementById('selectAll').addEventListener('click',()=>{
		boolMemo=selectAll.checked;
		for(let i=1; i<=25; i++){
			document.getElementsByClassName("qSel")[i].checked=boolMemo;
			sedQ[i]=boolMemo;
		}
		if(boolMemo==true){
			document.getElementById('sb').classList.remove('unavailable');
		}else{
			document.getElementById('sb').classList.add('unavailable');
		}
	})
	// for(let i=1; i<=5; i++){
	// 	document.getElementById(`q${i}0`).addEventListener('click',()=>{
	// 		boolMemo=document.getElementById(`q${i}0`).checked;
	// 		sedQ[[1,7,14,15,22][i-1]]=boolMemo;
	// 		for(let j=1; j<=[5,6,0,6,5][i-1]; j++){
	// 			document.getElementById(`q${i}${j}`).checked=boolMemo;
	// 			sedQ[[1,7,14,15,22][i-1]+j]=boolMemo;
	// 		}
	// 		// console.log(sedQ);
	// 	})
	// }
	for(let i=0; i<25; i++){
		document.getElementsByClassName('indent')[i].addEventListener('click',()=>{
			boolMemo=document.getElementsByClassName('indent')[i].checked;
			sedQ[i+1]=boolMemo;
			sedQ.splice(0,1);
			if(sedQ.indexOf(!boolMemo)>-1){
				sedQ.splice(0,0,false);
				document.getElementById('selectAll').checked=false;
			}else{
				sedQ.splice(0,0,boolMemo);
				document.getElementById('selectAll').checked=boolMemo;
			}
			if(sedQ.indexOf(true)>-1){
				document.getElementById('sb').classList.remove('unavailable');
			}else{
				document.getElementById('sb').classList.add('unavailable');
			}
		})
	}

	// document.getElementById('jissenQ').addEventListener('click',()=>{
		// 実践問題
	// })

	function reset(sedQ,orz){
		bengiW=[[],[],[],[],[],[],[],[]], bengiM=[[],[],[],[],[],[],[],[]];
		if(orz==1){
			sedQ=["(^0^)/ { ｺﾝﾅﾝｷﾂﾞｸｶ!!)"];
			for(let i=1; i<=25; i++){
				sedQ.push(true);
			}
		}else{
			words=[], meanings=[];
		}
		if(sedQ[1]){
			bengiW[0].push("驚:おどろ;く","ののしる","念:ねん;ず","覚:おぼ;ゆ","忍:しの;ぶ","眺:なが;む","見:み;ゆ","あふ","居:ゐ;る","歩:あり;く","飽:あ;く","飽:あ;かず");
			bengiM[0].push("気づく/目を覚ます","大騒ぎする/評判になる","祈る/がまんする","思われる/似る/思い出される","がまんする/人目を避ける","もの思いに沈む/ぼんやり見る","見える/姿を見せる/見られる","結婚する","座る/～ている","動き回る/(～して)まわる/(～し)続ける","満足する","満ち足りない");
		}
		if(sedQ[2]){
			bengiW[1].push("うつくし","かなし","いみじ","いみじく","をかし","よし","奇:あや;し・怪:あや;し","賤:あや;し","{大人}{おとな}し","ゆかし","おぼつかなし","有:あ;り難:がた;し","めでたし","口:くち;惜:を;し","憂:う;し","侘:わ;びし");
			bengiM[1].push("かわいらしい/立派だ","いとしい/かわいい","とても","とても/とてもすばらしい/とても悲しい","趣がある/美しい/滑稽だ","よい/身分が高く教養がある","不思議だ/けしからん","身分が低い/粗末だ","大人らしい/年配だ/思慮分別がある","見たい/聞きたい/知りたい","ぼんやりしている/気がかりだ/待ち遠しい","めったにない/(めったにないほど)立派だ","すばらしい","残念だ","つらい","つらい/興ざめだ");
		}
		if(sedQ[3]){
			bengiW[2].push("あはれなり","疎:おろそ;かなり","懇:ねんご;ろなり","徒:つれ;然:づれ;なり","徒:いたづら;なり");
			bengiM[2].push("心底しみじみと感じられる","おろそかだ/言葉では言い尽くせない","熱心だ/親しい","(することもなく)退屈だ/しんみりともの寂しい","むだだ/手持ち無沙汰で暇だ");
		}
		if(sedQ[4]){
			bengiW[3].push("年:とし;ごろ","形:かたち;・{容貌}{かたち}","影:かげ;","本:ほ;意:い;","物:もの;語:がたり;","文:ふみ;・書:ふみ;","程","情け","契:ちぎ;り","気:け;色:しき;");
			bengiM[3].push("長年","容貌","光/姿","かねてからの願い","話/物語","手紙/漢詩/漢籍","時/あたり/身分/様子","思いやり/男女間の情愛/情趣を解する心","約束/宿縁/逢瀬(おうせ)","様子/機嫌/思い");
		}
		if(sedQ[5]){
			bengiW[4].push("げに","なほ","やがて","やうやう","え～打消","な～そ","さらに～打消","いかで・いかでか","いと","いと～打消","あまた");
			bengiM[4].push("なるほど","やはり","そのまま/すぐに","だんだん","～できない","～(する)な","まったく～ない","どうして(～か)/どうして(～か。いや、～ない)/どうにかして(～たい・～てほしい・～よう)","とても","たいして(～ない)","たくさん");
		}
		if(sedQ[6]){
			bengiW[0].push("匂:にほ;ふ","移:うつ;ろふ","往:い;ぬ・去:い;ぬ","遊:あそ;ぶ","愛:め;づ","慣:な;らふ・馴:な;らふ","かしづく","頼:たの;む","守:まも;る","聞:き;こゆ","おこす","設:まう;く","答:いら;ふ","渡:わた;る","具:ぐ;す","訪:とぶら;ふ・弔:とぶら;ふ","物:もの;す","わななく","わづらふ","惑:まど;ふ","被:かづ;く","失:う;す","行:おこな;ふ");
			bengiM[0].push("美しく照り映える","色が変わる/(心が)移る","行く・去る/(時が)過ぎ去る","管弦を楽しむ","感嘆する/愛する","慣れる/親しむ","大切に養育する/大切に世話をする","あてにする/あてにさせる","見つめる","聞こえる/世間に知られる/理解できる","よこす","準備する","答える","行く・来る・通る/ずっと(～する)・一面に(～する)","(引き)連れる/つき従う/添える","訪ねる/見舞う/弔問する・供養する","いる/行く・来る","ふるえる","思い悩む/苦労する/～するのに困る","心が乱れる・途方に暮れる/ひどく(～する)","(ほうびを)いただく/(ほうびを)与える","消える/亡くなる","仏道の修行をする");
		}
		if(sedQ[7]){
			bengiW[1].push("おもしろし","あらまほし","やむごとなし","ゆゆし","畏:かしこ;し・恐:かしこ;し","賢:かしこ;し","かしこく","うるはし","はかなし","はかばかし","やさし","いはけなし","かたはらいたし","心:こころ;もとなし","いとほし","あさまし","いたし","いたく～打消","いたく","つれなし","あいなし","あいなく","あぢきなし","さがなし","すさまじ","言:い;ふ甲:か;斐:ひ;無:な;し","よしなし","便:びん;無し","さうざうし","むつかし");
			bengiM[1].push("すばらしい/興趣がある","理想的だ","高貴だ/この上ない","不吉だ/すばらしい/はなはだしい","おそれ多い/非常に","すばらしい/非常に","非常に","端正だ/親しい","頼りない/ちょっとした","しっかりしている/はっきりしている","優雅だ/けなげだ","幼い","見苦しい/気の毒だ/恥ずかしい/ばかばかしい","待ち遠しい/不安だ/はっきりしない","かわいそうだ/かわいい","驚きあきれるほどだ/あきれるほどひどい/情けない","すばらしい","たいして(～ない)","とても","平然としている/冷淡だ/何の変化もない","筋違いだ/つまらない","むやみに","どうにもならない/つまらない","性質がよくない/いたずらだ","興ざめだ/殺風景だ","どうしようもない/取るに足りない/ひどい","関係がない/方法がない/つまらない","都合が悪い/困ったことだ","物足りない","うっとうしい/わずらわしい/むさくるしい");
		}
		if(sedQ[8]){
			bengiW[2].push("貴:あて;なり","清:きよ;らなり","更:さら;なり","顕:あら;はなり","あからさまなり","頑:かたく;ななり","徒:あだ;なり","漫:すず;ろなり","漫:すず;ろに","無:む;下:げ;なり","無:む;下:げ;に","無:む;下:げ;に～打消");
			bengiM[2].push("身分が高い/上品だ/優美だ","美しい","(いまさら)言うまでもない","まる見えだ/明らかだ","ちょっとの間だ","情趣を解さない/見苦しい","はかない/不誠実だ","あてもない/思いがけない/むやみに","むやみに","まったくひどい","むやみに","まったく(～ない)");
		}
		if(sedQ[9]){
			bengiW[3].push("公:おほやけ;","際:きは;","験:しるし;","徴:しるし;","理:ことわり;","例:ためし;","業:わざ;","覚:おぼ;え","御おぼえ","心:ここ;地:ち;","現:うつつ;","つとめて","晦:つごもり;・{晦日}{つごもり};","ついで","頼:たよ;り・便:たよ;り","志:こころざし;","由:よし;","万:よろづ;","万:よろづ;(副詞)","手:て;","才:ざえ");
			bengiM[3].push("朝廷/天皇","身分/程度","御利益/効果","前兆","道理","例/語り草","仏事/こと","評判/寵愛(を受けること)","寵愛(を受けること)","気持ち/病気","現実/正気","早朝/翌朝","月末","順序/機会","頼れるもの/縁故/便宜/機会","愛情/贈り物","縁/方法/由緒・風情/事情/そぶり","さまざまなこと","すべて","筆跡/演奏法","学問");
		}
		if(sedQ[10]){
			bengiW[4].push("自:おのづか;ら","自:おのづか;ら～仮定・推量","即:すなは;ち・則:すなは;ち","疾:と;く","いつしか","なべて","いとど","かく","とかく","しか","さ","さばかり","さながら","つゆ～打消","よも～じ","なかなか","さすがに","かつ","など・などか","なでふ・なんでふ");
			bengiM[4].push("自然に/偶然に","万一","すぐに","早く/すでに","早く(～したい・～してほしい)/早くも","総じて/普通","いっそう","このように","あれこれと","そのように","そう","その程度・それほど/非常に","そのまま/全部","少しも～ない","まさか～ないだろう","かえって","そうはいってもやはり","一方では/すぐに","どうして(～か)/どうして(～か。いや、～ない)","どうして(～か)/どうして(～か。いや、～ない)");
		}
		if(sedQ[11]){
			bengiW[5].push("ありし","ありつる","例:れい;の","音:おと;に聞:き;く","いかがせむ・いかがはせむ","さるべき","いざ給:たま;へ");
			bengiM[5].push("かつての","さっきの","いつものように/いつもの","うわさに聞く/評判が高い","どうしようか/どうしようもない","適当な/そうなるはずの/立派な","さあ、(一緒に)いらっしゃい");
		}
		if(sedQ[12]){
			bengiW[6].push("宣:のたま;ふ・宣:のたま;はす","仰:おほ;す","聞:き;こし召:め;す","御:ご;覧:らん;ず","申:まう;す","聞:き;こゆ・聞:き;こえさす","おはす・おはします","思:おぼ;す・思:おぼ;し召:め;す","賜:たま;ふ・給:たま;ふ(四段)","賜:たま;ふ・給:たま;ふ(下二段)","賜:たま;はす","賜:たま;はる・給:たま;はる","承:うけたまは;る","奉:たてまつ;る","侍:はべ;り","候:さぶら;ふ","召:め;す","詣:まう;づ","参:まゐ;る","参:まゐ;らす","罷:まか;る","罷:まか;づ","遣:つか;はす","遊:あそ;ばす","仕:つか;うまつる","大:おお;殿:との;籠:ごも;る","しろしめす","行:ぎやう;幸:がう;","行:ぎやう;啓:けい;","御:ご;幸:かう;","奏:そう;す","啓:けい;す");
			bengiM[6].push("おっしゃる","おっしゃる","お聞きになる/召し上がる","ご覧になる","申し上げる/(お)～申し上げる","申し上げる/差し上げる/(お)～申し上げる","いらっしゃる/～ていらっしゃる","お思いになる","お与えになる/お～になる","～ております","お与えになる","いただく","お受けする/お聞きする","差し上げる/(お)～申し上げる/お召しになる","お仕えする/あります/～(ござい)ます","お仕えする/あります/～(ござい)ます","お呼び寄せになる/召し上がる/お召しになる/お乗りになる","参上する/参詣する","参上する/差し上げる/し申し上げる/召し上がる","差し上げる/(お)～申し上げる","退出する/参ります/～申す","退出する/出かけます","おやりになる/お与えになる/贈る","演奏をなさる/～(を)なさる","お仕え申し上げる/し申し上げる/(お)～申し上げる","おやすみになる","ご存じである/お治めになる","天皇のお出かけ/","皇后・皇太子などのお出かけ","上皇・法皇・女院のお出かけ","(天皇・上皇に)申し上げる","(皇后・皇太子に)申し上げる");
		}
		if(sedQ[13]){
			bengiW[0].push("領:し;る","あくがる","休:やす;らふ","うち出:い;づ","やつす","音:おと;なふ","側:そば;む","語:かた;らふ","住:す;む","障:さわ;る","饗:あるじ;す","もてなす","興:きよう;ず","およぐす","時:とき;めく","避:さ;る","困:こう;ず","掻:か;き暗:くら;す","憂:うれ;ふ・愁:うれ;ふ","託:かこ;つ","労:いたは;る","ためらふ","怠:おこた;る","悩:なや;む","後:おく;る・遅:おく;る","認:したた;む");
			bengiM[0].push("(土地を)領有する","さまよい出る/(魂が)宙にさまよう/(心が)うわの空になる","立ち止まる、とどまる/ためらう","口に出して言う","地味な格好にする","音を立てる/手紙を出す、訪れる","横を向く","交際する","(男が女のもとに)通う","妨げられる","客にごちそうする","振る舞う/取り扱う/もてはやす","おもしろがる","成長する/大人びる","寵愛を受ける","避ける/断る","疲れる","悲しみが心を暗くする","訴える","不平を言う","病気になる/骨を折る/世話をする","静養する/気を静める","病気がよくなる","病気で苦しむ","先立たれる","処理する/用意する/取り締まる");
		}
		if(sedQ[14]){
			bengiW[1].push("惜:あたら;し","かたじけなし","痴:をこ;がまし","心:こころ;憎:にく;し","賢:さか;し","好:す;き好:ず;きし","なまめかし","今:いま;めかし","しどけなし","つきづきし","なつかし","目:め;安:やす;し","心:こころ;安:やす;し","後:うし;ろめたし","心:こころ;苦:ぐる;し","まばゆし","恥:は;づかし","拙:つたな;し","こちたし","左:さ;右:う;無:な;し","所:ところ;狭:せ;し","慎:つつ;まし","まさなし","妬:ねた;し","まだし","はしたなし","わりなし","術:ずち;無:な;し","あへなし","隈:くま;無:な;し","めざまし","心:こころ;付:づ;きなし","ゆくりなし","篤:あつ;し");
			bengiM[1].push("もったいない","おそれ多い/ありがたい","愚かしい","奥ゆかしい","かしこい/気が利いている/気がしっかりしている/こざかしい","好色めいている/風流だ","優美だ","現代風だ/華やかだ","無造作だ/乱れている","似つかわしい","好ましい","見苦しくない","安心だ/気楽だ","心配だ","つらい/気の毒だ","見ていられない/恥ずかしい","(こちらが気後れするほど)立派だ","下手だ/劣っている/下品だ/不運だ","仰々しい","ためらわない、無造作だ","いっぱいだ/窮屈だ/おおげさだ","気がひける","よくない/見苦しい","しゃくにさわる","まだ時期が早い/不十分だ","不釣り合いだ/不愛想だ/はげしい/きまりが悪い","道理に合わない/並々ではない/耐えがたい/しかたがない","どうしようもない","あっけない","暗い所がない/行き届かない所がない","気にくわない","気に入らない","突然だ","病状が重い");
		}
		if(sedQ[15]){
			bengiW[2].push("強:あなが;ちなり","なめげなり","なのめなり","おぼろげなり","あやにくなり","まめやかなり","切:せち;なり","切:せち;に","よそなり","うちつけなり","頓:とみ;なり","頓:とみ;に","密:みそ;かなり","こまやかなり","らうたげなり","優:いう;なり");
			bengiM[2].push("無理やりだ/むやみだ","無礼だ","並一通りだ/いい加減だ","並一通りだ/並々ではない","ひどい/はなはだしい","まじめだ/実生活向きだ/本格的だ","切実だ/大切だ","ひたすら","無縁だ","突然だ/軽率だ","急だ","すぐに","ひそかだ","心を込めている/色が濃い/繊細で美しい","かわいらしい","優美だ");
		}
		if(sedQ[16]){
			bengiW[3].push("{内裏}{うち}","上:うへ;","品:しな;","古:ふる;里:さと;","心:こころ;延:ば;へ","隙:ひま;","僻:ひが;事:ごと;","咎:とが;・科:とが;","空:そら;言:ごと;・虚:そら;言:ごと;","消:せう;息:そこ;","雲:くも;居:ゐ;","畏:かしこ;まり","世:よ;・世:よ;の中:なか;","限:かぎ;り","ここら・そこら");
			bengiM[3].push("宮中/天皇","天皇/奥様/御座所","身分/家柄","古都/なじみのある土地/実家・わが家","心遣い/性格/趣","すき間/絶え間/すき・機会","間違い","欠点/罪","嘘","手紙/訪問","宮中/天上/遠く離れた所","お礼/お詫び/謹慎","男女の仲","(人生の)最期/すべて/だけ","たくさん");
		}
		if(sedQ[17]){
			bengiW[4].push("互:かたみ;に","わざと","わざとの","うたて","予:か;ねて","～(日数) 予:か;ねて","やをら","夜:よ;もすがら","ゆめ・ゆめゆめ～打消・禁止","をさをさ～打消");
			bengiM[4].push("たがいに","わざわざ/特別に","本格的な","いやなことに","前もって","～前から","そっと","一晩中","まったく～ない/決して～(し)てはいけない","ほとんど～ない");
		}
		if(sedQ[18]){
			bengiW[7].push("あなかま","徒:か;歩:ち;より","けしからず");
			bengiM[7].push("しっ、静かに。","歩いて","異様だ");
		}
		if(sedQ[19]){
			bengiW[0].push("思:おも;ひ遣:や;る","掟:おき;つ","争:すま;ふ・辞:すま;ふ","鎖:さ;す","潮:しほ;垂:た;る","謀:たばか;る","政:まつり;ごつ");
			bengiM[0].push("想像する","あらかじめ決める/指図する","抵抗する","閉める/途中で～(する)のをやめる","涙で袖が濡れる","工夫する/だます","政治を行う");
		}
		if(sedQ[20]){
			bengiW[1].push("労:らう;労:らう;じ","むくつけし","おほけなし","いぶせし","著:しる;し","～も著:しる;く","こよなし","悔:くや;し","楽:たの;し");
			bengiM[1].push("もの慣れている/気品がある","不気味だ","身の程知らずだ","気が晴れない","明白だ","～もそのとおりに","格段である/格段に劣っている","悔やまれる","裕福だ");
		}
		if(sedQ[21]){
			bengiW[2].push("思:おも;はずなり","異:こと;なり");
			bengiM[2].push("思いがけない","別である/違う～");
		}
		if(sedQ[22]){
			bengiW[3].push("色:いろ;","心:こころ;","故:ゆゑ;","{案内}{あない}","沙:さ;汰:た;","様:やう;","あらまし","急:いそ;ぎ","端:つま;","{同胞}{はらから}","けぢめ","其:そ;の上:かみ;","徒:ただ;人:びと;・直:ただ;人:ひと;");
			bengiM[3].push("情趣/恋愛","情趣を解する心","理由/品格/風情","内情","評議/指図/処置","わけ/手段/こと","計画","準備","先/きっかけ","兄弟姉妹","区別","その時/その昔","臣下/普通の貴族");
		}
		if(sedQ[23]){
			bengiW[4].push("折:をり;節:ふし;(副詞)","折:をり;節:ふし;(名詞)","早:はや;く","早:はや;く～けり","つくづくと","せめて","さりとも","さて","さての","おほかた～打消","かまへて");
			bengiM[4].push("ちょうどその時","その時々/折々/季節","以前/すでに","なんとまあ","しんみりと","無理やり/非常に","いくらなんでも","そのまま","そのほかの","まったく～ない","注意して/ぜひとも/決して");
		}
		if(sedQ[24]){
			bengiW[5].push("させる","さはれ");
			bengiM[5].push("たいした","どうにでもなれ");
		}
		if(sedQ[25]){
			bengiW[7].push("いとしもなし","数:かず;ならず","{如何}{いか}にぞや","さればよ・さればこそ","世の常なり","ただならず","ただならずなる","物:もの;も覚:おぼ;えず","人:ひと;遣:や;りならず","又:また;の日:ひ;","～あへず");
			bengiM[7].push("たいしたことはない","取るに足りない","あまり感心しない","思った通りだ","ありきたりだ/月並みな表現だ","様子が普通ではない/心が平静ではない","妊娠する","呆然としている/道理をわきまえない","他のせいではなく、自分の心からする","翌日","最後まで～しきれない");
		}
		if(orz!=1){
			for(let i=0; i<8; i++){
				for(let j=0; j<bengiW[i].length; j++){
					words.push(bengiW[i][j]);
					meanings.push(bengiM[i][j]);
				}
			}
			// console.log(words);
		}
		// console.log(words);

		rew=[];
		rem=[];
		qNum=[0,words.length,""];
		allMeanings=Array.from(meanings);
		// console.log(allMeanings);

		// let test=[];
		// for(let i=0; i<words.length; i++){
		// 	for(let j=i+1; j<words.length; j++){
		// 		if(words[i]==words[j]){
		// 			test.push(words[i]);
		// 		}
		// 	}
		// }
		// console.log(test);
	}
}