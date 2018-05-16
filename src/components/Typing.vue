<template>
    <div>
        <div class="streak-message">
            <p v-if="streakText">{{ streakText }}</p>
        </div>

        <div class="text" tabindex="0" @keydown="handleInput" ref="text">
            <span v-for="(c, index) in text" :key="c.id" :class="getClass(index)">{{ c }}</span>
        </div>

        <p class="time">{{ Math.floor(time) }}s</p>
        <p class="score">{{ correctIndices.length }} / {{ written.length }}</p>
        <p class="streak">{{ correctIndicesInLastSeconds.length }} characters in the last 5 seconds</p>

        <div class="performance">
            <div v-for="(result, index) in timeResults" :key="index" :style="{ 'height': `${Math.floor(result * 2) + 5}%` }"></div>
        </div>
    </div>
</template>

<script>
import { sentences, validCharacters } from '../data'

export default {
    data () {
        return {
            streakDuration: 3,
            sentenceIndex: 0,
            written: '',
            correctCount: 0,
            time: 0,
            writeTimes: [],
            timeResults: []
        }
    },
    mounted () {
        this.$refs.text.focus()

        this.startTime = Date.now() / 1000

        this.intervalId = setInterval(() => {
            this.time = Date.now() / 1000 - this.startTime
            this.timeResults.push(this.correctIndicesInLastSeconds.length)
            this.$refs.text.focus()
        }, 1000)
    },
    beforeDestroy () {
        clearInterval(this.intervalId)
    },
    computed: {
        text () {
            return sentences[this.sentenceIndex]
        },
        correctIndices () {
            let indices = []
            Array.from(this.written).forEach((c, index) => {
                if (c === this.text[index])
                    indices.push(index)
            })
            return indices
        },
        correctIndicesInLastSeconds () {
            return this.writeTimes.filter((time, index) =>  
                time > this.time - this.streakDuration && this.correctIndices.includes(index))
        },
        streakText () {
            if (this.correctIndicesInLastSeconds.length >= 8 * this.streakDuration)
                return "Too fast!"
            if (this.correctIndicesInLastSeconds.length >= 5 * this.streakDuration)
                return "Keep going!"
            return null
        }
    },
    methods: {
        handleInput (e) {
            if (e.code === 'Backspace')
                this.deleteInput()
            else if (validCharacters.includes(e.key))
                this.addInput(e.key)
        },
        deleteInput () {
            this.writeTimes = this.writeTimes.slice(0, -1)
            this.written = this.written.slice(0, -1)
        },
        addInput (key) {
            this.writeTimes.push(Date.now() / 1000 - this.startTime)
            this.written += key

            if (this.written.length === this.text.length)
                this.handleEndOfSentence()
        },
        handleEndOfSentence () {
            this.correctCount += this.correctIndices.length
            this.written = ''

            if (this.sentenceIndex === sentences.length - 1) {
                let time = Date.now() / 1000 - this.startTime
                this.$emit('score', this.correctCount / time)
            } else {
                this.sentenceIndex ++
            }
        },
        getClass (index) {
            return {
                current: index === this.written.length,
                correct: this.correctIndices.includes(index),
                wrong: index < this.written.length && !this.correctIndices.includes(index)
            }
        }
    }
}
</script>
