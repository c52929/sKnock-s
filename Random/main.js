'use strict';

{
	let list=[];
	let specialist=[];

	document.getElementById('add_content').focus();

	document.getElementById('add_button').addEventListener('click',()=>{
		put_function();
	})
	document.addEventListener('keydown',(event)=>{
		if(`${event.key}`=='Enter'){
			let check=document.getElementById('add_content');
			let active=document.activeElement;
			if(check==active){
				put_function();
			}
		}
	})
	function put_function(){
		if(add_content.value==''){
			document.getElementById('addError').textContent='文字を入力してください';
		}else if(list.indexOf(add_content.value)>-1){
			document.getElementById('addError').textContent=`「${add_content.value}」: リストに追加済みです`;
		}else{
			document.getElementById('addError').textContent='';
			const add=document.createElement('li');
			add.textContent=add_content.value;
			document.getElementById('list').appendChild(add);
			list.push(add_content.value);
			specialist.push(add_content.value);
			document.getElementById('add_content').value='';
			document.getElementById('add_content').focus();
			document.getElementById('listClear').classList.remove('none');
		}
	}

	let historyLength=0;
	let date;
	let timeInfo;
	// let history=[];
	let r;
	function getDate(){
		date=new Date();
		timeInfo=[`${('00'+date.getHours()).slice(-2)}:${('00'+date.getMinutes()).slice(-2)}:${('00'+date.getSeconds()).slice(-2)}`,`${('000'+Math.floor(date.getMilliseconds())).slice(-3)}`];
	}

	document.getElementById('start_button').addEventListener('click',()=>{
		if(list.length<=1){
			document.getElementById('addError').textContent='要素数が少ないです';
		}else{
			document.getElementById('resultClear').classList.remove('none');
			document.getElementById('addError').textContent='';
			const addResult=document.createElement('div');
			addResult.classList.add('result');
			addResult.classList.add(`${['even','odd'][historyLength%2]}`);
			if(checkboxProhibitDuplicate.checked){
				if(specialist.length>0){
					r=[Math.floor(Math.random()*specialist.length)];
					r.push(specialist[r[0]]);
					// specialist.splice(r[0],1);
					// history.splice(0,0,r[1]);
				}else{
					document.getElementById('returnError').textContent='以上でーす';
				}
			}else{
				r=[Math.floor(Math.random()*list.length)];
				r.push(list[r[0]]);
				// specialist.splice(specialist.indexOf(r[1]),1);
				// history.splice(0,0,r[1]);
				document.getElementById('returnError').textContent='';
			}
			getDate();
			if(!checkboxProhibitDuplicate.checked || specialist.length>0){
				addResult.innerHTML=`<span>${r[1]}</span><span class="time">${timeInfo[0]}<span class="dec">.${timeInfo[1]}</span></span>`;
				document.getElementById('result_title').parentNode.insertBefore(addResult,document.getElementById('result_title').nextSibling);
				historyLength++;
			}
			if(checkboxProhibitDuplicate.checked){
				if(specialist.length>0){
					specialist.splice(r[0],1);
				}
			}else{
				if(specialist.indexOf(r[1])>-1){
					specialist.splice(specialist.indexOf(r[1]),1);
				}
			}
		}
	})

	document.getElementById('listClear').addEventListener('click',()=>{
		list=[];
		specialist=[];
		let removeList=document.querySelectorAll('li');
		for(let i=0; i<removeList.length; i++){
			removeList[i].remove();
		}
		document.getElementById('listClear').classList.add('none');
		document.getElementById('add_content').focus();
	})

	document.getElementById('resultClear').addEventListener('click',()=>{
		specialist=Array.from(list);
		document.getElementById('returnError').textContent='';
		let removeResult=document.querySelectorAll('.result');
		for(let i=0; i<removeResult.length; i++){
			removeResult[i].remove();
		}
		document.getElementById('resultClear').classList.add('none');
	})
}