'use strict';

// test用
// fieldElm=[['3<span class="italic">x</span><sup>2</sup>','−7<span class="italic">x</span>','10'],[]];
// fieldElm=[['3<span class="italic">x</span><sup>2</sup>','−7<span class="italic">x</span>'],[]];
// fieldElm=[['4<span class="italic">x</span><sup>2</sup>','18'],[]];
// reloadField(0);

document.getElementById("solveBtn").addEventListener("click",()=>{
	let l=fieldElm[0], r=fieldElm[1];
	if(l.length==0){
		l=["<span class='italic'>x</span>"];
	}
	if(r.length==0){
		r=['0'];
	}
	// console.log(fieldElm);

	let coefs=[0,0,0];
	let components;
	for(let i=0; i<l.length; i++){
		components=elmToNumber(l[i]);
		coefs[components[1]]+=components[0];
	}
	for(let i=0; i<r.length; i++){
		components=elmToNumber(r[i]);
		coefs[components[1]]-=components[0];
	}
	if(coefs[2]<0){
		coefs[0]*=-1;
		coefs[1]*=-1;
		coefs[2]*=-1;
	}
	// console.log(coefs);
	solve(coefs[2],coefs[1],coefs[0]);
})

function elmToNumber(t){
	// console.log(t);
	let coef="", dim=0;
	let j=0;
	if(t.charAt(0)=='−'){
		j=1;
		if(t.charAt(1)=='('){
			j+=2;
		}else{
			coef='-';
		}
	}
	for(j=j; j<t.length; j++){
		if(t.charAt(j)==')' || t.charAt(j)=='<'){
			if(t.charAt(j)==')'){
				j++;
			}
			break;
		}
		coef+=t.charAt(j);
	}
	if(coef.length==0 || coef=='-'){
		coef+='1';
	}
	if(t.charAt(j)=='<'){
		if(t.length<j+30){
			dim=1;
		}else{
			dim=2;
		}
	}
	// console.log([Number(coef),dim]);
	return [Number(coef),dim];
}

function solve(a,b,c){
	resetOutput();
	// console.log(`a=${a}, b=${b}, c=${c}`);
	if(a==0){
		if(b==0){
			// c=0
			document.getElementById("x-equals").classList.add("none");
			document.getElementById("answer").classList.add("none");
			document.getElementById("error").textContent=`Error: 解${["は任意の数","なし"][Number(c!=0)]}`;
		}else{
			// bx+c=0 <-> x=-c/b
			rationalSolution(-c,b,0);
		}
	}else if(b==0){
		if(c==0){
			// ax^2=0
			rationalSolution(0,1,0);
		}else{
			// ax^2+c=0 <-> x=sqrt(-c/a)
			// aが平方数かどうか調べる
			let simp=simplifySqrt(a);
			let a_coefSqrt=simp[0];
			let a_factors=simp[1];
			if(a_factors.length!=0){
				// aが平方数じゃなかったら分母sqrt(a)を有理化
				for(let i=0; i<a_factors.length; i++){
					a_coefSqrt*=a_factors[i];
					c*=a_factors[i];
				}
				a_factors=[]; //いらないかもだけど念のため
			}
			simp=simplifySqrt(-c);
			let c_coefSqrt=simp[0];
			let c_factors=simp[1];
			if(c_factors.length==0 || (c_factors.length==1 && c_factors[0]==-1)){
				// aも|c|も平方数
				let gcd=findGcd(c_coefSqrt,a_coefSqrt);
				document.getElementById("x-equals").innerHTML=`<span class="italic">x</span>&equals;${["&plusmn;",""][Number(c_coefSqrt%a_coefSqrt==0)]}`;
				document.getElementById("denom").classList.toggle("none",c_coefSqrt%a_coefSqrt==0);
				if(c_coefSqrt%a_coefSqrt==0){
					// 分母なし
					if(c_coefSqrt/a_coefSqrt==1 && c_factors.length==1){
						document.getElementById("numer").innerHTML=`&plusmn;<span class="italic">i</span>`;
					}else{
						document.getElementById("numer").innerHTML=`&plusmn;${c_coefSqrt/a_coefSqrt}${['','<span class="italic">i</span>'][c_factors.length]}`;
					}
				}else{
					// 分母あり
					document.getElementById("numer").innerHTML=`${c_coefSqrt/gcd}`;
					// console.log(c_factors.length);
					document.getElementById("comma").innerHTML=`${['','<span class="italic">i</span>'][c_factors.length]}`;
					document.getElementById("comma").classList.toggle("none",1-c_factors.length);
					document.getElementById("denom").innerHTML=`${a_coefSqrt/gcd}`;
				}
			}else{
				// aは平方数だけど|c|は違う
				let inSqrt=1;
				for(let i=0; i<c_factors.length; i++){
					inSqrt*=c_factors[i];
				}
				document.getElementById("x-equals").innerHTML=`<span class="italic">x</span>&equals;${["&plusmn;",""][Number(c_coefSqrt%a_coefSqrt==0)]}`;
				document.getElementById("denom").classList.toggle("none",c_coefSqrt%a_coefSqrt==0);
				if(c_coefSqrt%a_coefSqrt==0){
					// 分母なし
					if(c_coefSqrt/a_coefSqrt==1){
						document.getElementById("numer").innerHTML=`&plusmn;&Sqrt;<span class="sqrt">${Math.abs(inSqrt)}</span>${['','<span class="italic">i</span>'][Number(inSqrt<0)]}`;
					}else{
						document.getElementById("numer").innerHTML=`&plusmn;${c_coefSqrt/a_coefSqrt}&Sqrt;<span class="sqrt">${Math.abs(inSqrt)}</span>${['','<span class="italic">i</span>'][Number(inSqrt<0)]}`;
					}
				}else{
					// 分母あり
					let gcd=findGcd(c_coefSqrt,a_coefSqrt);
					if(c_coefSqrt/gcd==1){
						document.getElementById("numer").innerHTML=`&Sqrt;<span class="sqrt">${Math.abs(inSqrt)}</span>`;
					}else{
						document.getElementById("numer").innerHTML=`${c_coefSqrt/gcd}&Sqrt;<span class="sqrt">${Math.abs(inSqrt)}</span>`;
					}
					document.getElementById("comma").innerHTML=`<span class="italic">i</span>`;
					document.getElementById("comma").classList.toggle("none",inSqrt>0);
					document.getElementById("denom").textContent=a_coefSqrt/gcd;
				}
			}
		}
	}else if(c==0){
		// ax^2+bx=0 <-> (ax+b)x=0 <-> x=0,-b/a
		// rationalSolution(0,1,0);
		rationalSolution(-b,a,0);
		document.getElementById("x-equals").innerHTML=`<span class="italic">x</span>&equals;0&comma;`;
	}else{
		let d=b*b-4*a*c; // 判別式 D
		let denom=2*a;
		if(b%2==0){
			b/=2;
			d/=4; // 判別式 D/4
			denom/=2;
		}
		// console.log(`b=${b}, d=${d}, denom=${denom}`);
		let numer,gcd;
		if(d==0){
			// 重解x=-b/2a
			rationalSolution(-b,denom,0);
		}else{
			// まず|d|が平方数かどうかを調べる
			let simp=simplifySqrt(d);
			let coefSqrt=simp[0];
			let d_factors=simp[1];
			// console.log(d_factors);
			// 平方数かつd>0だったら平方根をとって分子を単項にして上と同様に約分
			if(d_factors.length==0){
				// x=(-b±coefSqrt)/2a <-> x=(-b-coefSqrt)/2a,(-b+coefSqrt)/2a
				rationalSolution(-b-coefSqrt,denom,0);
				rationalSolution(coefSqrt-b,denom,1);
			}
			// 平方数だけどd<0だったら分子は多項のまま約分
			else if(d_factors.length==1 && d_factors[0]==-1){
				// x=(-b±coefSqrt*i)/2a
				gcd=findGcd(findGcd(b,coefSqrt),denom); //すべての項に共通の約数
				if(coefSqrt/gcd==1){
					document.getElementById("numer").innerHTML=`${["","&minus;"][Number(-b<0)]}${Math.abs(b/gcd)}&plusmn;<span class="italic">i</span>`;
				}else{
					document.getElementById("numer").innerHTML=`${["","&minus;"][Number(-b<0)]}${Math.abs(b/gcd)}&plusmn;${coefSqrt/gcd}<span class="italic">i</span>`;
				}
				if(Math.abs(denom/gcd)!=1){
					document.getElementById("denom").textContent=denom/gcd;
					document.getElementById("denom").classList.remove("none");
				}
				document.getElementById("x-equals").innerHTML=`<span class="italic">x</span>&equals;`;
			}
			// 平方数でなければ既約ルート(?)にして分母と約分
			else{
				// x=(-b±coefSqrt*sqrt(inSqrt))/2a
				let inSqrt=1;
				for(let i=0; i<d_factors.length; i++){
					inSqrt*=d_factors[i];
				}
				gcd=findGcd(findGcd(b,coefSqrt),denom);
				if(coefSqrt/gcd==1){
					document.getElementById("numer").innerHTML=`${["","&minus;"][Number(-b<0)]}${Math.abs(b/gcd)}&plusmn;&Sqrt;<span class="sqrt">${Math.abs(inSqrt)}</span>${['','<span class="italic">i</span>'][Number(inSqrt<0)]}`;
				}else{
					document.getElementById("numer").innerHTML=`${["","&minus;"][Number(-b<0)]}${Math.abs(b/gcd)}&plusmn;${coefSqrt/gcd}&Sqrt;<span class="sqrt">${Math.abs(inSqrt)}</span>${['','<span class="italic">i</span>'][Number(inSqrt<0)]}`;
				}
				if(Math.abs(denom/gcd)!=1){
					document.getElementById("denom").textContent=denom/gcd;
					document.getElementById("denom").classList.remove("none");
				}
				document.getElementById("x-equals").innerHTML=`<span class="italic">x</span>&equals;`;
			}
			// 分子が多項の場合は、まず分子の公約数を求めてそれを分母と比較することにより約分を試みる
		}
	}
}

function resetOutput(){
	document.getElementById("x-equals").classList.remove("none");
	document.getElementById("answer").classList.remove("none");
	document.getElementById("denom").classList.add("none");
	document.getElementById("comma").classList.add("none");
	document.getElementById("answer_2").classList.add("none");
	document.getElementById("denom_2").classList.add("none");
	document.getElementById("error").textContent="";
}

function factors(n){
	if(n==0){
		return [0];
	}
	let f=[];
	if(n<0){
		f.push(-1);
		n/=-1;
	}
	let d=2;
	while(n>1){
		if(n%d==0){
			f.push(d);
			n/=d;
			continue;
		}
		d+=1+d%2;
	}
	return f;
}

function findGcd(m,n){
	let gcd=1;
	let m_factors=factors(m);
	// console.log(m_factors);
	let n_factors=factors(n);
	// console.log(n_factors);
	for(let i=0; i<m_factors.length; i++){
		let common=n_factors.indexOf(m_factors[i]);
		if(common>=0){
			gcd*=m_factors[i];
			n_factors.splice(common,1);
		}
	}
	return gcd;
}

function simplifySqrt(inSqrt){
	let f=factors(inSqrt);
	let coefSqrt=1;
	for(let i=0; i<f.length-1; i++){
		if(f[i]==f[i+1]){
			coefSqrt*=f[i];
			f.splice(i,2);
			i--;
		}
	}
	return [coefSqrt,f];
}

function rationalSolution(numer,denom,kaiNumber){
	let equalsMinus=0;
	document.getElementById(["denom","denom_2"][kaiNumber]).classList.add("none");
	document.getElementById("comma").classList.toggle("none",!kaiNumber);
	document.getElementById("answer_2").classList.toggle("none",!kaiNumber);
	if(numer==0){
		document.getElementById(["numer","numer_2"][kaiNumber]).textContent=0;
	}else{
		// console.log(`numer%denom = ${numer%denom}`);
		if(numer%denom==0){
			document.getElementById(["numer","numer_2"][kaiNumber]).innerHTML=`${["","&minus;"][Number(numer*denom<0)]}${Math.abs(numer/denom)}`;
		}else{
			equalsMinus=Number(numer*denom<0);
			let gcd=findGcd(numer,denom);
			// console.log(`GCD = ${gcd}`);
			document.getElementById(["numer","numer_2"][kaiNumber]).textContent=Math.abs(numer/gcd);
			document.getElementById(["denom","denom_2"][kaiNumber]).textContent=Math.abs(denom/gcd);
			document.getElementById(["denom","denom_2"][kaiNumber]).classList.remove("none");
		}
	}
	document.getElementById(["x-equals","comma"][kaiNumber]).innerHTML=`${['<span class="italic">x</span>&equals;','&comma;'][kaiNumber]}${["","&minus;"][equalsMinus]}`;
}
