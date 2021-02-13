function QandA1(arr){
	if(arr[3]){
		sentences.push('日本は、国民が選挙で選んだ代表者が政治を行う[議会制民主主義/代表民主制/間接民主制/代議制]をとっている。','日本国憲法前文。「日本国民は正当に選挙された[国会における代表者]を通じて行動し」「その権力は[国民]の代表者がこれを行使し」','coj41;「国会は[国権の最高機関]であつて、[国の唯一の立法機関]である。」','日本国憲法は、立法、行政、司法による権力相互の[抑制と均衡/チェック・アンド・バランス/チェックアンドバランス/checks and balances]によって権力濫用を防ぐ[権力分立/三権分立/三権分立制]を採用している。','国会が衆議院と参議院に分かれている[二院制/両院制]や、地方公共団体を住民が運営する[地方自治]を確立することは、&li広い意味では権力分立のひとつneであると考えることもできる。');
		choices.push('','','','法の支配,両院制,鉄のトライアングル','多党制,二大政党制,連立政権,地方交付金,民主主義の学校');
		sentences.push('国会は[内閣総理大臣]を指名(cj67;)し、いざとなれば衆議院は[内閣不信任決議]を行うことができる(cj69;)。','内閣は国会に対して[連帯責任/連帯して責任]を負う(cj66;)ため、衆議院が[内閣不信任決議]を可決した場合、内閣は10日以内に衆議院を[解散]するか、[総辞職]しなければならない(cj69;)。','裁判所は、国会や内閣が制定した法律や命令などに対する[違憲審査権]を持つ(cj81;)。','内閣は最高裁判所長官を[指名]し、その他の裁判官を[任命]する(cj79;)。');
		choices.push('都道府県知事,国務大臣,予算の先議,優越','借り,国債,法律案,拒否,代表,謝罪','','説得,叱責,指導');
		sentences.push('日本の政治は基本的に間接民主制だが、最高裁判所裁判官に対する[国民審査]、地方自治特別法に対する[住民投票]、憲法改正に対する[国民投票]など、&li直接民主制neがみられるような例もある。','国会は、最高裁判所の[規則]制定権、内閣の[政令]制定権、地方公共団体の[条例]制定権を持つらしいよ。よくわからんけど。','国会は衆議院と参議院に分かれている[両院制/二院制](cj42;)により、様々な民意の反映や慎重な審議を行うことができる。','国会議員は全国民の代表である(cj43;)ことから様々な特権があり、国会会期中は法律の定める場合を除いて逮捕されない[不逮捕特権](cj50;)や、院内の発言について院外では責任を問われない[免責特権](cj51;)などがある。<br>※ 院外では責任を問われないが、院内では懲罰の対象になる場合がある。','国会議員、&li内閣ne、衆参両院の委員会は[法律案提出権/法案提出権]を持つ。');
		choices.push('住民審査,国民自治,住民自治,団体自治,団体審査,団体投票','判決,法律,命令,行政','','歳費特権,自衛隊指揮権','予算先議権,労働基本権');
		sentences.push('内閣は[条約]の締結権を持つが、その締結前または後に国会の承認が必要である(cj61;)。','国会は憲法改正の[発議]ができる(cj95;)。','国会は、内閣が作成した[予算]の議決を行う(cj86;)。','[内閣総理大臣]は国会に指名され(cj67;)、[天皇]に任命される(cj6;)。','[内閣不信任決議権]は衆議院のみが持ち(cj69;)、&li参議院は内閣総理大臣問責決議は可能neである。<br>※ 参議院の内閣総理大臣問責決議には内閣を総辞職させる強制力はないが、審議拒否につながる。');
		choices.push('','','','最高裁判所長官,都道府県知事,国民','');
		sentences.push('国会は、訴追を受けた裁判官を裁判するために[弾劾裁判所]を開設できる(cj64;)。','衆参両院は[国政調査権]があり、証人の出頭(&li証人喚問ne)や証言・記録の提出を要求できる。<br><p class="attention">※ 証人喚問の際、事実と異なる証言をすると偽証罪とされるから気をつけてね(?)</p>','衆議院は参議院に比べて任期が短く、解散もあるため、より民意を反映していると考えられていることから、予算[先議]権(cj60;)や[内閣不信任]決議権を持ち(cj69;)、このことを[衆議院の優越]という。');
		choices.push('','','絶対権,参議院解散,行政指導');
		sentences.push('&li国会の会期neは3種類ある。<br>・[常会/通常国会]…&li毎年1月からne[150/１５０]&li日間ne、[予算]&li案の審議neを行う</p>・[臨時会/臨時国会]…&li内閣または衆参いずれかの議院の総議員の1/4以上の要求neがあった場合に召集される</p>・[特別会/特別国会]…&li衆議院解散総選挙後ne[30/３０]&li日以内に召集neされ、&li内閣総理大臣のne[指名]をする</p>','3種類の国会の会期のほか、&li衆議院閉会中に内閣の要求で召集neされる[参議院の緊急集会]があるが、&li次の国会開会後10日以内に衆議院の同意がない場合にはその決定事項は無効になるne。');
		choices.push('31,法律,任命,不信任決議','');
		sentences.push('法律案は衆参議院それぞれの[委員会]で審議され、必要に応じて利害関係者や学識経験者から意見を聞く[公聴会]を開くことができる。','1999年から、&liイギリスのクエスチョン・タイムを手本neとして[党首討論制/党首討論]が導入された。','2001年、官僚(政務次官)が大臣に代わって答弁する[政府委員制度]が&li廃止neされ、官僚に代わり&li副大臣neや&li大臣政務官neが導入された。','法律案は委員会で可決されると[本会議]へ送付されるが、そこでは実質的な審議は行わず委員会の報告を尊重して議決される。ただし、&li定足数は総議員の1/3neである。','&li国会の議決は両院一致の原則neにより、両院の議決が異なった場合は[両院協議会]を開催することができる。');
		choices.push('本会議,両院協議会,傍聴会','','','','');
		sentences.push('法律案に関して、両院で異なる議決をするか、参議院が[60/６０]日以内に議決しない場合、両院協議会を開催することもできるが、衆議院が出席議員の2/3以上の多数により[再可決]すれば、その法律は成立する。','予算の議決や条約の承認に関して、両院で異なる議決をするか、議案が参議院に回されてから[30/３０]日以内に参議院が議決しない場合、必ず[両院協議会]を開かなければならないが、それでも意見が一致しない場合には&li衆議院の議決がそのまま国会の議決となるne。','内閣総理大臣の指名に関して、両院で異なる議決をするか、衆議院の議決後[10/１０]日以内に参議院が議決しない場合、必ず両院協議会を開かなければならないが、それでも意見が一致しない場合には&li衆議院の議決がそのまま国会の議決となるne。');
		choices.push('30,10,発議,解散,逆転','','');
		sentences.push('<table class="tableGiketsu"><tr><th>内容</th><th>参議院</th><th>両院<span class="ib">協議会</span></th><th>衆議院</th></tr><tr><th>法案議決</th><td>異なる議決<br>or<br>[60/６０]日<span class="ib">議決せず</span></td><td>開催可</td><td class="letters3">&li2/3以上neの<span class="ib">多数</span>で[再可決]<br>→成立</td></tr><tr><th>予算議決</th><td rowspan="2">異なる議決<br>or<br>[30/３０]日<span class="ib">議決せず</span></td><td rowspan="3">開催</td><td rowspan="3">&li<span class="ib">衆議院の議決</span>が<span class="ib">国会の議決</span>ne</td></tr><tr><th>条約承認</th></tr><tr><th>内閣総理大臣指名</th><td>異なる議決<br>or<br>[10/１０]日<span class="ib">議決せず</span></td></tr></table>');
		choices.push('');
	}
	if(arr[4]){
		sentences.push('coj66-3;「内閣は、行政権の行使について、国会に対し[連帯]して責任を負ふ。」<br>coj67-1;「内閣総理大臣は、[国会議員]の中から国会の議決で、これを指名する。」<br>coj68-1;「内閣総理大臣は、国務大臣を任命する。但し、その[過半数]は、[国会議員]の中から選ばれなければならない。」<br>coj69;「内閣は、衆議院で不信任の決議案を可決し、又は信任の決議案を否決したときは、[10/１０]日以内に衆議院が解散されない限り、[総辞職]をしなければならない。」','[閣議]とは、内閣の[首長](cj66-1;)である内閣総理大臣が主宰する、全会一致を原則とする内閣の意志決定の場である。','国会は、内閣の[首長](cj66-1;)である内閣総理大臣を国会議員の中から指名(cj67;)し、天皇が[国事行為](cj6;)として任命する。','原則14名以内(最大17名)の国務大臣のうち[過半数]は[国会議員]の中から選出される。','内閣総理大臣は、&li国務大臣の任免権ne(cj68;)、&li議案(法案)提出権ne(cj72;)、[行政各部]の&li指揮監督権ne(cj72;)、&li自衛隊の防衛出動・治安出動命令neなどの権限を持つ。');
		choices.push('努力,皇族,国民,全員,首長,代表,30,60,150,謝罪,為政','常会,党首討論,両院協議会,代表者,責任者','','','');
		sentences.push('内閣は、天皇の[国事行為]への[助言と承認]をする(cj3;)。','coj73;は内閣の事務を規定している。<br>・[法律]の執行、国務の[総理]<br>・外交関係の処理<br>・[条約]の締結(事前または事後に国会の承認が必要)<br>・官吏に関する事務を掌理<br>・[予算]の作成と国会への提出<br>・[政令]の制定<br>・大赦、特赦などの決定','衆議院の解散には2種類あり、&li内閣不信任決議への対抗手段neである[69条解散/６９条解散]と、天皇の[国事行為]として内閣が任意に衆議院を解散する[7条解散/７条解散]がある。','中央官庁は1府12省庁から成り、そのひとつで防衛庁と防衛施設庁が統合して昇格した[防衛省](2007年)や、1府12省庁をさらに細かく分けた中にある&li観光庁ne(2008年)、[消費者庁](2009年)、&liスポーツ庁ne(2012年)、東日本大震災を受けて設置された[復興庁](2012年)などがある。','[行政委員会]とは、内閣への権限集中を緩和したり専門性や中立性を確保するために&li一般の行政機関からある程度独立している機関neで、[人事院]や&li国家公安委員会ne、独占禁止法の達成を任務とする[公正取引委員会]、&li中央労働委員neなどがあり、行政委員会ではなく&li憲法機関neとして&li内閣から完全に独立neしている[会計検査院]という機関もある。');
		choices.push('','条例,管理,実行,国交,法案,税金','','震災庁,警視庁,自衛省,自治省,労働庁','国家安全保障委員会,行政委員会,司法院');
		sentences.push('[特殊法人]とは、国が公益目的のため&li法律によって設立・運営neしている会社のことである。','国民生活センターや国立大学など、省庁から一定の事業を分離した公務の受託機関のことを[独立行政法人]という。','coj15-2;「すべて[公務員]は、[全体の奉仕者]であつて、一部の奉仕者ではない。」<br>とあるように、国家公務員・地方公務員は&li政治活動の禁止ne、&li労働基本権の制限neなどの制約に縛られているが、&li公務員の勤務条件に関して人事院が国会や内閣に勧告を与えneて見直しを求める「人事院勧告」という制度もある。','国家機能の専門化や複雑化により&li福祉国家neとなると&li行政権が肥大化neして[行政国家]とよばれ、立法機関である国会よりも内閣の方が容易に立法権を行使できる状況になると、国会は法律の大枠を決め、細目は行政府に委任する[委任立法]という形式ももはや少なくないらしい。よくわからんけど。','行政の公正さを確保するために行政を監視する[オンブズマン制度/行政監察官制度]を設けている地方公共団体もある。');
		choices.push('','','','夜警国家,立法国家,委任行政','');
		sentences.push('政官財(政治家・官僚・企業)の[鉄のトライアングル]…ごめん。もう無理だ。重要語句は&li族議員ne、&li口利きne、&li天下りneらしい。がんばれ','1993年に制定された[行政手続法]では許認可の条件や行政指導が明文化され、それによって構成の確保やの透明性の向上がはかられているらしい。','1994年に[政治資金規正法]が改正され、&li政治家個人に対する企業・労働組合の政治献金が禁止neされた。また、2000年の[あっせん利得処罰法/斡旋利得処罰法]により、&li政治家の口利きが禁止neされた。');
		choices.push('','','鉄製三角形解体法');
	}
	if(arr[5]){
		sentences.push('司法とは&li基本的人権を確保するための機能neである。国民は、権利や自由や侵害された場合の救済や回復を求める手段として[裁判を受ける権利]を持ち、裁判所は、法律や命令による人権侵害を救済する[違憲審査権]を持つ。','coj76-1;「すべて司法権は、[最高裁判所]及び%…[下級裁判所]に属する。」<br>coj76-2;「[特別裁判所]は、これを設置することができない。行政機関は、[終審]として裁判を行ふことができない。」<br>coj76-3;「すべて裁判官は、その[良心]に従ひ独立してその職権を行ひ、[この憲法及び法律]にのみ拘束される。」','&li司法権の独立neが争点となった判決は、来日中のロシア皇太子を津田三蔵が負傷させた[大津事件]や、札幌地裁判事が、所長から訴訟判断に触れる手紙を受け取ったことを公表した[平賀書簡事件]などがある。','coj78;「裁判官は、裁判により、[心身の故障]のために職務を執ることができないと決定された場合を除いては、公の[弾劾]によらなければ罷免されない。」','裁判官が罷免されるとき、[心身の故障]による執務不能の場合は裁判所によって[分限裁判]が行われ、著しい職務義務違反などの場合は国会によって[弾劾裁判]が行われる。');
		choices.push('','','','','非行,飛行,特別裁判');
		sentences.push('&li最高裁判所裁判官neは、[国民審査]の過半数が否認した場合に罷免される。','大日本帝国憲法下では認められていた特別裁判所には3種類ある。<br>・[行政裁判所]…&li行政事件の裁判neを行う<br>・[軍法会議]…&li軍人の刑事裁判neを行う<br>・[皇室裁判所]…&li皇族相互の民事裁判neを行う','公正取引委員会の排除命令など&li行政機関による審判neに&li不服がある場合は、裁判で訴えることができるne。','裁判所を大きく2種類に分けると、&li終審裁判所neや憲法の番人といった名を持つ[最高裁判所]と、それ以外の[下級裁判所]に分けられる。','下級裁判所には4種類ある。<br>・[高等裁判所]、&li東京高等裁判所内に知的財産高等裁判所が設置neされている<br>・[地方裁判所]<br>・[簡易裁判所]…140万円以下の民事事件、罰金または懲役3年以下の刑事事件を担当<br>・[家庭裁判所]…家事事件や少年事件を担当');
		choices.push('','立憲裁判所','','','');
		sentences.push('日本国憲法は、裁判の公正さと慎重な審理を確保するため、第1審、[控訴]審、[上告]審の[三審制]を&li審級制度neとして定めている。','・[控訴]…&li判決を不服として第1審から第2審に上訴することne<br>・[上告]…&li判決を不服として第2審議から終審裁判所に上訴することne<br>・[抗告]…判決以外の裁判所の命令・決定を不服として上訴すること','&li冤罪を防止neするために[再審]制度があり、裁判の後に決定的な証拠が見つかった場合などに再び裁判を受けることができる。','&li個人が原告となって裁判を起こせるne、個人間の財産権の紛争や家族関係の争いなどの&li民事事件neに対し、殺人などの&li刑事事件neの裁判を起こすためには&li検察官が原告neとなって[起訴]する必要があり、個人では裁判を起こせない。<br>また、20歳未満を対象とする&li少年事件neは[家庭]裁判所が担当する。');
		choices.push('','','','簡易,地方,被疑');
		sentences.push('<h3>違憲審査権の類型</h3><p>・[通常裁判所型/付随的審査制]…&li日本ne、アメリカ<br>&li違憲立法審査権ne…&li通常の裁判所(=最高裁判所と下級裁判所)ne<br>法律は&li具体的な事件に関連して審査neされる<br>↳その法律に関する事件が発生する前には審査できない<br>法律の改正は国会の権限であることから、&li違憲判決は該当する事件の解決のみに適用neされる</p><br><p>・[憲法裁判所型/抽象的審査制]…&liドイツ、フランスne<br>&li違憲立法審査権ne…[憲法裁判所]&liのみne<br>&li議会が制定した法律を直ちに審査ne可<br>違憲判決が下された場合、議会の議決がなくても&liその法律は一般的に無効になるne</p>','日本の違憲判決<br>・[尊属殺人重罰規定/尊属殺重罰規定]違憲判決(1973) 争点：[法の下の平等](cj14;)<br>・[薬事法距離制限]違憲判決(1975) 争点：[職業選択の自由](cj22;)<br>・[衆議院議員定数]違憲判決(1976,1985) 争点：[法の下の平等](cj14;)<br>・[愛媛玉ぐし料]違憲判決(1997) 争点：政教分離(cj20;)','最高裁判所裁判官の[国民審査](cj79;)は、任命後初の&li衆議院議員総選挙の時neに行い、それから10年を経過したあと初の&li衆議院議員総選挙の時neに再び行い、その後も同様に行う。','[検察審査会]制度とは、検察官の不起訴の判断に対してそれはないでしょーって言う制度。&li同一事件で2度、起訴相当と判断された場合はne、裁判所が指定する&li弁護士が検察官の代行として強制起訴neし、裁判が始まる。','死刑、無期懲役などに相当する&li重大な刑事事件の審理に国民が参加するne[裁判員制度]では、被告人の判決を&li裁判官と一緒に議論して決定neする。');
		choices.push('特別裁判所型/最高裁判所型/最高裁判所/特別裁判所','','','','');
		sentences.push('裁判員制度と愉快な仲間たち。アメリカやイギリス、戦前の日本でも実施されていた、&li裁判官なしで有罪・無罪を認定neしてその&li量刑は裁判官が決めるne[陪審制/陪審制度]に対し、ドイツやフランスで実施されている[参審制/参審制度]では、&li裁判官と合議して審理・判決を行うne。','2000年に&li少年法が改正neされ、刑事責任年齢が[14/１４]歳に引き下げられた。また、&li16歳以上の未成年者の殺人事件についてne、[家庭]裁判所から逆送致された被疑者を&li検察官がne[地方]&li裁判所で起訴neすることになった。','全国50か所に[法テラス](&li日本司法支援センターne)が設置され、国民の法的トラブルに対する支援などを行っている。');
		choices.push('厳審制,軍審制','','');
		sentences.push('<table class="tableSaibanninn"><tr><th>制度</th><th class="letters4">[陪審制/陪審制度]</th><th class="letters4">[参審制/参審制度]</th><th class="letters5">[裁判員制度]</th></tr><tr><th>裁判官<span class="ib">関与</span></th><td>×</td><td>○</td><td>○</td></tr><tr><th>有罪<span class="ib">無罪</span></th><td>○</td><td>○</td><td>○</td></tr><tr><th>量刑</th><td>×</td><td>○</td><td>○</td></tr><tr><th>任期</th><td>事件ごと</td><td>任期制</td><td>事件ごと</td></tr><tr><th>選任</th><td>無作為</td><td>推薦等</td><td>無作為</td></tr></table>');
		choices.push('厳審制,軍審制');
	}if(arr[6]){
		sentences.push('フランスの[トクヴィル]が「%…の%…は%…独立性を持つべきだ」とかよくわからんことを言って主張した[団体自治]と、イギリスの[ブライス]が「[地方自治]は[民主主義]の[学校]である」とかこれもまたよくわからんことを言って主張した[住民自治]を2つまとめて[地方自治の本旨]という。','国と地方での権力分立とも考えることができる、&li地方公共団体が国の統制を受けずneに[自治立法](=条約の制定・予算)や[自治行政]を行うしくみを[団体自治]という。','地方公共団体の機構には、&li執行機関neである[首長/長]と、&li議決機関neである[議会]がある。','地方自治のしくみで、議会は首長に対する[不信任決議権]を持ち、それに対して首長は議会の[解散権]のほか、議会の議決などへの[拒否権]を持つ。','首長や地方議会議員が住民による直接選挙で選出される[公選制]などにみられる、地方自治の本旨のひとつで、&li地方公共団体の活動が住民の意思と参加に基づいて行われるneことを[住民自治]という。');
		choices.push('グロティウス,住民投票,資本主義,舞台,三原組織','委任立法,委任行政,団体立法,団体行政','首相,地方会','解雇権,罷免権,任命権,指名権','団体自治,住民審査,国民投票');
		sentences.push('<table class="tableShuchoGikai"><tr><th colspan="3" class="title">地方公共団体の機構</th></tr><tr><th rowspan="2">首長</th><td class="letters2">→ [拒否]権 →<br>→ 議会[解散]権 →</td><th rowspan="2">議会</th></tr><tr><td class="letters5">← [不信任決議]権 ←</td></tr></table>');
		choices.push('');
		sentences.push('地方自治において、住民は[直接請求権]を持ち、&li条例の制定・改廃を請求neする[イニシアティブ/住民発案]や、&li首長・議員・役員の解職請求neをする[リコール/住民解職]、&li議会の解散請求ne、&li行財政の監査請求ne、情報公開条例に基づく&li情報公開請求neをする[レファレンダム/住民投票]など、&li直接民主制的な手続きneが用意されている。','&li住民投票ne(=[レファレンダム])には種類があり、&li地方自治特別法に対する住民投票ne(cj95;)、[直接請求権]&liに基づく住民投票neには&li法的拘束力があるneが、&li住民投票条例に基づく住民投票neには&li法的拘束力はないne。','&li住民投票条例に基づく住民投票neの例として、1996年に行われた[新潟県][巻町]原子力発電所の建設に関する住民投票などがある。','地方公共団体の仕事には、国の指揮・監督の下に行う[機関委任事務]が多かったが、1999年の[地方分権一括法]などにより廃止され、その代わりとして、地方公共団体が自主的に行う[自治事務]と、国のやるべき仕事を地方公共団体が代行する[法定受託事務]に再編された。','&li地方税neや&li地方消費税neなど地方公共団体の[自主財源]が不足し、財政的に国に依存する状態を&li三割自治neというらしい。');
		choices.push('請願権,刑事補償請求権,国家賠償請求権,イニシエーション,クリエイティブ,リデュース,リユース,レジスタンス,レファレーレファソファミレファー,メモランダム','イニシアティブ,リコール,拒否権,団体行動権','岐阜県,御嵩町,長崎県,小長井町,刈羽村','地方事務,QUIZ GYM,地方統一法,共通事務法,住民事務,法事務','依存財源,おこづかい,お花畑');
		sentences.push('自主財源に対し、[依存財源]にはいくつかの種類がある。<br>・[地方交付税/地方交付税交付金]…&li国税の一部を分配ne、&li使途に制限なしne<br>・[国庫支出金]…国が使途を指定して支出<br>・[地方債]…&li地方公共団体の借金ne','[道州制]…都道府県を廃止し、数県をまとめた広域の地方行政区画を新設する計画<br>[地方再生法]…持続可能な地域再生を促進<br><br>%…%…ふーん。がんばってね');
		choices.push('国債,悪の根源,社交税,使途指定金','都州制,府州制,県州制,地方復活法,地方回復法');
		sentences.push('<table><tr><th rowspan="2">地方自治の本旨</th><td>団体自治</td></tr><tr><td>住民自治</td></tr><tr><th rowspan="2">これからの地方自治</th><td>地方分権</td></tr><tr><td>市民分権</td></tr></table><p style="margin:0.2em 1em;">構造が似てるね。対応してるね。</p>','<table><tr><td rowspan="4" class="letters4">[天然繊維]</td><td rowspan="2" class="letters4">[植物繊維]</td><td class="letters1">[綿]</td></tr><tr><td>麻</td></tr><tr><td rowspan="2" class="letters4">[動物繊維]</td><td>毛</td></tr><tr><td class="letters1">[絹]</td></tr><tr><td rowspan="3">化学繊維</td><td class="letters4">[再生繊維]</td><td>レーヨン<br>キュプラ</td></tr><tr><td class="letters5">[半合成繊維]</td><td>アセテート</td></tr><tr><td class="letters4">合成繊維</td><td>ナイロン<br>ポリエステル<br>アクリル<br>ポリウレタン</td></tr></table><p style="margin:0.2em 1em;text-align:center;font-weight:bold;">…ん？</p>');
		choices.push('','なにこれ');
		sentences.push('<table class="tableSeikyu"><tr><th>請求例</th><th>署名数</th><th>提出先</th><th>結果</th></tr><tr><td>&li条例の<span class="ib">制定・</span><span class="ib">改廃</span>ne</td><td>1/[50/５０]</td><td>首長</td><td>議会の<span class="ib">過半数で</span><span class="ib">可決</span></td></tr><tr><td class="letters2">事務[監査]</td><td>1/[50/５０]</td><td class="letters2">[監査]<span class="ib">委員</span></td><td>結果公表</td></tr><tr><td>&li議会の<span class="ib">解散</span>ne</td><td>1/[3/３]</td><td class="letters4">[選挙管理]<span class="ib">委員会</span></td><td>&li住民投票ne<span class="ib">過半数で</span><span class="ib">解散</span></td></tr><tr><td>&li議員・<span class="ib">首長の</span><span class="ib">解職</span>ne</td><td>1/[3/３]</td><td class="letters4">[選挙管理]<span class="ib">委員会</span></td><td>&li住民投票ne<span class="ib">過半数で</span><span class="ib">解職</span></td></tr><tr><td>&li役員の<span class="ib">解職</span>ne</td><td>1/[3/３]</td><td>首長</td><td>議会の<span class="ib">2/3出席</span><span class="ib">3/4同意</span><span class="ib">で解職</span></td></tr></table>');
		choices.push('中止,抗議,監視,財政管理,10,100,2,4,117');
	}
}