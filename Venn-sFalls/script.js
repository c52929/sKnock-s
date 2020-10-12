'use strict';
{
	let winSize;
	let aPosition;
	let bPosition;
	windowLoad();
	window.onresize=windowLoad;
	function windowLoad(){
		winSize=[window.innerWidth,window.innerHeight];
		aPosition=[winSize[0]*0.4144, winSize[1]*0.58];
		bPosition=[winSize[0]*0.5856, winSize[1]*0.58];
	}
	console.log(`winSize = [${winSize}]`);
	console.log(`A Position = [${Math.round(aPosition[0])},${Math.round(aPosition[1])}]`);
	// roundConsole(winSize[0]*(20/100));
	// roundConsole(winSize[0] - winSize[0]*(20/100));
	// roundConsole(winSize[0] - winSize[0]*(20/100) - winSize[0]*(60/100)*(14.4/100));
	// roundConsole();
	// // roundConsole(winSize[0]*(20/100) + winSize[0]*(60/100)*(14.4/100));
	// roundConsole(winSize[0]*(20/100) + winSize[0]*(60/100)*(14.4/100) + winSize[0]*(12.8/100));
	// // roundConsole(winSize[1]-winSize[1]*(10/100));
	// roundConsole(winSize[1]-winSize[1]*(10/100) - (winSize[1]*(64/100)-winSize[0]*(25.6/100))/2 - winSize[0]*(12.8/100));
	// roundConsole();

	function roundConsole(num){
		console.log(Math.round(num));
	}

	let startPositions;
	let endPositions;
	document.getElementById('toLeft').addEventListener('touchstart',(event)=>{
		event.preventDefault();
		startPositions=[event.touches[0].pageX, event.touches[0].pageY];
	})
	document.getElementById('toLeft').addEventListener('touchend',(event)=>{
		event.preventDefault();
		endPositions=[event.changedTouches[0].pageX, event.changedTouches[0].pageY];
		console.log(`(${startPositions}) => (${endPositions})`);
	})
}