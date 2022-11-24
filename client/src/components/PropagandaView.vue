<template>
  <div class="propaganda">
    <h1>Day {{day}}.
      <div class="clock">
        <span class="progress clock" :data-percentage="timeOfDay" v-if="started">
          <span class="progress-left">
            <span class="progress-bar"></span>
          </span>
          <span class="progress-right">
            <span class="progress-bar"></span>
          </span>
        </span>
      </div>
    </h1>
    <div class="playPause" v-if="started">
      <font-awesome-layers class="fa-lg">
        <font-awesome-icon icon="fa-solid fa-square" transform="grow-3" v-if="timerPause"/>
        <font-awesome-icon icon="fa-solid fa-pause" transform="shrink-3" :style="iconStyle(timerPause)" />
      </font-awesome-layers>
      <font-awesome-layers class="fa-lg">
        <font-awesome-icon icon="fa-solid fa-square" transform="grow-3" v-if="!timerPause && timerSpeed==1"/>
        <font-awesome-icon icon="fa-solid fa-play" transform="shrink-3" :style="iconStyle(!timerPause && timerSpeed==1)" />
      </font-awesome-layers>
      <font-awesome-layers class="fa-lg">
        <font-awesome-icon icon="fa-solid fa-square" transform="grow-3" v-if="!timerPause && timerSpeed>1"/>
        <font-awesome-icon icon="fa-solid fa-forward" transform="shrink-1" :style="iconStyle(!timerPause && timerSpeed>1)" />
        <font-awesome-icon icon="fa-solid fa-circle" transform="shrink-8 up-6 right-6" :style="{color: 'orange'}" v-if="!timerPause && timerSpeed>2"/>        
        <font-awesome-layers-text transform="shrink-8 up-6 right-6" :value="timerSpeed" v-if="!timerPause && timerSpeed>2"/>
      </font-awesome-layers>
    </div>

    <p v-if="!started">{{messagedetail}}</p>
    <p v-if="recentEvents[0]">{{recentEvents[0].text}}</p>
    <p v-if="recentEvents[1]">{{recentEvents[1].text}}</p>
    <p v-if="recentEvents[2]">{{recentEvents[2].text}}</p>
    <p v-if="recentEvents[3]">{{recentEvents[3].text}}</p>
    <p v-if="recentEvents[4]">{{recentEvents[4].text}}</p>
    <p v-if="recentEvents[5]">{{recentEvents[5].text}}</p>

    <button @click="startGame" type="button" class="startbutton btn btn-warning" v-if="showStartButton">{{startbutton}}</button>
    <button @click="doPraise" type="button" class="praisebutton btn btn-warning" v-if="showPraiseButton">{{praisebutton}}</button>
    <button @click="doBlame" type="button" class="blamebutton btn btn-warning" v-if="showBlameButton">{{blamebutton}}</button>
    <button @click="doTweak" type="button" class="tweakbutton btn btn-warning" v-if="showTweakButton">{{tweakbutton}}</button>
    <button @click="doPlant" type="button" class="plantbutton btn btn-warning" v-if="showPlantButton" style='background-color:gray'>{{plantbutton}}</button>

    <button @click="doBury" type="button" class="burybutton btn btn-warning" v-if="showBuryButton">{{burybutton}}</button>
    <button @click="doDelete" type="button" class="deletebutton btn btn-warning" v-if="showDeleteButton">{{deletebutton}}</button>
    <button @click="doCensor" type="button" class="censorbutton btn btn-warning" v-if="showCensorButton" style='background-color:gray'>{{censorbutton}}</button>
  </div>

</template>

<style>
@media (min-width: 1024px) {
  .propaganda {
    min-height: 100vh;
    align-items: center;
    padding-left: 2vw;
  }
	.btn {
    font-family: 'Changa', serif;
    margin-bottom: 2vh;
    margin-right: 1vw;
	}
  .propaganda h1 {
    margin-top: 15vh;
    margin-bottom: 1vh;
    font-family: 'Special Elite', serif;
    font-size: 7vh;
  }
  .propaganda p {
    margin-top: 2vh;
    margin-bottom: 1vh;
    font-family: 'Changa', serif;
  }

  .playPause {
    font-size: 20px;
  }

  .fa-layers {
    margin-right: 0.25vw;
  }

  .fa-circle,
  .fa-layers-text {
    font-size: 25px;
    font-family: 'Changa', serif;
  }

  div.clock {
    display: inline-block;
  }

}
</style>

<script>

export default {
  props: {
    timerSpeed: Number,
    timerPause: Boolean,
    recentEvents: Array
  },
  emits: ['initTimer', 'incrementDay', 'doPraise'],
  data() {
    return {
      day: 1,
      messagedetail: 'You are now in charge of the propaganda arm of an authoritarian government. Your job is to keep the people satisfied. The ones that ask questions cause trouble for you. Indoctrination will help. Don\'t worry, you will get the hang of it soon enough.',
      startbutton: 'Yes, I am ready.',
      praisebutton: 'Praise the party',
      blamebutton: 'Assign blame',
      tweakbutton: 'Tweak the truth',
      plantbutton: 'Plant a false flag',
      burybutton: 'Bury the lead',
      deletebutton: 'Delete posts',
      censorbutton: 'Censor: ban topics',

      showStartButton: true,
      showPraiseButton: false,
      showBlameButton: false,
      showTweakButton: false,
      showPlantButton: false,
      showBuryButton: false,
      showDeleteButton: false,
      showCensorButton: false,

      started: false,
      timeOfDay: 0,
      timeElapsed: 0,
    }
  },
  methods: {
    iconStyle(active) {
      if (active) {
        return {
          color: 'white'
        };
      }
      else {
        return {
        };
      }
    },
    squareStyle(active) {
      if (!active) {
        return {
        };
      }
      else {
        return {
        };
      }

    },
    startGame() {
      this.started = true;
      this.$emit('initTimer');
      this.timeOfDay = 1;
      this.timeElapsed = 1;
      this.showStartButton = false;
      this.showPraiseButton = true;
      this.showBlameButton = true;
      this.showTweakButton = true;
      this.showPlantButton = true;
      this.showBuryButton = true;
      this.showDeleteButton = true;
      this.showCensorButton = true;
    },
    doPraise() {
      this.$emit('doPraise');
    },
    doBlame() {
      this.$emit('doBlame');
    },
    doTweak() {
      this.$emit('doTweak');
    },
    doPlant() {
      this.$emit('doPlant');
    },
    doBury() {
      this.$emit('doBury');
    },
    doDelete() {
      this.$emit('doDelete');
    },
    doCensor() {
      this.$emit('doCensor');
    }
  },
  watch: {
      timeOfDay: {
        handler(value) {
          if (this.timerPause) return;

          setTimeout(() => {
              this.timeOfDay += this.timerSpeed;
              this.timeElapsed += this.timerSpeed;
              if (this.timeOfDay >= 100) {
                this.day += 1;
                this.$emit('incrementDay');
                this.timeOfDay %= 100;
              }
          }, 500);

        },
        immediate: true // This ensures the watcher is triggered upon creation
      },
      timerPause: {
        handler(value) {
          if (!value) {
            this.timeOfDay++;
            this.timeElapsed++;
          }
        }
      }
  }
}
</script>