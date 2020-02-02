<template>
  <v-app class="background" >
    <v-card height="100%" color="transparent" class="ma-0 pa-0">
      <v-app-bar color="white" flat light class="elevation-1">
        <v-toolbar-title class="primary-font px-2">
          <v-icon class="display-1 mx-2" color="#4CA1AF"> mdi-forum </v-icon> Anonymous Chat
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-hover v-slot:default="{ hover }" open-delay="50" close-delay="50">
          <v-btn @click="navigateTo('https://github.com/sihamza/ChatRoom-Generator')" class="ma-2" rounded open-delay="200" close-delay="200" :dark="hover" :color="hover ? 'red' : 'none' " depressed>
            Github
            <v-icon :color="hover ? 'white' : 'red' " class="mx-1"> mdi-heart </v-icon>
          </v-btn>
        </v-hover>
      </v-app-bar>
        <nuxt width="100%"/>
        <v-footer color="transparent"  padless>
          <v-row justify="center" no-gutters>
            <v-btn v-for="link in links" :key="link" color="white" text rounded class="my-2">
              {{ link }}
            </v-btn>
            <v-col class="py-4 text-center white--text" cols="12">
              {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </v-col>
          </v-row>
        </v-footer>
      </v-card>
  </v-app>
</template>

<script>
export default {

  data () {
    return {
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram',
      ],
    }
  } ,
  methods: {
    navigateTo( url ) {
      window.location = url 
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Sanchez&display=swap');

.primary-font {
  /*font-family: 'Caveat', cursive !important;*/
  font-family: 'Sanchez', serif;
  font-size: 24px;
}

.background {
  background: #2C3E50 !important ;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #4CA1AF, #2C3E50) !important ;  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #4CA1AF, #2C3E50) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

</style>
