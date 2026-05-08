<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const items = [
    {
        year: '2025',
        side: 'left',
        role: 'Frontend Developer Intern',
        place: 'PT. Raditya Alkademi Digital',
        type: 'Magang',
        desc: 'Mengembangkan dan maintenance website berbasis Nuxt.js pada landing page & dashboard, integrasi REST API, optimasi responsivitas, serta kolaborasi menggunakan Git bersama tim development.',
        tags: ['Nuxt.js', 'REST API', 'Git', 'GitHub'],
    },
    {
        year: '2026',
        side: 'right',
        role: 'Fullstack Developer',
        place: 'SMK Negeri 1 Cisarua',
        type: 'Project',
        desc: 'Membangun sistem presensi guru berbasis web frontend Nuxt.js, backend Express.js & PostgreSQL, fitur autentikasi, integrasi REST API, hingga deployment ke server sekolah.',
        tags: ['Nuxt.js', 'Express.js', 'REST API', 'PostgreSQL'],
    },
    {
        year: '2026',
        side: 'left',
        role: 'Open to Work',
        place: 'Bandung, Jawa Barat',
        type: 'Status',
        desc: 'Saat ini sedang aktif belajar dan mengembangkan skill, siap untuk bergabung dengan tim dan berkontribusi pada proyek nyata.',
        tags: ['Available', 'Fullstack', 'Bandung'],
        special: true,
    },
]

const sectionRef = ref(null)
const trackRef = ref(null)
const dotRefs = ref([])
const cardRefs = ref([])
const lineHeight = ref(0)
const totalHeight = ref(0)

const setDotRef = (el, i) => { if (el) dotRefs.value[i] = el }
const setCardRef = (el, i) => { if (el) cardRefs.value[i] = el }

let scrollContainer = null
let dotTops = []
let activeStates = []
let rafId = null
let targetHeight = 0

const computeDotTops = () => {
    if (!trackRef.value) return
    totalHeight.value = trackRef.value.offsetHeight
    dotTops = dotRefs.value.map(dot => {
        if (!dot) return 0
        return dot.offsetTop + dot.offsetHeight / 2
    })
    activeStates = new Array(items.length).fill(false)
}

const onScroll = () => {
    if (!scrollContainer || !sectionRef.value || !trackRef.value) return

    const scrollTop = scrollContainer.scrollTop
    const viewH = scrollContainer.clientHeight
    const sectionTop = sectionRef.value.offsetTop
    const trackTop = sectionTop + trackRef.value.offsetTop

    let newTarget = 0
    dotTops.forEach((dotY) => {
        const dotAbsolute = trackTop + dotY
        const dotRelToView = dotAbsolute - scrollTop
        if (dotRelToView < viewH * 0.6) {
            newTarget = dotY
        }
    })
    targetHeight = newTarget
}

const tick = () => {
    const diff = targetHeight - lineHeight.value
    if (Math.abs(diff) > 0.5) {
        lineHeight.value += diff * 0.08
    } else {
        lineHeight.value = targetHeight
    }

    dotTops.forEach((dotY, i) => {
        const shouldBeActive = lineHeight.value >= dotY - 2
        const dot = dotRefs.value[i]
        const card = cardRefs.value[i]

        if (shouldBeActive && !activeStates[i]) {
            activeStates[i] = true

            if (dot) dot.classList.add('is-active')

            if (card) {
                card.classList.add('is-active-card')
                setTimeout(() => {
                    card.classList.add('do-glint')
                    setTimeout(() => {
                        card.classList.remove('do-glint')
                    }, 900)
                }, 80)
            }
        } else if (!shouldBeActive && activeStates[i]) {
            activeStates[i] = false

            if (dot) dot.classList.remove('is-active')
            if (card) {
                card.classList.remove('is-active-card')
                card.classList.remove('do-glint')
            }
        }
    })

    rafId = requestAnimationFrame(tick)
}

onMounted(() => {
    scrollContainer = document.querySelector('.main')
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', onScroll, { passive: true })
        setTimeout(() => {
            computeDotTops()
            onScroll()
            tick()
        }, 150)
    }
    window.addEventListener('resize', () => {
        computeDotTops()
        onScroll()
    })
})

onUnmounted(() => {
    scrollContainer?.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', computeDotTops)
    cancelAnimationFrame(rafId)
})
</script>

<template>
    <section id="timeline" class="timeline" ref="sectionRef">
        <div class="timeline-inner">

            <div class="timeline-header">
                <span class="section-label">( Timeline. )</span>
                <h2 class="section-title">Experience &<br>Projects</h2>
            </div>

            <div class="timeline-track" ref="trackRef">

                <div class="track-line">
                    <div class="track-line-fill" :style="{ height: lineHeight + 'px' }" />
                </div>

                <div class="track-items">
                    <div v-for="(item, i) in items" :key="i" class="track-row" :class="`track-row--${item.side}`">
                        <div class="t-card" :class="{ 'is-special': item.special }" :ref="el => setCardRef(el, i)">
                            <div class="card-glint" />

                            <div class="t-card-top">
                                <span class="t-type">{{ item.type }}</span>
                                <span class="t-year">{{ item.year }}</span>
                            </div>
                            <h3 class="t-role">{{ item.role }}</h3>
                            <p class="t-place">{{ item.place }}</p>
                            <p class="t-desc">{{ item.desc }}</p>
                            <div class="t-tags">
                                <span v-for="tag in item.tags" :key="tag" class="t-tag">{{ tag }}</span>
                            </div>

                            <div class="special-corner tl" />
                            <div class="special-corner tr" />
                            <div class="special-corner bl" />
                            <div class="special-corner br" />
                        </div>

                        <div class="track-dot" :ref="el => setDotRef(el, i)">
                            <div class="track-dot-inner" />
                        </div>

                        <div class="t-spacer" />
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
.timeline {
    position: relative;
    width: 100%;
    min-height: 100svh;
    background: #0e0c0a;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.timeline-inner {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 100px 2.5rem 5rem;
}

.timeline-header {
    display: flex;
    align-items: flex-end;
    gap: 2rem;
    margin-bottom: 4rem;
}

.section-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: #a89880;
    padding-bottom: 0.3rem;
}

.section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.8rem, 6vw, 5rem);
    line-height: 0.9;
    letter-spacing: 0.04em;
    color: #f0ece4;
}

.timeline-track {
    position: relative;
}

.track-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 0.5px;
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(-50%);
}

.track-line-fill {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, #c8b89a, #a89880);
    box-shadow: 0 0 10px rgba(200, 184, 154, 0.5), 0 0 2px rgba(200, 184, 154, 0.8);
}

.track-items {
    display: flex;
    flex-direction: column;
}

.track-row {
    display: grid;
    grid-template-columns: 1fr 24px 1fr;
    align-items: center;
    gap: 0 2rem;
    padding: 2.5rem 0;
}

.track-row--left .t-card {
    grid-column: 1;
    grid-row: 1;
    text-align: right;
    align-self: center;
}

.track-row--left .track-dot {
    grid-column: 2;
    grid-row: 1;
    align-self: center;
}

.track-row--left .t-spacer {
    grid-column: 3;
    grid-row: 1;
}

.track-row--right .t-spacer {
    grid-column: 1;
    grid-row: 1;
}

.track-row--right .track-dot {
    grid-column: 2;
    grid-row: 1;
    align-self: center;
}

.track-row--right .t-card {
    grid-column: 3;
    grid-row: 1;
    text-align: left;
    align-self: center;
}

.track-dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    position: relative;
    z-index: 2;
}

.track-dot-inner {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(200, 184, 154, 0.15);
    border: 1px solid rgba(200, 184, 154, 0.2);
    position: relative;
    z-index: 3;
    transition:
        background 0.5s ease,
        border-color 0.5s ease,
        transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.6s ease;
}

.track-dot.is-active .track-dot-inner {
    background: #c8b89a;
    border-color: #c8b89a;
    transform: scale(1.3);
    box-shadow:
        0 0 0 3px rgba(200, 184, 154, 0.15),
        0 0 8px rgba(200, 184, 154, 0.7),
        0 0 18px rgba(200, 184, 154, 0.4),
        0 0 35px rgba(200, 184, 154, 0.15);
}

.t-card {
    position: relative;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border: 0.5px solid rgba(255, 255, 255, 0.06);
    overflow: hidden;
    transition:
        border-color 0.5s ease,
        background 0.5s ease;
}

.t-card:hover {
    border-color: rgba(200, 184, 154, 0.2);
}

.card-glint {
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg,
            transparent 35%,
            rgba(200, 184, 154, 0.09) 50%,
            transparent 65%);
    transform: translateX(-120%);
    pointer-events: none;
    z-index: 0;
}

.t-card.do-glint .card-glint {
    animation: glintSweep 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes glintSweep {
    from {
        transform: translateX(-120%);
    }

    to {
        transform: translateX(120%);
    }
}

.t-card.is-special,
.t-card.is-active-card {
    border-color: rgba(200, 184, 154, 0.18);
    background: rgba(200, 184, 154, 0.03);
}

.t-card.is-special:hover,
.t-card.is-active-card:hover {
    border-color: rgba(200, 184, 154, 0.35);
}

.special-corner {
    position: absolute;
    width: 8px;
    height: 8px;
    border-color: transparent;
    border-style: solid;
    pointer-events: none;
    transition: border-color 0.4s ease;
}

.t-card.is-special .special-corner,
.t-card.is-active-card .special-corner {
    border-color: rgba(200, 184, 154, 0.45);
}

.special-corner.tl {
    top: 5px;
    left: 5px;
    border-width: 1px 0 0 1px;
}

.special-corner.tr {
    top: 5px;
    right: 5px;
    border-width: 1px 1px 0 0;
}

.special-corner.bl {
    bottom: 5px;
    left: 5px;
    border-width: 0 0 1px 1px;
}

.special-corner.br {
    bottom: 5px;
    right: 5px;
    border-width: 0 1px 1px 0;
}

.t-card-top {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.6rem;
    position: relative;
    z-index: 1;
}

.track-row--left .t-card-top {
    flex-direction: row-reverse;
    justify-content: flex-start;
}

.t-type {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.52rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #0e0c0a;
    background: #c8b89a;
    padding: 2px 8px;
}

.t-year {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    color: #a89880;
}

.t-role {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.2rem, 2.2vw, 1.6rem);
    letter-spacing: 0.04em;
    color: #f0ece4;
    margin-bottom: 0.2rem;
    line-height: 1;
    position: relative;
    z-index: 1;
}

.t-place {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.56rem;
    letter-spacing: 0.1em;
    color: #a89880;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    position: relative;
    z-index: 1;
}

.t-desc {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: 0.8rem;
    line-height: 1.8;
    color: rgba(240, 236, 228, 0.4);
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
}

.t-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    position: relative;
    z-index: 1;
}

.track-row--left .t-tags {
    justify-content: flex-end;
}

.t-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #a89880;
    border: 0.5px solid rgba(255, 255, 255, 0.07);
    padding: 2px 8px;
    transition: border-color 0.2s ease, color 0.2s ease;
}

.t-tag:hover {
    border-color: rgba(200, 184, 154, 0.5);
    color: #c8b89a;
}

@media (max-width: 768px) {
    .timeline-inner {
        padding: 80px 1.5rem 3rem;
    }

    .track-line {
        left: 12px;
        transform: none;
    }

    .track-row {
        grid-template-columns: 24px 1fr;
        gap: 0 1.25rem;
        padding: 1.75rem 0;
    }

    .track-row--left .t-card,
    .track-row--right .t-card {
        grid-column: 2;
        grid-row: 1;
        text-align: left;
        align-self: center;
    }

    .track-row--left .track-dot,
    .track-row--right .track-dot {
        grid-column: 1;
        grid-row: 1;
        align-self: center;
    }

    .track-row--left .t-spacer,
    .track-row--right .t-spacer {
        display: none;
    }

    .track-row--left .t-card-top {
        flex-direction: row;
        justify-content: flex-start;
    }

    .track-row--left .t-tags {
        justify-content: flex-start;
    }
}

@media (max-width: 480px) {
    .timeline-inner {
        padding: 72px 1rem 2.5rem;
    }

    .timeline-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 2.5rem;
    }

    .t-card {
        padding: 1rem;
    }
}
</style>