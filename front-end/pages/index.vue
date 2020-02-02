<template>
    <v-card color="transparent" height="70%" dark class="elevation-0 d-flex align-center justify-center" width="100%">
      <v-stepper v-model="e1" class="transparent elevation-0" color="transparent">
      <v-stepper-header class="elevation-0" color="transparent" >
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            color="black"
          >
            {{ stepsName[n-1] }}
          </v-stepper-step>

          <v-divider
            v-if="n !== steps"
            :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items color="transparent" >
        <v-stepper-content
          key="1-content"
          step="1"
        >
        <v-card color="transparent" dark class="elevation-0 ma-0">
          <p class="text-center pa-4 ma-4 secondary-font">
            No easier way to chat </br>
            Create your own chatroom and share it with </br>
            your friends or talk with strangers.  </br>
            <v-btn color="black"  @click="nextStep(1);generate();" dark> Generate room
              <v-icon color="white" class="mx-1" > mdi-settings </v-icon>
            </v-btn>
          </p>
        </v-card>
        </v-stepper-content>
        <v-stepper-content
          key="2-content"
          step="2"
        >
        <v-card color="transparent" dark class="elevation-0 ma-0">
          <p class="text-center pa-4 ma-4 secondary-font">
            Share this link with your friends </br>
            <v-btn :disabled="!loaded" @click="generate()" > <v-icon> mdi-refresh </v-icon></v-btn>
            <v-btn :loading="!loaded"  @click="copyboard( `http://${host}/rooms/${room}` )" > {{ `http://${host}/rooms/${room}` }} </v-btn> </br>
            and start chating .  </br>
            <v-btn :disabled="!loaded" color="black" :to=" '/rooms/' + room " @click="" dark> start
              <v-icon color="white" class="mx-1" > mdi-chat </v-icon>
            </v-btn>
          </p>
        </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </v-card>
</template>
<script>
export default {
  data: () => ({
    host : '' ,
    room : '' ,
    e1: 1,
    loaded : false ,
    steps: 2 ,
    stepsName : [ 'Generate' , 'Configurate' ],
  }),
  watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
    },
    created() {
      //do something after creating vue instance
      this.host = window.location.hostname ;
    },
    methods: {
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
      async generate () {
        const data = await this.$axios.$get('https://chat-generator-ws.herokuapp.com/create')
        this.room = data.room
        this.loaded = true
      },
      copyboard(x){
        var textArea = document.createElement("textArea") ;
        textArea.value  = x ;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        event.target.parentNode.parentNode.focus() ;
      },
    },
}
</script>
<style>@import url('https://fonts.googleapis.com/css?family=Caveat&display=swap');
@import url('https://fonts.googleapis.com/css?family=Viga&display=swap');

.background {
  background: #2C3E50;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #4CA1AF, #2C3E50);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #4CA1AF, #2C3E50);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.icon {
  background-image: linear-gradient(135deg, #5EFCE8 10%, #736EFE 100%);
}

.secondary-font { font-family: 'Viga', sans-serif !important ;
                  font-size: 36px;
}

.transparent { background-color: transparent ; }
</style>
