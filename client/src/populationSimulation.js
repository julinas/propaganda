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
		// save event in memory
		if (collectiveMemory[e.data.day] == null) {
			collectiveMemory[e.data.day] = new Array();
		} 
		collectiveMemory[e.data.day].push(event);

		if (event.accessed) {
			if (event.eventType == 'natural disaster' || 
				event.eventType == 'corruption' || 
				event.eventType == 'crime' ||
				event.eventType == 'government action') {
				let intensity = event.intensity; 
				for (let bigPerson of bigPeople) {
					let satisfaction_diff = (event.new_sentiment - event.old_sentiment) * bigPerson.indoctrination - intensity;
					bigPerson.satisfaction -= satisfaction_diff;
					bigPerson.satisfaction = Math.max(bigPerson.satisfaction, 0);

					if (Math.random() < event.not_paraphrase) {
						bigPerson.suspicion += (100-bigPerson.indoctrination) / 50; // 2x not indoctrination --> new suspicion
						bigPerson.suspicion = Math.min(bigPerson.suspicion, 100);
					}
 					bigPerson.propserity = Math.min(bigPerson.prosperity, 0);
				} 
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
				let multiplier = 5;
				if (collectiveMemory[e.data.day] != null) {
					for (let event of collectiveMemory[e.data.day]) {
						if (event.eventType == 'praise') {
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
			else if (event.eventType == 'blame') {
				let multiplier = 5;
				if (collectiveMemory[e.data.day] != null) {
					for (let event of collectiveMemory[e.data.day]) {
						if (event.eventType == 'blame') {
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
			else if (event.eventType == 'natural disaster' ||
				event.eventType == 'corruption' ||
				event.eventType == 'crime' ||
				event.eventType == 'government action') {
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