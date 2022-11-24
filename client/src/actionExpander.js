const distractionPhrases = new Array("huge hotpot party in ", "top 10 tourist attractions in ", "friendly companionship services in ");

function selectRandom(array) {
	return array[Math.floor(Math.random()*array.length)];
}

onmessage = (e) => {
	if (e.data.action == 'praise') {
		if (e.data.event != null) {
			let event = e.data.event;
			event.old_text = event.text;
			event.text = event.text + " thankfully the local government";
			event.accessed = true;
			event.accessedBy = "official";
			event.accessTime = Date.now();
			event.needGen = true;
			postMessage({
				event: event
			});
		}
		else { // else do simple praise
			postMessage({
				event: {
					text: "A virtual rally is being held to praise the Party!",
					eventType: 'praise'
				}
			});
		}
	}
	else if (e.data.action == 'blame') {
		if (e.data.event != null) {
			let event = e.data.event;
			event.old_text = event.text;
			event.text = event.text + " nefarious foreign forces are to be blamed";
			event.accessed = true;
			event.accessedBy = "official";
			event.accessTime = Date.now();
			event.needGen = true;
			postMessage({
				event: event
			});
		}
		else {
			postMessage({
				event: {
					text: "Never forget: recounting the crimes committed by our enemies from East Oceania.",
					eventType: 'blame'
				}
			});
		}
	}
	else if (e.data.action == 'tweak') { // tweak to make it sound better
		if (e.data.event != null) {
			let event = e.data.event;
			event.old_text = event.text;
			event.text = event.timestamp + " " + event.keyword + " in " + event.location;
			if (Math.random() > 0.5) {
				event.text += '; all victims recovered';
			}
			event.accessed = true;
			event.accessedBy = "official";
			event.accessTime = Date.now();
			event.needGen = true;
			postMessage({
				event: event
			});
		}
		else {
			console.log("should probably make a 'action not allowed' sound");
		}		
	}
	else if (e.data.action == 'bury') {
		if (e.data.event != null) {
			let event = e.data.event;
			event.old_text = event.text;
			event.text = selectRandom(distractionPhrases) + event.location;
			event.accessed = true;
			event.accessedBy = "official";
			event.accessTime = Date.now();
			event.useName = 'Anonymous';
			event.needGen = true;
			postMessage({
				event: event
			});
		}
		else {
			console.log("should probably make a 'action not allowed' sound");
		}
	}
	else if (e.data.action == 'delete') {
		if (e.data.event != null) {
			let event = e.data.event;
			event.accessed = true;
			event.accessedBy = "official";
			event.accessTime = Date.now();
			event.doNotForward = true;
			postMessage({
				event: event
			});
		}
		else {
			console.log("should probably make a 'action not allowed' sound");
		}		
	}
}