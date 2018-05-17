<template>
    <div>
        <p class="streak">{{ streakCount }} characters in the last {{ streakDuration / 1000 }} seconds</p>

        <div class="performance">
            <div v-for="(result, index) in streakTracking" :key="index"
                :style="{ 'height': `${Math.floor(result * 2) + 5}%` }"
            ></div>
        </div>

        <div class="streak-message">
            <p :style="{ opacity: streakText ? 1 : 0 }">{{ lastStreakText }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            time: 0,
            writeTimes: [],
            streakDuration: 3000,
            streakTracking: [],
            lastStreakText: null
        }
    },
    created () {
        this.startTime = Date.now()

        setInterval(() => {
            this.time = Date.now() - this.startTime
            this.streakTracking.push(this.streakCount)
        }, 1000)
    },
    watch: {
        streakText (v) {
            if (v)
                this.lastStreakText = v
        }
    },
    computed: {
        streakCount () {
            return this.writeTimes.filter((time, index) => time > this.time - this.streakDuration).length
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
        onCorrectCharacter () {
            this.writeTimes.push(Date.now() - this.startTime)
        }
    }
}
</script>

<style scoped>
.streak {
    font-size: 20px;
}

.streak-message {
    display: block;
    margin: 20px auto;
    padding: 0px 50px;
    color: white;
    font-size: 24px;
    height: 60px;
    line-height: 60px;
    width: 300px;
}

.streak-message > p {
    background-color: #18cc7e;
    transition: all 0.4s ease-out;
}

@keyframes blinker {
    50% {
        opacity: 0.7;
    }
}

.performance {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    height: 200px;
    width: 415px;
    overflow: hidden;
    margin: 20px auto 0px auto;
}

.performance > div {
    width: 30px;
    margin-left: 5px;
    background-color: #00b1ff;
    animation: expand 0.3s ease-out;
    flex-shrink: 0;
}

@keyframes expand {
    from {
        width: 0px;
        margin-left: 0px;
    }
    to {
        width: 30px;
        margin-left: 5px;
    }
}
</style>