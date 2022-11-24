<script>
  import axios from 'axios';

  import PropagandaView from './components/PropagandaView.vue';
  import NewsBoardView from './components/NewsBoardView.vue';
  import StatsView from './components/StatsView.vue';
  const eventGenerator = new Worker('/src/worldEventGenerator.js');
  const actionExpander = new Worker('/src/actionExpander.js');
  const populationSimulation = new Worker('/src/populationSimulation.js');

  const audio = new Audio('/ambient_birds.mp3');
  audio.loop = true;

  // city names; if not using real city names, the language model could introduce uncontrolled city names
  const cityNames = {
    "Beijing": "Oxasmouth",
    "Xian": "Zlehfast",
    "Guangzhou": "Otaeta",
    "Shanghai": "Khiesas",
    "Nanjing": "Plephis",
    "Chengdu": "Strord",
    "Harbin": "Vork",
    "Kunming": "Yholk",
    "Urumqi": "Asodon",
    "Tangshan": "Encelas"
  }; // generated on https://www.fantasynamegenerators.com/city-names.php  

  export default {
    components: {
      PropagandaView,
      NewsBoardView,
      StatsView
    },
    created() {
        window.addEventListener('keypress', this.onKeyPress);
    },
    beforeDestroy() {
        window.removeEventListener('keypress', this.onKeyPress);
    },
    data() {
      return {
        startedBool: false,
        timerPauseBool: true,
        timerSpeed: 1,
        day: 1,
        recentEvents: new Array(null, null, null, null, null, null),
        recentPosts: new Array({
          'sourceType': 'official',
          'sourceName': 'Official News',
          'postText': 'Test string'
        }, {
          'sourceType': 'people',
          'sourceName': 'Anonymous',
          'postText': 'Test string #2'
        }, {
          'sourceType': 'people',
          'sourceName': 'Anonymous',
          'postText': 'Test string #2'
        }, {
          'sourceType': 'people',
          'sourceName': 'Anonymous',
          'postText': 'Test string #2'
        }, {
          'sourceType': 'people',
          'sourceName': 'Anonymous',
          'postText': 'Test string #2'
        }, {
          'sourceType': 'people',
          'sourceName': 'Anonymous',
          'postText': 'Test string #2'
        }, {
          'sourceType': 'people',
          'sourceName': 'Anonymous',
          'postText': 'Test string #2'
        }, {
          'sourceType': 'people',
          'sourceName': 'Anonymous',
          'postText': 'Test string #2'
        }),
        archivedEvents: new Array(),
        activeEvents: new Object(), // can be updated with "no response from gov" (NOT what's visible via recent events)
        worldEventGeneratorID: null,
        indoctrinationStat: 50,
        suspicionStat: 50,
        prosperityStat: 50,
        satisfactionStat: 50,
        partySuspicionStat: 50,
        partySatisfactionStat: 50
      }
    },
    methods: {
        onKeyPress(e) {
          if (e.key == ' ') {
            this.timerPauseBool = !this.timerPauseBool;
            this.doWhenTogglePause();
          }
          else if (e.key == '1') {
            this.timerSpeed = 1;
          }
          else if (e.key == '2') {
            this.timerSpeed = 2;
          }
          else if (e.key == '3') {
            this.timerSpeed = 3;
          }
          else if (e.key == '4') {
            this.timerSpeed = 4;
          }
          else if (e.key == '5') {
            this.timerSpeed = 5;
          }
          else if (e.key == '6') {
            this.timerSpeed = 6;
          }
        },
        initTimer() {
          this.startedBool = true;
          this.timerPauseBool = false;
          this.doWhenTogglePause();
        },
        incrementDay() {
          this.day += 1;
          populationSimulation.postMessage({
            event: {
              eventType: 'indoctrination erosion', // perhaps every stat should go toward neutral?
            },
            day: this.day
          })
        },
        doAction(actionName) {
          let applyToEvent = null;
          for (let recentEvent of this.recentEvents) {
            if (recentEvent == null) {
              break;
            }
            if (recentEvent.timestamp && recentEvent.timestamp in this.activeEvents) {
              applyToEvent = recentEvent;
              delete this.activeEvents[recentEvent.timestamp]

              let location = recentEvent.location;
              let actionText;
              if (actionName == 'praise') {
                actionText = 'praise the party for';
              } else if (actionName == 'blame') {
                actionText = 'blame greedy capitalists and foreign operatives for';
              } else if (actionName == 'tweak') {
                actionText = 'tweak the details of the story for';
              } else if (actionName == 'bury') {
                actionText = 'bury the story with unrelated news for';
              } else if (actionName == 'delete') { 
                actionText = 'delete all posts related to'
              }
              let tempText = 'You sent out a directive to ' + actionText + ' what happened in ' + location;
              this.recentEvents.push({
                text: tempText
              });
              this.recentEvents.shift();
              break;
            }
          }
          actionExpander.postMessage({
            action: actionName,
            applyToEvent: applyToEvent
          })
        },
        doWhenTogglePause() {
          if (this.timerPauseBool) {
            eventGenerator.postMessage({
              command: 'pause',
              ID: this.worldEventGeneratorID
            });
            audio.pause();
          }
          else {
            this.worldEventGeneratorID = null;
            eventGenerator.postMessage({
              command: 'unpause',
              timerSpeed: this.timerSpeed // worker does not understand changing speed when running!
            });
            audio.play();
          }
        },
        forwardEventToPeople(event) {
          populationSimulation.postMessage({
            event: event,
            day: this.day
          });
        },
        forwardEventToTime(event) {
          let interpretation;
          let rand = Math.random();
          if (rand < 0.3) {
            interpretation = " and government inaction";
          }
          else if (rand < 0.3) {
            interpretation = " and government slow to respond";
          }
          else {
            interpretation = " and what has the government done?";
          }
          let prompt = event.text + interpretation;
          let escaped_prompt = prompt.replace(/ /g, '%20');
          const path = 'http://127.0.0.1:5000/summary?prompt=' + escaped_prompt;
          axios.get(path)
            .then((res) => { // TODO: "lock" recent event in gray, if still in recent events
              if (event.timestamp in this.activeEvents) {
                event.text = res.data; //TODO hiding for now to do other things
                event.text = event.text.split(event.location).join(cityNames[event.location]);
                event.accessed = true;
                event.accessedBy = "people";
                event.accessTime = Date.now();
                this.archivedEvents.push(event);
                delete this.activeEvents[event.timestamp];
                this.forwardEventToPeople(event);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        },
        forwardEventToNewsBoard(event) {
          console.log("should update to news board ");
          console.log(event);
        }
    },
    mounted() {
      eventGenerator.onmessage = (e) => {
        console.log(e.data.event);
        if (this.worldEventGeneratorID == null && 'generatorID' in e.data) {
          this.worldEventGeneratorID = e.data.generatorID;
        }
        if (e.data.event.eventType == 'nothing') {
            this.recentEvents.push(e.data.event);
            this.recentEvents.shift();
        }
        else {
          let escaped_prompt = e.data.event.text.replace(/ /g, '%20');
          const path = 'http://127.0.0.1:5000/summary?prompt=' + escaped_prompt;
          axios.get(path)
            .then((res) => {
              e.data.event.text = res.data; //TODO hiding for now to do other things
              e.data.event.text = e.data.event.text.split(e.data.event.location).join(cityNames[e.data.event.location]);
              this.activeEvents[e.data.event.timestamp] = e.data.event;
              this.recentEvents.push(e.data.event);
              this.recentEvents.shift();
              this.forwardEventToPeople(e.data.event);
              this.forwardEventToTime(e.data.event);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      },
      actionExpander.onmessage = (e) => {
        if (e.data.event.needGen == true) {
          // generate/expand new text; old text was already generated/expanded
          let escaped_prompt = e.data.event.text.replace(/ /g, '%20'); 
          let path = 'http://127.0.0.1:5000/summary?prompt=' + escaped_prompt;
          axios.get(path) // get gen text for expanded action
            .then((res) => {
              event.text = res.data; // TODO hiding for now to do other things

              let escaped_old_text = e.data.event.old_text.replace(/ /g, '%20'); 
              let escaped_new_text = e.data.event.text.replace(/ /g, '%20'); 
              let path = 'https://127.0.0.1:5000/sentimentanalysis?prompt1=' + escaped_old_text + '&prompt2=' + escaped_new_text;
              axios.get(path) // get sentiments for both new and old texts
                .then((res) => {
                  event.old_sentiment = res.data[0];
                  event.new_sentiment = res.data[1];
                  console.log('received sentiment analysis ' + event.old_sentiment + " " + event.new_sentiment);

                  event.text = event.text.split(event.location).join(cityNames[event.location]);
                  this.archivedEvents.push(event);
                  this.forwardEventToPeople(event);
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }
        else {
          this.archivedEvents.push(e.data.event);
          if (!e.data.event.doNotForward) {
            this.forwardEventToPeople(e.data.event);
          }
        }
      },
      populationSimulation.onmessage = (e) => {
        this.indoctrinationStat = e.data.indoctrination;
        this.suspicionStat = e.data.suspicion;
        this.prosperityStat = e.data.prosperity;
        this.satisfactionStat = e.data.satisfaction;
        if (e.data.event != null && e.data.event.accessed == true) {
          this.forwardEventToNewsBoard(e.data.event);
        }
      }
    }
  }
</script>

<template>
  <StatsView :indoctrinationStat="this.indoctrinationStat" :suspicionStat="this.suspicionStat" :prosperityStat="this.prosperityStat" :satisfactionStat="this.satisfactionStat" :partySuspicionStat="this.partySuspicionStat" :partySatisfactionStat="this.partySatisfactionStat"/>
  <NewsBoardView 
    :started="startedBool"
    :recentPosts="recentPosts"
    />
  <PropagandaView 
    @initTimer="initTimer" 
    @incrementDay="incrementDay"
    @doPraise="doAction('praise')"
    @doBlame="doAction('blame')"
    @doTweak="doAction('tweak')"
    @doBury="doAction('bury')"
    @doDelete="doAction('delete')"
    :recentEvents="recentEvents" :timerSpeed="timerSpeed" :timerPause="timerPauseBool"/>

  <audio
    src="/ambient_birds.mp3"
    type="audio/mp3"
    autoplay
    loop
  ></audio>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Italiana');
  @import url('https://fonts.googleapis.com/css?family=Changa');
  @import url('https://fonts.googleapis.com/css?family=Special+Elite');
</style>
