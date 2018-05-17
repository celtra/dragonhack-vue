<template>
    <div>
        <div class="streak-message">
            <p v-if="streakText">{{ streakText }}</p>
        </div>

        <div class="sentence" tabindex="0">
            <span v-for="(c, index) in sentence" :key="index" :class="getClass(index)">{{ c }}</span>
        </div>

        <p class="time">{{ Math.floor(time / 1000) }}s</p>
        <p class="score">{{ correctCount }} / {{ text.length }}</p>
        <p class="streak">{{ streakCount }} characters in the last {{ streakDuration / 1000 }} seconds</p>

        <div class="performance">
            <div v-for="(result, index) in streakTracking" :key="index"
                :style="{ 'height': `${Math.floor(result * 2) + 5}%` }"
            ></div>
        </div>
    </div>
</template>

<script>
import sentences from '../sentences'
import listenForInput from '../input'

export default {
    data () {
        return {
            text: '',
            time: 0,
            writeTimes: [],
            streakDuration: 3000,
            streakTracking: [],
            sentenceIndex: 0,
            totalCorrectCount: 0
        }
    },
    mounted () {
        listenForInput(this.addInput, this.deleteInput)

        this.startTime = Date.now()

        this.intervalId = setInterval(() => {
            this.time = Date.now() - this.startTime
            this.streakTracking.push(this.streakCount)
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
        },
        streakCount () {
            return this.writeTimes.filter((time, index) =>  
                time > this.time - this.streakDuration && this.textResult[index]).length
        },
        streakText () {
            if (this.streakCount >= this.streakDuration / 1000 * 8)
                return "Too fast!"
            if (this.streakCount >= this.streakDuration / 1000 * 4)
                return "Keep going!"
            return null
        }
    },
    methods: {
        deleteInput () {
            this.text = this.text.slice(0, -1)
            this.writeTimes = this.writeTimes.slice(0, -1)
        },
        addInput (char) {
            this.text += char
            this.writeTimes.push(Date.now() - this.startTime)

            if (this.text.length === this.sentence.length)
                this.handleEndOfSentence()
        },
        handleEndOfSentence () {
            this.totalCorrectCount += this.correctCount
            this.text = ''
            this.writeTimes = []

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
