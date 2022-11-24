<template>
  <div class="newsboard" v-if="!started">
    <h1>Propaganda Simulator</h1>
    <hr class="center-ball">
    <h2>The best curated news, all of the time.</h2>
  </div>

  <div class="newsboard" v-if="started">
    <h3>News Board</h3>
    <div :class="recentPosts[0]['sourceType']" v-if="recentPosts[0]">
      <div class="header-container">
        <div class="header">
          <p class="icon" :style="headerIconStyle(recentPosts[0]['sourceType'])"></p>
          <span class="title">{{recentPosts[0]['sourceName']}}</span>
        </div>
      </div>
      <div class="text">{{recentPosts[0]['postText']}}</div>
    </div>

    <div :class="recentPosts[1]['sourceType']" v-if="recentPosts[1]">
      <div class="header-container">
        <div class="header">
          <p class="icon" :style="headerIconStyle(recentPosts[1]['sourceType'])"></p>
          <span class="title">{{recentPosts[1]['sourceName']}}</span>
        </div>
      </div>
      <div class="text">{{recentPosts[1]['postText']}}</div>
    </div>

    <div :class="recentPosts[2]['sourceType']" v-if="recentPosts[2]">
      <div class="header-container">
        <div class="header">
          <p class="icon" :style="headerIconStyle(recentPosts[2]['sourceType'])"></p>
          <span class="title">{{recentPosts[2]['sourceName']}}</span>
        </div>
      </div>
      <div class="text">{{recentPosts[2]['postText']}}</div>
    </div>

    <div :class="recentPosts[3]['sourceType']" v-if="recentPosts[3]">
      <div class="header-container">
        <div class="header">
          <p class="icon" :style="headerIconStyle(recentPosts[3]['sourceType'])"></p>
          <span class="title">{{recentPosts[3]['sourceName']}}</span>
        </div>
      </div>
      <div class="text">{{recentPosts[3]['postText']}}</div>
    </div>

    <div :class="recentPosts[4]['sourceType']" v-if="recentPosts[4]">
      <div class="header-container">
        <div class="header">
          <p class="icon" :style="headerIconStyle(recentPosts[4]['sourceType'])"></p>
          <span class="title">{{recentPosts[4]['sourceName']}}</span>
        </div>
      </div>
      <div class="text">{{recentPosts[4]['postText']}}</div>
    </div>

    <div :class="recentPosts[5]['sourceType']" v-if="recentPosts[5]">
      <div class="header-container">
        <div class="header">
          <p class="icon" :style="headerIconStyle(recentPosts[5]['sourceType'])"></p>
          <span class="title">{{recentPosts[5]['sourceName']}}</span>
        </div>
      </div>
      <div class="text">{{recentPosts[5]['postText']}}</div>
    </div>

    <div :class="recentPosts[6]['sourceType']" v-if="recentPosts[6]">
      <div class="header-container">
        <div class="header">
          <p class="icon" :style="headerIconStyle(recentPosts[6]['sourceType'])"></p>
          <span class="title">{{recentPosts[6]['sourceName']}}</span>
        </div>
      </div>
      <div class="text">{{recentPosts[6]['postText']}}</div>
    </div>

    <div :class="recentPosts[7]['sourceType']" v-if="recentPosts[7]">
      <div class="header-container">
        <div class="header">
          <p class="icon" :style="headerIconStyle(recentPosts[7]['sourceType'])"></p>
          <span class="title">{{recentPosts[7]['sourceName']}}</span>
        </div>
      </div>
      <div class="text">{{recentPosts[7]['postText']}}</div>
    </div>

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .newsboard {
    min-height: 100vh;
    align-items: center;
    text-align: center;
    background-color: var(--background-color-secondary);
  }
  .newsboard h1 {
    margin-top: 15vh;
    margin-bottom: 10vh;
    font-size: 7vh;
    font-family: 'Italiana', serif;
  }
  .newsboard h2 {
    margin-top: 10vh;
    margin-bottom: 15vh;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    font-size: 5vh;
    font-family: 'Italiana', serif;
  }
  .newsboard h3 {
    width: 80%;
    margin-top: 1vh;
    margin-bottom: 0vh;
    margin-left: auto;
    margin-right: auto;
    font-size: 2vh;
    font-family: 'Italiana', serif;
    font-weight: bold;
    border: 1px solid;
  }

  .newsboard p {
    margin-top: 5vh;
    margin-bottom: 1em;
    font-weight: bold;
    font-size: 2vh;
    font-family: 'Italiana', serif;
    text-align: left;
    margin-left: 2vw;
  }

  .newsboard hr {
    border: 2px solid;
    height: 3px;
    width: 60%;
    margin: auto;
  }

  .newsboard .official {
    display: block;
  }
  .newsboard .people {
    display: block;
  }

  .newsboard .text {
    font-family: Helvetica, serif;
    margin-top: -1vh;   
    text-align: left;
    margin-left: 6vw;
    font-size: 1.5vh;
  }

  .newsboard .header-container {
    display: inline-block;
    width: 100%;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .newsboard .header {
    float: left;
  }

  .newsboard .title {
    display: inline-block;
    font-weight: bold;
    font-family: 'Italiana', serif;
    line-height: 2vw;
    padding-left: 1vw;
  }

  .newsboard .icon {
    width: 3vw;
    height: 3vw;
    border-radius: 25%;
    font-weight: bold;
    line-height: 3vw;
    text-align: center;
    display: inline-block;
    color: black;
    border: 2px solid white;
    margin-bottom: 0;
  }

  .official .icon {
      background: radial-gradient(orchid, #ffc107);
      font-size: 1vw;
  }
  .official .icon:before {
    content: 'Official';
  }

  .people .icon {
      font-size: 2vw;
  }
  .people .icon:before {
    content: '👤';
  }
}
</style>

<script>

export default {
  props: {
    started: Boolean,
    recentPosts: Array
  },
  data() {
    return {
      test1: '#vjord forest fires',
      test2: 'corruption runs rampant',
      test3: 'top 10 party members of the year'
    }
  },
  methods: {
    headerIconStyle(sourceType) {
      function selectRandom(array) {
        return array[Math.floor(Math.random()*array.length)];
      }

      const colors = new Array('lightgreen', 'lightblue', 'lightcyan', 'lightgoldenrodyellow', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightgray', 'lightsteelblue', 'lightyellow');

      if (sourceType == 'people') {
        return {
          'background-color': selectRandom(colors)
        };
      }
      else {
        return {
        };
      }
    },
  }
}
</script>