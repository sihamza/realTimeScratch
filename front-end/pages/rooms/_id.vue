<template>
<v-card color="transparent" height="76vh" dark class="elevation-0 pa-5 d-flex flex-row justify-center" width="100%">
  <!--  <v-card color="white">
    <v-container row ma-2>
      <v-btn left to="../" color="red" class="mx-2">
        <v-icon> mdi-exit-to-app </v-icon>
      </v-btn>
      <v-btn right @click="copyboard( 'http://127.0.0.1:3000/rooms/'  + room )"> {{ 'http://127.0.0.1:3000/rooms/'  + room  }} </v-btn>
    </v-container>
  </v-card> -->
  <v-card color="white" class="mx-3 pa-2 d-flex flex-column-reverse" height="100%" width="50%">
    <v-card class="elevation-0 mt-2" light>
      <v-text-field outlined v-model="message" @keypress.enter="sendMessage(message)" label="Message : " color="#4CA1AF" class="" hide-details="auto"></v-text-field>
    </v-card>
    <v-card light shaped outlined class="overflow-y-auto fill-height" width="100%">
      <template v-for="message in data">
        <v-tooltip v-if="message.user == 'system'" top>
          <template v-slot:activator="{ on }">
            <v-card-text v-on='on' light  :class="message.left ? 'left text-center pa-1 overline':'join text-center pa-1 overline' ">
              {{ message.text }}
            </v-card-text>
          </template>
          <span class="overline pa-0"> {{ message.time }} </span>
        </v-tooltip>
        <message v-else :message='message' :user="sender" />
      </template>
    </v-card>
  </v-card>
</v-card>
</v-card>
</template>
<script>
import message from '../../components/message.vue'
import moment from 'moment';

export default {
  name: "",
  components: {
    message
  },
  data: () => ({
    message: '',
    sender: 'unknown',
    room: '',
    data: [],
    socket: null,
  }),
  mounted() {
    this.socket = this.$nuxtSocket({ // In our example above, since vuex opts are set for 'home', they will be used. (see computed props)
      name: 'chat', // If left blank, module will search for the socket you specified as the default
      reconnection: false
    })
    this.socket.on('connect', () => {
      this.sender = this.socket.id;
    });
    this.getMessages()
    this.socket.emit('create', this.room);
  },
  beforeMount() {
    //do something before mounting vue instance
    this.room = this.$route.params.id
  },
  methods: {
    getMessages() {
      this.socket.on('update', (data) => {
        this.data.push(data)
        //this.$refs.test.innerHTML = "dfsdf"
      })

    },
    getMessageStyle(type) {
      if (type == "system") {
        return 'text-center pa-1'
      } else if (type == this.sender) {
        return 'text-left bg- px-4 pa-2'
      } else if (type != this.sender) {
        return 'text-right px-4 pa-2'
      }

    },
    sendMessage(message) {
      if (message.replace(/\s/g, "").length != 0) {
        var data = {
          text: message,
          user: this.sender,
          time: moment().format('MMMM Do YYYY, h:mm:ss a')
        };
        this.socket.emit('message', data, () => {
          this.data.push(data)
        });
        this.message = '';
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.join {
    color: green !important;
}
.left {
    color: red !important;
}
</style>
