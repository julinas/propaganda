<template>
	<div class='stats-container'>
		<div class='headerPic'>
	    	<img alt="rorschach" class="logo" src="../assets/rorschach.jpeg"/>
	    </div>

	    <div class="stats people">
			<h2>{{peoplestatstext}}</h2>
	    	<div class="bar-label">Indoctrination</div>
			<div class="bar-container">
			  <div class="bar" :style="statsBarStyle(indoctrinationStat)"></div>
			</div>

	    	<div class="bar-label">Suspicion</div>
			<div class="bar-container">
			  <div class="bar" :style="statsBarStyle(suspicionStat)"></div>
			</div>

	    	<div class="bar-label">Prosperity</div>
			<div class="bar-container">
			  <div class="bar" :style="statsBarStyle(prosperityStat)"></div>
			</div>

	    	<div class="bar-label">Satisfaction</div>
			<div class="bar-container">
			  <div class="bar" :style="statsBarStyle(satisfactionStat)"></div>
			</div>
		</div>

		<div class="stats party">
			<h2>{{partystatstext}}</h2>
	    	<div class="bar-label">Suspicion</div>
			<div class="bar-container">
			  <div class="bar" :style="statsBarStyle(partySuspicionStat)"></div>
			</div>

	    	<div class="bar-label">Satisfaction</div>
			<div class="bar-container">
			  <div class="bar" :style="statsBarStyle(partySatisfactionStat)"></div>
			</div>
		</div>

	</div>

</template>

<script>
// Note: Pause/Unpause/Speed is controlled by space and number keys, not clicking. Event generator does not understand changing speed while working - you have to pause, change the speed, then unpause again.

	export default {
		props: {
			indoctrinationStat: Number,
			suspicionStat: Number,
			prosperityStat: Number,
			satisfactionStat: Number,
			partySuspicionStat: Number,
			partySatisfactionStat: Number
		},
		data() {
			return {
				peoplestatstext: 'YOU ARE WATCHING THE PEOPLE.',
				partystatstext: 'THE PARTY IS WATCHING YOU.',
			}
		},
		methods: {
			statsBarStyle(value) {
				return {
					width: value + "%"
				};
			}
		}
	}
</script>


<style>

.headerPic {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 5vh;
	margin-right: 10vh;
	margin-bottom: 5vh;
}

.headerPic img {
	width: 150px;
	height: 150px;
}

.stats {
	margin-bottom: 5vh;
}

.stats h2 {
	font-family: 'Special Elite', serif;
	margin-bottom: 1vh;
}

.stats .bar-label {
	width: 80%;
	text-align: center;
	line-height: 2vh;
	font-family: 'Special Elite', serif;
	font-size: 2vh;
}

.stats .bar-container {
	display: inline-block;
	background-color: #d3d3d3;
	height: 3vh;
	width: 80%;
}

.stats .bar {
	height: 3vh;
	width: 0%;
}

.stats.people .bar {
	background-color: #967bb6;	
}

.stats.party .bar {
	background-color: #bdd4bc;
}
</style>