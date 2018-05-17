<template>
    <div>
        <div class="streak-message">
            <p v-if="streakText">{{ streakText }}</p>
        </div>

        <div class="sentence" tabindex="0" @keydown="handleInput" ref="sentence">
            <span v-for="(c, index) in sentence" :key="c.id" :class="getClass(index)">{{ c }}</span>
        </div>

        <p class="time">{{ Math.floor(time) }}s</p>
        <p class="score">{{ correctCharsCount }} / {{ text.length }}</p>
        <p class="streak">{{ correctIndicesInLastSeconds.length }} characters in the last 5 seconds</p>

        <div class="performance">
            <div v-for="(result, index) in timeResults" :key="index" :style="{ 'height': `${Math.floor(result * 2) + 5}%` }"></div>
        </div>
    </div>
</template>

<script>
import { sentences, isValidChar } from '../data'

export default {
    data () {
        return {
            streakDuration: 3,
            sentenceIndex: 0,
            text: '',
            totalCorrectCount: 0,
            time: 0,
            writeTimes: [],
            timeResults: []
        }
    },
    mounted () {
        this.$refs.sentence.focus()

        this.startTime = Date.now() / 1000

        this.intervalId = setInterval(() => {
            this.time = Date.now() / 1000 - this.startTime
            this.timeResults.push(this.correctIndicesInLastSeconds.length)
            this.$refs.sentence.focus()
        }, 1000)
    },
    beforeDestroy () {
        clearInterval(this.intervalId)
    },
    computed: {
        sentence () {
            return sentences[this.sentenceIndex]
        },
        textResult () {
            return Array.from(this.text).map((c, index) => c === this.sentence.charAt(index))
        },
        correctCharsCount () {
            return this.textResult.filter(c => c).length
        },
        correctIndicesInLastSeconds () {
            return this.writeTimes.filter((time, index) =>  
                time > this.time - this.streakDuration && this.textResult[index])
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
            if (e.key === 'Backspace')
                this.deleteInput()
            else if (isValidChar(e.key))
                this.addInput(e.key)
        },
        deleteInput () {
            this.writeTimes = this.writeTimes.slice(0, -1)
            this.text = this.text.slice(0, -1)
        },
        addInput (key) {
            this.writeTimes.push(Date.now() / 1000 - this.startTime)
            this.text += key

            if (this.text.length === this.sentence.length)
                this.handleEndOfSentence()
        },
        handleEndOfSentence () {
            this.totalCorrectCount += this.correctCharsCount
            this.text = ''
            this.writeTimes = []

            if (this.sentenceIndex === sentences.length - 1) {
                let time = Date.now() / 1000 - this.startTime
                this.$emit('score', this.totalCorrectCount / time)
            } else {
                this.sentenceIndex ++
            }
        },
        getClass (index) {
            if (index > this.text.length)
                return ''
            else if (index === this.text.length)
                return 'current'
            else if (this.textResult[index])
                return 'correct'
            else
                return 'wrong'
        }
    }
}
</script>
