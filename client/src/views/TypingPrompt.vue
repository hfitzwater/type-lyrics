<template>
  <div class="typing-prompt">
    <header class="header">
      <div class="back">
        <cv-button @click="back" kind="secondary" size="small">
          Back to Search
        </cv-button>
      </div>
      <div class="chart">
        <ccv-pie-chart
          :data="chartData"
          :options='chartOptions'>
        </ccv-pie-chart>
      </div>
    </header>

    <div>
      <cv-loading
        class="loader"
        :active="isLoading"
        :overlay="true">
      </cv-loading>

      <div class="prompt">
        {{ text }}
      </div>

      <div class="user-line">
        <cv-text-input
          ref="userInput"
          autofocus
          :disabled="!hasStarted"
          @change="userTextChanged($event)">
        </cv-text-input>
      </div>

      <br>

      <cv-button v-if="!hasStarted" @click="begin" kind="primary">
        Start
      </cv-button>

      <div>
        <div v-for="(textDiff,index) of textDiffs" class="diff-line" :key="index" v-html="textDiff">
          Empty
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Diff from 'text-diff';
import ApiClient from '../ApiClient';

const DIFF = new Diff();
const CHANGE = {
  CORRECT: 0,
  ADDITION: 1,
  OMISSION: -1
};

export default {
  name: 'TypingPrompt',
  data() {
    return {
      textIndex: 0,
      userText: '',
      diff: '',
      allText: [],
      lines: [],
      stats: {
        correct: 0,
        addition: 0,
        omission: 0
      },
      isLoading: true,
      hasStarted: false,
      startTime: Date.now(),
      chartData: [],
      chartOptions: {
          "axes": {
              "bottom": {
                  "mapsTo": "value",
                  "scaleType": "linear"
              },
              "left": {
                  "mapsTo": "group",
                  "scaleType": "labels"
              }
          },
          "legend": {
            "position": "top",
            "alignment": "center",
            "order": ['1','2','3','4','5','6','7','8','9','10'],
            "enabled": true
          },
          "height": "250px"
      }
    };
  },
  async mounted() {
    this.chartData = [];

    await this.loadSong();

    window.addEventListener('keyup', (e) => {      
      if( e.key === 'Enter' ) {
        this.next();
      }
    });
  },
  methods: {
    async loadSong() {
      this.isLoading = true;

      const lines = await ApiClient.getSong( this.$router.currentRoute.query.songId );
      this.lines = lines;

      this.isLoading = false;
    },
    back() {
      this.$router.push('/');
    },
    next() {
      const textDiff = DIFF.main(this.text, this.userText);

      textDiff.forEach(part => {
        const change = part[0];
        const text = part[1];

        switch( change ) {
          case CHANGE.CORRECT:
            this.stats.correct += text.length;
            break;
          case CHANGE.ADDITION:
            this.stats.addition += text.length;
            break;
          case CHANGE.OMISSION:
            this.stats.omission += text.length;
            break;
          default:
            break;
        }
      });

      this.allText.push(`${this.userText}`);
      this.userText = '';
      this.textIndex++;

      this.updateChartData();
    },
    updateChartData() {
      this.chartData = Object.keys(this.stats).map(key => {
        return {
          group: key,
          value: this.stats[key]
        }
      });
    },
    userTextChanged( event ) {
      this.userText = event.target.value;
    },
    begin() {
      this.hasStarted = true;
      this.startTime = Date.now();

      this.$nextTick(() => {
        this.$refs.userInput.focus();  
      });
    }
  },
  computed: {
    text() {
      return this.lines[this.textIndex];
    },
    textDiffs() {
      let diffs = [];

      this.lines.forEach((line, index) => {
        const userText = this.allText[index];

        if( userText ) {
          const textDiff = DIFF.main(line, userText);
          diffs.push(DIFF.prettyHtml(textDiff));
        }
      });

      return diffs;
    }
  }
}
</script>

<style>
  .header {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 5em;
  }

  .back {
    text-align: left;
  }

  .timer {
    text-align: right;
  }

  .prompt {
    text-align: left;
    font-size: 1.5em;
    pointer-events: none;
    user-select: none;
  }

  .user-line {
    font-size: 1.5em;
  }

  .diff-line {
    margin: 0.2em;
    font-size: 1.5em;
  }

  del {
    color: red;
  }

  ins {
    color: green;
  }

  #ta {
    line-height: 1.5em;
    height: 1.9em;
  }
</style>