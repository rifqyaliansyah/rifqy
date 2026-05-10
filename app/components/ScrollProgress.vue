<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)
const showUI = ref(false)
const activeDot = ref(0)
const dotPositions = ref([])

const SECTIONS = ['hero', 'about', 'stack', 'timeline', 'works', 'contact']
const LABELS = ['//hero', '//about', '//stack', '//timeline', '//works', '//contact']

let container = null

const computeDots = () => {
    if (!container) return
    const total = container.scrollHeight - container.clientHeight
    if (total <= 0) return
    dotPositions.value = SECTIONS.map(id => {
        const el = document.querySelector(`#${id}`)
        if (!el) return 0
        return Math.min((el.offsetTop / total) * 100, 100)
    })
}

const onScroll = () => {
    const scrollTop = container.scrollTop
    const scrollHeight = container.scrollHeight - container.clientHeight
    progress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
    showUI.value = scrollTop > container.clientHeight * 0.25

    let closest = 0
    SECTIONS.forEach((id, i) => {
        const el = document.querySelector(`#${id}`)
        if (el && el.offsetTop <= scrollTop + container.clientHeight * 0.45) closest = i
    })
    activeDot.value = closest
}

const scrollToTop = () => {
    if (!container) return
    const start = container.scrollTop, duration = 1000
    let st = null
    const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    const step = ts => {
        if (!st) st = ts
        const p = Math.min((ts - st) / duration, 1)
        container.scrollTop = start * (1 - ease(p))
        if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}

const scrollToSection = id => {
    const el = document.querySelector(`#${id}`)
    if (!el || !container) return
    const start = container.scrollTop, distance = el.offsetTop - start, duration = 900
    let st = null
    const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    const step = ts => {
        if (!st) st = ts
        const p = Math.min((ts - st) / duration, 1)
        container.scrollTop = start + distance * ease(p)
        if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}

onMounted(() => {
    container = document.querySelector('.main')
    if (!container) return
    container.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', computeDots)
    setTimeout(() => { computeDots(); onScroll() }, 200)
})

onUnmounted(() => {
    container?.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', computeDots)
})
</script>

<template>
    <div class="sp-desktop" aria-hidden="true">

        <div class="sp-track">
            <div class="track-bg" />
            <div class="track-fill" :style="{ height: progress + '%' }" />

            <button v-for="(pos, i) in dotPositions" :key="i" class="s-dot"
                :class="{ 'is-active': activeDot === i, 'is-passed': i <= activeDot }" :style="{ top: pos + '%' }"
                @click="scrollToSection(SECTIONS[i])">
                <span class="dot-core" />
                <span class="dot-label">{{ LABELS[i] }}</span>
            </button>
        </div>

        <Transition name="slide-up">
            <button v-if="showUI" class="btt-btn" @click="scrollToTop">
                <span class="btt-arrow">↑</span>
                <span class="btt-line" />
            </button>
        </Transition>

    </div>

    <div class="sp-mobile" aria-hidden="true">
        <div class="mob-bar">
            <div class="mob-fill" :style="{ width: progress + '%' }" />
        </div>

        <Transition name="fab-in">
            <button v-if="showUI" class="mob-fab" @click="scrollToTop">
                <svg class="fab-ring" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect class="ring-bg" x="1" y="1" width="42" height="42" pathLength="100" />
                    <rect class="ring-fill" x="1" y="1" width="42" height="42" pathLength="100"
                        :style="{ strokeDashoffset: 100 - progress }" />
                </svg>
                <span class="fab-arrow">↑</span>
            </button>
        </Transition>
    </div>
</template>

<style scoped>
.sp-desktop {
    position: fixed;
    right: 1.75rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9000;
    width: 20px;
    display: block;
    pointer-events: none;
}

.sp-track {
    position: relative;
    width: 1px;
    height: 180px;
    margin: 0 auto;
    pointer-events: none;
}

.track-bg {
    position: absolute;
    inset: 0;
    background: rgba(100, 90, 70, 0.25);
    box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.12);
}

.track-fill {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, #c8b89a, #a89880);
    transition: height 0.08s linear;
    box-shadow:
        0 0 6px rgba(200, 184, 154, 0.6),
        0 0 0 0.5px rgba(0, 0, 0, 0.15);
}

.s-dot {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
    cursor: none;
    pointer-events: all;
}

.dot-core {
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(100, 90, 70, 0.3);
    border: 0.5px solid rgba(100, 90, 70, 0.4);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
    transition:
        background 0.35s ease,
        border-color 0.35s ease,
        transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.4s ease;
}

.s-dot.is-passed .dot-core {
    background: rgba(200, 184, 154, 0.55);
    border-color: rgba(200, 184, 154, 0.7);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
}

.s-dot.is-active .dot-core {
    background: #c8b89a;
    border-color: #c8b89a;
    transform: scale(1.6);
    box-shadow:
        0 0 0 2.5px rgba(200, 184, 154, 0.15),
        0 0 0 1px rgba(0, 0, 0, 0.2),
        0 0 8px rgba(200, 184, 154, 0.75),
        0 0 20px rgba(200, 184, 154, 0.3);
}

.dot-label {
    position: absolute;
    right: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%) translateX(4px);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.44rem;
    letter-spacing: 0.14em;
    color: #c8b89a;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.s-dot:hover .dot-label {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
}

.btt-btn {
    position: absolute;
    top: calc(180px + 0.75rem);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    padding: 0;
    cursor: none;
    pointer-events: all;
}

.btt-arrow {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: rgba(200, 184, 154, 0.55);
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
    transition: color 0.2s ease, transform 0.2s ease;
    line-height: 1;
    display: block;
}

.btt-line {
    display: block;
    width: 0.5px;
    height: 16px;
    background: rgba(100, 90, 70, 0.3);
    box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.1);
    transition: height 0.2s ease, background 0.2s ease;
}

.btt-btn:hover .btt-arrow {
    color: #c8b89a;
    transform: translateY(-3px);
}

.btt-btn:hover .btt-line {
    background: rgba(200, 184, 154, 0.55);
    height: 22px;
}

.sp-mobile {
    display: none;
}

.mob-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 1.5px;
    background: rgba(100, 90, 70, 0.2);
    z-index: 10001;
    pointer-events: none;
}

.mob-fill {
    height: 100%;
    background: linear-gradient(to right, #c8b89a, #a89880);
    box-shadow: 0 0 6px rgba(200, 184, 154, 0.6);
    transition: width 0.08s linear;
}

.mob-fab {
    position: fixed;
    overflow: visible;
    isolation: isolate;
    bottom: 1.75rem;
    right: 1.25rem;
    z-index: 10001;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    width: 40px;
    height: 40px;
    background: #1a1612;
    border: 0.5px solid #c8b89a;
    padding: 0;
    cursor: pointer;
    pointer-events: all;
    box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(0, 0, 0, 0.2);
}

.fab-ring {
    position: absolute;
    inset: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    pointer-events: none;
    overflow: visible;
}

.ring-bg {
    stroke: rgba(100, 90, 70, 0.25);
    stroke-width: 1;
    fill: none;
}

.ring-fill {
    stroke: #c8b89a;
    stroke-width: 1;
    fill: none;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    transition: stroke-dashoffset 0.08s linear;
    filter: drop-shadow(0 0 3px rgba(200, 184, 154, 0.6));
}

.fab-arrow {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    color: #c8b89a;
    line-height: 1;
    display: block;
}

@media (max-width: 1024px) {
    .sp-desktop {
        display: none;
    }

    .sp-mobile {
        display: block;
    }
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
}

.slide-up-enter-to,
.slide-up-leave-from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}

.fab-in-enter-active,
.fab-in-leave-active {
    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.fab-in-enter-from,
.fab-in-leave-to {
    opacity: 0;
    transform: translateY(12px) scale(0.9);
}
</style>