<template>
    <div>
        <div class="sentence" tabindex="0" @keydown="handleInput" ref="sentence">
            <span v-for="(c, index) in sentence" :key="index" :class="getClass(index)">{{ c }}</span>
        </div>

        <p class="time">{{ Math.floor(time / 1000) }}s</p>
        <p class="score">{{ correctCount }} / {{ text.length }}</p>
        
        <performance ref="performance"></performance>
    </div>
</template>

<script>
import Performance from './Performance.vue'
import { sentences, isValidChar } from '../data'

export default {
    components: {
        performance: Performance
    },
    data () {
        return {
            text: '',
            time: 0,
            sentenceIndex: 0,
            totalCorrectCount: 0
        }
    },
    mounted () {
        this.$refs.sentence.focus()

        this.startTime = Date.now()

        this.intervalId = setInterval(() => {
            this.time = Date.now() - this.startTime
        }, 1000)
    },
    computed: {
        sentence () {
            return sentences[this.sentenceIndex]
        },
        textResult () {
            return Array.from(this.text).map((c, index) => c === this.sentence[index])
        },
        correctCount () {
            return this.textResult.filter(c => c).length
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
            this.text = this.text.slice(0, -1)
        },
        addInput (char) {
            this.text += char
            if (this.sentence[this.text.length - 1] === char) {
                this.$refs.performance.onCorrectCharacter()
            }

            if (this.text.length === this.sentence.length)
                this.handleEndOfSentence()
        },
        handleEndOfSentence () {
            this.totalCorrectCount += this.correctCount
            this.text = ''

            if (this.sentenceIndex === sentences.length - 1) {
                let time = (Date.now() - this.startTime) / 1000
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
