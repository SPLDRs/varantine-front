<template>
<v-card
    class="mx-auto"
    max-width="400"
    outlined
  >
    <v-card-title>
      <!--<span class="title font-weight-light">Title</span>-->
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      "{{bio}}" </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{fullName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    name: 'UserBio',
    props: {
        fullName: String,
        avatar: String,
        bio: String,
    },
}
</script>

