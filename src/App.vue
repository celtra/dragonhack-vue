<template>
    <div>
        <Typing v-if="isPlaying" @score="addScore" />
        <div class="main" v-else>
            <button @click="isPlaying = true">I'm ready, play again!</button>

            <div class="highscores" v-if="scores.length > 0">
                <h2>Best scores</h2>
                <h4>in characters per second</h4>

                <p v-for="(score, index) in displayScores" :key="index">
                    <span>#{{ score.try }}</span> {{ score.score.toFixed(2) }}
                </p>
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
            scores: [],
            isPlaying: false
        }
    },
    computed: {
        displayScores () {
            return this.scores.map((score, index) => {
                return {
                    try: index + 1,
                    score: score
                }
            }).sort((a, b) => b.score - a.score)
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
