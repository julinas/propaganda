// months 
const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
// names
const realCityNames = new Array("Beijing", "Xian", "Guangzhou", "Shanghai", "Nanjing", "Chengdu", "Harbin", "Kunming", "Urumqi", "Tangshan");
const cityNames = new Array("Oxasmouth", "Zlehfast", "Otaeta", "Khiesas", "Plephis", "Strord", "Vork", "Yholk", "Asodon", "Encelas") // generated on https://www.fantasynamegenerators.com/city-names.php
const naturalDisaster = new Array('earthquake', 'flood', 'drought', 'forest fire', 'hurricane', 'sandstorm', 'cold wave', 'heat wave', 'infectious disease', 'smog', 'water pollution');
const disasterIntensityWords = new Array('emergency', 'disaster', 'calamity', 'cataclysm', 'catastrophe', 'apocalypse');
const moneyLostArray = new Array('10,000', '100,000', '1 Million', '10 Million', '100 Million', '1 Billion');
const livesLostArray = new Array('10', '36', '100', '1000', '10,000', '100,000');
// disaster levels from https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8630994/

const rationableItems = new Array('chocolate', 'potatoes', 'milk', 'meat', 'tea', 'sugar');
const rationRatio = new Array('100', '10', '1000', '2', '30', '100');
const rationUnits = new Array('grams', 'kilograms', 'mililiters', 'kilograms', 'grams', 'grams');

const corruptionTypes = new Array('building collapse', 'bridge collapse', 'overpass collapse', 'bribery', 'embezzlement');
const crimeTypes = new Array('murder', 'sexual abuse', 'trafficking', 'violence', 'bullying');
const crimeTargets = new Array('children', 'elderly', 'women', 'minorities');

function selectRandom(array) {
	return array[Math.floor(Math.random()*array.length)];
}

function selectRandom3(array1, array2, array3) {
	let index = Math.floor(Math.random()*array.length);
	return array1[index], array2[index], array3[index];
}

function leftPeakIntensity() {
	return Math.max(0.1, Math.random() * 8 - 2);
}


function tryCreateRationingEvent() {
	// if prosperity is too low, trigger rationing
	if (Math.random() > prosperity / 100 * 2) { // the lower the prosperity, the more likely it'll happen
		let eventType = 'government action';
		let intensity = leftPeakIntensity();
		let location = selectRandom(realCityNames);
		let rationableItem, rationTotal, rationUnit = selectRandom3(rationableItems, rationRatio, rationUnits);
		let rationAmount = (6-intensity)/6*rationTotal;
		let seed = Date.now();

		let text = seed + " " + rationableItem + " will now be rationed to " + rationAmount + " " + rationUnit + " per person per week in " + location;

		const data = {
			event: {
				text: text,
				eventType: eventType,
				intensity: intensity,
				location: location,
				timestamp: seed
			}
		}
		postMessage(data);
	}
}

function tryCreateProtestEvent() {
	// if satisfaction and indoctrination are too low, can trigger protests
	if (Math.random() > satisfaction / 100 * 5 && Math.random() > indoctrination / 100 * 5) {
		let eventType = 'protest';
		let location = selectRandom(realCityNames);
		let intensity = leftPeakIntensity();
		let seed = Date.now();
		let text = seed + " acts of protest in " + location;

		const data = {
			event: {
				text: text,
				eventType: eventType,
				intensity: intensity,
				location: location,
				timestamp: seed
			}
		}
		postMessage(data);
	}
}

function tryCreateEvent(generatorID) {
	let rand = Math.random();

	if (rand <= 0.2) { // natural disasters somewhere every 3 days
		let eventType = 'natural disaster';
		let disasterType = selectRandom(naturalDisaster);
		let intensity = leftPeakIntensity();  // 6 levels of disaster
		let intensityWord = disasterIntensityWords[Math.floor(intensity)];
		let location = selectRandom(realCityNames);
		let seed = Date.now();

		let text = seed + " " + disasterType + " in " + location + ". It is a " + intensityWord;

		if (Math.random() > 0.5) {
			let monetaryDamage = moneyLostArray[Math.floor(intensity)];
			text += ", at least $" + monetaryDamage + " in damages";
		}

		if (Math.random() > 0.5) {
			let livesLost = livesLostArray[Math.floor(intensity)];
			text += ", " + livesLost + " lives were lost";
		}

		const data = {
			event: {
				text: text,
				eventType: eventType,
				keyword: disasterType,
				intensity: intensity,
				location: location,
				timestamp: seed
			},
			generatorID: generatorID
		}
		postMessage(data);
	}
	else if (rand <= 0.4) { // corruption 
		let eventType = 'corruption';
		let corruptionType = selectRandom(corruptionTypes);
		let corruptionType2;

		let intensity = leftPeakIntensity();  // 6 levels of disaster
		let location = selectRandom(realCityNames);
		let seed = Date.now();

		let text = seed + " " + corruptionType + " in " + location;

		if (Math.random() > 0.5) {
			let corruptionType2 = selectRandom(corruptionTypes);
			if (corruptionType2 != corruptionType && !corruptionType2.includes("collapse")) {
				text += ", may be related to " + corruptionType2 + " in relevant departments";
			}
		}

		if (corruptionType.includes("collapse")) {
			if (Math.random() > 0.5) {
				text += ", " + Math.floor(intensity*6)  + " lives were lost";
			}
		}

		if (Math.random() > 0.5) {
			let monetaryDamage = moneyLostArray[Math.floor(intensity/3)];
			text += ", costing at least $" + monetaryDamage;
		}

		if (Math.random() > 0.5) { // police brutality
			text += ". alleged police brutality in aftermath"
		}

		const data = {
			event: {
				text: text,
				eventType: eventType,
				keyword: corruptionType,
				intensity: intensity,
				location: location,
				timestamp: seed
			},
			generatorID: generatorID
		}
		postMessage(data);
	}
	else if (rand <= 0.6) { // egregious crimes 
		let eventType = 'crime';
		let crimeType = selectRandom(crimeTypes);
		let crimeTarget = selectRandom(crimeTargets);

		let intensity = leftPeakIntensity();  // 6 levels of disaster
		let location = selectRandom(realCityNames);
		let seed = Date.now();

		let text = seed + " " + crimeType + " against " + crimeTarget + " in " + location;

		const data = {
			event: {
				text: text,
				eventType: eventType,
				keyword: crimeType,
				intensity: intensity,
				location: location,
				timestamp: seed
			},
			generatorID: generatorID
		}
		postMessage(data);

	}
	else if (rand <= 0.65) { // government actions // rationing is a government action, but is triggered rather than a background event
		// taxes are raised

		let eventType = 'government action';
		let intensity = leftPeakIntensity();
		let location = selectRandom(realCityNames);
		let seed = Date.now();
		let text = seed + " " + "taxes are raised in " + location + " by " + intensity + "%";
		const data = {
			event: {
				text: text,
				eventType: eventType,
				intensity: intensity,
				location: location,
				timestamp: seed
			},
			generatorID: generatorID
		}
		postMessage(data);

	}
	else { // it is an uneventful day
		// enjoy a nice cup of tea
		let eventType = 'nothing';
		let text = 'it\'s quiet for now... enjoy a cup of tea'
		const data = {
			event: {
				text: text,
				eventType: eventType
			},
			generatorID: generatorID
		}
		postMessage(data);

	}

}

onmessage = (e) => {
	if (e.data.command == 'unpause') {
		let ID = setInterval(() => {
			tryCreateEvent(ID);
		}, Math.ceil(10000 / e.data.timerSpeed))
	} 
	else if (e.data.command == 'pause') {
		clearInterval(e.data.ID);
	}
	else if (e.data.command == 'try trigger rationing') {
		tryCreateRationingEvent(e.data.prosperity);
	}
	else if (e.data.command == 'try trigger protest') {
		tryCreateProtestEvent(e.data.satisfaction, e.data.indoctrination);
	}
}