function QandA2(arr){
	if(arr[7]){
		sentences.push('政党は大きく分けて3種類あり、&li制限選挙neによって選出される有力者がつくる[名望家]政党、[普通選挙]によって選出される議員がつくる[大衆]政党、あらゆる有権者から支持を得ようとする[包括]政党がある。','議会の多数を占め、&li政権を担当neする政党を[与党]、それにたいして少数派の政党を[野党]という。','1955年に日本社会党が再統一されたことに危機感を抱いた保守政党も合同して[自由民主党/自民党]ができ(&li保守合同ne)、[55年体制/５５年体制]が始まった。<br><br>その後、&li多党化が進展neした。','1993年に&li細川内閣(非自民8党派連立内閣)neが誕生したことにより、[55年体制/５５年体制]が崩壊した。','[派閥]は、党員数が少なくても議員個人の力で当選すると形成される、のであってるかな？');
		choices.push('等級選挙,総括,包含,','湯桶,山岳派','民主党,政権交代,対仏大同盟','政党政治,バブル,ベルリンの壁','宗派,官僚');
		sentences.push('<table class="tableSeitosei"><tr><th>種別</th><th>国</th><th><span class="green">長所</span>・<span class="red">短所</span></th></tr><tr><td class="letters4">[二大政党]制</td><td>&liイギリスne(&li労働党,保守党ne),<span class="ib">&liアメリカne(&li共和党,民主党ne)</span></td><td><span class="green">政局が安定<br>政権交代が容易</span><br><span class="red">多様な民意反映不可</span></td></tr><tr><td class="letters2">[多党]制</td><td>&liフランスne,<span class="ib">&liドイツne</span>,<span class="ib">&liイタリアne</span>,<span class="ib">&li日本ne</span></td><td><span class="green">様々な民意を反映</span><br><span class="red">小政党が分立<br>&li連立政権neにより政局が不安定</span></td></tr><tr><td class="letters2">[一党]制</td><td>&li社会主義国ne</td><td><span class="green">政局の安定,長期化<br>強力な政治</span><br><span class="red">政権交代なし<br>人権を無視した硬直した政治</span></td></tr></table>');
		choices.push('連立政,羽田孜');
		sentences.push('設問に悩んだ結果、プリントをそのまま写すことにしました。<br>[族議員]が政策実現に向けて圧力をかける ← 鉄のトライアングル<br>[ロビイスト]{登録制で活動する議会工作人(アメリカ)}は日本にはない','政治家の汚職事件には、1976年&li田中角栄前首相neの[ロッキード事件]などがある。','[公職選挙法]が改正され、衆議院に「金のかからない選挙」といわれる[小選挙区比例代表並立制]が導入されたり、候補者の関係者が選挙違反行為をした場合に候補者本人の当選が無効となる[連座制]&liの拡大neが行われた。','[政治資金規正法]が改正され、&li政治家が企業・労働組合から政治献金を受け取ることが禁止されたne。','1994年に[政党助成法]が制定され、議員数や得票率などの条件を満たす政党に[政党交付金]が支給されることになった。');
		choices.push('官僚,政府委員,ゲリマンダー,メダリスト','リクルート事件,佐川急便事件,桜を見る会事件','政治資金規正法,比例代表制,一党制,連帯責任制,議院内閣制','公職選挙法,あっせん利得処罰法','政党交付法,政党助成金,地方交付法,地方交付税');
		sentences.push('&li政治では吸収できない民意の反映手段neとして、経営者団体・労働組合など、政党とは違い&li政権獲得を目的とせず、社会的責任を負わないne[圧力団体/利益集団]がある。','市民運動や住民運動などを[大衆運動]という。&li特定の問題だけについて活動するne[単一争点集団/single-issue group]などがある。','[パブリックコメント/意見公募手続]…&li行政機関が政令や省令などを定める際に、事前に原案を示し、広く国民から意見を集めることne');
		choices.push('','デモ,団体行動,利益集団,草の根ナショナリズム','');
	}
	if(arr[8]){
		sentences.push('20世紀初めの日本における選挙の種類<br>・[制限選挙]…財産(納税額)、性別、教育などによる選挙権の制限<br>・[等級選挙]…1票の価値に格差を持たせる','民主主義的な選挙の原則<br>・[普通選挙]…一定の年齢に達した全ての国民に選挙権を与える<br>・[平等選挙]…1人1票、1票の価値が同等<br>・[秘密投票/秘密選挙]…無記名により投票の自由を保障<br>・[直接選挙]…選挙人が直接、候補者に投票する'/*,'','',''*/);
		choices.push('不平等選挙,名望家選挙','制限選挙,等級選挙,国民主権,老老介護'/*,'','',''*/);
		sentences.push('<table class="tableSenkyoseido"><tr><th>投票方法</th><th>選挙区制</th><th><span class="green">長所</span>・<span class="red">短所</span></th></tr><tr><td rowspan="2"><b>&li個人代表制ne</b><br>候補者個人に投票</td><td class="letters4">[小選挙区]制<br>1選挙区から1人の代表<br>&li米ne,&li英neなど</td><td class="letters2"><span class="green">&li二大政党制neによる安定した政治<br>&li少ない選挙費用ne</span><br><span class="red">[死票]が多い<br>小政党に不利<br>&liｹﾞﾘﾏﾝﾀﾞｰの危険ne</span></td></tr><tr><td class="letters4">[大選挙区]制<br>1選挙区から複数の代表</td><td class="letters2"><span class="green">多様な民意を政治に反映<br>[死票]が少ない</span><br><span class="red">&li小政党が分立ne<br>政局が不安定<br>&li多額の選挙費用ne</span></td></tr><tr><td colspan="2" class="letters4">[比例代表]<b>制</b><br>政党に投票、得票率に応じて議席配分<br>北欧諸国など</td><td class="letters3"><span class="green">死票が出ない<br>公平<br>政党本位の選挙</span><br><span class="red">小政党が分立<br>政局が不安定<br>無所属で立候補不能</span><br>代表的な議席の配分方法…[ドント]式</td></tr></table>');
		choices.push('国民投票');
		// sentences.push('','','','','');
		// choices.push('','','','','');
	}
	if(arr[9]){
		sentences.push('テレビとか新聞とか%…そういうやつのこと。[マスメディア]'/*,'','','',''*/);
		choices.push(''/*,'','','',''*/);
		// sentences.push('','','','','');
		// choices.push('','','','','');
	}
}