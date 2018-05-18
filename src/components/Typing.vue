<template>
    <div>
        <div class="sentence">
            <span
                v-for="(char, index) in targetText.slice(visibleRange.from, visibleRange.to)" :key="index"
                :class="getClass(visibleRange.from + index)">
                {{ char }}
            </span>
        </div>

        <p class="score">{{ correctCount }} / {{ text.length }}</p>
        
        <Stats :times="correctTimes"></Stats>
    </div>
</template>

<script>
import { sentences, listenForInput, getRange } from '../utils'
import Stats from './Stats.vue'

export default {
    components: { Stats },
    data () {
        return {
            text: '',
            correctTimes: []
        }
    },
    mounted () {
        listenForInput(this.addInput, this.deleteInput)
        this.startTime = Date.now()
    },
    computed: {
        targetText () {
            return sentences.join('')
        },
        visibleRange () {
            return getRange(sentences, this.text.length)
        },
        textResult () {
            return Array.from(this.text).map((c, index) => c === this.targetText[index])
        },
        correctCount () {
            return this.textResult.filter(c => c).length
        }
    },
    methods: {
        deleteInput () {
            this.text = this.text.slice(0, -1)
        },
        addInput (char) {
            this.text += char

            if (this.textResult[this.text.length - 1])
                this.correctTimes.push(Date.now() - this.startTime)

            if (this.text.length === this.targetText.length) {
                let time = (Date.now() - this.startTime) / 1000
                this.$emit('score', this.correctCount / time)
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
