<template>
    <div>
        <div class="text" tabindex="0" @keydown="handleInput" ref="text">
            <span 
                v-for="(c, index) in text" :key="c.id"
                :class="getClass(index)"
            >{{ c }}</span>
        </div>

        <p class="time">{{ Math.floor(time) }}s</p>
        <p class="score">{{ correctIndices.length }} / {{ written.length }}</p>
        <p class="wpm">{{ correctIndicesInLastFiveSeconds.length }} characters in the last 5 seconds</p>
        <div class="streak" v-if="true || correctIndicesInLastFiveSeconds.length > 20">Keep going!</div>

        <div class="performance">
            <div v-for="(result, index) in timeResults" :key="index" :style="{ 'height': `${Math.floor(result * 2) + 10}%` }"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            written: '',
            time: 0,
            timeByIndex: {},
            timeResults: []
        }
    },
    created () {
        this.text = 'Some sample text you have to type out really quickly to win'

        this.startTime = Date.now() / 1000

        setInterval(() => {
            this.time = Date.now() / 1000 - this.startTime

            this.timeResults.push(this.correctIndicesInLastFiveSeconds.length)
        }, 1000)
    },
    mounted () {
        this.$refs.text.focus()
    },
    computed: {
        correctIndicesInLastFiveSeconds () {
            return Object.keys(this.timeByIndex).map(k => parseInt(k)).filter(index => {
                let time = this.timeByIndex[index]
                return time !== null && time > this.time - 5 && this.correctIndices.includes(index)
            })
        },
        correctIndices () {
            let normalize = (s) => s.toLowerCase().replace(/[^\w]/g, '')

            let indices = []
            for (let i = 0; i < this.written.length; i++) {
                if (normalize(this.text[i]) === normalize(this.written[i])) {
                    indices.push(i)
                }
            }

            return indices
        }
    },
    methods: {
        handleInput (e) {
            if (e.keyCode === 8) {
                if (this.written.length > 0) {
                    this.$set(this.timeByIndex, this.written.length - 1, null)
                    this.written = this.written.slice(0, -1)
                }
            } else if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode === 32) {
                this.$set(this.timeByIndex, this.written.length, Date.now() / 1000 - this.startTime)
                this.written += e.key

                if (this.written.length >= this.text.length) {
                    let time = Date.now() / 1000 - this.startTime
                    if (time > 0)
                        this.$emit('score', (this.correctIndices.length / time).toFixed(2))
                }
            }
        },
        getClass (index) {
            return {
                current: index === this.written.length,
                neutral: index > this.written.length,
                correct: this.correctIndices.includes(index),
                wrong: index < this.written.length && !this.correctIndices.includes(index)
            }
        }
    }
}
</script>
