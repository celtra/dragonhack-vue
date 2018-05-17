<template>
    <div>
        <h2>{{ text }}</h2>

        <div class="streak-message">
            <p style="display: none">Streak text here</p>
        </div>

        <div class="sentence" tabindex="0">
            <span class="correct">Correct</span>
            <span class="wrong">Wrong</span>
            <span class="current">Current</span>
            <span>Neutral</span>
        </div>

        <p class="time">0s</p>
        <p class="score">0 / 0</p>
        <p class="streak">0 characters in the last 5 seconds</p>

        <div class="performance">
            <div style="height: 5%;"></div>
            <div style="height: 40%;"></div>
            <div style="height: 20%;"></div>
        </div>
    </div>
</template>

<script>
import { sentences, isValidChar } from '../data'

export default {
    data () {
        return {
            text: 'Hello class'
        }
    }
}
</script>
