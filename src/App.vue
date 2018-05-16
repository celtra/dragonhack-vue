<template>
    <div id="app">
        <Typing v-if="isPlaying" @score="addScore" />
        <div v-else>
            <button @click="isPlaying = true">I'm ready!</button>

            <div class="highscores" v-if="scores.length > 0">
                <h2>Best scores</h2>
                <h4>in characters per second</h4>

                <p v-for="(score, index) in scoresOrdered" :key="index">{{ score }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Typing from './components/Typing'

export default {
    name: 'App',
    components: {
        Typing
    },
    data () {
        return {
            scores: [1],
            isPlaying: false
        }
    },
    computed: {
        scoresOrdered () {
            return this.scores.sort().reverse()
        }
    },
    methods: {
        addScore (score) {
            this.scores.push(score)
            this.isPlaying = false
        }
    }
}
</script>

<style>
@import './main.css';
</style>
