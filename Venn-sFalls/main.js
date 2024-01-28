'use strict';
{
	let sizes;
	
	windowLoad();
	window.addEventListener("resize",()=>{
		windowLoad();
		draw();
	})
	// ↑と↓の順序だいじ;
	let p=[kax(50),kay(50)];

	function windowLoad(){
		// sizes: [0,1]=window, [2,3]=canvas, [4,5]=territory;
		sizes=[window.innerWidth,window.innerHeight,0,0,0,0];
		sizes[2]=sizes[0];
		if(sizes[0]>sizes[1]){
			sizes[3]=3*sizes[1]/4;
			sizes[5]=0.9*sizes[3];
			sizes[4]=3*sizes[5]/2;
		}else{
			sizes[3]=3*sizes[2]/4;
			sizes[4]=0.9*sizes[0];
			sizes[5]=2*sizes[4]/3;
		}
		document.getElementById("canvas").setAttribute("width",sizes[2]);
		document.getElementById("canvas").setAttribute("height",sizes[3]);
	}

	// let startPositions;
	// let endPositions;
	// document.getElementById('toLeft').addEventListener('touchstart',(event)=>{
	// 	event.preventDefault();
	// 	startPositions=[event.touches[0].pageX, event.touches[0].pageY];
	// })
	// document.getElementById('toLeft').addEventListener('touchend',(event)=>{
	// 	event.preventDefault();
	// 	endPositions=[event.changedTouches[0].pageX, event.changedTouches[0].pageY];
	// 	console.log(`(${startPositions}) => (${endPositions})`);
	// })

	function kax(x){
		return (sizes[2]-sizes[4])/2+x*sizes[4]/100;
	}
	function kay(y){
		return (sizes[3]-sizes[5])/2+y*sizes[5]/100;
	}

	const c=document.getElementById("canvas").getContext('2d');

	function draw(){
		c.lineWidth=2;
		c.strokeStyle="#282523";
		c.strokeRect(kax(0),kay(0),sizes[4],sizes[5]);

		c.beginPath();
		c.arc(kax(37.5),kay(50),sizes[4]/4,0,2*Math.PI,false);
		c.stroke();
		c.beginPath();
		c.arc(kax(62.5),kay(50),sizes[4]/4,0,2*Math.PI,false);
		c.stroke();

		c.font="24px serif";
		c.fillStyle="#282523";
		c.fillText("A",kax(25)-6,kay(50)+12);
		c.fillText("B",kax(75)-6,kay(50)+12);
		c.fillText("U",kax(6),kay(18));

		c.fillStyle="#a1a499";
		// c.lineWidth=1;
		// c.strokeStyle="#eee";
		for(let i=1; i<20; i++){
			for(let j=1; j<20; j++){
				c.fillRect(kax(5*i)-1,kay(5*j)-1,2,2);
				// c.strokeRect(kax(5*i)-1,kay(5*j)-1,2,2);
			}
		}

		c.fillStyle="#f00";
		c.fillRect(p[0]-3,p[1]-3,6,6);


		
		// c.lineWidth=2;
		// c.beginPath();
		// c.arc(240,160,120,0,2*Math.PI,false);
		// c.stroke();
		// c.beginPath();
		// c.arc(240-40*Math.sqrt(3),280,120,0,2*Math.PI,false);
		// c.stroke();
		// c.beginPath();
		// c.arc(240+40*Math.sqrt(3),280,120,0,2*Math.PI,false);
		// c.stroke();
		// c.font="24px serif";
		// c.fillStyle="#282523";
		// c.fillText("A",231,120);
		// c.fillText("B",120,320);
		// c.fillText("C",360,320);

	}

	document.addEventListener('keydown',(e)=>{
		if(["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].indexOf(e.key)>=0){
			if(e.key=="ArrowRight"){
				p[0]+=sizes[4]/20;
			}
			if(e.key=="ArrowLeft"){
				p[0]-=sizes[4]/20;
			}
			if(e.key=="ArrowUp"){
				p[1]-=sizes[5]/20;
			}
			if(e.key=="ArrowDown"){
				p[1]+=sizes[5]/20;
			}
			// console.log(p);
			c.clearRect(0,0,sizes[2],sizes[3]);
			draw();
		}
	})
	
	draw();
}