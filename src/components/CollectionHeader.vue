<template>
    <div>
        <v-img :src="$hostname+bg"
            aspect-ratio="1"
            max-height="50vh" >
            <div class="fill-height bottom-gradient">
                <v-container fill-height fluid>
                    <v-layout fill-height align-end justify-end>
                        <v-flex xs12 flexbox class="grey--text text--lighten-5">
                            <div class="headline ">{{name}}</div>
                            <div>{{intro}}</div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-img>
    </div>        
</template>

<script>
export default {
    name: 'CollectionHeader',
    props: {
        name: String,
        intro: String,
        bg: String,
    },
}
</script>

<style scoped>
.bottom-gradient{
    background: linear-gradient(rgba(0,0,0,0) 60%, rgba(10, 10, 10, 1));
}
</style>
