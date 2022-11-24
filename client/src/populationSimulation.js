class BigPerson {
  constructor() {
  	this.indoctrination = 50;
  	this.suspicion = 50;
    this.prosperity = 50;
    this.satisfaction = 50;
  }
}

let simPop = 10;
let bigPeople = new Array()
for (let i = 0; i < simPop; i++) {
	bigPeople.push(new BigPerson());
}

// collective memory, for now
let collectiveMemory = {}

onmessage = (e) => {
	let event = e.data.event;
	if (event) {
		// save event in memory, TODO use for advanced features later
		// if (collectiveMemory[e.data.day] == null) {
		// 	collectiveMemory[e.data.day] = new Array();
		// } 
		// collectiveMemory[e.data.day].push(event);

		if (event.accessed) {
			if (event.eventType == 'natural disaster') {
				let intensity = event.disasterIntensity;
				for (let bigPerson of bigPeople) {
					bigPerson.prosperity -= intensity;
					bigPerson.propserity = Math.min(bigPerson.prosperity, 0);
				} // satisfaction // suspicion // TODO run semantic analysis model
			}
			else {
				console.log("accessed event needs case in pop simulation: " + event.eventType);
			}
		}
		else { // basic events that directly update prosperity, indoctrination
			if (event.eventType == 'indoctrination erosion') { // Rule: indoctrination decreases over time except for people with over 75/100 indoctrination. 
				for (let bigPerson of bigPeople) {
					if (bigPerson.indoctrination < 75) {
						bigPerson.indoctrination -= (100-bigPerson.indoctrination) / 100;
					}
				}
			}
			else if (event.eventType == 'praise') { // Rule: more indoctrinated people are more likely to be affected by "praise the party", and gain more indoctrination if affected.
				let multiplier = 1;
				if (collectiveMemory[e.data.day] != null) {
					for (let event of collectiveMemory[e.data.day]) {
						if (event.actionType == 'praise') {
							multiplier *= 0.5;
						}
					}
				}

				for (let bigPerson of bigPeople) {
					if (Math.random() <= bigPerson.indoctrination / 100) { 
						bigPerson.indoctrination += bigPerson.indoctrination / 100 * multiplier;
						bigPerson.indoctrination = Math.min(100, bigPerson.indoctrination);
						bigPerson.suspicion += 0.1
						bigPerson.suspicion = Math.min(100, bigPerson.suspicion)
					}
				}
			}
			else if (event.eventType == 'natural disaster') {
				let intensity = event.intensity;
				for (let bigPerson of bigPeople) {
					bigPerson.prosperity -= intensity;
					bigPerson.propserity = Math.min(bigPerson.prosperity, 0);
				}
			}
			else if (event.eventType == 'corruption') {
				let intensity = event.intensity;
				for (let bigPerson of bigPeople) {
					bigPerson.prosperity -= intensity;
					bigPerson.propserity = Math.min(bigPerson.prosperity, 0);
				}
			}
			else if (event.eventType == 'crime') {
				let intensity = event.intensity;
				for (let bigPerson of bigPeople) {
					bigPerson.prosperity -= intensity;
					bigPerson.propserity = Math.min(bigPerson.prosperity, 0);
				}
			}
			else {
				console.log("basic event needs case in pop simulation: " + event.eventType);
			}
		}

		// average and return numbers
		let totalIndoctrination = 0;
		let totalSuspicion = 0; 
		let totalProsperity = 0;
		let totalSatisfaction = 0;

		for (let bigPerson of bigPeople) {
			totalIndoctrination += bigPerson.indoctrination;
			totalSuspicion += bigPerson.suspicion;
			totalProsperity += bigPerson.prosperity;
			totalSatisfaction += bigPerson.satisfaction;
		}

		postMessage({
			indoctrination: Math.round(totalIndoctrination / simPop),
			suspicion: Math.round(totalSuspicion / simPop),
			prosperity: Math.round(totalProsperity / simPop),
			satisfaction: Math.round(totalSatisfaction / simPop),
			event: event
		});
	}
	// else should not be possible
}