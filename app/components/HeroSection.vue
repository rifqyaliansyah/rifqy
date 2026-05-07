<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

let scrollContainer = null
let aboutSection = null
let snapTimer = null
let isSnapping = false
let rafId = null
let lastScrollTop = 0
let lastScrollTime = performance.now()
let isTouching = false

const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const cancelSnap = () => {
    isSnapping = false
    cancelAnimationFrame(rafId)
    clearTimeout(snapTimer)
}

const snapTo = (target) => {
    if (!scrollContainer) return
    const start = scrollContainer.scrollTop
    const distance = target - start
    if (Math.abs(distance) < 2) return

    isSnapping = true
    cancelAnimationFrame(rafId)

    const duration = Math.min(1000, Math.max(600, Math.abs(distance) * 1.2))
    let startTime = null

    const step = (timestamp) => {
        if (!isSnapping) return
        if (!startTime) startTime = timestamp

        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeInOutCubic(progress)              

        scrollContainer.scrollTop = start + distance * eased

        if (progress < 1) {
            rafId = requestAnimationFrame(step)
        } else {
            scrollContainer.scrollTop = target
            isSnapping = false
        }
    }

    rafId = requestAnimationFrame(step)
}

const trySnap = () => {
    if (isSnapping || isTouching) return

    const aboutTop = aboutSection?.offsetTop ?? 0
    const st = scrollContainer.scrollTop

    if (st <= 0 || st >= aboutTop) return

    snapTo(st < aboutTop * 0.45 ? 0 : aboutTop)
}

const onScroll = () => {
    if (isSnapping || isTouching) return   

    const now = performance.now()
    const currentScrollTop = scrollContainer.scrollTop
    const dt = now - lastScrollTime
    const velocity = dt > 0 ? Math.abs(currentScrollTop - lastScrollTop) / dt : 0

    lastScrollTop = currentScrollTop
    lastScrollTime = now

    clearTimeout(snapTimer)

    const aboutTop = aboutSection?.offsetTop ?? 0
    if (currentScrollTop <= 0 || currentScrollTop >= aboutTop) return

    const wait = Math.min(Math.max(120 - velocity * 40, 60), 220)
    snapTimer = setTimeout(trySnap, wait)
}

const onWheel = () => {
    if (isSnapping) cancelSnap()
}

const onTouchStart = () => {
    isTouching = true
    cancelSnap()
}

const onTouchEnd = () => {
    isTouching = false

    snapTimer = setTimeout(() => {
        const before = scrollContainer.scrollTop
        setTimeout(() => {
            const after = scrollContainer.scrollTop
            const stillMoving = Math.abs(after - before) > 2
            snapTimer = setTimeout(trySnap, stillMoving ? 320 : 0)
        }, 80)
    }, 160)
}

const onTouchMove = (e) => {
    if (isSnapping) e.preventDefault()
}

const canvasRef = ref(null)
let animFrame = null

const SNIPPETS = [
    `const build = (idea) => {\n  return idea\n    .design()\n    .develop()\n    .ship()\n}`,
    `function createExperience() {\n  return {\n    clean: true,\n    fast: true,\n    lasting: true\n  }\n}`,
    `const stack = [\n  'Vue',\n  'Nuxt',\n  'TypeScript',\n  'CSS'\n]`,
    `git commit -m\n  "feat: build things\n         that last"`,
    `npm run dev\n> ready on\n  localhost:3000`,
    `type Experience = {\n  clean: boolean\n  fast: boolean\n  lasting: boolean\n}`,
    `const deploy = async () => {\n  await build()\n  await push()\n  console.log('live')\n}`,
    `/* @rifqyaliansyah\n * fullstack developer */`,
    `if (passion > 0) {\n  keepBuilding()\n} else {\n  drinkCoffee()\n}`,
]

onMounted(() => {
    scrollContainer = document.querySelector('.main')
    aboutSection = document.querySelector('#about')
    lastScrollTop = scrollContainer?.scrollTop ?? 0
    lastScrollTime = performance.now()

    scrollContainer?.addEventListener('scroll', onScroll, { passive: true })
    scrollContainer?.addEventListener('wheel', onWheel, { passive: true })
    scrollContainer?.addEventListener('touchstart', onTouchStart, { passive: true })
    scrollContainer?.addEventListener('touchend', onTouchEnd, { passive: true })
    scrollContainer?.addEventListener('touchmove', onTouchMove, { passive: false })

    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')
    const blocks = []

    const resize = () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        initBlocks()
    }

    const initBlocks = () => {
        blocks.length = 0
        const count = Math.max(1, Math.floor(canvas.width / 220))
        for (let i = 0; i < count; i++) blocks.push(makeBlock(i, count))
    }

    const makeBlock = (i, total) => {
        const snippet = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]
        const colW = canvas.width / total
        return {
            snippet, displayed: '', charIndex: 0,
            x: colW * i + colW * 0.15 + Math.random() * (colW * 0.2),
            y: 80 + Math.random() * (canvas.height - 260),
            fadeIn: true, fadeOut: false, alpha: 0,
            tickDelay: Math.floor(Math.random() * 120),
            tickSpeed: 1 + Math.floor(Math.random() * 2),
            tick: 0, pauseTick: 0, done: false,
            waitAfter: 180 + Math.floor(Math.random() * 240),
        }
    }

    let globalTick = 0

    const draw = () => {
        if (document.hidden) { animFrame = requestAnimationFrame(draw); return }
        globalTick++
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = `11px 'Share Tech Mono', monospace`

        blocks.forEach((b, idx) => {
            if (b.tickDelay > 0) { b.tickDelay--; return }
            if (b.fadeIn) {
                b.alpha = Math.min(1, b.alpha + 0.03)
                if (b.alpha >= 1) b.fadeIn = false
            }
            if (!b.done) {
                b.tick++
                if (b.tick % b.tickSpeed === 0) {
                    if (b.charIndex < b.snippet.length) b.displayed += b.snippet[b.charIndex++]
                    else b.done = true
                }
            } else {
                b.pauseTick++
                if (b.pauseTick > b.waitAfter) b.fadeOut = true
            }
            if (b.fadeOut) {
                b.alpha = Math.max(0, b.alpha - 0.018)
                if (b.alpha <= 0) {
                    const total = blocks.length
                    const colW = canvas.width / total
                    const fresh = makeBlock(idx, total)
                    fresh.x = colW * idx + colW * 0.15 + Math.random() * (colW * 0.2)
                    fresh.y = 80 + Math.random() * (canvas.height - 260)
                    fresh.tickDelay = 30 + Math.floor(Math.random() * 60)
                    Object.assign(b, fresh)
                    return
                }
            }
            const lines = b.displayed.split('\n')
            lines.forEach((line, li) => {
                const isComment = /^(\/\/|\/\*|\*)/.test(line.trim())
                const isKeyword = /^(const|let|var|function|return|type|if|else|async|await|import|export|npm|git)\b/.test(line.trim())
                const isString = line.includes("'") || line.includes('"') || line.includes('`')
                if (isComment) ctx.fillStyle = `rgba(200,184,154,${b.alpha * 0.35})`
                else if (isKeyword) ctx.fillStyle = `rgba(240,220,180,${b.alpha * 0.28})`
                else if (isString) ctx.fillStyle = `rgba(180,155,115,${b.alpha * 0.30})`
                else ctx.fillStyle = `rgba(160,140,110,${b.alpha * 0.25})`
                ctx.fillText(line, b.x, b.y + li * 16)
            })
            if (!b.done && Math.floor(globalTick / 30) % 2 === 0) {
                const lines = b.displayed.split('\n')
                const lastLine = lines[lines.length - 1]
                ctx.fillStyle = `rgba(200,184,154,${b.alpha * 0.55})`
                ctx.fillRect(b.x + ctx.measureText(lastLine).width + 1, b.y + (lines.length - 1) * 16 - 10, 6, 12)
            }
        })

        animFrame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()
})

onUnmounted(() => {
    cancelSnap()
    scrollContainer?.removeEventListener('scroll', onScroll)
    scrollContainer?.removeEventListener('wheel', onWheel)
    scrollContainer?.removeEventListener('touchstart', onTouchStart)
    scrollContainer?.removeEventListener('touchend', onTouchEnd)
    scrollContainer?.removeEventListener('touchmove', onTouchMove)
    cancelAnimationFrame(animFrame)
    window.removeEventListener('resize', () => { })
})
</script>

<template>
    <section id="hero" class="hero">
        <canvas ref="canvasRef" class="hero-canvas" />
        <div class="hero-vignette" />

        <div class="hero-center">
            <h1 class="hero-title">
                <Motion as="span" class="title-line" :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }">
                    BUILD
                </Motion>
                <Motion as="span" class="title-line title-outline" :initial="{ opacity: 0, y: 50 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }">
                    THINGS
                </Motion>
                <Motion as="span" class="title-line" :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.80, duration: 0.8, ease: [0.16, 1, 0.3, 1] }">
                    THAT LAST
                </Motion>
            </h1>

            <Motion as="div" class="scroll-hint" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
                :transition="{ delay: 1.2, duration: 0.7 }">
                <span class="scroll-label">scroll</span>
                <div class="scroll-track">
                    <div class="scroll-thumb" />
                </div>
            </Motion>
        </div>

        <Motion as="div" class="hero-bottom" :initial="{ opacity: 0, y: 16 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 1.05, duration: 0.7, ease: 'easeOut' }">
            <div class="bottom-col bottom-col--left">
                <span class="bottom-role">Fullstack Developer</span>
            </div>
            <div class="bottom-col bottom-col--center">
                <p class="bottom-tagline">
                    I craft fast, clean, and reliable digital experiences that are built to last.
                </p>
            </div>
            <div class="bottom-col bottom-col--right">
                <span class="bottom-name">Rifqy Aliansyah</span>
            </div>
        </Motion>
    </section>
</template>

<style scoped>
.hero {
    position: relative;
    width: 100%;
    height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    background: #0e0c0a;
}

.hero-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

.hero-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 20%, rgba(14, 12, 10, 0.75) 70%);
    z-index: 1;
    pointer-events: none;
}

.hero-center {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    padding-top: 64px;
    width: 100%;
    text-align: center;
}

.hero-title {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title-line {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(5rem, 6vw, 15rem);
    line-height: 0.87;
    letter-spacing: 0.04em;
    color: #f0ece4;
}

.title-outline {
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(200, 184, 154, 0.5);
}

.scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.scroll-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.46rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(200, 184, 154, 0.45);
}

.scroll-track {
    width: 1px;
    height: 30px;
    background: rgba(200, 184, 154, 0.12);
    position: relative;
    overflow: hidden;
}

.scroll-thumb {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to bottom, rgba(200, 184, 154, 0.9), transparent);
    animation: scrollFlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes scrollFlow {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }

    15% {
        opacity: 1;
    }

    85% {
        opacity: 1;
    }

    100% {
        transform: translateY(250%);
        opacity: 0;
    }
}

.hero-bottom {
    position: relative;
    z-index: 2;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    border-top: 0.5px solid rgba(255, 255, 255, 0.08);
    padding: 2rem 2.5rem 2rem;
}

.bottom-col {
    display: flex;
}

.bottom-col--left {
    justify-content: flex-start;
}

.bottom-col--center {
    justify-content: center;
}

.bottom-col--right {
    justify-content: flex-end;
}

.bottom-role {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.52rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c8b89a;
}

.bottom-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(0.9rem, 1.3vw, 1.15rem);
    letter-spacing: 0.06em;
    color: rgba(240, 236, 228, 0.65);
    line-height: 1;
}

.bottom-tagline {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: clamp(0.58rem, 0.85vw, 0.7rem);
    line-height: 1;
    color: rgba(240, 236, 228, 0.28);
    letter-spacing: 0.03em;
    white-space: nowrap;
    text-align: center;
}

@media (max-width: 768px) {
    .hero-center {
        padding-top: 56px;
        gap: 2rem;
    }

    .hero-bottom {
        padding: 1rem 1.5rem 1.5rem;
    }

    .bottom-tagline {
        white-space: normal;
        font-size: 0.58rem;
    }
}

@media (max-width: 480px) {
    .hero-bottom {
        grid-template-columns: 1fr auto 1fr;
        padding: 0.875rem 1.25rem 1.25rem;
    }
}

@media (max-height: 600px) {
    .hero-center {
        gap: 1.25rem;
    }

    .title-line {
        font-size: clamp(3.5rem, 12vw, 5rem);
    }
}
</style>