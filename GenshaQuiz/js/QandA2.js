function QandA2(arr){
	if(arr[7]){
		sentences.push('政党は大きく分けて3種類あり、&li制限選挙neによって選出される有力者がつくる[名望家]政党、[普通選挙]によって選出される議員がつくる[大衆]政党、あらゆる有権者から支持を得ようとする[包括]政党がある。','議会の多数を占め、&li政権を担当neする政党を[与党]、それにたいして少数派の政党を[野党]という。','1955年に日本社会党が再統一されたことに危機感を抱いた保守政党も合同して[自由民主党/自民党]ができ(&li保守合同ne)、[55年体制/５５年体制]が始まった。<br><br>その後、&li多党化が進展neした。','1993年に&li細川内閣(非自民8党派連立内閣)neが誕生したことにより、[55年体制/５５年体制]が崩壊した。','[派閥]は、党員数が少なくても議員個人の力で当選すると形成される、のであってるかな？');
		choices.push('等級選挙,総括,包含,','湯桶,山岳派','民主党,政権交代,対仏大同盟','政党政治,バブル,ベルリンの壁','宗派,官僚');
		sentences.push('<table class="tableSeitosei"><tr><th>種別</th><th>国</th><th><span class="green">長所</span>・<span class="red">短所</span></th></tr><tr><td class="letters4">[二大政党]制</td><td>&li英ne(&li労働党,保守党ne),<span class="ib">&li米ne(&li共和党,民主党ne)</span></td><td><span class="green">政局が安定<br>政権交代が容易</span><br><span class="red">多様な民意反映不可</span></td></tr><tr><td class="letters2">[多党]制</td><td>&liフランスne,<span class="ib">&liドイツne</span>,<span class="ib">&liイタリアne</span>,<span class="ib">&li日本ne</span></td><td><span class="green">様々な民意を反映</span><br><span class="red">小政党が分立<br>&li連立政権neにより政局が不安定</span></td></tr><tr><td class="letters2">[一党]制</td><td>&li社会主義国ne</td><td><span class="green">政局の安定,長期化<br>強力な政治</span><br><span class="red">政権交代なし<br>人権を無視した硬直した政治</span></td></tr></table>');
		choices.push('連立政,羽田孜');
		sentences.push('設問に悩んだ結果、プリントをそのまま写すことにしました。<br><br>[族議員]が政策実現に向けて圧力をかける ← 鉄のトライアングル<br>[ロビイスト]{登録制で活動する議会工作人(米)}は日本にはない','政治家の汚職事件には、1976年&li田中角栄前首相neの[ロッキード事件]などがある。','[公職選挙法]が改正され、衆議院に「金のかからない選挙」といわれる[小選挙区比例代表並立制]が導入されたり、候補者の関係者が選挙違反行為をした場合に候補者本人の当選が無効となる[連座制]&liの拡大neが行われた。','[政治資金規正法]が改正され、&li政治家が企業・労働組合から政治献金を受け取ることが禁止されたne。','1994年に[政党助成法]が制定され、議員数や得票率などの条件を満たす政党に[政党交付金]が支給されることになった。');
		choices.push('官僚,政府委員,ゲリマンダー,メダリスト','リクルート事件,佐川急便事件,桜を見る会事件','政治資金規正法,比例代表制,一党制,連帯責任制,議院内閣制','公職選挙法,あっせん利得処罰法','政党交付法,政党助成金,地方交付法,地方交付税');
		sentences.push('&li政治では吸収できない民意の反映手段neとして、経営者団体・労働組合など、政党とは違い&li政権獲得を目的とせず、社会的責任を負わないne[圧力団体/利益集団]がある。','市民運動や住民運動などを[大衆運動]という。&li特定の問題だけについて活動するne[単一争点集団/single-issue group]などがある。','[パブリックコメント/意見公募手続]…&li行政機関が政令や省令などを定める際に、事前に原案を示し、広く国民から意見を集めることne');
		choices.push('','デモ,団体行動,利益集団,草の根ナショナリズム','');
	}
	if(arr[8]){
		sentences.push('20世紀初めの日本における選挙の種類<br>・[制限選挙]…財産(納税額)、性別、教育などによる選挙権の制限<br>・[等級選挙]…1票の価値に格差を持たせる','民主主義的な選挙の原則<br>・[普通選挙]…一定の年齢に達した全ての国民に選挙権を与える<br>・[平等選挙]…1人1票、1票の価値が同等<br>・[秘密投票/秘密選挙]…無記名により投票の自由を保障<br>・[直接選挙]…選挙人が直接、候補者に投票する','公職選挙法は、選挙運動期間中の[戸別訪問]を禁止している。また、[公務員]は政治活動を行えず、&li18歳未満は選挙運動ができないne。','&li金権選挙neを防ぐため、候補者の関係者の選挙違反によって当選が無効・5年間立候補が制限される[連座制]が強化されたり、2000年の[あっせん利得処罰法/斡旋利得処罰法]により&li政治家の口利きを禁止neしている。','[ポリティカル・アパシー/ポリティカルアパシー/政治的無関心]の拡大による投票率の低迷が問題となっている。[公職選挙法]の改正により、期日前投票制度や投票時間の延長など、様々な状況でも投票できるしくみが整ってきている。そのほか、岡山県新見市の投票所に投票機が設置された[電子投票]などがあるが、&li国政レベルではないneことや、&liインターネットを利用した自宅投票はできないneなどの課題がある。');
		choices.push('不平等選挙,名望家選挙','制限選挙,等級選挙,国民主権,老老介護','投票交渉,世論調査,非労働者,外国人','連帯責任制,公職選挙法,選挙資金規正法','無知の知,電話投票,水素イオン投票,日本国憲法');
		sentences.push('<table class="tableSenkyoseido"><tr><th>投票方法</th><th>選挙区制</th><th><span class="green">長所</span>・<span class="red">短所</span></th></tr><tr><td rowspan="2"><b>&li個人代表制ne</b><br>候補者個人に投票</td><td class="letters4">[小選挙区]制<br>1選挙区から1人の代表<br>&li米ne,&li英neなど</td><td class="letters2"><span class="green">&li二大政党制neによる安定した政治<br>&li少ない選挙費用ne</span><br><span class="red">[死票]が多い<br>小政党に不利<br>&liｹﾞﾘﾏﾝﾀﾞｰの危険ne</span></td></tr><tr><td class="letters4">[大選挙区]制<br>1選挙区から複数の代表</td><td class="letters2"><span class="green">多様な民意を政治に反映<br>[死票]が少ない</span><br><span class="red">&li小政党が分立ne<br>政局が不安定<br>&li多額の選挙費用ne</span></td></tr><tr><td colspan="2" class="letters4">[比例代表]<b>制</b><br>&li政党に投票ne、得票率に応じて議席配分<br>&li北欧諸国neなど</td><td class="letters3"><span class="green">死票が出ない<br>公平<br>政党本位の選挙</span><br><span class="red">&li小政党が分立ne<br>政局が不安定<br>無所属で立候補不能</span><br>代表的な議席の配分方法…[ドント]式</td></tr></table>');
		choices.push('国民投票,政党代表,非選挙区,一票の格差');
		sentences.push('1993年までは、衆議院の選挙制度は[大選挙区制]の一種である中選挙区制であったが、1994年からは新たに[小選挙区比例代表並立制]が取り入れられた。[小選挙区]で289名、[比例代表]で176名を選出するしくみである。','衆議院選挙の問題点として、[拘束名簿式]&li比例代表制neにより各政党が決めた名簿順に当選者が決まるため&li民意が反映されないneといったことがあったり、[重複立候補]が認められているために小選挙区で落選しても比例代表で当選することがある<sup>※</sup>。<br><br>※ その場合、&li惜敗率の高い候補者から当選neが決まっていく。','参議院の選挙制度は、1983年に[比例代表制]が導入され、全国区が[比例代表]に、地方区が[選挙区]に改変された。衆議院とは異なり、[重複立候補]は禁止されている。','参議院の選挙制度は[非拘束名簿式]比例代表制であるため、&li政党名、政党公認候補者名のいずれで投票してもよいne。','[議員定数の不均衡/議員定数不均衡]問題をめぐり、[一票の格差]が不平等であるとして、[衆議院議員定数違憲判決]が1976年と1985年の2度出ている。');
		choices.push('参議院,選挙区,政党代表','非拘束名簿式,敗者復活制度','優越,世襲','拘束名簿式','抑制と不均衡,有効投票率');
	}
	if(arr[9]){
		sentences.push('デモ行進や署名活動などの[大衆運動]、[圧力団体](スポンサー)の活動、テレビや新聞など[マスメディア]の報道などは、世論操作につながる危険性がある。','マスメディアは、[世論形成者]&li(オピニオン・リーダー)neや、三権に次ぐ第四の権力などとよばれる。&li選挙予測報道が実際の投票結果に影響neするという[アナウンス効果]などを利用して世論操作する危険性がある。<br>∴ 利用者には[情報リテラシー/メディアリテラシー]が必要とされる。','[政治的無関心]&li(ポリティカル・アパシー)neの拡大により、投票率が低下している。','&liNPOne([非営利組織/非営利団体])…&li「利益を目的とせず、社会貢献活動を行う民間団体」ne','&li不特定多数の人々の利益増進にかかわる活動を行うne<br>※ &li政治・宗教にかかわる団体は対象外ne<br><br>わたしの疑問: ↑何の話？');
		choices.push('体臭運動,慣性力,1.013×10<sup>5</sup> Pa,浸透圧,サケメディア','クレーマー,ドップラー効果,相乗効果,思いやりの気持ち','','','');
		sentences.push('&liNPO ≠ ボランティアne<br>・ボランティア…基本的に無給、正業の傍ら個人の自由意志で参加<br>・NPO…営利を目的とはしないが、給料をもらって働くスタッフも多い','[コミュニティ・ビジネス/コミュニティビジネス]とは、地域の抱える問題をビジネスの手法で解決し、地域に貢献する事業である。','NPO([非営利組織/非営利団体])とNGO([非政府組織])は別物なんだね','[ソーシャル・ビジネス/ソーシャルビジネス/社会的企業]とは、&li社会が必要としている財・サービスの供給に取り組むne企業のことなのかな。<br>普通の企業と異なるのは、&li利潤の最大化を目的としないne点なんだね。');
		choices.push('','','','');
	}
	if(arr[10]){
		sentences.push('<span class="attention">*</span>印…語群になし<br><br>平和主義は、日本国憲法では憲法前文と第9条に明記されている。前文では「[政府]の行為によつて再び[戦争]の惨禍が起ることのないやうにすることを決意し」「[平和]を愛する諸国民の公正と信義に信頼して、われらの[安全]と生存を保持しようと決意した」と、平和主義の強い理想を述べ、国民の[&x平和的生存]権が明記されている。さらに、第9条ではこれらを具体化して、1項で「[国権]の発動たる戦争と、[武力]による威嚇又は[武力]の行使は、国際紛争を解決する手段としては、永久にこれを放棄する」と規定している。2項では「陸海空軍その他の[戦力]は、これを保持しない」と定めて、戦争を行う物的手段の保持を禁止した。さらに、「国の[交戦]権は、これを認めない」として、戦争を行う法的根拠をも否定した。','<span class="attention">*</span>印…語群になし<br><br>政府は、自衛隊は「自衛のための必要最小限の[実力]」であって、9条で保持を禁ずる[戦力]にあたらないとした。最高裁判所は、[&x統治行為論]を根拠に、自衛隊が憲法違反かどうかについて憲法判断を下したことはない。','自衛隊に対して違憲判決が出されたのはどの訴訟だっけ<br>1. 長沼ナイキ基地訴訟<br>2. 恵庭事件<br>3. 百里基地訴訟<br>4. 砂川事件<br><br>[1/１]');
		choices.push('軍事力,国家,実力,生命','平和,戦争,軍事力,国家,交戦,武力,国権,政府,安全,生命','');
		sentences.push('PKO協力法について、誤っているものを1つ選んでね<br>1. この法律には国際的な選挙監視活動への協力が規定されている。<br>2. 紛争当事国で停戦合意が成立していることが派遣の条件である。<br>3. 紛争当事国の受け入れ同意が必要である。<br>4. これまで、中東へは派遣されたことがない。<br>5. 武装集団に襲撃された他国のPKOや民間人などの防護にも武力は使用できる。<br><br>[4/４]','PKO協力法によって自衛隊が派遣された最初の国は[カンボジア/カンボジア王国]である。','自衛隊の海外派遣に関連して、次の事柄で古い順に並べて3番目に来るものはどれか答えてね<br>1. 周辺事態法<br>2. テロ対策特別措置法<br>3. 国際平和支援法<br>4. 海賊対処法<br>5. イラク復興支援特別措置法<br><br>[5/５]');
		choices.push('','','');
	}
	if(arr[11]){
		sentences.push('法律案について衆議院と参議院で異なる議決をした場合、衆議院が[出席議員]の3分の2以上の賛成で再可決すれば法律となる。また予算の[議決]、条約の[承認]、内閣総理大臣の[指名]については、必ず両院協議会を開き、そこでも意見が一致しないときは衆議院の議決が国会の議決となる。また、各議員の[総議員]の3分の2以上の賛成による憲法改正の発議権も与えられている。','内閣総理大臣は国会議員の中から国会の[指名]で選出され、天皇により[任命]される。また、内閣は「国会に対し[連帯]して責任を負ふ」議院内閣制がとられているため、衆議院が内閣不信任決議案を可決するか信任決議案を否定したときには、内閣は10日以内に衆議院を解散するか、総辞職をしなければならない。','国会の法律制定権について、適当なものを選び番号で答えてね<br>1. 衆議院と参議院の議決が異なったときは、両院協議会を開かなければならない。<br>2. 法律案は衆議院に先に提出する。<br>3. 参議院が国会休会中を除いて60日以内に議決しないときは、参議院が否決したものとみなす。<br>4. 法律案の議決には、必ず両議院の議決が必要となる。<br><br>[3/３]','内閣について、適当なものを選び番号で答えてね<br>1. 内閣総理大臣は国会の承認を得て、国務大臣を罷免することができる。<br>2. 国務大臣の3分の2は、国会議員でなければならない。<br>3. 内閣総理大臣と国務大臣は文民でなければならない。<br>4. 国務大臣は、内閣総理大臣に指名され天皇によって任命される。<br><br>[3/３]');
		choices.push('協力,任命,協同,連帯,制定,作成,締結','協力,協同,総議員,承認,議決,出席議員,制定,作成,締結','','');
		sentences.push('政治主導の政治への改革について、最も適当なものを選び番号で答えてね<br>1. 国会審議活性化法により、官僚が大臣に代わって国会答弁する政府委員制度が創設された。<br>2. 事務次官に代わって副大臣・政務官が導入され、これは国会議員の中から任命される。<br>3. 国家基本政策委員会が両院に設置され、野党党首と首相との党首討論が行われる。<br>4. 民主党政権は、政策決定を官僚の事前調整に委ねるため、事務次官会議を新たに設置した。<br><br>[3/３]','内閣の職務について、最も適当なものを選び番号で答えてね<br>1. 内閣総理大臣は閣議を主宰し、閣議決定は公開の場で多数決により行われる。<br>2. 内閣総理大臣が欠けた場合、内閣は総辞職しなければならない。<br>3. 内閣が裁判官の指名や任命に関与することは、「司法権の独立」から認められない。<br>4. 内閣総理大臣が、その他の国務大臣を兼務することはできない。<br><br>[2/２]');
		choices.push('','');
		sentences.push('裁判はすべて裁判所で行われ、立法や行政などいかなる国家機関からも干渉を受けないという[裁判所の独立]が保障されている。さらに、すべての裁判官は「その[良心]に従ひ独立してその職権を行ひ、この[憲法及び法律]にのみ拘束されると規定されており、裁判官の独立が保障されている。」','日本国憲法は裁判所に、国会で制定された法律や、内閣が定めた[政令]、地方自治体が定めた[条例]などが、憲法に違反していないかどうかを審査する違憲審査権を与えている。最高裁判所は終審裁判所であることから「[憲法の番人]」とよばれている。','地方の政治は地方自治体の議決機関(地方議会)や長(知事・市長など)が国の統治機関から独立して行うという[団体自治]と、地方の住民自身が議員野鳥の選出をはじめ様々な形で地方公共団体の運営を行うという[住民自治]を原則としている。これらは「地方自治の本旨」とよばれ、その制度と運営については地方自治法で定められている。','違憲判決に関連して、これにあてはまらないものを1つ選んでね<br>1. 民法が女性のみに再婚禁止期間を設けているのは違憲である。<br>2. 民法が婚姻した男女に夫婦別姓を認めないのは違憲である。<br>3. 非嫡出子(婚外子)の遺産相続分が、嫡出子の半分とする民法の規定は違憲である。<br>4. 国籍法が日本国民の父が出生後に認知した非嫡出子に日本国籍を認めないのは違憲である。<br><br>[2/２]','刑事事件の裁判への市民参加に関して、有権者から選ばれた市民が検察官の不起訴処分の適否を審査する組織は[検察審査会]である。');
		choices.push('','','','','');
		sentences.push('地方政治に関して、イギリスの政治家である【 a 】が「地方自治は民主主義の学校である」と『【 b 】』で述べている。<br>1. a:ロック b:市民政府二論<br>2. a:ロック b:アメリカの民主主義<br>3. a:ブライス b:市民政府二論<br>4. a:ブライス b:近代民主政治<br>5. a:トックビル b:近代民主政治<br>6. a:トックビル b:アメリカの民主主義<br><br>[4/４]','直接請求権に関して、有効な組み合わせを1つ選んでね<br>A. 有権者が3万人の市で、条例を制定するため700人の署名を集めて市長に提出した。<br>B. 有権者が10万人の市で、市長をリコールするため3万人の署名を集めて選挙管理委員会に提出した。<br>C. 有権者が10万人の市で、議会の解散を求めて4万人の署名を集めて市長に提出した。<br>D. 有権者が3万人の市で、副市長のリコールを求めて1万2,000人の署名を集めて選挙管理委員会に提出した。<br>1.A　2.B　3.C　4.D　5.AとB　6.AとC　7.AとD　8.BとC　9.BとD　10.CとD<br><br>[1/１]','住民投票に関して、これが実施された理由として正しい組み合わせを選んでね<br>1. 岐阜県御嵩町…原子力発電所<br>2. 徳島市…可動<ruby><rb>堰</rb><rt>せき</rt></ruby>建設<br>3. 沖縄県…産業廃棄物処理施設建設<br>4. 新潟県巻町…市町村合併<br><br>[2/２]');
		choices.push('','','');
		sentences.push('裁判のしくみについて、最も適当なものを選んでね<br>1. 刑事裁判だけでなく民事裁判でも被告が自ら弁護士を依頼できないときは公費で弁護人が付与される。<br>2. 第一審は必ずしも地方裁判所ではなく簡易裁判所, 家庭裁判所の場合もあり上告審が高等裁判所の場合もあり得る。<br>3. 裁判は公開が原則であり、法廷での審理のテレビ中継は、裁判官が全員一致で反対した場合を除いて、原則として認められる。<br>4. 裁判は公開が原則であるが、裁判官が全員一致で公の秩序を害する恐れがあると決定した場合には、裁判を非公開にできる。<br><br>[2/２]','住民自治の原理よりも団体自治の原理に基づく例として最も適当なものを選んでね<br>1. 市町村民が、市町村長や市町村議会の議員を、直接選挙すること。<br>2. 市町村が、街並みを保存するために、住民に経費を助成する制度を、独自に作ること。<br>3. 都道府県民が、不正の疑いのある公金使用について、監査委員に監査請求すること。<br>4. 都道府県が、米軍基地の整理縮小について、住民投票を実施すること。<br><br>[2/２]','地方自治のしくみについて、最も適当なものを選んでね<br>1. 地方議会は、審議を慎重にし、多数派の横暴を抑制するため、国政と同様に二院制を採用している。<br>2. 地方議会が制定する条例は、法律の範囲内にとどまり、罰則を科すことはできない。<br>3. 首長は、議会解散権を持ち、さらに拒否権などアメリカの大統領制に近い、強い権限を有する。<br>4. 地方議会が首長に対する不信任決議を行った場合、首長は地方議会を解散して住民の意思を問うことはできない。<br><br>[3/３]');
		choices.push('','','');
	}
	if(arr[12]){
		sentences.push('戦後、政党政治が復活し、日本自由党などの保守政党に加え、日本社会党や[日本共産党]などの革新政党も活動を開始した。昭和20年代の政党の離合集散の時期を経て、分裂していた[日本社会党]が統一した。これに危機感を持った保守政党の側も、[日本民主党]と自由党が合同し、自由民主党が結成された。二大政党制の時代を迎えるかと思われたが、社会党の議席は自民党の半分程度であった。その後、多党化の時代を迎えたが、自由民主党の一党優位体制が長く続いた。この状態を[55年体制/５５年体制]とよぶ。','<span class="attention">*</span>印…語群になし<br><br>1993年の総選挙で自民党は過半数を獲得できず、非自民8党派による連立政権が誕生し、ここに38年間の自民党一党優位体制は終わりを告げた。2009年の総選挙では[民主党]が圧勝し、政権交代を実現させた。しかし、この政権は自ら掲げた政権公約([&xマニフェスト])を実行できず、西暦[2012/２０１２]年の総選挙で[自由民主党]が圧勝し、再び政権交代が起こった。','選挙制度には、大別して3つの種類がある。小選挙区制は、1選挙区から[1/１]名の当選者を出す選挙制度で、アメリカの上下両院やイギリスの下院議員選挙などで採用されている。大選挙区制は、1選挙区から[2/２]名以上の当選者を出す選挙制度である。比例代表制は大選挙区制の一種であり、日本でも国政選挙で採用されている。例えば、衆議院では、全国を[11/１１]ブロックに分けた比例代表と小選挙区から選出する。参議院では、都道府県ごとの選挙区と、全国を選挙区とする比例代表から[3/３]年ごとに半数改選という形で選出される。');
		choices.push('自由民主党,民主党,民進党,社会民主党,五ヵ年計画,百年戦争,恐怖政治','日本社会党,日本民主党,民進党,日本共産党,社会民主党,2010,2011,2015','5,10,12,15,50,55');
		sentences.push('小選挙区制の特徴として最も適するものを1つ選び、記号で答えてね<br>1. 死票が多い。<br>2. 国民の多様な考えを反映できる。<br>3. 小政党でも当選する可能性がある。<br>4. 政権が不安定になりがち。<br><br>[1/１]','アメリカの二大政党の組み合わせとして適当なものを1つ選び、番号で答えてね<br>1. 民主党・保守党<br>2. 保守党・労働党<br> 3. 労働党・共和党<br>4. 共和党・民主党<br><br>[4/４]','議員定数不均衡問題に関して、適当なものを1つ選び、番号で答えてね<br>1. 最高裁判所は違憲判決を出したことがある。<br>2. 議員定数の不均衡は、衆議院の方が参議院より大きい。<br>3. 裁判所の判決によって、選挙がやり直されたことがある。<br>4. 衆議院の小選挙区では、格差が2倍を超えたことがない。<br><br>[1/１]');
		choices.push('','','');
		sentences.push('日本の選挙制度は、1950年制定の[公職選挙法]を中心に運営されている。<br>日本には、政治資金を逃避だけでまかなうことができず、企業や団体からの政治献金に頼る政党も多い。ただし、[政治資金規正法]の改正により、政治家個人が企業団体献金を受け取ることは禁止されている。他方で、1994年に制定された[政党助成法]に基づき、一定の条件を満たす政党を対象に政党交付金を支出している。','coj44;「両議院の議員及びその選挙人の資格は、法律でこれを定める。但し、人種、信条、性別、社会的身分、門地、[教育]、財産又は収入によつて差別してはならない。」','普通選挙に関して、適当なものを1つ選んでね<br>1. 日本で初めて実施されたのは、男子20歳以上の多額納税者に対してであった。<br>2. 日本で女性にも選挙権が付与されたのは、敗戦直後の1945年である。<br>3. 日本の選挙権年齢は、男女とも20歳である。<br>4. ドイツで男女普通選挙が実現したのは、1917年に制定されたワイマール憲法によってである。<br><br>[2/２]','日本の選挙制度に関して、適当なものを1つ選んでね<br>1. 衆議院議員は、小選挙区と全国単位の比例代表によって選出される。<br>2. 参議院議員は、一つの都道府県を単位とした選挙区と比例代表によって選出される。<br>3. 衆議院の選挙制度は、小選挙区比例代表併用制とよばれている。<br>4. 参議院では、選挙区と比例代表に同時に立候補することは認められていない。<br><br>[4/４]','企業や団体に関して、このような政治に大きな影響を与えるものを総称して[圧力団体/利益集団]という。');
		choices.push('','国籍,教養,思想','','','');
		sentences.push('秘書や親族、中心的な運動員が公職選挙法に違反する行為をした場合、候補者本人の当選が無効になる制度を[連座制]という。','世論に関する記述として適当でないものを選んでね<br>1. 世論を政治に反映させるため、日本では、国政選挙の候補者による選挙運動期間中の戸別訪問が、法律上、認められている。<br>2. 著名なジャーナリストや評論家など、世論の形成に大きな影響力を持つ人は、オピニオン・リーダーとよばれる。<br>3. 世論調査では、同じ調査項目であっても質問の仕方などが変わると調査結果が異なることがある。<br>4. 行政機関が命令などを制定しようとするときに、あらかじめ原案を示し広く公に意見を求める手続はパブリックコメント(意見公募)手続とよばれる。<br><br>[1/１]','日本の政党をめぐる制度に関して、最も適当なものを選んでね<br>1. 政党は、参議院議員選挙の場合、比例代表での立候補者に順位を付けた名簿を作成することが、法律で義務づけられている。<br>2. 政党が、衆議院議員選挙の場合、小選挙区に立候補した候補者名を比例代表での名簿に掲載することは、法律上できない。<br>3. 政党は、国会議員が所属していても、政党交付金の交付を受け取るときには、所属する国会議員の人数などに関して、法律上、一定の条件を満たさなければならない。<br>4. 政党に国会議員が所属しているか否かにかかわらず、企業や団体は、議員個人に対して、一定額内で、政治献金を行うことができると法律で定められている。<br><br>[3/３]','候補者による選挙運動や、選挙の際の原則に関して、最も適当なものを1つ選んでね<br>1. 日本では、選挙運動において、候補者による戸別訪問が、法的に認められている。<br>2. 日本では、候補者の選挙運動の責任者などが、買収などの選挙犯罪で刑に処せられた場合でも、候補者本人の当選は有効である。<br>3. 秘密選挙とは、投票内容について他人に知られないことが有権者に保障されている選挙である。<br>4. 直接選挙とは、一定の年齢に達したものが、その財産や納税額などにかかわりなく、選挙権を行使できる選挙である。<br><br>[3/３]');
		choices.push('','','','');
	}
}