<template>
    <div>
        <h2>{{ greeting }}</h2>

        <div class="sentence">
            <span class="correct">S</span>
            <span class="correct">o</span>
            <span class="wrong">m</span>
            <span class="wrong">e</span>
            <span class="correct">t</span>
            <span class="current">h</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
        </div>

        <p class="score">0 / 0</p>
    </div>
</template>

<script>
import { sentences, listenForInput } from '../utils'

export default {
    components: {},
    data () {
        return {
            greeting: 'Hello world!'
        }
    },
    methods: {
    }
}
</script>

<style>
@import '../main.css';
</style>
