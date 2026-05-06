<script setup>
const navItems = ['About', 'Stack', 'Timeline', 'Works', 'Contact']

const scrollToTop = () => {
    const container = document.querySelector('.main')
    if (!container) return

    const start = container.scrollTop
    const duration = 1000
    let startTime = null

    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        container.scrollTop = start * (1 - ease(progress))
        if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
}

const scrollTo = (item) => {
    const el = document.querySelector(`#${item.toLowerCase()}`)
    if (!el) return

    const container = document.querySelector('.main')
    const start = container.scrollTop
    const target = el.offsetTop
    const distance = target - start
    const duration = 1000
    let startTime = null

    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        container.scrollTop = start + distance * ease(progress)
        if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
}
</script>

<template>
    <Motion as="header" class="header" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }">

        <Motion as="a" href="#" class="brand" :initial="{ opacity: 0, x: -16 }" :animate="{ opacity: 1, x: 0 }"
            :transition="{ delay: 0.3, duration: 0.6, ease: 'easeOut' }" @click.prevent="scrollToTop">
            <span class="brand-at">@</span>rifqyaliansyah
        </Motion>

        <nav class="nav">
            <template v-for="(item, i) in navItems" :key="item">
                <Motion as="a" :href="`#${item.toLowerCase()}`" class="nav-item" :initial="{ opacity: 0, y: -8 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.4 + i * 0.07, duration: 0.4, ease: 'easeOut' }"
                    @click.prevent="scrollTo(item)">
                    {{ item }}
                </Motion>
                <span v-if="i < navItems.length - 1" class="sep">//</span>
            </template>
        </nav>

    </Motion>
</template>

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 64px;
    padding: 0 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
}

.brand {
    font-family: 'VT323', monospace;
    font-size: 2rem;
    line-height: 1;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    letter-spacing: 0.02em;
    flex-shrink: 0;
}

.brand-at {
    color: #c8b89a;
}

.nav {
    display: flex;
    align-items: center;
    gap: 2px;
}

.nav-item {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    padding: 4px 12px;
    position: relative;
    transition: color 0.2s ease;
}

.nav-item::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    width: 60%;
    height: 0.5px;
    background: #c8b89a;
    transform: translateX(-50%) scaleX(0);
    transform-origin: center;
    transition: transform 0.25s ease;
}

.nav-item:hover {
    color: rgba(255, 255, 255, 0.9);
}

.nav-item:hover::after {
    transform: translateX(-50%) scaleX(1);
}

.sep {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.45rem;
    color: rgba(255, 255, 255, 0.1);
    user-select: none;
}

@media (max-width: 768px) {
    .header {
        height: 56px;
        padding: 0 1.5rem;
    }

    .brand {
        font-size: 1.7rem;
    }

    .nav-item {
        font-size: 0.6rem;
        padding: 4px 8px;
        letter-spacing: 0.1em;
    }
}

@media (max-width: 480px) {
    .header {
        height: 48px;
        padding: 0 1rem;
    }

    .brand {
        font-size: 1rem;
    }

    .nav-item {
        font-size: 0.52rem;
        padding: 4px 5px;
        letter-spacing: 0.06em;
    }

    .sep {
        display: none;
    }
}
</style>