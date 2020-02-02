<template>
<div class="pa-0 ma-0" width="auto">
  <v-card class="ma-0 pa-2" flat>
    <div :class="!isItMe(message.user,user) ? 'd-flex justify-end' :''" style="100%">
      <v-card flat width="50%">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-chip v-on="on" class="mx-2" small outlined :color="isItMe(message.user,user) ? 'grey' : '#4CA1AF'">
              {{ isItMe(message.user,user) ?  'You' : message.user  }}
            </v-chip>
          </template>
          <span class="overline pa-0"> {{ message.time }} </span>
        </v-tooltip>
        <v-card text :color="isItMe(message.user,user) ? 'grey lighten-4' : '#e6f2f3'" flat class="mt-1 mx-2 pa-3">
          <v-card-text class="ma-0 pa-0 ">
            {{ message.text }}
          </v-card-text>
        </v-card>
      </v-card>

    </div>
  </v-card>
</div>
</template>
<script>
export default {
  name: "",
  props: {
    user: String,
    message: Object,
  },
  data: () => ({

  }),
  methods: {
    isItMe(x, y) {
      return x == y
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
