<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(true)
const phase = ref('in')   // 'in' | 'glitch' | 'resolve' | 'out'
const glitchText = ref('@rifqyaliansyah')
const glitchActive = ref(false)

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJabcdefghij0123456789'
const ORIGINAL = '@rifqyaliansyah'

let timers = []

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const scramble = (progress = 0) => {
    return ORIGINAL.split('').map((char, i) => {
        if (Math.random() < progress) return char
        if (char === '@') return '@'
        return CHARS[rand(0, CHARS.length - 1)]
    }).join('')
}

onMounted(() => {
    const startGlitch = () => {
        glitchActive.value = true
        let iteration = 0
        const totalFrames = 28

        const glitchInterval = setInterval(() => {
            iteration++
            const progress = iteration / totalFrames
            glitchText.value = scramble(progress * progress)

            if (iteration >= totalFrames) {
                clearInterval(glitchInterval)
                glitchText.value = ORIGINAL
                glitchActive.value = false
                phase.value = 'resolve'

                timers.push(setTimeout(() => {
                    phase.value = 'out'
                    timers.push(setTimeout(() => {
                        visible.value = false
                    }, 700))
                }, 600))
            }
        }, 45)

        timers.push(glitchInterval)
    }

    timers.push(setTimeout(() => {
        phase.value = 'glitch'
        startGlitch()
    }, 150))

    onUnmounted(() => timers.forEach(t => { clearTimeout(t); clearInterval(t) }))
})
</script>

<template>
    <Transition name="preloader-out">
        <div v-if="visible" class="preloader" :class="`phase-${phase}`">

            <div class="preloader-grain" />
            <div class="preloader-vignette" />

            <!-- RGB split layers -->
            <div class="glitch-layer glitch-layer--r" :class="{ active: glitchActive }">
                <span class="glitch-text">{{ glitchText }}</span>
            </div>
            <div class="glitch-layer glitch-layer--b" :class="{ active: glitchActive }">
                <span class="glitch-text">{{ glitchText }}</span>
            </div>

            <!-- Main text -->
            <div class="preloader-content">
                <div class="glitch-main" :class="{ 'is-glitching': glitchActive }">
                    <span class="main-at">{{ glitchText[0] }}</span>
                    <span class="main-rest">{{ glitchText.slice(1) }}</span>
                </div>
                <div class="scan-bar" />
            </div>

        </div>
    </Transition>
</template>

<style scoped>
.preloader {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: #0e0c0a;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.preloader-grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 180px;
    opacity: 0.35;
    pointer-events: none;
    z-index: 1;
}

.preloader-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.6) 100%);
    pointer-events: none;
    z-index: 2;
}

.glitch-layer {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s;
}

.glitch-layer.active {
    opacity: 1;
}

.glitch-text {
    font-family: 'VT323', monospace;
    font-size: clamp(1.8rem, 4vw, 3rem);
    letter-spacing: 0.04em;
    white-space: nowrap;
}

.glitch-layer--r {
    mix-blend-mode: screen;
}

.glitch-layer--r .glitch-text {
    color: rgba(255, 30, 30, 0.55);
    animation: shiftR 0.08s steps(1) infinite;
}

.glitch-layer--b {
    mix-blend-mode: screen;
}

.glitch-layer--b .glitch-text {
    color: rgba(30, 100, 255, 0.45);
    animation: shiftB 0.1s steps(1) infinite;
}

@keyframes shiftR {
    0% {
        transform: translateX(-3px) translateY(0);
    }

    25% {
        transform: translateX(-5px) translateY(1px);
    }

    50% {
        transform: translateX(-2px) translateY(-1px);
    }

    75% {
        transform: translateX(-4px) translateY(0);
    }
}

@keyframes shiftB {
    0% {
        transform: translateX(3px) translateY(0);
    }

    25% {
        transform: translateX(5px) translateY(-1px);
    }

    50% {
        transform: translateX(2px) translateY(1px);
    }

    75% {
        transform: translateX(4px) translateY(0);
    }
}

.preloader-content {
    position: relative;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.glitch-main {
    font-family: 'VT323', monospace;
    font-size: clamp(1.8rem, 4vw, 3rem);
    line-height: 1;
    letter-spacing: 0.04em;
    white-space: nowrap;
}

.main-at {
    color: #c8b89a;
    text-shadow: 0 0 16px rgba(200, 184, 154, 0.5);
}

.main-rest {
    color: rgba(240, 236, 228, 0.92);
}

.is-glitching {
    animation: mainShake 0.06s steps(1) infinite;
}

@keyframes mainShake {
    0% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(1px);
    }

    40% {
        transform: translateX(-1px);
    }

    60% {
        transform: translateX(0);
    }

    80% {
        transform: translateX(1px);
    }
}

.scan-bar {
    position: absolute;
    left: -100vw;
    right: -100vw;
    height: 2px;
    background: linear-gradient(to right,
            transparent,
            rgba(200, 184, 154, 0.15) 20%,
            rgba(200, 184, 154, 0.4) 50%,
            rgba(200, 184, 154, 0.15) 80%,
            transparent);
    top: 50%;
    transform: translateY(-200%);
    pointer-events: none;
    animation: scanPass 1.2s ease-in-out 0.3s forwards;
    opacity: 0;
}

@keyframes scanPass {
    0% {
        opacity: 0;
        transform: translateY(-200%);
    }

    10% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: translateY(200%);
    }
}

.phase-resolve .main-at {
    text-shadow:
        0 0 12px rgba(200, 184, 154, 0.8),
        0 0 30px rgba(200, 184, 154, 0.3);
    transition: text-shadow 0.3s ease;
}

.phase-resolve .main-rest {
    text-shadow:
        0 0 16px rgba(240, 236, 228, 0.2),
        0 0 40px rgba(240, 236, 228, 0.07);
    transition: text-shadow 0.3s ease;
}

.phase-out .preloader-content {
    animation: contentOut 0.55s cubic-bezier(0.4, 0, 1, 1) forwards;
}

.phase-out .glitch-layer {
    animation: layerOut 0.55s ease forwards;
}

@keyframes contentOut {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0px);
    }

    100% {
        opacity: 0;
        transform: translateY(-8px) scale(0.98);
        filter: blur(3px);
    }
}

@keyframes layerOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.preloader-out-leave-active {
    transition: opacity 0.3s ease;
}

.preloader-out-leave-to {
    opacity: 0;
}
</style>