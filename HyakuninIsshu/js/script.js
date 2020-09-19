'use strict';
{
	let kami_k;
	let shimo_k;
	data();
	let stage=[];
	let chooseFrom=[];
	let q_num;

	let now;
	let tooRead=1;

	let chosen_yet=[];

	document.getElementById('tooRead').addEventListener('click',()=>{
		document.getElementById('tooRead').classList.toggle('on');
		document.getElementById('tooRead').classList.toggle('off');
		tooRead=1-tooRead;
	})

	document.getElementById('start_button').addEventListener('click',()=>{
		clicked();
	})

	function clicked(){
		if(10<=how_many.value && how_many.value<=100){
			document.getElementById('again').classList.add('none');
			document.getElementById('title').classList.add('none');
			document.getElementById('start_button').classList.add('none');
			let check=document.getElementsByClassName('description');
			for(let i=0; i<check.length; i++){
				check[i].classList.add('none');
			}
			document.getElementById('setting').classList.add('none');
			document.getElementById('start_button').classList.add('none');
			document.getElementById('game').classList.remove('none');
			document.getElementById('footer').classList.remove('none');
			for(let i=0; i<100; i++){
				chosen_yet.push(i);
			}
			// console.log(chosen_yet);
			for(let i=0; i<how_many.value; i++){
				let num=Math.floor(Math.random()*chosen_yet.length);
				chooseFrom.push(chosen_yet[num]);
				// let num=chosen_yet[r];
				const add_card=document.createElement('div');
				add_card.classList.add('card');
				add_card.setAttribute('id',`card_${chosen_yet[num]}`);
				let hokan='';
				for(let j=0; j<shimo_k[chosen_yet[num]].length; j++){
					if(shimo_k[chosen_yet[num]].charAt(j)!=' '){
						hokan+=shimo_k[chosen_yet[num]].charAt(j);
					}
				}
				add_card.textContent=hokan;
				document.getElementById('cards').appendChild(add_card);
				stage.push(chosen_yet[num]);
				chosen_yet.splice(num,1);
			}
			// console.log(chosen_yet);
			// console.log(chooseFrom);
			// console.log(stage);

			// 重複の可能性
			// let chfk=0;
			// for(let i=0; i<stage.length; i++){
			// 	let hokan=stage[i];
			// 	stage.splice(i,1);
			// 	if(stage.indexOf(hokan)>-1){
			// 		console.log(`重複の可能性: ${hokan}`);
			// 		chfk=1;
			// 	}
			// 	stage.splice(i,1,hokan);
			// }
			// if(chfk==0){
			// 	console.log('重複の可能性: なし');
			// }

			new_question();

			for(let i=0; i<stage.length; i++){
				// console.log(`card_${stage[i]}`);
				document.getElementById(`card_${chooseFrom[i]}`).addEventListener('click',()=>{
					// console.log(chooseFrom);
					// console.log(stage);
					// console.log(`length: ${stage.length}`);
					// console.log(i,stage[i]);
					// console.log(q_num,chooseFrom[q_num]);
					if(stage[i]==chooseFrom[q_num]){
						document.getElementById(`card_${stage[i]}`).classList.add('excard');
						document.getElementById(`card_${stage[i]}`).classList.remove('card');
						// document.getElementById(`card_${stage[i]}`).removeAttribute('id');
						chooseFrom.splice(q_num,1);
						document.getElementById('circle').classList.add('appeal');
						document.getElementById('circle').addEventListener('animationend',()=>{
							document.getElementById('circle').classList.remove('appeal');
						})
						new_question();
					}else{
						document.getElementById(`card_${stage[i]}`).classList.add('wrong');
						document.getElementById(`card_${stage[i]}`).addEventListener('animationend',()=>{
							document.getElementById(`card_${stage[i]}`).classList.remove('wrong');
						})
					}
				})
			}
		}else{
			if(how_many.value>100){
				document.getElementById('how_many').value=100;
			}else{
				document.getElementById('how_many').value=10
			}
			document.getElementById('error').textContent='※10以上100以下の半角数を入力';
			document.getElementById('error').classList.remove('none');
		}
	}

	function new_question() {
		if(chooseFrom.length>0){
			// console.log(chooseFrom);
			q_num=Math.floor(Math.random()*chooseFrom.length);
			// console.log(q_num);
			now=0;
			document.getElementById('kami_q').innerHTML=`${kami_k[chooseFrom[q_num]]}<div class="hider" id="kamihider"></div>`;
			document.getElementById('shimo_q').innerHTML=`${shimo_k[chooseFrom[q_num]]}<div class="hider" id="shimohider"></div>`;
			document.getElementById('skip').classList.remove('skipped');
			document.getElementById('stop').classList.remove('skipped');
			document.getElementById('play_state_sign').classList.remove('fa-play');
			document.getElementById('play_state_sign').classList.add('fa-pause');
			document.getElementById('kamihider').classList.add('dont_hide');
			document.getElementById('kamihider').addEventListener('animationend',()=>{
				now++;
				if(tooRead==1){
					document.getElementById('shimohider').classList.add('dont_hide');
					now++;
					document.getElementById('shimohider').addEventListener('animationend',()=>{
						document.getElementById('skip').classList.add('skipped');
						document.getElementById('stop').classList.add('skipped');
						now++;
					})
				}else{
					document.getElementById('play_state_sign').classList.remove('fa-pause');
					document.getElementById('play_state_sign').classList.add('fa-play');
				}
			})
		}else{
			document.getElementById('kami_q').innerHTML='終了';
			document.getElementById('shimo_q').innerHTML='';
			document.getElementById('cards').innerHTML='';
			document.getElementById('error').classList.add('none');
			document.getElementById('footer').classList.add('none');
			document.getElementById('again').classList.remove('none');
			document.getElementById('setting').classList.remove('none');
		}
	}

	document.getElementById('again').addEventListener('click',()=>{
		data();
		stage=[];
		chooseFrom=[];
		clicked();
	})

	document.getElementById('skip').addEventListener('click',()=>{
		if(tooRead==0){
			if(now==0){
				document.getElementById('kamihider').classList.add('none');
				document.getElementById('play_state_sign').classList.add('fa-play');
				document.getElementById('play_state_sign').classList.remove('fa-pause');
				now=1;
			}else if(now==1 || now==2){
				document.getElementById('shimohider').classList.add('none');
				document.getElementById('skip').classList.add('skipped');
				document.getElementById('stop').classList.add('skipped');
				now=3;
			}
		}else{
			document.getElementById('kamihider').classList.add('none');
			document.getElementById('shimohider').classList.add('none');
			document.getElementById('skip').classList.add('skipped');
			document.getElementById('stop').classList.add('skipped');
		}
	})

	document.getElementById('stop').addEventListener('click',()=>{
		if(tooRead==0 && now==1){
			document.getElementById('shimohider').classList.add('dont_hide');
			document.getElementById('shimohider').classList.remove('stopped');
			document.getElementById('play_state_sign').classList.toggle('fa-pause');
			document.getElementById('play_state_sign').classList.toggle('fa-play');
			now++;
			document.getElementById('shimohider').addEventListener('animationend',()=>{
				document.getElementById('skip').classList.add('skipped');
				document.getElementById('stop').classList.add('skipped');
				now++;
			})
		}else{
			document.getElementById('kamihider').classList.toggle('stopped');
			document.getElementById('shimohider').classList.toggle('stopped');
			document.getElementById('play_state_sign').classList.toggle('fa-pause');
			document.getElementById('play_state_sign').classList.toggle('fa-play');
		}
	})

	function data(){
		kami_k=['あきのたの かりほのいほの とまをあらみ','はるすぎて なつきにけらし しろたへの','あしびきの やまどりのをの しだりをの','たごのうらに うちいでてみれば しろたへの','おくやまに もみぢふみわけ なくしかの'];
		shimo_k=['わがころもでは つゆにぬれつつ','ころもほすてふ あまのかぐやま','ながながしよを ひとりかもねむ','ふじのたかねに ゆきはふりつつ','こゑきくときぞ あきはかなしき'];
		kami_k.push('かささぎの わたせるはしに おくしもの','あまのはら ふりさけみれば かすがなる','わがいほは みやこのたつみ しかぞすむ','はなのいろは うつりにけりな いたづらに','これやこの ゆくもかへるも わかれては');
		shimo_k.push('しろきをみれば よぞふけにける','みかさのやまに いでしつきかも','よをうぢやまと ひとはいふなり','わがみよにふる ながめせしまに','しるもしらぬも あふさかのせき');
		kami_k.push('わたのはら やそしまかけて こぎいでぬと','あまつかぜ くものかよひぢ ふきとぢよ','つくばねの みねよりおつる みなのがは','みちのくの しのぶもじずり たれゆゑに','きみがため はるののにいでて わかなつむ');
		shimo_k.push('ひとにはつげよ あまのつりぶね','をとめのすがた しばしとどめむ','こひぞつもりて ふちとなりぬる','みだれそめにし われならなくに','わがころもでに ゆきはふりつつ');
		kami_k.push('たちわかれ いなばのやまの みねのおふる','ちはやぶる かみよもきかず たつたがは','すみのえの きしによるなみ よるさへや','なにはがた みじかきあしの ふしのまも','わびぬれば いまはたおなじ なにはなる');
		shimo_k.push('まつとしきかば いまかへりこむ','からくれなゐに みづくくるとは','ゆめのかよひぢ ひとめよくらむ','あはでこのよを すぐしてよとや','みをつくしても あはむとぞおもふ');
		kami_k.push('いまこむと いひしばかりに ながつきの','ふくからに あきのくさきの しをるれば','つきみれば ちぢにものこそ かなしけれ','このたびは ぬさもとりあへず たむけやま','なにしおはば あふさかやまの さねかづら');
		shimo_k.push('ありあけのつきを まちいでつるかな','むべやまかぜを あらしといふらむ','わがみひとつの あきにはあらねど','もみぢのにしき かみのまにまに','ひとにしられで くるよしもがな');
		kami_k.push('をぐらやま みねのもみぢば こころあらば','みかのはら わきてながるる いづみがは','やまざとは ふゆぞさびしさ まさりける','こころあてに をらばやをらむ はつしもの','ありあけの つれなくみえし わかれより');
		shimo_k.push('いまひとたびの みゆきまたなむ','いつみきとてか こひしかるらむ','ひとめもくさも かれぬとおもへば','おきまどはせる しらぎくのはな','あかつきばかり うきものはなし');
		kami_k.push('あさぼらけ ありあけのつきと みるまでに','やまがはに かぜのかけたる しがらみは','ひさかたの ひかりのどけき はるのひに','たれをかも しるひとにせむ たかさごの','ひとはいさ こころもしらず ふるさとは');
		shimo_k.push('よしののさとに ふれるしらゆき','ながれもあへぬ もみぢなりけり','しづごころなく はなのちるらむ','まつもむかしの ともならなくに','はなぞむかしの かににほひける');
		kami_k.push('なつのよは まだよひながら あけぬるを','しらつゆに かぜのふきしく あきののは','わすらるる みをばおもはず ちかいてし','あさぢふの をののしのはら しのぶれど','しのぶれど いろにいでにけり わがこひは');
		shimo_k.push('くものいづこに つきやどるらむ','つらぬきとめぬ たまぞちりける','ひとのいのちの をしくもあるかな','あまりてなどか ひとのこひしき','ものやおもふと ひとのとふまで');
		kami_k.push('こひすてふ わがなはまだき たちにけり','ちぎりきな かたみにそでを しぼりつつ','あひみての のちのこころに くらぶれば','あふことの たえてしなくは なかなかに','あはれとも いふべきひとは おもほえで');
		shimo_k.push('ひとしれずこそ おもひそめしか','すゑのまつやま なみこさじとは','むかしはものを おもはざりけり','ひとをもみをも うらみざらまし','みのいたづらに なりぬべきかな');
		kami_k.push('ゆらのとを わたるふなびと かぢをたえ','やへむぐら しげれるやどの さびしきに','かぜをいたみ いはうつなみの おのれのみ','みかきもり ゑじのたくひの よるはもえ','きみがため をしからざりし いのちさへ');
		shimo_k.push('ゆくへもしらぬ こひのみちかな','ひとこそみえね あきはきにけり','くだけてものを おもふころかな','ひるはきえつつ ものをこそおもへ','ながくもがなと おもひけるかな');
		kami_k.push('かくとだに えやはいぶきの さしもぐさ','あけぬれば くるるものとは しりながら','なげきつつ ひとりぬるよの あくるまは','わすれじの ゆくすゑまでは かたければ','たきのおとは たえてひさしく なりぬれど');
		shimo_k.push('さしもしらじな もゆるおもひを','なほうらめしき あさぼらけかな','いかにひさしき ものとかはしる','けふをかぎりの いのちともがな','なこそながれて なほきこえけれ');
		kami_k.push('あらざらむ このよのほかの おもひでに','めぐりあひて みしやそれとも わかぬまに','ありまやま ゐなのささはら かぜふけば','やすらはで ねなましものを さよふけて','おほえやま いくののみちの とほければ');
		shimo_k.push('いまひとたびの あふこともがな','くもがくれにし よはのつきかな','いでそよひとを わすれやはする','かたぶくまでの つきをみしかな','まだふみもみず あまのはしだて');
		kami_k.push('いにしへの ならのみやこの やへざくら','よをこめて とりのそらねは はかるとも','いまはただ おもひたえなむ とばかりを','あさぼらけ うぢのかはぎり たえだえに','うらみわび ほさぬそでだに あるものを');
		shimo_k.push('けふここのへに にほひぬるかな','よにあふさかの せきはゆるさじ','ひとづてならで いふよしもがな','あらはれわたる せぜのあじろぎ','こひにくちなむ なこそをしけれ');
		kami_k.push('もろともに あはれとおもへ やまざくら','はるのよの ゆめばかりなる たまくらに','こころにも あらでうきよに ながらへば','あらしふく みむろのやまの もみぢばは','さびしさに やどをたちいでて ながむれば');
		shimo_k.push('はなよりほかに しるひともなし','かひなくたたむ なこそをしけれ','こひしかるべき よはのつきかな','たつたのかはの にしきなりけり','いづこもおなじ あきのゆふぐれ');
		kami_k.push('ゆふされば かどたのいなば おとづれて','おとにきく たかしのはまの あだなみは','たかさごの をのへのさくら さきにけり','うかりける ひとをはつせの やまおろしよ','ちぎりおきし させもがつゆを いのちにて');
		shimo_k.push('あしのまろやに あきかぜぞふく','かけじやそでの ぬれもこそすれ','とやまのかすみ たたずもあらなむ','はげしかれとは いのらぬものを','あはれことしの あきもいぬめり');
		kami_k.push('わたのはら こぎいでてみれば ひさかたの','せをはやみ いはにせかるる たきがはの','あはぢしま かよふちどりの なくこゑに','あきかぜに たなびくくもの たえまより','ながからむ こころもしらず くろかみの');
		shimo_k.push('くもゐにまがふ おきつしらなみ','われてもすゑに あはむとぞおもふ','いくよねざめぬ すまのせきもり','もれいづるつきの かげのさやけさ','みだれてけさは ものをこそおもへ');
		kami_k.push('ほととぎす なきつるかたを ながむれば','おもひわび さてもいのちは あるものを','よのなかよ みちこそなけれ おもひいる','ながらへば またこのごろや しのばれむ','よもすがら ものおもふころは あけやらで');
		shimo_k.push('ただありあけの つきぞのこれる','うきにたへぬは なみだなりけり','やまのおくにも しかぞなくなる','うしとみしよぞ いまはこひしき','ねやのひまさへ つれなかりけり');
		kami_k.push('なげけとて つきやはものを おもはする','むらさめの つゆもまだひぬ まきのはに','なにはえの あしのかりねの ひとよゆゑ','たまのをよ たえねばたえね ながらへば','みせばやな をじまのあまの そでだにも');
		shimo_k.push('かこちがほなる わがなみだかな','きりたちのぼる あきのゆふぐれ','みをつくしてや こひわたるべき','しのぶることの よわりもぞする','ぬれにぞぬれし いろはかはらず');
		kami_k.push('きりぎりす なくやしもよの さむしろに','わがそでは しほひにみえぬ おきのいしの','よのなかは つねにもがもな なぎさこぐ','みよしのの やまのあきかぜ さよふけて','おほけなく うきよのたみに おほふかな');
		shimo_k.push('ころもかたしき ひとりかもねむ','ひとこそしらね かわくまもなし','あまのをぶねの つなでかなしも','ふるさとさむく ころもうつなり','わがたつそまに すみぞめのそで');
		kami_k.push('はなさそふ あらしのにはの ゆきならで','こぬひとを まつほのうらの ゆふなぎに','かぜそよぐ ならのをがはの ゆふぐれは','ひともをし ひともうらめし あぢきなく','ももしきや ふるきのきばの しのぶにも');
		shimo_k.push('ふりゆくものは わがみなりけり','やくやもしほの みもこがれつつ','みそぎぞなつの しるしなりける','よをおもふゆゑに ものおもふみは','なほあまりある むかしなりけり');
	}
}